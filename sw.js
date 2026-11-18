const CACHE_NAME = 'breathflow-v6'; // Сброс кэша
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
    return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    if (!e.request.url.startsWith('http')) return;
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
