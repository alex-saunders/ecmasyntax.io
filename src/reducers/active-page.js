const initialState = {
  page: null,
  route: null,
  title: null,
  type: null,
  isLoading: false,
  hasErrored: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PAGE_ERROR': {
      return Object.assign({}, state,
        {
          hasErrored: action.payload,
        },
      );
    }
    case 'PAGE_LOADING': {
      return Object.assign({}, state,
        {
          isLoading: action.payload,
        },
      );
    }
    case 'ACTIVE_PAGE': {
      return Object.assign({}, state,
        {
          page: action.payload,
        },
      );
    }
    case 'ACTIVE_ROUTE': {
      return Object.assign({}, state,
        {
          route: action.payload,
        },
      );
    }
    case 'ACTIVE_PAGE_TITLE': {
      return Object.assign({}, state,
        {
          title: action.payload,
        },
      );
    }
    case 'ACTIVE_PAGE_TYPE': {
      return Object.assign({}, state,
        {
          type: action.payload,
        },
      );
    }
    default: {
      return state;
    }
  }
}
