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

