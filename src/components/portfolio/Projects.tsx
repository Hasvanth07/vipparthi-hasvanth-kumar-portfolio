import { useEffect, useState } from "react";
import { ExternalLink, Github, ImageOff, Maximize2, X } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { trackEvent } from "@/lib/analytics";
import { SectionHeading } from "./shared";

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span key={tech} className="chip">
          {tech}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const upcoming = project.status === "UPCOMING";

  return (
    <article className="panel panel-hover flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] border-b border-border bg-surface">
        {project.images[0] ? (
          <img
            src={project.images[0]}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="size-full object-cover object-top"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="size-6" aria-hidden="true" />
            <span className="font-mono text-xs">No screenshot yet</span>
          </div>
        )}
        {project.featured ? (
          <span className="absolute left-3 top-3 chip border-border-strong">Featured</span>
        ) : null}
        {upcoming ? (
          <span className="absolute right-3 top-3 chip border-border-strong text-primary-glow">
            Upcoming Project
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <TechChips items={project.technologies} />

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <button type="button" onClick={onOpen} className="btn-base btn-primary">
            View Details
          </button>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => void trackEvent("github_click", { projectSlug: project.slug })}
              className="btn-base btn-outline"
            >
              <Github className="size-4" aria-hidden="true" />
              GitHub
            </a>
          ) : null}
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => void trackEvent("live_demo_click", { projectSlug: project.slug })}
              className="btn-base btn-outline"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (lightbox) setLightbox(null);
      else onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[60] overflow-y-auto bg-background/85 px-4 py-10 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="panel mx-auto w-full max-w-3xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            {project.status === "UPCOMING" ? (
              <p className="eyebrow">Upcoming project</p>
            ) : (
              <p className="eyebrow">Project</p>
            )}
            <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
          </div>
          <button
            type="button"
            aria-label="Close details"
            onClick={onClose}
            className="btn-base btn-ghost px-2.5"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {project.images.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setLightbox(image)}
                className="group relative overflow-hidden rounded-lg border border-border"
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
                <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-md border border-border-strong bg-background/80">
                  <Maximize2 className="size-3.5" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-7">
          <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-primary-glow">
            Technologies
          </h4>
          <div className="mt-3">
            <TechChips items={project.technologies} />
          </div>
        </div>

        <div className="mt-7">
          <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-primary-glow">
            {project.status === "UPCOMING" ? "Planned scope" : "Implementation details"}
          </h4>
          <ul className="mt-3 space-y-2">
            {project.details.map((detail) => (
              <li key={detail} className="flex gap-3 text-sm text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-glow"
                />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {project.github || project.liveDemo ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => void trackEvent("github_click", { projectSlug: project.slug })}
                className="btn-base btn-outline"
              >
                <Github className="size-4" aria-hidden="true" />
                GitHub
              </a>
            ) : null}
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => void trackEvent("live_demo_click", { projectSlug: project.slug })}
                className="btn-base btn-outline"
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Live Demo
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt={`${project.title} enlarged screenshot`}
            className="max-h-full max-w-full rounded-lg border border-border-strong object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Data, applications and analytics work"
        description="Built through coursework, internships and self-directed learning. One project is still planned and clearly marked."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={() => {
              setActive(project);
              void trackEvent("project_view", { projectSlug: project.slug });
            }}
          />
        ))}
      </div>

      {active ? <ProjectDialog project={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
