const CACHE_NAME = "inventory-app-TestMod-v10-6";
const BASE = "/Inventory-app-TestMod";

const urlsToCache = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/style.css`,
  `${BASE}/app.js`,
  `${BASE}/Icons/favicon-16.png`,
  `${BASE}/Icons/favicon-32.png`,
  `${BASE}/Icons/worklog-192.png`,
  `${BASE}/Icons/worklog-512.png`,
  `${BASE}/dardu_map1.jpeg`,
  `${BASE}/dardu_map2.jpeg`,
  `${BASE}/cecilu_map.jpeg`,
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
