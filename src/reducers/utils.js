const initialState = {
  drawerOpen: false,
  searchOpen: false,
  toasts: [],
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
    case 'PUSH_TOAST': {
      return Object.assign({}, state,
        {
          toasts: [...state.toasts, action.payload],
        },
      );
    }
    case 'POP_TOAST': {
      const arr = [...state.toasts];
      arr.shift();
      return Object.assign({}, state,
        {
          toasts: arr,
        },
      );
    }
    default: {
      return state;
    }
  }
}
