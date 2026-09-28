import { profile, aboutFocusAreas } from "@/lib/portfolio-data";
import { ResumeButton, SectionHeading, useSectionView } from "./shared";

const strengths = [
  "AI & Data Science graduate (B.Tech, 2026)",
  "Python and SQL for data processing and transformation",
  "Cleaning, transforming and joining relational data",
  "API-based applications and analytics work",
  "Hands-on experience through internships and projects",
  "Currently focusing on Data Engineering",
];

export function About() {
  const ref = useSectionView("about_view");

  return (
    <section id="about" ref={ref} className="section-shell">
      <SectionHeading
        eyebrow="About me"
        title="From AI & Data Science into Data Engineering"
        description={profile.summary}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6 sm:p-8">
          <h3 className="text-lg font-semibold">What I bring today</h3>
          <ul className="mt-5 space-y-3">
            {strengths.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-glow"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel p-6 sm:p-8">
          <h3 className="text-lg font-semibold">Where I'm growing</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            I'm building depth in the areas that reliable data platforms are made of, through
            self-directed study and project work.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {aboutFocusAreas.map((area) => (
              <span key={area} className="chip">
                {area}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <ResumeButton variant="primary" className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
