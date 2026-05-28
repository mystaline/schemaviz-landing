"use client";

import { useState } from "react";
import ReportModal from "./ReportModal";

export default function Footer() {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-secondary-700 bg-secondary-900 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-row items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <div>
              <p className="font-bold text-secondary-50">Schema Viz</p>
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
              View on GitHub
            </a>
            <button
              onClick={() => setReportOpen(true)}
              className="text-secondary-400 text-sm hover:text-secondary-50 transition-colors bg-transparent border-0 cursor-pointer p-0"
            >
              Report an Issue
            </button>
          </div>
        </div>
      </footer>

      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
}
