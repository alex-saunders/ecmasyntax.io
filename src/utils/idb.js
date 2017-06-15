import { IDB_VERSION_NO, AUTO_DOWNLOAD_EXPIRY } from './constants';

export const openDB = () => {
  return new Promise((resolve, reject) => {
    // open our database
    const request = window.indexedDB.open('ECMASyntax', IDB_VERSION_NO);

    // Create the schema
    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore('Settings', { keyPath: 'setting' });
      store.createIndex('SettingIndex', ['setting']);

      resolve(db);
    };

    request.onerror = () => {
      reject(request.errorCode);
      throw new Error(request.errorCode);
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };
  });
};

export const getObjectStore = (storeName) => {
  return new Promise((resolve, reject) => {
    openDB()
    .then((db) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);

      // Close the db when the transaction is done
      tx.oncomplete = () => {
        db.close();
      };

      resolve(store);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

export const getKeyVal = (store, key) => {
  return new Promise((resolve, reject) => {
    const get = store.get(key);
    get.onsuccess = () => {
      resolve(get.result);
    };
    get.onerror = () => {
      reject(get.errorCode);
      throw new Error(get.errorCode);
    };
  });
};

export const putKeyVal = (store, val) => {
  store.put(val);
};
