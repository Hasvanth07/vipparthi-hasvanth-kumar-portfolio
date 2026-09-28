import { supabase } from "@/integrations/supabase/client";

export type EventRow = {
  id: string;
  event_name: string;
  page: string | null;
  project_slug: string | null;
  session_id: string | null;
  referrer: string | null;
  device_type: string | null;
  created_at: string;
};

export type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export async function loadAdminData() {
  const [{ data: roles, error: roleError }, { data: events, error: eventError }, { data: contacts, error: contactError }] =
    await Promise.all([
      supabase.from("user_roles").select("role"),
      supabase.from("portfolio_events").select("*").order("created_at", { ascending: false }).limit(1000),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(100),
    ]);

  if (roleError) throw roleError;
  const isAdmin = roles?.some((row) => row.role === "admin") ?? false;
  if (!isAdmin) return { isAdmin: false, events: [] as EventRow[], contacts: [] as ContactRow[] };
  if (eventError) throw eventError;
  if (contactError) throw contactError;

  return {
    isAdmin: true,
    events: (events ?? []) as EventRow[],
    contacts: (contacts ?? []) as ContactRow[],
  };
}