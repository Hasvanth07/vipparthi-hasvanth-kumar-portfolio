import { ExternalLink } from "lucide-react";
import { experience } from "@/lib/portfolio-data";
import { SectionHeading, useSectionView } from "./shared";

export function Experience() {
  const ref = useSectionView("experience_view");

  return (
    <section id="experience" ref={ref} className="section-shell">
      <SectionHeading
        eyebrow="Work experience"
        title="Internships"
        description="Hands-on data work across analytics, reporting and application development."
      />

      <ol className="mt-10 space-y-5 border-l border-border pl-5 sm:pl-8">
        {experience.map((job) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.625rem] top-7 size-2.5 rounded-full border border-border-strong bg-primary sm:-left-[2.375rem]"
            />
            <article className="panel panel-hover p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg tracking-[0.06em]">{job.company}</h3>
                <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
              </div>
              <p className="mt-1 text-sm text-primary-glow">
                {job.role} · {job.mode}
              </p>
              <ul className="mt-4 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-border-strong"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {job.documents ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {job.documents.map((document) => (
                    <a
                      key={document.image}
                      href={document.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group overflow-hidden rounded-lg border border-border bg-surface-2"
                    >
                      <img
                        src={document.image}
                        alt={`${job.company} ${document.label}`}
                        loading="lazy"
                        className="aspect-[1.4/1] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <span className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-xs font-medium text-primary-glow">
                        {document.label}
                        <ExternalLink className="size-3" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
