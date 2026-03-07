import type { Project } from "../types/projects";

export const projects: Project[] = [
  {
    title: "Veloura Elite — Luxury Travel Discovery",
    description:
      "High-performance travel booking platform with Stripe integration and runtime MFE capabilities. Built for scale and visual fidelity.",
    stack: ["React", "TypeScript", "Vite", "WebSockets", "Stripe API", "NodeJS", "CloudFlare", "Render"],
    // githubUrl: "https://github.com/guptapuja/veloura",
    liveUrl: "https://veloura-ck9.pages.dev/",
    accent: "from-amber-400/20 via-yellow-300/10 to-transparent",
    images: ["/projects/velora-1.png", "/projects/velora-2.png"],
    highlights: [
      "Secure Stripe checkout with async webhook handling",
      "Independent deployment via Module Federation",
      "Optimized Core Web Vitals for global asset delivery",
    ],
  },
  {
    title: "EchoPulse — Enterprise Shell Infrastructure",
    description:
       "A distributed frontend shell that dynamically orchestrates remote micro-frontends using module federation, real-time communication, and fault-tolerant UI patterns.",
    stack: ["React", "TypeScript", "Node.js", "NextJS", "Framer Motion", "CloudFlare", "Render"],
    // githubUrl: "https://github.com/guptapuja/echopulse",
    liveUrl: "https://echopulse-ew8.pages.dev/",
    accent: "from-blue-500/20 via-cyan-400/10 to-transparent",
    images: ["/projects/echopulse.png"],
    highlights: [
      "Architected runtime orchestration for multiple remote verticals",
      "Implemented shared dependency singleton patterns to reduce bundle size",
      "Centralized authentication and global state management across remotes",
       "Implemented error boundaries to isolate remote failures and prevent UI crashes",
    ],
  },
  {
    title: "Scalable Real-Time Chat Platform",
    description:
      "High-concurrency messaging platform featuring presence indicators, typing status, and message persistence.",
    stack: [
      "React",
      "WebSockets",
      "Socket.io",
      "Webpack 5",
      "Microfrontends",
      "Module Federation",
      "Redis",
      "NextJS",
      "Tailwind CSS",
      "Node.js",
      "CloudFlare",
      "Render",
    ],
    // githubUrl: "https://github.com/guptapuja/realtime-chat",
    liveUrl: "https://lumina-dashboard-shell.pages.dev/",
    accent: "from-emerald-400/20 via-teal-300/10 to-transparent",
    images: ["/projects/chat.png"],
    highlights: [
      "Designed WebSocket gateway delivering sub-100ms real-time messaging",
      "Implemented Redis-backed message queues for scalability and reliability",
      "Designed robust reconnection logic and message delivery receipts",
    ],
  },
];