import ProjectCard from "./components/ProjectCard";
import ContactSection from "./components/ContactSection";
import Hero from "./components/Hero";
import Section from "./components/Section";
import SkillCard from "./components/SkillCard";
import SnapshotSection from "./components/SnapshotSection";
import Timeline from "./components/Timeline";
import TopBar from "./components/TopBar";
import { projects } from "./data/projects";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <TopBar />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <Hero />

        <SnapshotSection />

        <Section title="Skills">
          <div className="grid gap-3 md:grid-cols-3">
            <SkillCard
              title="Frontend"
              items={["React", "TypeScript", "Microfrontends", "Redux Toolkit", "Vite/webpack", "Tailwind"]}
            />
            <SkillCard
              title="Frontend Architecture"
              items={["Architecture", "Performance", "Observability", "Scalability", "Design Systems"]}
            />
            <SkillCard
              title="Realtime + Cloud"
              items={["WebSockets", "Kafka", "AWS (S3/CloudFront)", "CloudFlare", "CI/CD", "Monitoring"]}
            />

          <SkillCard
            title="Testing Strategies"
            items={["Jest", "React Testing Library", "Cypress", "Jasmine"]}
          />
          <SkillCard
            title="Tooling"
            items={[
              "Git",
              "Docker",
              "Webpack",
              "Vite",
              "ESLint",
              "Prettier"
            ]}
          />
                    </div>
        </Section>

        <Section title="Experience">
          <Timeline />
        </Section>

        <Section title="Featured Projects">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </Section>

        <ContactSection />
      </main>

      <footer className="border-t border-zinc-900 py-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Puja Gupta • Built with React + Node
      </footer>
    </div>
  );
}