// Kill-switch SW: replaces the old Vue app service worker at this origin,
// clears its caches so the next navigation gets fresh landing-page HTML,
// then reloads all open clients so the redirect fires.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => {
        for (const client of clients) client.navigate(client.url);
      })
  );
});
// No fetch handler — every request passes through to the network.
