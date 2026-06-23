# Supabase Setup Guide

This portfolio stores form submissions in Supabase and processes them through a `submit-inquiry` Edge Function (Turnstile verification, database insert, Resend email).

## 1. Run the database migration

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste and run the contents of `supabase/migrations/001_inquiries.sql`
3. Confirm the `inquiries` table exists under **Table Editor**

### Optional: admin read access

Uncomment and update the admin RLS policies in the migration file with your Supabase Auth user UUID so you can read/update inquiries from the dashboard or a future admin UI.

## 2. Deploy the Edge Function

Install the [Supabase CLI](https://supabase.com/docs/guides/cli) if needed:

```bash
npm install -g supabase
supabase login
supabase link --project-ref coploiocmddfnkywiysx
```

Deploy the function:

```bash
supabase functions deploy submit-inquiry
```

Set Edge Function secrets:

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
supabase secrets set TURNSTILE_SECRET_KEY=your_turnstile_secret_key
supabase secrets set NOTIFICATION_EMAIL=contact.nymiss@gmail.com
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically in deployed Edge Functions.

### Resend sender domain

The function defaults to `onboarding@resend.dev` for testing. For production, verify your domain in Resend and update the `from` address in `supabase/functions/submit-inquiry/index.ts`.

## 3. Cloudflare Turnstile

1. Create a widget at [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Add your domains (localhost for dev, production domain for Vercel)
3. Copy **Site Key** → `VITE_TURNSTILE_SITE_KEY`
4. Copy **Secret Key** → `TURNSTILE_SECRET_KEY` (Edge Function secret only)

Without Turnstile keys, forms still work in development (verification is skipped server-side when `TURNSTILE_SECRET_KEY` is unset).

## 4. Local development

Copy environment variables:

```bash
cp .env.example .env.local
```

Fill in Supabase and Turnstile values, then:

```bash
npm run dev
```

Forms call the `submit-inquiry` Edge Function with both `Authorization` and `apikey` headers (required by Supabase).

```
POST https://coploiocmddfnkywiysx.supabase.co/functions/v1/submit-inquiry
```

**Note:** If form submission returns 401, use the **legacy anon JWT key** from Supabase Dashboard → Settings → API → Legacy API Keys, not only the publishable key.

The Edge Function must be deployed before local form submission succeeds.

## 5. Vercel deployment

In **Vercel → Project → Settings → Environment Variables**, add:

| Variable | Environment |
|----------|-------------|
| `VITE_SUPABASE_URL` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Production, Preview, Development |
| `VITE_TURNSTILE_SITE_KEY` | Production, Preview |
| `VITE_SITE_URL` | Production |

Redeploy after adding variables.

## 6. Database schema

### Table: `inquiries`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary key |
| `form_source` | text | `contact` or `consultation` |
| `full_name` | text | |
| `email` | text | Required |
| `phone` | text | WhatsApp number (consultation) |
| `company_name` | text | Optional |
| `service` | text | Consultation only |
| `budget_range` | text | |
| `timeline` | text | Consultation only |
| `message` | text | |
| `utm_source` | text | From URL params |
| `utm_medium` | text | From URL params |
| `utm_campaign` | text | From URL params |
| `metadata` | jsonb | IP, user-agent, referer |
| `status` | text | `new`, `contacted`, `qualified`, `proposal_sent`, `won`, `lost` |
| `created_at` | timestamptz | Auto |
| `updated_at` | timestamptz | Auto on update |

## 7. Testing checklist

### Contact form (`#contact`)

- [ ] Submit with empty required fields → browser validation blocks submit
- [ ] Submit valid data → success message, form resets
- [ ] Row appears in Supabase `inquiries` with `form_source = contact`
- [ ] Email notification received (after `RESEND_API_KEY` is set)
- [ ] Honeypot filled → silent success, no DB row

### Consultation form (`#consultation`)

- [ ] All 8 fields validate correctly
- [ ] Row appears with `form_source = consultation`
- [ ] "Book Free Consultation" nav/hero buttons scroll to `#consultation`

### UTM tracking

- [ ] Visit `/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio`
- [ ] Submit a form → UTM columns populated in DB

### Turnstile (production)

- [ ] Widget renders on both forms
- [ ] Submit blocked until challenge completes
- [ ] Invalid token rejected by Edge Function

### Build

```bash
npm run lint
npm run build
```

## 8. Security notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY` in the frontend
- The publishable/anon key is safe in `VITE_*` variables with RLS enabled
- Honeypot field `website` is hidden from users
- Edge Function verifies Turnstile when secret is configured

## 9. Still needed from you

| Item | Status |
|------|--------|
| `VITE_SUPABASE_URL` | Provided |
| `VITE_SUPABASE_ANON_KEY` | Provided (publishable key) |
| `RESEND_API_KEY` | **Pending** — set via `supabase secrets set` |
| `VITE_TURNSTILE_SITE_KEY` | **Pending** |
| `TURNSTILE_SECRET_KEY` | **Pending** |
| `VITE_SITE_URL` | **Pending** (before production deploy) |
| Run SQL migration | **Pending** |
| Deploy Edge Function | **Pending** |
