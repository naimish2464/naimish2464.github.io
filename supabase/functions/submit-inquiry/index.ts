import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InquiryRequest {
  form_source: 'contact' | 'consultation';
  full_name?: string;
  email: string;
  phone?: string;
  company_name?: string;
  service?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  turnstile_token?: string;
  website?: string;
  inquiry_id?: string;
  notify_only?: boolean;
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(token: string, remoteIp?: string) {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY');
  if (!secret) {
    return true;
  }

  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token);
  if (remoteIp) {
    formData.append('remoteip', remoteIp);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  return Boolean(result.success);
}

async function sendNotificationEmail(payload: InquiryRequest, inquiryId: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const notificationEmail = Deno.env.get('NOTIFICATION_EMAIL') ?? 'contact.nymiss@gmail.com';

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not configured. Skipping email notification.');
    return;
  }

  const formLabel = payload.form_source === 'consultation' ? 'Consultation Request' : 'Contact Form';
  const detailRows = [
    ['Form', formLabel],
    ['Name', payload.full_name ?? '—'],
    ['Email', payload.email],
    ['Phone', payload.phone ?? '—'],
    ['Company', payload.company_name ?? '—'],
    ['Service', payload.service ?? '—'],
    ['Budget', payload.budget_range ?? '—'],
    ['Timeline', payload.timeline ?? '—'],
    ['Message', payload.message ?? '—'],
    ['UTM Source', payload.utm_source ?? '—'],
    ['UTM Medium', payload.utm_medium ?? '—'],
    ['UTM Campaign', payload.utm_campaign ?? '—'],
    ['Inquiry ID', inquiryId],
  ];

  const html = `
    <h2>New ${formLabel}</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;">
      ${detailRows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${label}</strong></td><td>${String(value).replace(/</g, '&lt;')}</td></tr>`
        )
        .join('')}
    </table>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [notificationEmail],
      subject: `New ${formLabel} from ${payload.full_name ?? payload.email}`,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend email failed:', errorText);
  }
}

function validatePayload(payload: InquiryRequest) {
  if (!payload.email || !isValidEmail(payload.email)) {
    return 'A valid email address is required.';
  }

  if (!payload.form_source || !['contact', 'consultation'].includes(payload.form_source)) {
    return 'Invalid form source.';
  }

  if (payload.form_source === 'contact' && !payload.message?.trim()) {
    return 'Message is required.';
  }

  if (payload.form_source === 'consultation') {
    const requiredFields: Array<keyof InquiryRequest> = [
      'full_name',
      'phone',
      'service',
      'budget_range',
      'timeline',
      'message',
    ];

    for (const field of requiredFields) {
      if (!String(payload[field] ?? '').trim()) {
        return `Missing required field: ${field}`;
      }
    }
  }

  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const payload = (await req.json()) as InquiryRequest;

    if (payload.website) {
      return jsonResponse({ success: true });
    }

    const validationError = validatePayload(payload);
    if (validationError) {
      return jsonResponse({ error: validationError }, 400);
    }

    const remoteIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('cf-connecting-ip') ??
      undefined;

    const turnstileRequired = Boolean(Deno.env.get('TURNSTILE_SECRET_KEY'));
    if (turnstileRequired) {
      if (!payload.turnstile_token) {
        return jsonResponse({ error: 'Security verification failed. Please try again.' }, 400);
      }

      const isHuman = await verifyTurnstile(payload.turnstile_token, remoteIp);
      if (!isHuman) {
        return jsonResponse({ error: 'Security verification failed. Please try again.' }, 400);
      }
    }

    // Notification-only path: inquiry already saved from the browser via RLS.
    if (payload.notify_only) {
      if (!payload.inquiry_id) {
        return jsonResponse({ error: 'Missing inquiry id for notification.' }, 400);
      }

      await sendNotificationEmail(payload, payload.inquiry_id);
      return jsonResponse({ success: true, id: payload.inquiry_id });
    }

    // Legacy path: insert from Edge Function (kept for backwards compatibility).
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'Server configuration error.' }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const metadata = {
      user_agent: req.headers.get('user-agent') ?? null,
      ip: remoteIp ?? null,
      referer: req.headers.get('referer') ?? null,
    };

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        form_source: payload.form_source,
        full_name: payload.full_name?.trim() || null,
        email: payload.email.trim(),
        phone: payload.phone?.trim() || null,
        company_name: payload.company_name?.trim() || null,
        service: payload.service?.trim() || null,
        budget_range: payload.budget_range?.trim() || null,
        timeline: payload.timeline?.trim() || null,
        message: payload.message?.trim() || null,
        utm_source: payload.utm_source?.trim() || null,
        utm_medium: payload.utm_medium?.trim() || null,
        utm_campaign: payload.utm_campaign?.trim() || null,
        metadata,
        status: 'new',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return jsonResponse({ error: 'Unable to save your inquiry. Please try again.' }, 500);
    }

    await sendNotificationEmail(payload, data.id);

    return jsonResponse({ success: true, id: data.id });
  } catch (error) {
    console.error('submit-inquiry error:', error);
    return jsonResponse({ error: 'Unexpected server error.' }, 500);
  }
});
