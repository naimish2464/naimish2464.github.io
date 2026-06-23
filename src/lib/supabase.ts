function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Form submission is not configured. Please try again later.');
  }

  return { url, anonKey };
}

export function getInquiryHeaders() {
  const { anonKey } = getSupabaseConfig();

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${anonKey}`,
    apikey: anonKey,
  };
}
