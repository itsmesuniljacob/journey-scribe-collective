DROP POLICY IF EXISTS "Anyone can read the visit counter" ON public.site_visits;
REVOKE SELECT ON public.site_visits FROM anon, authenticated;