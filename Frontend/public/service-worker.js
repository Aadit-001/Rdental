const CACHE_NAME = 'r-dental-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/app.jsx'

];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keylist => {
        return Promise.all(keylist.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

