import { useEffect, useRef, type ReactNode } from "react";
import { Download } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { trackEvent, type PortfolioEvent } from "@/lib/analytics";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Fires an analytics event once when the section scrolls into view. */
export function useSectionView(event: PortfolioEvent) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void trackEvent(event, { once: true });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [event]);

  return ref;
}

export function ResumeButton({
  variant = "primary",
  children = "Download Resume",
  className = "",
}: {
  variant?: "primary" | "outline" | "ghost";
  children?: ReactNode;
  className?: string;
}) {
  const variantClass =
    variant === "primary" ? "btn-primary" : variant === "outline" ? "btn-outline" : "btn-ghost";

  return (
    <a
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      download="Vipparthi_Hasvanth_Kumar_Data_Engineer.pdf"
      onClick={() => void trackEvent("resume_download")}
      className={`btn-base ${variantClass} ${className}`}
    >
      <Download className="size-4" aria-hidden="true" />
      {children}
    </a>
  );
}
