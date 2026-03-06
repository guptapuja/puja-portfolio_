import { useMemo, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import type { Project } from "./types/projects";

// type Project = {
//   title: string;
//   description: string;
//   stack: string[];
//   githubUrl: string;
//   liveUrl: string;
//   images: string[];
//   accent?: string;
//   highlights: string[];
// };

export default function App() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const projects: Project[] = useMemo(
    () => [
      {
        title: "Veloura Elite — Luxury Travel Discovery",
        description:
          "High-performance travel booking platform with Stripe integration and runtime MFE capabilities. Built for scale and visual fidelity.",
        stack: ["React", "TypeScript", "WebSockets", "Stripe API", "NodeJS", "CloudFlare", "Render"],
        githubUrl: "https://github.com/PujaGuptaTR/veloura-elite",
        liveUrl: "https://veloura-ck9.pages.dev/",
        accent: "from-amber-400/20 via-yellow-300/10 to-transparent",
        images: [
          "/projects/velora-1.png",
          "/projects/velora-2.png",
          "/projects/velora-3.png",
        ],
        highlights: [
          "Secure Stripe checkout with async webhook handling",
          "Independent deployment via Module Federation",
          "Optimized Core Web Vitals for global asset delivery",
        ],
      },
      {
        title: "EchoPulse — Enterprise Shell Infrastructure",
        description:
          "A high-performance 'Echo' shell designed as the central orchestrator for a distributed MFE ecosystem.",
        stack: ["React", "TypeScript", "Node.js", "NextJS", "Framer Motion", "CloudFlare", "Render"],
        githubUrl: "https://github.com/guptapuja/echopulse",
        images: ["/projects/echopulse.png"],
        accent: "from-blue-500/20 via-cyan-400/10 to-transparent",
        liveUrl: "https://echopulse-ew8.pages.dev/",
        highlights: [
          "Architected runtime orchestration for multiple remote verticals",
          "Implemented shared dependency singleton patterns to reduce bundle size",
          "Centralized authentication and global state management across remotes",
        ],
      },
      {
        title: "Scalable Real-time Chat System",
        description:
          "High-concurrency messaging platform featuring presence indicators, typing status, and message persistence",
        stack: ["React", "WebSockets", "Socket.io", "Webpack 5", "Microfrontends", "Module Federation", "Redis", "NextJS", "Tailwind CSS v4", "Node.js", "CloudFlare", "Render"],
        githubUrl: "https://github.com/guptapuja/realtime-chat",
        images: ["/projects/chat.png"],
        accent: "from-emerald-400/20 via-teal-300/10 to-transparent",
        liveUrl: "https://lumina-dashboard-shell.pages.dev/",
        highlights: [
          "Engineered WebSocket gateway for sub-100ms message delivery",
          "Implemented Redis-backed message queuing for high availability",
          "Designed robust reconnection logic and message delivery receipts",
        ],
      },
    ],
    []
  );
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    setStatus("sending");
    try {
      const base = import.meta.env.VITE_API_BASE_URL; // e.g. https://your-backend.onrender.com
      const resp = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Request failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <TopBar />

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <Hero />

        <Section title="Snapshot">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Stat label="Experience" value="11+ years building scalable web applications" />
            <Stat label="Frontend Core" value="React, TypeScript, Redux, Vue, Next.js" />
            <Stat label="Architecture" value="Micro-frontends, design systems" />
            <Stat label="Realtime + Cloud" value="WebSockets, Kafka, AWS, Azure, Cloudflare, CI/CD, Render, Observability" />
          </div>
        </Section>

        <Section title="Skills">
          <div className="grid gap-3 md:grid-cols-3">
            <SkillCard title="Frontend" items={["React", "TypeScript", "Microfrontends", "Redux Toolkit", "Vite/webpack", "Tailwind", "Cypress"]} />
            <SkillCard title="Frontend Architecture" items={["Architecture", "Performance", "Observability", "Scalability", "Design Systems"]} />
            <SkillCard title="Realtime + Cloud" items={["WebSockets", "Kafka (concepts)", "Azure", "AWS (S3/CloudFront)", "CloudFlare", "CI/CD", "Monitoring"]} />
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

        <Section title="Contact Details ">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="text-lg font-semibold">Let’s build something great.</h3>
              <p className="mt-2 text-sm text-zinc-300">
                For frontend real-time web apps, architecture, performance, scalability, and leadership opportunities.
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <a className="block underline text-zinc-200" href="mailto:puja.ec676@gmail.com">
                  puja.ec676@gmail.com
                </a>
                <a className="block underline text-zinc-200" href="https://github.com/guptapuja" target="_blank" rel="noreferrer">
                  GitHub: guptapuja
                </a>
                <a className="block underline text-zinc-200" href="https://www.linkedin.com/in/puja-gupta-b6715a56/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>

              <div className="mt-5">
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900"
                  href="/resume.pdf"
                  download
                >
                  Download Resume
                </a>
                <a
                  className="ml-3 inline-flex items-center justify-center rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold"
                  href="#projects"
                >
                  View Projects
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="grid gap-3">
                <input name="name" required placeholder="Your name" className="rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2" />
                <input name="email" required type="email" placeholder="Your email" className="rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2" />
                <textarea name="message" required placeholder="Message" rows={5} className="rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2" />
                <button
                  disabled={status === "sending"}
                  className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>

                {status === "sent" && <p className="text-sm text-emerald-300">Sent! I’ll get back to you soon.</p>}
                {status === "error" && <p className="text-sm text-red-300">Something failed. Try again.</p>}
              </div>
            </form>
          </div>
        </Section>
      </main>

      <footer className="border-t border-zinc-900 py-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Puja Gupta • Built with React + Node
      </footer>
    </div>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-20 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {/* <div className="h-9 w-9 overflow-hidden rounded-full border border-zinc-800">
            <img src="/puja.png" alt="Puja Gupta" className="h-full w-full object-cover" />
          </div> */}


          {/* <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
            <img
              src="/puja.jpg"
              alt="Puja Gupta"
              className="h-full w-full object-cover"
            />
          </div> */}
          <div className="leading-tight">
            <div className="text-sm font-semibold">Puja Gupta</div>
            <div className="text-xs text-zinc-400">Frontend Lead • React • Architecture</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <a href="#projects" className="text-zinc-300 hover:text-white">Projects</a>
          <a href="/resume.pdf" download className="text-zinc-300 hover:text-white">Resume</a>
          <a href="https://github.com/guptapuja" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
function Hero() {
  return (
    <section className="pt-16">
      <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-8 md:p-10">

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-cyan-400/5" />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">

          <div>
            <p className="text-sm text-zinc-400">
              Frontend Lead Engineer • React • Vue • NextJS • Distributed & Real-Time Systems
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-2xl">
              Building scalable frontend platforms
              <br />
              for real-time products
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400">
              React • TypeScript • Micro-frontends • WebSockets • Architecure • Performance Engineering
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-900"
              >
                View Projects
              </a>

              <a
                href="/resume.pdf"
                download
                className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-semibold"
              >
                Download Resume
              </a>

              <a
                href="#contact-details"
                className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-semibold"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* RIGHT SIDE PHOTO */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">

              {/* glow */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-indigo-500/20 via-cyan-400/10 to-purple-500/20 blur-3xl" />

              {/* photo */}
              <div className="relative h-60 w-60 overflow-hidden rounded-full border border-zinc-700 shadow-2xl md:h-72 md:w-72">
                <img
                  src="/puja.png"
                  alt="Puja Gupta"
                  className="h-full w-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section id={id === "featured-projects" ? "projects" : id} className="mt-12">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <span key={i} className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-200">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}



function Timeline() {
  return (
    <div className="space-y-4">
      <Item
        title="Thomson Reuters — Lead Frontend Engineer"
        meta="Micro-frontends • WebSockets • Kafka • Redux Toolkit & Context API • FFmpeg Monitoring • Snyk • Cypress • AWS (S3/EC2) • Figma • Jenkins CI/CD pipelines"
        bullets={[
          "Architected a live monitoring tool utilizing FFmpeg to verify stream integrity and bitrate health across global feeds.",
          "Engineered a Micro-frontend (MFE) platform using Webpack 5 Module Federation to enable independent team deployments.",
          "Mentored junior engineers and led code reviews to improve system scalability and maintainability.",
          "Resolved complex build pipeline issues in Jenkins and AWS ECR to streamline CI/CD cycles."
        ]}
      />
      <Item
        title="Maersk — Senior Frontend Engineer"
        meta="Micro-frontends • Vue/React • enterprise dashboards"
        bullets={[
          "Developed micro-frontend dashboards and reusable UI components.",
          "Improved developer velocity with shared patterns and components",
          "Contributed to open source through Storybook and design system improvements.",

        ]}
      />
      <Item
        title="Zyient — SDE III"
        meta="ReactJS • AWS • TailwindCSS"
        bullets={["Built data discovery platform UI with reusable components and clean UI architecture.",
          "Deployed the platform through AWS, leveraging cloud-native practices for high availability and performance."
        ]}
      />
      <Item
        title="Maersk — Senior  Engineer"
        meta=""
        bullets={[
          "Worked on the Destinations product, Maersk Flow, Maersk Spot—a key offering in the Maersk ecosystem, focusing on enabling seamless global logistics.",
          "Built logistics dashboards using Vue.js and ReactJS within a micro-frontend architecture, supporting scalable development and seamless integration.",
          "Delivered reusable components and dynamic grid interfaces that enhanced data visibility and user interactions across complex logistics workflows.",
          "Acted as both an individual contributor and a team coordinator, driving delivery excellence and ensuring alignment with project goals.",
          "Contributed to solutions for popular Maersk products such as Maersk Flow (supply chain management) and Maersk Spot (real-time ocean freight booking), enhancing customer experience and operational efficiency.",
          "Actively contributed to open-source projects, building components such as typeahead, virtual scroll, and more, fostering innovation and knowledge sharing within the engineering community."
        ]}
      />
      <Item
        title="Eli Lilly — Senior Staff Engineer"
        meta="VueJS • AWS • Healthcare Reactjs"
        bullets={[
          "Designed and implemented a secure and intuitive VueJS application hosted on AWS, tailored for Eli Lilly's leading products, including Trulicity (for diabetes).",
          "Integrated TLAC workflows to align with regulatory and internal standards, ensuring robust data handling and compliance.",
          "Built dynamic validation mechanisms to streamline healthcare providers' sample requests while ensuring accuracy and reliability.",
          "Delivered scalable and reusable UI components, enabling seamless user interactions and reducing maintenance overhead.",
          "Collaborated with cross-functional teams using Figma for UI design and conducted iterative feedback cycles to refine the app's usability.",
          "Focused on data security and patient confidentiality, adhering to healthcare compliance standards.",
          "Enhanced the platform's performance and reliability through AWS best practices, ensuring high availability for healthcare users."
        ]}
      />
      <Item
        title="Harman Connected Services — Senior Product Development Engineer"
        meta="Angular • RXJS • ChartJS"
        bullets={[
          "Built Angular dashboards with RXJS and ChartJS.",
          "Delivered simulation tools with responsive UIs.",
          "Emphasized modular architecture and test coverage."
        ]}
      />
      <Item
        title="VMware-Member of Technical Staff"
        meta="Angular • Kendo UI • Astro framework"
        bullets={[
          "Worked on VMware Airwatch",
          "Developed Angular components within the Astro framework, leveraging modern best practices to ensure maintainability and performance.",
          "Integrated Kendo UI widgets for rich, interactive user experiences, focusing on streamlined data visualization and interaction."
        ]}
      />
    </div>
  );
}

function Item({ title, meta, bullets }: { title: string; meta: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-zinc-400">{meta}</div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-200">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}