import { BadgeCheck, ExternalLink, Trophy } from "lucide-react";
import { achievements, certifications } from "@/lib/portfolio-data";
import { SectionHeading } from "./shared";

export function Certifications() {
  return (
    <section id="certifications" className="section-shell">
      <SectionHeading eyebrow="Certifications" title="Courses and job simulations" />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <article key={`${cert.issuer}-${cert.name}`} className="panel panel-hover overflow-hidden">
            {("images" in cert ? cert.images : "image" in cert && cert.image ? [cert.image] : []).map(
              (image, index) => (
                <a
                  key={image}
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-border"
                >
                  <img
                    src={image}
                    alt={`${cert.name} certificate${index > 0 ? ` ${index + 1}` : ""}`}
                    loading="lazy"
                    className="aspect-[1.4/1] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </a>
              ),
            )}
            <div className="flex items-start gap-3 p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border-strong bg-surface-2">
                <BadgeCheck className="size-4 text-primary-glow" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-snug">{cert.name}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {cert.issuer}
                  {cert.date ? ` · ${cert.date}` : ""}
                </p>
                {("images" in cert ? cert.images[0] : "image" in cert ? cert.image : undefined) ? (
                  <a href={"images" in cert ? cert.images[0] : cert.image} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary-glow">
                    View certificate <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="panel mt-12 p-6 sm:p-8">
        <p className="eyebrow">Achievements</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {achievements.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
              <Trophy className="size-4 shrink-0 text-primary-glow" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
