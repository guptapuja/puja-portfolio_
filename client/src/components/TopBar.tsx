export default function TopBar() {
  return (
    <div className="sticky top-0 z-20 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="leading-tight">
          <div className="text-sm font-semibold">Puja Gupta</div>
          {/* <div className="text-xs text-zinc-400">Frontend Lead • React •  Distributed & Real-Time Systems </div> */}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <a href="#projects" className="text-zinc-300 hover:text-white">Projects</a>
          <a href="/resume.pdf" download className="text-zinc-300 hover:text-white">Resume</a>
          <a
            // href="https://github.com/guptapuja"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}