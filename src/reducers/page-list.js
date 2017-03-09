const initialState = {
  pages: [],
  pageListError: false,
  pageListLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PAGELIST_ERROR': {
      return Object.assign({}, state,
        {
          pageListError: action.payload
        }
      );
    }
    case 'PAGELIST_LOADING': {
      return Object.assign({}, state,
        {
          pageListLoading: action.payload
        }
      );
    }
    case 'PAGELIST_FETCH_SUCCESS': {
      return Object.assign({}, state,
        {
          pages: action.payload
        }
      );
    }
    default: {
      return state;
    }
  }
}
