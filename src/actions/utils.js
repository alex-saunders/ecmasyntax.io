import { getObjectStore, putKeyVal } from '../utils/idb';
import { AUTO_DOWNLOAD_EXPIRY } from '../utils/constants';

export const toggleDrawer = (bool) => {
  return {
    type: 'TOGGLE_DRAWER',
    payload: bool,
  };
};

export const toggleSearch = (bool) => {
  return {
    type: 'TOGGLE_SEARCH',
    payload: bool,
  };
};

export const pushToast = (messageText, actionText, timeout, callback) => {
  return {
    type: 'PUSH_TOAST',
    payload: {
      messageText,
      actionText,
      timeout,
      callback,
    },
  };
};

export const popToast = () => {
  return {
    type: 'POP_TOAST',
  };
};

export const setAutoDownloadResult = (bool) => {
  return {
    type: 'AUTO_DOWNLOAD',
    payload: bool,
  };
};

export const setAutoDownload = (bool) => {
  return (dispatch) => {
    getObjectStore('Settings')
    .then((store) => {
      putKeyVal(store, {
        setting: 'auto-download-content',
        value: bool,
      });
      dispatch(setAutoDownloadResult(bool));
    })
    .catch(() => {
      dispatch(pushToast('Feature not avaliable', 'OK', 3000));
    });
  };
};


