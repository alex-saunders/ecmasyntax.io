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
