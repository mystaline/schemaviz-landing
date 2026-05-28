import { CHANGELOG } from "@/data/changelog";

export default function Changelog() {
  const getBadgeClass = (badge: string) => {
    const baseClass = "text-xs font-mono px-2 py-0.5 rounded-full";
    switch (badge) {
      case "new":
        return `${baseClass} bg-success-500/15 text-success-500 border border-success-500/30`;
      case "improved":
        return `${baseClass} bg-warning-400/15 text-warning-400 border border-warning-400/30`;
      case "fix":
        return `${baseClass} bg-danger-500/15 text-danger-500 border border-danger-500/30`;
      default:
        return baseClass;
    }
  };

  return (
    <section className="py-24 px-6 bg-secondary-900">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-primary-500 text-sm mb-3">// changelog</p>
        <h2 className="text-4xl font-black tracking-tight text-secondary-50 mb-12">
          Actively developed.
        </h2>
        <div className="space-y-10">
          {CHANGELOG.map((entry) => (
            <div
              key={entry.version}
              className="border-l-2 border-secondary-700 pl-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-bold text-secondary-50">
                  v{entry.version}
                </span>
                {entry.badge && (
                  <span className={getBadgeClass(entry.badge)}>
                    {entry.badge}
                  </span>
                )}
                <span className="font-mono text-xs text-secondary-400">
                  {entry.date}
                </span>
              </div>
              <ul className="space-y-1 mt-2">
                {entry.items.map((item, i) => (
                  <li key={i} className="text-sm text-secondary-400">
                    · {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
