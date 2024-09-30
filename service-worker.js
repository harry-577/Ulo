const CACHE_NAME = "ulo-cache-v1";
const urlsToCache = [
  
  "/service-worker.js",
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
