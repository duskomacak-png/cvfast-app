const CACHE_NAME = "cvfast-v7-stable";
const ASSETS = [
  "./",
  "index.html",
  "style.css",
  "script.js",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "favicon-32.png"
];

// Install: do not block PWA installation if one optional asset fails.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(ASSETS);
      } catch (error) {
        console.error("PWA cache addAll failed. Check filenames/paths/MIME:", error);

        // Fallback: cache files one by one so one bad file does not break the whole SW install.
        await Promise.allSettled(
          ASSETS.map((asset) =>
            cache.add(asset).catch((assetError) => {
              console.error("PWA failed to cache asset:", asset, assetError);
            })
          )
        );
      }
    })
  );

  self.skipWaiting();
});

// Activate: remove older caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// Fetch: cache first, network fallback, safe navigation fallback.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("index.html");
        }

        return Response.error();
      });
    })
  );
});
