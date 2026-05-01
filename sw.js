const CACHE_NAME = "cvfast-v8-root-stable";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon-32.png"
];

// Install: cache assets without blocking the whole Service Worker if one asset fails.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(
        ASSETS.map((asset) => cache.add(asset))
      );

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error("PWA cache failed:", ASSETS[index], result.reason);
        }
      });
    })
  );

  self.skipWaiting();
});

// Activate: delete old cache versions and take control immediately.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for static files, network fallback, safe app-shell fallback for navigation.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }

        return Response.error();
      });
    })
  );
});
