import { useState } from "react";
import Section from "./Section";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    setStatus("sending");

    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      const resp = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);
      setStatus("error");
    }
  }

  return (
    <Section title="Contact Details">
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
            {/* <a
              className="block underline text-zinc-200"
              href="https://github.com/guptapuja"
              target="_blank"
              rel="noreferrer"
            >
              GitHub: guptapuja
            </a> */}
            <a
              className="block underline text-zinc-200"
              href="https://www.linkedin.com/in/puja-gupta-b6715a56/"
              target="_blank"
              rel="noreferrer"
            >
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
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Your email"
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2"
            />
            <textarea
              name="message"
              required
              placeholder="Message"
              rows={5}
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2"
            />

            <button
              disabled={status === "sending"}
              className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-emerald-300">Sent! I’ll get back to you soon.</p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-300">Something failed. Try again.</p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}