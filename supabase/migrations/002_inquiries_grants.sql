-- Ensure API roles can access the inquiries table
grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on table public.inquiries to service_role;
grant insert on table public.inquiries to anon, authenticated;

-- Refresh PostgREST schema cache
notify pgrst, 'reload schema';
