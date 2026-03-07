import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Project = {
  title: string;
  description: string;
  stack: string[];
  // githubUrl: string;
  liveUrl: any;
  images: string[];
  highlights: string[];
  accent: any;
};

export default function ProjectCard({ p }: { p: Project }) {
  const carouselImages = useMemo(() => (p.images ?? []).slice(0, 2), [p.images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [carouselImages]);

  useEffect(() => {
    if (carouselImages.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2500);

    return () => window.clearInterval(id);
  }, [carouselImages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.01, rotateX: 1.2, rotateY: -1.2 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-80`} />

      <div className="relative h-64 overflow-hidden border-b border-zinc-800 bg-zinc-950">
        {carouselImages.length > 0 ? (
          carouselImages.map((img, index) => (
            <motion.img
              key={`${img}-${index}`}
              src={img}
              alt={`${p.title} preview ${index + 1}`}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              } ${p.title.includes("EchoPulse") ? "object-contain bg-zinc-950" : "object-cover"}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.45 }}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            No preview available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* <div className="absolute right-3 top-3 z-10 flex gap-2">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur"
            >
              Website
            </a>
          )}
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur"
          >
            Source
          </a>
        </div> */}

        {carouselImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative p-5">
        <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{p.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-zinc-700/80 bg-zinc-950/70 px-3 py-1 text-xs text-zinc-100"
            >
              {s}
            </span>
          ))}
        </div>

        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-zinc-200">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <a
            // href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900"
          >
            GitHub
          </a>

          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}