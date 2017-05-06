const initialState = {
  drawerOpen: false,
  searchOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_DRAWER': {
      return Object.assign({}, state,
        {
          drawerOpen: action.payload,
        },
      );
    }
    case 'TOGGLE_SEARCH': {
      return Object.assign({}, state,
        {
          searchOpen: action.payload,
        },
      );
    }
    default: {
      return state;
    }
  }
}
