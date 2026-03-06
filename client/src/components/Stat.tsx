type StatProps = {
  label: string;
  value: string;
};

export default function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="text-xs uppercase tracking-wide text-zinc-500">{label}</div>
      <div className="mt-3 text-lg font-semibold leading-snug text-zinc-100">
        {value}
      </div>
    </div>
  );
}