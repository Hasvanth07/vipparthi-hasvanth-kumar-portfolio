import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg tracking-[0.06em]">{profile.name}</p>
            <p className="mt-2 text-sm text-primary-glow">{profile.title}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{profile.tagline}</p>
          </div>

          <div className="flex gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onClick={() => void trackEvent("github_click")}
              className="btn-base btn-outline px-3"
            >
              <Github className="size-4" aria-hidden="true" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => void trackEvent("linkedin_click")}
              className="btn-base btn-outline px-3"
            >
              <Linkedin className="size-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="btn-base btn-outline px-3"
            >
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-10 font-mono text-xs text-muted-foreground">
          © 2026 Vipparthi Hasvanth Kumar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
