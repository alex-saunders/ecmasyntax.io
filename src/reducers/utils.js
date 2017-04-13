const initialState = {
  drawerOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_DRAWER': {
      return Object.assign({}, state,
        {
          drawerOpen: action.payload
        }
      );
    }
    default: {
      return state;
    }
  }
}
