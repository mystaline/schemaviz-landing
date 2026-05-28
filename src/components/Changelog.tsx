import { CHANGELOG, groupByDate } from "@/data/changelog";

const badgeClass: Record<string, string> = {
  new: "bg-primary-500/15 text-primary-400 border border-primary-500/30",
  improved: "bg-warning-400/15 text-warning-400 border border-warning-400/30",
  fix: "bg-success-500/15 text-success-500 border border-success-500/30",
};

const badgeLabel: Record<string, string> = {
  new: "New",
  improved: "Update",
  fix: "Patch",
};

const itemTypeClass: Record<string, string> = {
  feature: "text-primary-400",
  improvement: "text-warning-400",
  fix: "text-success-500",
};

const itemTypeLabel: Record<string, string> = {
  feature: "feat",
  improvement: "impr",
  fix: "fix",
};

export default function Changelog() {
  const grouped = groupByDate(CHANGELOG);

  return (
    <section className="py-24 px-6 bg-secondary-900">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-primary-500 text-sm mb-3">// changelog</p>
        <h2 className="text-4xl font-black tracking-tight text-secondary-50 mb-12">
          Actively developed.
        </h2>
        <div className="space-y-8">
          {grouped.map((entry, idx) => (
            <div
              key={entry.date}
              className="border-l-2 border-secondary-700 pl-6 relative"
            >
              {/* Latest dot */}
              {idx === 0 && (
                <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary-400 shadow-md shadow-primary-500/50 animate-pulse" />
              )}

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono font-black text-secondary-100">
                  v{entry.version}
                </span>
                {entry.badge && (
                  <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${badgeClass[entry.badge]}`}>
                    {badgeLabel[entry.badge]}
                  </span>
                )}
                <span className="font-mono text-xs text-secondary-500">
                  {entry.date}
                </span>
              </div>

              {/* Items */}
              <ul className="space-y-2">
                {entry.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className={`font-mono text-[10px] font-black uppercase tracking-wider shrink-0 mt-0.5 ${itemTypeClass[item.type]}`}>
                      {itemTypeLabel[item.type]}
                    </span>
                    <span className={idx === 0 ? "text-secondary-200" : "text-secondary-400"}>
                      {item.text}
                    </span>
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
