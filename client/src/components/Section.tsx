import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  const id = title.toLowerCase().replace(/\s+/g, "-").trim();

  return (
    <section id={id === "featured-projects" ? "projects" : id} className="mt-12">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}