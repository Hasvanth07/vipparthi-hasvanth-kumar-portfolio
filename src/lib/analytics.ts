import { supabase } from "@/integrations/supabase/client";

export type PortfolioEvent =
  | "page_view"
  | "about_view"
  | "skills_view"
  | "experience_view"
  | "education_view"
  | "project_view"
  | "resume_download"
  | "github_click"
  | "linkedin_click"
  | "live_demo_click"
  | "contact_form_start"
  | "contact_submit";

const SESSION_KEY = "portfolio_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

const sentOnce = new Set<string>();

/** Fire-and-forget privacy-conscious event logging. */
export async function trackEvent(
  eventName: PortfolioEvent,
  options: { projectSlug?: string; once?: boolean } = {},
) {
  if (typeof window === "undefined") return;

  const dedupeKey = `${eventName}:${options.projectSlug ?? ""}`;
  if (options.once) {
    if (sentOnce.has(dedupeKey)) return;
    sentOnce.add(dedupeKey);
  }

  try {
    await supabase.from("portfolio_events").insert({
      event_name: eventName,
      page: window.location.pathname,
      project_slug: options.projectSlug ?? null,
      session_id: getSessionId(),
      referrer: document.referrer ? new URL(document.referrer).hostname : null,
      device_type: getDeviceType(),
    });
  } catch {
    // analytics must never break the page
  }
}
