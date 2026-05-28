export interface ChangelogEntry {
  version: string;
  date: string;
  badge?: "new" | "improved" | "fix";
  items: { type: "feature" | "improvement" | "fix"; text: string }[];
}

export const CHANGELOG: ChangelogEntry[] = [
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
];
