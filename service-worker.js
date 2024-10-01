const CACHE_NAME = "ulo-cache-v1";
const urlsToCache = [
  "/Ulo/",
  "/Ulo/Ulo/service-worker.js",
  "/Ulo/index.html",
  "/Ulo/estate1.html",
  "/Ulo/buildingdb2.html",
  "/Ulo/tenantdb3.html",
  "/Ulo/styles.css",
  "/Ulo/input.css",
  "/Ulo/output.css",
  "/Ulo/manifest.json",
  "/Ulo/Images4Estate/Favicon 32x32.jpg",
  "/Ulo/Images4Estate/house 360 192x192.png",
  "/Ulo/Images4Estate/house 360 512x512.png",
  "/Ulo/Images4Estate/7a.jpg",
  "/Ulo/Images4Estate/add_home Google.svg",
  "/Ulo/Images4Estate/delete_Bin Google.svg",
  "/Ulo/Images4Estate/edit_google.svg",
  "/Ulo/Images4Estate/house 360.png",
  "/Ulo/Images4Estate/house_3 google.svg",
  "/Ulo/Images4Estate/house_5 google.svg",
  "/Ulo/Images4Estate/logout_Google.svg",
  "/Ulo/Images4Estate/person_add_gooleFont.svg",
  "/Ulo/Images4Estate/person_cancel_Google.svg",
  "/Ulo/Images4Estate/person_edit_Google.svg",
  "/Ulo/Images4Estate/Persons groups.svg",
  "/Ulo/Images4Estate/Search.256.png",
  "/Ulo/Images4Estate/share_google.svg",
  "/Ulo/Images4Estate/warning_Google.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache resources:", error);
      });
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
