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

export const toggleWaterfallHeader = (bool) => {
  return {
    type: 'TOGGLE_WATERFALL_HEADER',
    payload: bool,
  };
};

export const progressUpdate = (percentage) => {
  return {
    type: 'PROGRESS_UPDATE',
    payload: percentage,
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

    dispatch(setAutoDownloadResult(bool));
  };
};


