const CACHE_NAME = "ulo-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/estate1.html",
  "/buildingdb2.html",
  "/tenantdb3.html",
  "/styles.css",
  "/input.css",
  "/output.css",
  "/manifest.json",
  "/Images4Estate/Favicon 32x32.jpg",
  "/Images4Estate/house 360 192x192.png",
  "/Images4Estate/house 360 512x512.png",
  "/Images4Estate/7a.jpg",
  "/Images4Estate/add_home Google.svg",
  "/Images4Estate/delete_Bin Google.svg",
  "/Images4Estate/edit_google.svg",
  "/Images4Estate/house 360.png",
  "/Images4Estate/house_3 google.svg",
  "/Images4Estate/house_5 google.svg",
  "/Images4Estate/logout_Google.svg",
  "/Images4Estate/person_add_gooleFont.svg",
  "/Images4Estate/person_cancel_Google.svg",
  "/Images4Estate/person_edit_Google.svg",
  "/Images4Estate/Persons groups.svg",
  "/Images4Estate/Search.256.png",
  "/Images4Estate/share_google.svg",
  "/Images4Estate/warning_Google.svg",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache).then(() => {
        console.log("All resources have been cached");
      }).catch((error) => {
        console.error("Failed to cache resources:", error);
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  clients.claim(); // Take control of all clients as soon as the service worker becomes active
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Found ", event.request.url, " in cache");
        return response;
      }
      console.log("Network request for ", event.request.url);
      return fetch(event.request);
    }).catch((error) => {
      console.error("Fetch failed; returning offline page instead.", error);
      return caches.match("/");
    })
  );
});
