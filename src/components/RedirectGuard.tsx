"use client";

import { useEffect } from "react";

const APP_URL = "https://app.schemaviz.mystaline.dev";
const LS_KEY = "db_schema_visualizer";
const MIGRATED_KEY = "schemaviz_migrated";
const OLD_HOST = "schemavis.mystaline.dev";

async function encodeSchema(raw: string): Promise<string> {
  const parsed = JSON.parse(raw);
  const payload = JSON.stringify({ ...parsed, p: "full", m: 1 });
  const stream = new Blob([payload]).stream().pipeThrough(new CompressionStream("gzip"));
  const buf = await new Response(stream).arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function showPage() {
  document.documentElement.style.visibility = "";
}

export default function RedirectGuard({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ?embed and #data= are handled synchronously by the inline <head> script,
    // so they never reach here. Handle as fallback anyway.
    const search = window.location.search;
    const hash = window.location.hash;
    if (new URLSearchParams(search).has("embed")) {
      window.location.replace(`${APP_URL}?embed`);
      return;
    }
    if (hash.startsWith("#data=")) {
      window.location.replace(`${APP_URL}${hash}`);
      return;
    }

    const host = window.location.hostname;

    // Old domain: always redirect to app — migrate schema if present, otherwise plain redirect.
    // Page is already hidden by the inline script.
    if (host === OLD_HOST) {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        encodeSchema(raw)
          .then((encoded) => window.location.replace(`${APP_URL}#data=${encoded}`))
          .catch(() => window.location.replace(APP_URL));
      } else {
        window.location.replace(APP_URL);
      }
      return;
    }

    // On the real landing domain: only redirect if there is unmigrated local schema.
    // Page may be hidden by inline script if migration is pending.
    const raw = localStorage.getItem(LS_KEY);
    const migrated = localStorage.getItem(MIGRATED_KEY);
    if (raw && !migrated) {
      encodeSchema(raw)
        .then((encoded) => {
          localStorage.setItem(MIGRATED_KEY, "1");
          window.location.replace(`${APP_URL}#data=${encoded}`);
        })
        .catch(() => showPage()); // encoding failed — show landing page anyway
      return;
    }

    // No redirect needed — ensure page is visible (inline script may have hidden it).
    showPage();
  }, []);

  // Always render children so SSR HTML is complete for crawlers.
  return <>{children}</>;
}
