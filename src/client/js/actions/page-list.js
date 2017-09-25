import { pushToast } from './utils';

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
    let networkDataRecieved = false;
    let cacheDataRecieved = false;

    dispatch(pageListLoading(true));
    dispatch(pageListError(false));

    const networkUpdate = fetch('/api/pages')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => { return response.json(); })
    .then((response) => {
      networkDataRecieved = true;

      if (!cacheDataRecieved) {
        dispatch(pageListLoading(false));
        dispatch(pageListFetchSuccess(response.fields));
      } else {
        // compare the cached and retrieved pagelists
        if (cacheDataRecieved.sys.id !== response.sys.id) {
          // the network request response has newer content than the cached response
          dispatch(pushToast('Newer content is available, reload to update', 'reload', false, () => {
            location.reload();            
          }));
        } else {
          // cached pagelist is up to date
        }
      }
      
    })
    .catch((err) => {
      if (!cacheDataRecieved) {
        dispatch(pageListError(true));
      }
    });

    // fetch cached data
    caches.match('/api/pages').then((response) => {
      if (!response) throw Error("No data");
      return response.json();
    }).then((data) => {
      cacheDataRecieved = data;
      console.log('got cached pagelist')
      // we have used the data from the cache as the response here
      if (!networkDataRecieved) {
        dispatch(pageListLoading(false));
        dispatch(pageListFetchSuccess(data.fields));
      }
    }).catch(() => {
      return networkUpdate;
    }).catch((err) => {
      console.log(err);
    });
  };
};
