import { toggleDrawer, toggleSearch } from './utils';
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
    dispatch(pageIsLoading(true));
    dispatch(pageFetchError(false));

    dispatch(toggleDrawer(false));
    dispatch(toggleSearch(false));
    dispatch(search(''));

    switch (true) {
      case /^\/pages\/(.*)$/.test(route):
        setTimeout(() => {
          fetch(`/api${route}`)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then((response) => { return response.json(); })
          .then((response) => {
            dispatch(pageFetchSuccess(response));
          })
          .catch((err) => {
            dispatch(pageFetchError(true));
            throw err;
          });
        }, 400);
        break;
      default:
        dispatch(pageIsLoading(false));
        dispatch(pageFetchSuccess({ fields: { name: route.substring(1), route } }));
    }
  };
};

