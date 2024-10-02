const CACHE_NAME = "ulo-cache-v1";
const urlsToCache = [
  "/",
  "/main/index.html",
  "/main/estate1.html",
  "/main/buildingdb2.html",
  "/main/tenantdb3.html",
  "/main/styles.css",
  "/main/input.css",
  "/main/output.css",
  "/main/manifest.json",
  "/main/Images4Estate/Favicon 32x32.jpg",
  "/main/Images4Estate/house 360 192x192.png",
  "/main/Images4Estate/house 360 512x512.png",
  "/main/Images4Estate/7a.jpg",
  "/main/Images4Estate/add_home Google.svg",
  "/main/Images4Estate/delete_Bin Google.svg",
  "/main/Images4Estate/edit_google.svg",
  "/main/Images4Estate/house 360.png",
  "/main/Images4Estate/house_3 google.svg",
  "/main/Images4Estate/house_5 google.svg",
  "/main/Images4Estate/logout_Google.svg",
  "/main/Images4Estate/person_add_gooleFont.svg",
  "/main/Images4Estate/person_cancel_Google.svg",
  "/main/Images4Estate/person_edit_Google.svg",
  "/main/Images4Estate/Persons groups.svg",
  "/main/Images4Estate/Search.256.png",
  "/main/Images4Estate/share_google.svg",
  "/main/Images4Estate/warning_Google.svg",
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
