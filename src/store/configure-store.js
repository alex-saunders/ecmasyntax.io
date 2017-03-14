import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import allReducers from '../reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

let middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true
  });
  middleware = [ ...middleware, logger ];
}

export default function configureStore() {
  return createStore(
      allReducers,
      preloadedState,
      applyMiddleware(...middleware));
}
