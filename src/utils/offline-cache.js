import { getObjectStore, getKeyVal } from './idb';

export const getAutoDownload = () => {
  return new Promise((resolve, reject) => {
    getObjectStore('Settings')
    .then((store) => {
      getKeyVal(store, 'auto-download-content')
      .then((result) => {
        resolve(result.value);
      })
      .catch(() => {
        resolve(null);
      });
    });
  });
};

export const cacheResponse = (request) => {
  return new Promise((resolve, reject) => {
    caches.open('ecmasyntax-runtime').then((cache) => {
      document.body.style.cursor = 'wait';
      fetch(request).then((response) => {
        cache.put(request, response.clone()).then(() => {
          document.body.style.cursor = '';
          resolve();
        });
      })
      .catch((err) => {
        reject();
        throw new Error(err);
      });
    });
  });
};

export const uncacheResponse = (request) => {
  return new Promise((resolve, reject) => {
    caches.open('ecmasyntax-runtime').then((cache) => {
      cache.delete(request).then(() => {
        resolve();
        // this.props.pushToast('Content removed from offline use', 'OK', 3000);
      });
    })
    .catch((err) => {
      reject();
      throw new Error(err);
    });
  });
};

export const checkCache = (request) => {
  return new Promise((resolve, reject) => {
    caches.match(request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
};
