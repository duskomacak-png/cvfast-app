const CACHE_NAME = "cvfast-v21-en-de-student-demo-clean";

const APP_SHELL = [
  "/",
  "/index.html",
  "/style.css?v=seo4",
  "/script.js?v=seo4",
  "/manifest.webmanifest?v=seo4",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon-32.png",
  "/privacy.html",
  "/terms.html",
  "/how-it-works.html",
  "/resume-templates.html",
  "/no-subscription.html",
  "/ats-friendly-resume.html",
  "/cv-for-germany.html",
  "/resume-for-international-jobs.html",
  "/sitemap.xml",
  "/robots.txt"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const file of APP_SHELL) {
        try { await cache.add(file); } catch (err) { console.warn("Cache failed:", file, err); }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const request = event.request;

  // Always try the network first for pages, so GitHub updates appear quickly.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request).catch(() => Response.error());
    })
  );
});
