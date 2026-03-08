export default function Hero() {
  return (
    <section className="pt-16">
      <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-8 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-cyan-400/5" />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm text-zinc-400">
              Frontend Lead Engineer 
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-2xl">
              Building scalable frontend platforms
              <br />
              for real-time products
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400">
              React • Vue • TypeScript • Micro-frontends • NextJS • Architecture • Distributed & Real-Time Systems
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
                Contact Details
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-indigo-500/20 via-cyan-400/10 to-purple-500/20 blur-3xl" />

              <div className="relative h-60 w-60 overflow-hidden rounded-full border border-zinc-700 shadow-2xl md:h-72 md:w-72">
                <img
                  src="/puja.png"
                  alt="Puja Gupta"
                  className="h-[106%] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}