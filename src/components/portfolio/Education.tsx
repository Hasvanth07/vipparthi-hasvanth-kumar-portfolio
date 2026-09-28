import { GraduationCap } from "lucide-react";
import { education } from "@/lib/portfolio-data";
import { SectionHeading, useSectionView } from "./shared";

export function Education() {
  const ref = useSectionView("education_view");

  return (
    <section id="education" ref={ref} className="section-shell">
      <SectionHeading eyebrow="Education" title="Academic background" />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {education.map((item) => (
          <article key={item.school} className="panel panel-hover p-6">
            <span className="flex size-9 items-center justify-center rounded-md border border-border-strong bg-surface-2">
              <GraduationCap className="size-4 text-primary-glow" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-semibold leading-snug">{item.school}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.degree}</p>
            <p className="mt-3 font-mono text-xs text-primary-glow">
              {item.year}
              {item.extra ? ` · ${item.extra}` : ""}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
