import { experiences } from "../data/experience";
import type { ExperienceItem } from "../types/experience";

function Item({ title, meta, bullets }: ExperienceItem) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="text-sm font-semibold">{title}</div>
      {meta ? <div className="mt-1 text-xs text-zinc-400">{meta}</div> : null}

      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-200">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <Item key={`${experience.title}-${experience.meta}`} {...experience} />
      ))}
    </div>
  );
}