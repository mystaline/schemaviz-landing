export default function Hero() {
  const chips = ["Tables", "FK Relations", "SQL Export", "Share Links", "PWA", "Mobile"];

  return (
    <div
      className="min-h-screen bg-secondary-900 flex flex-col items-center justify-center px-6"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #1f2631 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-4xl w-full">
        <p className="font-mono text-primary-400 text-sm mb-6">// v5.1.4 · Free · No login</p>
        <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none mb-6">
          <span className="text-white">Schema design</span>
          <br />
          <span className="text-primary-400">that doesn&apos;t suck.</span>
        </h1>
        <p className="text-secondary-400 text-lg max-w-xl mb-10">
          Design PostgreSQL schemas visually. Tables, relations, indexes, and SQL export — all in the browser.
        </p>
        <div className="flex flex-row gap-4">
          <a
            href="https://app.schemaviz.mystaline.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Open App →
          </a>
          <a
            href="https://github.com/mystaline/db-schema-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-secondary-600 text-secondary-400 hover:text-secondary-50 font-bold px-6 py-3 rounded-xl transition-colors"
          >
            View on GitHub
          </a>
        </div>
        <div className="flex flex-wrap gap-2 mt-10">
          {chips.map((chip) => (
            <span
              key={chip}
              className="bg-primary-500/10 border border-primary-500/20 text-primary-400 font-mono text-xs px-3 py-1 rounded-full"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
