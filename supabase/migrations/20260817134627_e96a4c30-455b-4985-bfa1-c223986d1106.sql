CREATE TABLE public.site_visits (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  visits bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.site_visits (id, visits) VALUES (true, 0);

GRANT SELECT ON public.site_visits TO anon, authenticated;
GRANT ALL ON public.site_visits TO service_role;

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read the visit counter"
ON public.site_visits FOR SELECT TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.record_site_visit(p_increment boolean DEFAULT true)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count bigint;
BEGIN
  IF p_increment THEN
    UPDATE public.site_visits
      SET visits = visits + 1, updated_at = now()
      WHERE id
      RETURNING visits INTO v_count;
  ELSE
    SELECT visits INTO v_count FROM public.site_visits WHERE id;
  END IF;
  RETURN COALESCE(v_count, 0);
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_site_visit(boolean) TO anon, authenticated, service_role;