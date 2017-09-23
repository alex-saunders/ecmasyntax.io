const initialState = {
  drawerOpen: false,
  searchOpen: false,
  waterfallHeaderOpen: false,
  toasts: [],
  progress: 0,
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
    case 'TOGGLE_WATERFALL_HEADER': {
      if (action.payload && navigator.serviceWorker) action.payload = true;  
      
      return Object.assign({}, state,
        {
          waterfallHeaderOpen: action.payload,
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
    case 'PROGRESS_UPDATE': {
      return Object.assign({}, state, 
        {
          progress: action.payload,
        }
      )
    }
    default: {
      return state;
    }
  }
}
