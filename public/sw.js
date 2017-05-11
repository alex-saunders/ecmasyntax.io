const VERSION_NO = 1;

const PRECACHE = 'ecmasyntax-precache';
const RUNTIME = 'ecmasyntax-runtime';

const urlsToCache = [
  '/',
  '/static/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => {
        cache.addAll(urlsToCache);
      })
      .then(self.skipWaiting()));
});

// clear up old caches
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  // replacing all /pages/ requests with home page (app shell)
  const url = event.request.url;
  const origin = location.origin;
  const relUrl = url.replace(origin, '');

  if (relUrl.startsWith('/pages/')) {
    event.respondWith(
      caches.match(location.origin).then((response) => {
        return response || fetch(location.origin);
      }));
  } else if (relUrl.startsWith('/api/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
        // return caches.open(RUNTIME).then((cache) => {
        //   return fetch(event.request).then((response) => {
        //     return cache.put(event.request, response.clone()).then(() => {
        //       return response;
        //     });
        //   });
        // });
      }));
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }));
  }
});
