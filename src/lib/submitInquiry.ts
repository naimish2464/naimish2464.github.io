import { getInquiryHeaders } from './supabase';
import type { InquiryPayload, InquirySubmitResult } from '../types/inquiry';

function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Form submission is not configured. Please try again later.');
  }

  return { url, anonKey };
}

export async function submitInquiry(
  payload: InquiryPayload
): Promise<InquirySubmitResult> {
  const { url } = getSupabaseConfig();

  const response = await fetch(`${url}/functions/v1/submit-inquiry`, {
    method: 'POST',
    headers: getInquiryHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data.error === 'string'
        ? data.error
        : 'Unable to submit your request. Please try again.'
    );
  }

  return data as InquirySubmitResult;
}
