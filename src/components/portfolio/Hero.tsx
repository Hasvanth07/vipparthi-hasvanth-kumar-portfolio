import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { trackEvent } from "@/lib/analytics";
import { ResumeButton } from "./shared";
import { PipelineFlow } from "./PipelineFlow";

export function Hero() {
  return (
    <section id="home" className="relative pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl px-5 pb-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">{profile.location}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-4 font-display text-lg tracking-[0.12em] text-primary-glow sm:text-xl">
              {profile.title}
            </p>
            <p className="mt-3 font-mono text-sm text-muted-foreground">{profile.tagline}</p>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-base btn-primary w-full sm:w-auto">
                View Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <ResumeButton variant="outline" className="w-full sm:w-auto" />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => void trackEvent("github_click")}
                className="btn-base btn-outline w-full sm:w-auto"
              >
                <Github className="size-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => void trackEvent("linkedin_click")}
                className="btn-base btn-outline w-full sm:w-auto"
              >
                <Linkedin className="size-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a href="#contact" className="btn-base btn-ghost w-full sm:w-auto">
                <Mail className="size-4" aria-hidden="true" />
                Contact Me
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="panel relative overflow-hidden p-3 shadow-[var(--shadow-glow)]">
              <div className="overflow-hidden rounded-[calc(var(--radius)+2px)] border border-border-strong">
                <img
                  src={profile.photoUrl}
                  alt="Portrait of Vipparthi Hasvanth Kumar"
                  width={420}
                  height={520}
                  className="h-[22rem] w-[17rem] object-cover sm:h-[26rem] sm:w-[20rem]"
                />
              </div>
            </div>
          </div>
        </div>

        <PipelineFlow />
      </div>
    </section>
  );
}
