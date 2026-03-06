type SkillCardProps = {
  title: string;
  items: string[];
};

export default function SkillCard({ title, items }: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}