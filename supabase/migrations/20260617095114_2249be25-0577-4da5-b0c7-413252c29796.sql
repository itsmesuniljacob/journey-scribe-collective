CREATE TABLE public.newsletter_subscribers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.newsletter_subscribers TO authenticated;
GRANT SELECT, INSERT ON public.newsletter_subscribers TO anon;
GRANT ALL ON public.newsletter_subscribers TO service_role;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public select own"
ON public.newsletter_subscribers
FOR SELECT
TO anon, authenticated
USING (true);