import { toggleDrawer, toggleSearch, progressUpdate } from './utils';
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
    dispatch(setActiveRoute(route));
    dispatch(progressUpdate(0));
    dispatch(pageIsLoading(true));
    dispatch(pageFetchError(false));

    dispatch(toggleDrawer(false));

    switch (true) {
      case /^\/pages\/(.*)$/.test(route):
        setTimeout(() => {
          dispatch(progressUpdate(50));          
          fetch(`/api${route}`)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
              dispatch(progressUpdate(0));              
            }
            return response;
          })
          .then((response) => { 
            dispatch(progressUpdate(75));
            return response.json(); 
          })
          .then((response) => {
            dispatch(progressUpdate(100));
            dispatch(setActivePageType('article'));
            dispatch(pageFetchSuccess(response));
            dispatch(setActivePageTitle(response.fields.name));
          })
          .catch((err) => {
            dispatch(progressUpdate(0));
            dispatch(pageFetchError(true));
            throw err;
          });
        }, 0);
        break;
      default:
        dispatch(pageIsLoading(false));
        dispatch(pageFetchSuccess({ fields: { name: route.substring(1), route } }));
    }
  };
};

