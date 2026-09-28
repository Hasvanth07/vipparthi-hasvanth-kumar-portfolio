-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Analytics events
CREATE TABLE public.portfolio_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  page text,
  project_slug text,
  session_id text,
  referrer text,
  device_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_portfolio_events_created_at ON public.portfolio_events (created_at DESC);
CREATE INDEX idx_portfolio_events_event_name ON public.portfolio_events (event_name);
CREATE INDEX idx_portfolio_events_session ON public.portfolio_events (session_id);
CREATE INDEX idx_portfolio_events_project ON public.portfolio_events (project_slug);

GRANT INSERT ON public.portfolio_events TO anon;
GRANT INSERT, SELECT ON public.portfolio_events TO authenticated;
GRANT ALL ON public.portfolio_events TO service_role;
ALTER TABLE public.portfolio_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log an event"
ON public.portfolio_events FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read events"
ON public.portfolio_events FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Contact submissions
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);

GRANT INSERT ON public.contact_submissions TO anon;
GRANT INSERT, SELECT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit the contact form"
ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 120
  AND length(trim(email)) BETWEEN 3 AND 200
  AND length(trim(message)) BETWEEN 1 AND 4000
);

CREATE POLICY "Admins can read submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Grant admin role automatically to the owner's email on signup
CREATE OR REPLACE FUNCTION public.grant_owner_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) = 'chintuhaswanth1421@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_grant_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_owner_admin();