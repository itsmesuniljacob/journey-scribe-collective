DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
REVOKE INSERT ON public.newsletter_subscribers FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.subscribe_newsletter(text) TO anon, authenticated;