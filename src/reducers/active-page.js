const initialState = {
  page: null,
  route: null,
  pageIsLoading: false,
  pageHasErrored: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PAGE_ERROR': {
      return Object.assign({}, state,
        {
          hasErrored: action.payload
        }
      );
    }
    case 'PAGE_LOADING': {
      return Object.assign({}, state,
        {
          isLoading: action.payload
        }
      );
    }
    case 'PAGE_FETCH_SUCCESS': {
      return Object.assign({}, state,
        {
          page: action.payload
        }
      );
    }
    case 'ACTIVE_ROUTE': {
      return Object.assign({}, state,
        {
          route: action.payload
        }
      );
    }
    default: {
      return state;
    }
  }
}
