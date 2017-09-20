const _redirectUser = (response) => {
  if (window.location.pathname !== '/') {
    return;
  }
  if (response) {
    window.location.pathname = response[0].fields.route;
  } else {
    window.location.pathname = 'about';
  }
};

export const search = (query) => {
  return {
    type: 'SEARCH_QUERY',
    payload: query,
  };
};

export const addFilter = (filter) => {
  return {
    type: 'ADD_FILTER',
    payload: filter,
  };
};

export const removeFilter = (filter) => {
  return {
    type: 'REMOVE_FILTER',
    payload: filter,
  };
};

export const pageListLoading = (bool) => {
  return {
    type: 'PAGELIST_LOADING',
    payload: bool,
  };
};

export const pageListError = (bool) => {
  return {
    type: 'PAGELIST_ERROR',
    payload: bool,
  };
};

export const pageListFetchSuccess = (entries) => {
  return {
    type: 'PAGELIST_FETCH_SUCCESS',
    payload: entries,
  };
};

export const fetchPageList = () => {
  return (dispatch) => {
    dispatch(pageListLoading(true));
    dispatch(pageListError(false));

    setTimeout(() => {
      fetch('/api/pages')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => { return response.json(); })
      .then((response) => {
        dispatch(pageListLoading(false));
        dispatch(pageListFetchSuccess(response));
        // _redirectUser(response);
        
      })
      .catch((err) => {
        dispatch(pageListFetchSuccess(true));
        _redirectUser();
        throw err;
      });
    }, 0);
  };
};
