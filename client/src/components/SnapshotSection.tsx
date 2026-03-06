import Section from "./Section";
import Stat from "./Stat";

export default function SnapshotSection() {
  return (
    <Section title="Snapshot">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Experience" value="11+ years building scalable web applications" />
        <Stat label="Frontend Core" value="React • TypeScript • Redux • Vue • Next.js" />
        <Stat label="Architecture" value="Micro-frontends • Design Systems " />
        <Stat label="Realtime + Cloud" value="WebSockets • Kafka • AWS • CI/CD • Observability" />
      </div>
    </Section>
  );
}