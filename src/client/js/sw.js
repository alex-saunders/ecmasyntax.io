const precacheVersion = require('static-precache-version')();
const toCache = require('static-precache')();
const runtime  = require('static-runtime')();

const precache = `ecmasyntax-precache-${precacheVersion}`;

addEventListener('install', event => {
  skipWaiting();
  
  event.waitUntil(async function () {

    const cache = await caches.open(precache);
    await cache.addAll(['/', ...toCache]);
  }());
});

addEventListener('activate', event => {
  clients.claim();

  event.waitUntil(async function () {

    const keys = await caches.keys();
    for (const key of keys) {
      if (key !== precache && key !== runtime) await caches.delete(key);
    }
  }());
});


addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  event.respondWith(async function () {

    if (url.origin === location.origin) { 
      // pagelist request
      if (/^\/api\/pages$/.test(url.pathname)) {

        const cache = await caches.open(runtime);
        const response = await fetch(event.request);
        cache.put(event.request, response.clone());
        
        return response;
      }
      // page request
      if (/^\/api\/pages\/.*\/.*\/.*\/$/.test(url.pathname)) {

      }
    }

    const response = await caches.match(event.request);
    if (response) {
      return response;
    }
    try {
      return await fetch(event.request);
    } catch (err) {
      return await caches.match('/');
    }
  }());
});

addEventListener('message', function(event){

  const eventType = event.data.type;
  const eventData = event.data.data;

  if (eventType === 'cacheResponse') {
    (async () => {
      const cache = await caches.open(runtime);
      const response = await fetch(eventData);
      cache.put(eventData, response.clone());
      event.ports[0].postMessage(true);
    })();
  }

  if (eventType === 'uncacheResponse') {
    (async () => {
      const cache = await caches.open(runtime);
      await cache.delete(eventData);
      event.ports[0].postMessage(true);
    })();
  }
});