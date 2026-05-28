"use client";

export default function Footer() {
  const handleReport = async () => {
    const message = window.prompt("Describe the issue:");
    if (!message?.trim()) return;

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_REPORT_WORKER_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "SchemaVis Landing",
          subject: "[SchemaVis Landing] Quick Report",
          from_name: "Anonymous",
          message,
        }),
      });

      if (res.ok) {
        alert("Report sent! Thank you.");
      } else {
        alert("Failed to send. Please try again.");
      }
    } catch {
      alert("Failed to send. Please try again.");
    }
  };

  return (
    <footer className="border-t border-secondary-700 bg-secondary-900 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-row items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary-500" />
          <div>
            <p className="font-bold text-secondary-50">Schema Vis</p>
            <p className="text-secondary-500 text-xs">PostgreSQL schema design tool</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
          <a
            href="https://app.schemaviz.mystaline.dev"
            className="text-secondary-400 text-sm hover:text-secondary-50 transition-colors"
          >
            Open App
          </a>
          <a
            href="https://github.com/mystaline/db-schema-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-400 text-sm hover:text-secondary-50 transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={handleReport}
            className="text-secondary-400 text-sm hover:text-secondary-50 transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            Report an Issue
          </button>
        </div>
      </div>
    </footer>
  );
}
