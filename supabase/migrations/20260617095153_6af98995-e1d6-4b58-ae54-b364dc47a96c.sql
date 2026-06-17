DROP POLICY IF EXISTS "Allow public inserts" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public select own" ON public.newsletter_subscribers;

CREATE OR REPLACE FUNCTION public.subscribe_newsletter(_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_email text;
BEGIN
  normalized_email := lower(trim(_email));
  
  IF normalized_email IS NULL OR normalized_email = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Email is required');
  END IF;
  
  IF NOT normalized_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid email format');
  END IF;

  INSERT INTO public.newsletter_subscribers (email)
  VALUES (normalized_email)
  ON CONFLICT (email) DO NOTHING;

  IF FOUND THEN
    RETURN jsonb_build_object('success', true, 'message', 'Subscribed successfully');
  ELSE
    RETURN jsonb_build_object('success', true, 'message', 'Already subscribed');
  END IF;
END;
$$;

-- Revoke direct table access from anon/authenticated since we use the function
REVOKE SELECT, INSERT ON public.newsletter_subscribers FROM anon;
REVOKE SELECT, INSERT ON public.newsletter_subscribers FROM authenticated;

-- Keep service_role access for admin operations
GRANT ALL ON public.newsletter_subscribers TO service_role;

-- Allow anyone to call the function
GRANT EXECUTE ON FUNCTION public.subscribe_newsletter(text) TO anon;
GRANT EXECUTE ON FUNCTION public.subscribe_newsletter(text) TO authenticated;