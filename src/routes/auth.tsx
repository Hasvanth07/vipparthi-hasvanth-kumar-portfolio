import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LockKeyhole, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const ADMIN_EMAIL = "chintuhaswanth1421@gmail.com";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Sign In | Vipparthi Hasvanth Kumar" },
      { name: "description", content: "Private portfolio administration sign in." },
      { property: "og:title", content: "Portfolio Admin Sign In" },
      { property: "og:description", content: "Private portfolio administration sign in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "setup">("signin");
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "confirmation">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (email.toLowerCase().trim() !== ADMIN_EMAIL) {
      setError("This sign-in is reserved for the portfolio owner.");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setStatus("working");
    if (mode === "setup") {
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      if (authError) {
        setError(authError.message);
        setStatus("idle");
        return;
      }
      if (!data.session) {
        setStatus("confirmation");
        return;
      }
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) {
        setError("Sign-in failed. Check your password or create the owner account first.");
        setStatus("idle");
        return;
      }
    }

    await navigate({ to: "/admin" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground">
      <div className="panel w-full max-w-md p-7 sm:p-9">
        <a href="/" className="font-mono text-sm tracking-[0.18em]">
          VHK<span className="text-primary-glow">.</span>
        </a>
        <p className="eyebrow mt-8">Private area</p>
        <h1 className="mt-3 text-2xl font-semibold">
          {mode === "signin" ? "Portfolio admin sign in" : "Create owner account"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Access is restricted to the portfolio owner's verified email.
        </p>

        {status === "confirmation" ? (
          <div className="mt-7 rounded-lg border border-border-strong bg-surface p-5">
            <Mail className="size-6 text-primary-glow" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold">Check your email</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Open the confirmation link sent to {ADMIN_EMAIL}, then return here to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                className="field"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                className="field"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" variant="premium" size="lg" disabled={status === "working"} className="w-full">
              <LockKeyhole className="size-4" aria-hidden="true" />
              {status === "working"
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign In"
                  : "Create Owner Account"}
            </Button>
          </form>
        )}

        {status !== "confirmation" ? (
          <button
            type="button"
            onClick={() => {
              setMode((current) => (current === "signin" ? "setup" : "signin"));
              setError("");
            }}
            className="mt-5 w-full text-center text-sm text-muted-foreground underline decoration-border-strong underline-offset-4 hover:text-foreground"
          >
            {mode === "signin" ? "First visit? Create the owner account" : "Already set up? Sign in"}
          </button>
        ) : null}
      </div>
    </main>
  );
}