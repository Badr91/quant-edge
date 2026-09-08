const CACHE_NAME = "quantedge-v1";
const assets = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/main.js",
    "./js/config.js",
    "./js/components.js",
    "./manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
