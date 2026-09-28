import { useState } from "react";
import { CheckCircle2, Github, Linkedin, Mail, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { profile } from "@/lib/portfolio-data";
import { trackEvent } from "@/lib/analytics";
import { ResumeButton, SectionHeading } from "./shared";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function validate(): boolean {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    if (error) {
      setStatus("error");
      return;
    }

    void trackEvent("contact_submit");
    setForm({ name: "", email: "", message: "" });
    setStatus("sent");
  }

  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk about data engineering roles"
        description="Open to entry-level Data Engineer opportunities. The quickest way to reach me is email or LinkedIn."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel flex flex-col gap-4 p-6 sm:p-8">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-border-strong"
          >
            <Mail className="size-4 shrink-0 text-primary-glow" aria-hidden="true" />
            <span className="break-all">{profile.email}</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => void trackEvent("linkedin_click")}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-border-strong"
          >
            <Linkedin className="size-4 shrink-0 text-primary-glow" aria-hidden="true" />
            <span className="break-all">{profile.linkedinLabel}</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => void trackEvent("github_click")}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-border-strong"
          >
            <Github className="size-4 shrink-0 text-primary-glow" aria-hidden="true" />
            <span className="break-all">{profile.githubLabel}</span>
          </a>
          <ResumeButton variant="primary" className="mt-2 w-full" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="panel p-6 sm:p-8">
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-3">
              <CheckCircle2 className="size-8 text-primary-glow" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Message received</h3>
              <p className="text-sm text-muted-foreground">
                Thank you for reaching out. Your message has been recorded and I'll reply to you by
                email as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="btn-base btn-outline mt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="field"
                  placeholder="Your name"
                  value={form.name}
                  onFocus={() => void trackEvent("contact_form_start", { once: true })}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name ? (
                  <p className="mt-2 text-xs text-destructive">{errors.name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="field"
                  placeholder="you@company.com"
                  value={form.email}
                  onFocus={() => void trackEvent("contact_form_start", { once: true })}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email ? (
                  <p className="mt-2 text-xs text-destructive">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="field resize-y"
                  placeholder="Tell me about the role or project"
                  value={form.message}
                  onFocus={() => void trackEvent("contact_form_start", { once: true })}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message ? (
                  <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                ) : null}
              </div>

              {status === "error" ? (
                <p className="text-sm text-destructive">
                  Something went wrong sending your message. Please email me directly at{" "}
                  {profile.email}.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-base btn-primary w-full"
              >
                <Send className="size-4" aria-hidden="true" />
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              <p className="text-xs text-muted-foreground">
                This site uses privacy-conscious analytics to understand portfolio usage and improve
                the experience.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
