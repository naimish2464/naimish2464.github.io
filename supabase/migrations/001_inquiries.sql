-- Portfolio inquiries table
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  form_source text not null check (form_source in ('contact', 'consultation')),
  full_name text,
  email text not null,
  phone text,
  company_name text,
  service text,
  budget_range text,
  timeline text,
  message text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (
    status in ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_inquiries_email on public.inquiries (email);
create index if not exists idx_inquiries_created_at on public.inquiries (created_at desc);
create index if not exists idx_inquiries_form_source on public.inquiries (form_source);
create index if not exists idx_inquiries_status on public.inquiries (status);

create or replace function public.set_inquiries_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists inquiries_updated_at on public.inquiries;
create trigger inquiries_updated_at
  before update on public.inquiries
  for each row
  execute function public.set_inquiries_updated_at();

alter table public.inquiries enable row level security;

drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

-- Replace YOUR_AUTH_USER_ID with your Supabase auth user UUID for dashboard access.
-- drop policy if exists "Admin read inquiries" on public.inquiries;
-- create policy "Admin read inquiries"
--   on public.inquiries
--   for select
--   to authenticated
--   using (auth.uid() = 'YOUR_AUTH_USER_ID'::uuid);

-- drop policy if exists "Admin update inquiries" on public.inquiries;
-- create policy "Admin update inquiries"
--   on public.inquiries
--   for update
--   to authenticated
--   using (auth.uid() = 'YOUR_AUTH_USER_ID'::uuid);
