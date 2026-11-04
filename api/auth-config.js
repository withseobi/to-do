// Only Supabase's browser-safe URL and publishable/anon key are sent to the page.
module.exports = function handler(_request, response) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  response.setHeader('Cache-Control', 'no-store');
  if (!url || !anonKey) {
    return response.status(503).json({ error: 'Supabase public configuration is missing.' });
  }
  return response.status(200).json({ url, anonKey });
};

