import idb from 'idb';

const sendMessageToServiceWorker = (msg) => {
  return new Promise(function(resolve, reject){
      var msg_chan = new MessageChannel();

      // Handler for recieving message reply from service worker
      msg_chan.port1.onmessage = function(event){
          if(event.data.error){
              reject(event.data.error);
          }else{
              resolve(event.data);
          }
      };

      // Send message to service worker along with port for reply
      navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);
  });
}

const dbPromise = idb.open('ecmasyntax-db', 4, (upgradeDb) => {
  const settingsStore = upgradeDb.createObjectStore('settings');
  settingsStore.put(false, 'autodownload-set');
  settingsStore.put(false, 'autodownload-val');
});

export const getAutoDownloadSet = () => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const tx = db.transaction('settings', 'readwrite');
      const keyValStore = tx.objectStore('settings');
      return keyValStore.get('autodownload-set');
    }).then((val) => {
      resolve(val);
    }).catch((err) => {
      reject(err);
    })
  });
};

export const getAutoDownloadVal = () => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const tx = db.transaction('settings', 'readwrite');
      const keyValStore = tx.objectStore('settings');
      return keyValStore.get('autodownload-val');
    }).then((val) => {
      resolve(val);
    }).catch((err) => {
      reject(err);
    })
  });
}

export const setAutoDownload = (bool) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const tx = db.transaction('settings', 'readwrite');
      const keyValStore = tx.objectStore('settings');
      keyValStore.put(true, 'autodownload-set');
      keyValStore.put(bool, 'autodownload-val');
      return tx.complete;
    }).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    })
  });
}

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

export const cacheResponse = (request) => {
  return new Promise((resolve, reject) => {
    sendMessageToServiceWorker({
      type: 'cacheResponse',
      data: request
    }).then((response) => {
      if (response) {
        resolve();
      } else {
        reject();
      }
    }).catch((err) => {
      reject(err);
    })
  })
  
};

export const uncacheResponse = (request) => {
  return new Promise((resolve, reject) => {
    sendMessageToServiceWorker({
      type: 'uncacheResponse',
      data: request
    }).then((response) => {
      if (response) {
        resolve();
      } else {
        reject();
      }
    }).catch((err) => {
      reject(err);
    })
  })
};
