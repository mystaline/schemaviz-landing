import { ReactNode } from "react";

const features: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        className="mb-4 text-primary-400"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Pannable Canvas",
    description:
      "Drag tables anywhere. Zoom in and out. Relationship lines follow automatically.",
  },
  {
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        className="mb-4 text-primary-400"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "SQL Export",
    description:
      "Generates ready-to-run CREATE TABLE statements with indexes and foreign keys grouped per table.",
  },
  {
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        className="mb-4 text-primary-400"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: "Import SQL or JSON",
    description:
      "Paste a DDL file or upload JSON to instantly visualise an existing schema.",
  },
  {
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        className="mb-4 text-primary-400"
      >
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Share Links",
    description:
      "Generate a read-only or fully editable link. No account needed.",
  },
  {
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        className="mb-4 text-primary-400"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: "Installable PWA",
    description:
      "Install from your browser for a standalone, offline-capable experience.",
  },
  {
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        className="mb-4 text-primary-400"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Mobile-Ready",
    description:
      "Full touch support — drag to pan, pinch to zoom, tap to select.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-secondary-900">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-primary-500 text-sm mb-3">// features</p>
        <h2 className="text-4xl font-black tracking-tight text-secondary-50 mb-12">
          Everything you need to model a database.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-secondary-800 border border-secondary-700 rounded-2xl p-6"
            >
              {f.icon}
              <h3 className="text-secondary-50 font-bold text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-secondary-400 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
