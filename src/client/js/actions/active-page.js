import { toggleDrawer, toggleSearch, progressUpdate, pushToast } from './utils';
import { search } from './page-list';

export const pageFetchError = (bool) => {
  return {
    type: 'PAGE_ERROR',
    payload: bool,
  };
};

export const pageIsLoading = (bool) => {
  return {
    type: 'PAGE_LOADING',
    payload: bool,
  };
};

export const setActiveRoute = (route) => {
  return {
    type: 'ACTIVE_ROUTE',
    payload: route,
  };
};

export const setActivePage = (page) => {
  return {
    type: 'ACTIVE_PAGE',
    payload: page,
  };
};

export const setActivePageType = (type) => {
  return {
    type: 'ACTIVE_PAGE_TYPE',
    payload: type,
  }
}

export const setActivePageTitle = (title) => {
  document.title = `ECMASyntax - ${title}`;
  return {
    type: 'ACTIVE_PAGE_TITLE',
    payload: title,
  };
};

export const pageFetchSuccess = (page) => {
  return (dispatch) => {
    dispatch(setActivePage(page));    
    dispatch(pageIsLoading(false));
  };
};

export const fetchPage = (route) => {
  return (dispatch) => {
    let networkDataRecieved = false;
    let cacheDataRecieved = false;

    dispatch(setActiveRoute(route));
    dispatch(progressUpdate(0));
    dispatch(pageIsLoading(true));
    dispatch(pageFetchError(false));

    dispatch(toggleDrawer(false));

    switch (true) {
      case /^\/pages\/(.*)$/.test(route):
        // here we make two requests, one to the cache, one to the network. 
        // The idea is to show the cached data first, 
        // then inform the user when/if the network data arrives and the
        // content is newer than the cached response.

        dispatch(progressUpdate(50)); 
        
        // fetch fresh data
        const networkUpdate = fetch(`/api${route}`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
            if (!cacheDataRecieved) dispatch(progressUpdate(0));
          }
          return response;
        })
        .then((response) => { 
          if (!cacheDataRecieved) dispatch(progressUpdate(75));
          return response.json(); 
        })
        .then((response) => {
          networkDataRecieved = true;
          if (!cacheDataRecieved) {
            // we have used the data from the network request as the response here
            dispatch(progressUpdate(100));
            dispatch(setActivePageType('article'));
            dispatch(setActivePageTitle(response.fields.name));
            dispatch(pageFetchSuccess(response));
          }
          if (cacheDataRecieved) {
            if (cacheDataRecieved.sys.updatedAt !== response.sys.updatedAt) {
              // the network request response has newer content than the cached response
              dispatch(pushToast('Newer content is available, reload to update', 'reload', false, () => {
                location.reload();            
              }));
            } else {
              // the cached content is up to date
            }
          }
        })
        .catch((err) => {
          dispatch(progressUpdate(0));
          dispatch(pageFetchError(true));
          throw err;
        });

        // fetch cached data
        caches.match(`/api${route}`).then((response) => {
          if (!response) throw Error("No data");
          return response.json();
        }).then((data) => {
          cacheDataRecieved = data;
          
          if (!networkDataRecieved) {
            // we have used the data from the cache as the response here
            dispatch(progressUpdate(100));
            dispatch(setActivePageType('article'));
            dispatch(pageFetchSuccess(data));
            dispatch(setActivePageTitle(data.fields.name));
          }
        }).catch(() => {
          return networkUpdate;
        }).catch((err) => {
          console.log(err);
        });
      break;
      default:
        dispatch(pageIsLoading(false));
        dispatch(pageFetchSuccess({ fields: { name: route.substring(1), route } }));
    }
  };
};

