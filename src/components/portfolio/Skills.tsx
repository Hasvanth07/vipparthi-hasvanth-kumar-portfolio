import { skillGroups } from "@/lib/portfolio-data";
import { SectionHeading, useSectionView } from "./shared";

export function Skills() {
  const ref = useSectionView("skills_view");

  return (
    <section id="skills" ref={ref} className="section-shell">
      <SectionHeading
        eyebrow="Technical skills"
        title="Tools and technologies I work with"
        description="Grouped the way I use them — from writing queries and transformations to reporting on the result."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="panel panel-hover p-5">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-primary-glow">
              {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
