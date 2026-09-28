import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vipparthi Hasvanth Kumar | Aspiring Data Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Vipparthi Hasvanth Kumar, an AI & Data Science graduate focused on Python, SQL, ETL/ELT, data pipelines, PostgreSQL, cloud technologies, and Data Engineering.",
      },
      { property: "og:title", content: "Vipparthi Hasvanth Kumar | Aspiring Data Engineer" },
      {
        property: "og:description",
        content:
          "AI & Data Science graduate focused on Python, SQL, ETL/ELT, data pipelines, PostgreSQL and cloud technologies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    void trackEvent("page_view", { once: true });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
