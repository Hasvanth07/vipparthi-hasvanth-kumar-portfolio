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
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {profile.tagline}
            </p>
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

        <div className="mt-10 overflow-hidden border-y border-border/60 py-3">
          <div className="flex w-max animate-footer-marquee motion-reduce:animate-none">
            <div className="shrink-0 px-8 font-mono text-xs text-muted-foreground">
              Thanks for visiting my portfolio! 🚀 • Building, learning, and growing
              toward becoming a Data Engineer.
            </div>
            <div
              className="shrink-0 px-8 font-mono text-xs text-muted-foreground"
              aria-hidden="true"
            >
              Thanks for visiting my portfolio! 🚀 • Building, learning, and growing
              toward becoming a Data Engineer.
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
          © 2026 Vipparthi Hasvanth Kumar. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes footer-marquee {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-footer-marquee {
          animation: footer-marquee 18s linear infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-footer-marquee {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </footer>
  );
}