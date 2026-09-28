import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { loadAdminData, type ContactRow, type EventRow } from "@/lib/admin-data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Portfolio Analytics | Vipparthi Hasvanth Kumar" },
      { name: "description", content: "Private portfolio analytics dashboard." },
      { property: "og:title", content: "Portfolio Analytics" },
      { property: "og:description", content: "Private portfolio analytics dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate({ from: "/admin" });
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "denied" }
    | { status: "error"; message: string }
    | { status: "ready"; events: EventRow[]; contacts: ContactRow[] }
  >({ status: "loading" });

  useEffect(() => {
    void loadAdminData()
      .then((data) => {
        if (!data.isAdmin) setState({ status: "denied" });
        else setState({ status: "ready", events: data.events, contacts: data.contacts });
      })
      .catch((error: unknown) => {
        setState({ status: "error", message: error instanceof Error ? error.message : "Dashboard data could not be loaded." });
      });
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/auth" });
  }

  if (state.status === "loading") {
    return <main className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">Loading analytics…</main>;
  }

  if (state.status === "denied") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
        <div className="panel max-w-md p-8 text-center">
          <h1 className="text-xl font-semibold">Access denied</h1>
          <p className="mt-3 text-sm text-muted-foreground">This account is not the portfolio administrator.</p>
          <button type="button" onClick={signOut} className="btn-base btn-primary mt-6">Sign Out</button>
        </div>
      </main>
    );
  }

  if (state.status === "error") {
    return <main className="flex min-h-screen items-center justify-center bg-background px-5 text-sm text-destructive">{state.message}</main>;
  }

  return <AdminDashboard events={state.events} contacts={state.contacts} onSignOut={() => void signOut()} />;
}