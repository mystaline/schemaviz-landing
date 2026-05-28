export interface ChangelogEntry {
  version: string;
  date: string;
  badge?: "new" | "improved" | "fix";
  items: { type: "feature" | "improvement" | "fix"; text: string }[];
}

export interface GroupedEntry {
  date: string;
  version: string;
  badge?: ChangelogEntry["badge"];
  items: ChangelogEntry["items"];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "5.2.0",
    date: "May 29, 2026",
    badge: "improved",
    items: [
      { type: "improvement", text: "What's New now groups all updates from the same day into one section — cleaner to read when several fixes ship at once." },
      { type: "improvement", text: "If you were using the old address (schemavis.mystaline.dev), your saved schema is automatically carried over on your first visit to the new app — nothing to export or re-enter." },
      { type: "improvement", text: "The old address now redirects to the app on every visit, including the very first one." },
    ],
  },
  {
    version: "5.1.5",
    date: "May 29, 2026",
    badge: "fix",
    items: [
      { type: "fix", text: "Column type and PK/NULL/UNQ toggles now appear on separate rows — no more cramped layout in the detail panel." },
      { type: "fix", text: "App name corrected from SchemaVis to SchemaViz throughout the app." },
    ],
  },
  {
    version: "5.1.4",
    date: "May 28, 2026",
    badge: "fix",
    items: [
      { type: "fix", text: "What's New modal no longer competes with the Create Table prompt — they now appear sequentially instead of simultaneously." },
      { type: "fix", text: "Toast notifications now appear above all modals." },
    ],
  },
  {
    version: "5.1.3",
    date: "May 28, 2026",
    badge: "new",
    items: [
      { type: "feature", text: "Report / Feedback button — send bug reports or feature requests directly to the developer from the top bar." },
    ],
  },
  {
    version: "5.1.2",
    date: "May 28, 2026",
    badge: "fix",
    items: [
      { type: "fix", text: "On first visit, the What's New modal now correctly appears in front of the Create Table prompt instead of being hidden behind it." },
    ],
  },
  {
    version: "5.1.1",
    date: "May 12, 2026",
    badge: "fix",
    items: [
      { type: "fix", text: "Mouse wheel zoom and pan are now properly dampened — no more jarring jumps when scrolling with a mouse instead of a trackpad." },
    ],
  },
  {
    version: "5.1.0",
    date: "May 12, 2026",
    badge: "new",
    items: [
      { type: "feature", text: "Keyboard shortcuts in dialogs — press Enter to confirm and Escape to close, now working across all modals." },
      { type: "fix", text: "Clicking outside a dialog now reliably closes it — previously Export, Share, and delete confirmations would stay open." },
      { type: "improvement", text: "When clipboard access is blocked, the share link is placed in the address bar so you can still copy it manually." },
      { type: "improvement", text: "Notification banners now wrap their text to fit the screen instead of overflowing off the edge." },
    ],
  },
  {
    version: "5.0.0",
    date: "May 11, 2026",
    badge: "new",
    items: [
      { type: "feature", text: "PWA support — install the app from your browser for a standalone, offline-capable experience with a dedicated icon." },
      { type: "feature", text: "SQL export now groups each table's foreign keys and indexes directly below its CREATE TABLE block instead of accumulating them at the end of the file." },
      { type: "feature", text: "Export warnings — broken foreign key and index references are flagged with a banner and inline --WARNING comments in the SQL output." },
      { type: "improvement", text: "All modals now use a shared ModalShell component with consistent ESC-to-close and focus trapping." },
      { type: "improvement", text: "Delete confirmations — removing a column, constraint, index, foreign key, or table now shows a ConfirmModal dialog preventing accidental data loss." },
      { type: "improvement", text: "Import UX — per-tab input persistence, file reader error/abort handlers, overwrite confirmation gate, and clear error messaging via toast." },
      { type: "improvement", text: "Error resilience — localStorage failures, preset loading errors, and hydration race conditions are now caught and reported gracefully with toast feedback." },
      { type: "improvement", text: "History undo/redo now uses synchronous flush and guards against stale debounced operations during restore." },
      { type: "improvement", text: "Removed unused legacy components (SqlExportModal, SqlImportModal, PresetTemplates, TableForm) and empty directories." },
      { type: "improvement", text: "Comprehensive test suite — 38 unit test files (238 tests) plus 9 end-to-end Playwright scenarios." },
    ],
  },
  {
    version: "4.6.0",
    date: "May 11, 2026",
    badge: "improved",
    items: [
      { type: "improvement", text: "Visual overhaul — darker, higher-contrast palette with tighter spacing across the entire app." },
      { type: "improvement", text: "Column editor redesigned as compact cards — type, nullability, uniqueness, and default value all visible at a glance." },
      { type: "improvement", text: "Deleting a column, constraint, index, or foreign key now shows a confirmation dialog instead of removing it immediately." },
      { type: "improvement", text: "Rename a table directly in the detail panel header — double-click the name to edit." },
      { type: "improvement", text: "Pinch-to-zoom is more precise — scale now tracks incremental finger distance rather than jumping from the initial spread." },
      { type: "improvement", text: "Zoom HUD shows the current zoom percentage and is centred at the bottom of the canvas." },
    ],
  },
  {
    version: "4.5.0",
    date: "May 9, 2026",
    badge: "improved",
    items: [
      { type: "improvement", text: "Zoom now follows the pointer — the point under your cursor stays fixed while you scroll to zoom in or out." },
      { type: "improvement", text: "Space + drag to pan the canvas from anywhere, even when hovering over tables." },
      { type: "improvement", text: "Canvas cursor is now grab/grabbing, giving clear feedback when panning." },
      { type: "improvement", text: "Sidebar collapse toggles are now more visible and anchored to the top of the canvas." },
    ],
  },
];

export function groupByDate(entries: ChangelogEntry[]): GroupedEntry[] {
  const groups: GroupedEntry[] = [];
  for (const entry of entries) {
    const existing = groups.find((g) => g.date === entry.date);
    if (existing) {
      existing.items = [...existing.items, ...entry.items];
    } else {
      groups.push({ date: entry.date, version: entry.version, badge: entry.badge, items: [...entry.items] });
    }
  }
  return groups;
}
