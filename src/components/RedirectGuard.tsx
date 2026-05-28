"use client";

import { useEffect, useState } from "react";

const APP_URL = "https://app.schemaviz.mystaline.dev";
const LS_KEY = "db_schema_visualizer";
const MIGRATED_KEY = "schemaviz_migrated";

async function encodeSchema(raw: string): Promise<string> {
  const parsed = JSON.parse(raw);
  const payload = JSON.stringify({ ...parsed, p: "full" });
  const stream = new Blob([payload]).stream().pipeThrough(new CompressionStream("gzip"));
  const buf = await new Response(stream).arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default function RedirectGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
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

    const raw = localStorage.getItem(LS_KEY);
    const migrated = localStorage.getItem(MIGRATED_KEY);

    if (raw && !migrated) {
      encodeSchema(raw)
        .then((encoded) => {
          localStorage.setItem(MIGRATED_KEY, "1");
          window.location.replace(`${APP_URL}#data=${encoded}`);
        })
        .catch(() => setReady(true));
      return;
    }

    setReady(true);
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
