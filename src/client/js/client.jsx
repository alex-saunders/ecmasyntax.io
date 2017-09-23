import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '../icons/android-icon-36x36.png';
import '../icons/android-icon-48x48.png';
import '../icons/android-icon-72x72.png';
import '../icons/android-icon-96x96.png';
import '../icons/android-icon-144x144.png';
import '../icons/android-icon-192x192.png';
import '../icons/favicon.ico';

import configureStore from './store/configure-store';
import App from './app';
import Main from './containers/main/main';

const store = configureStore();

const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    const removeCss = styles.map((x) => { return x._insertCss(); });
    return () => { removeCss.forEach((f) => { f(); }); };
  },
};

let initialRendering = true;
render(
  (<Provider store={store}>
    <App context={context}><Main /></App>
  </Provider>),
  document.getElementById('root'), () => {
    // app is now loaded on client side - remove server generated css
    if (initialRendering) {
      const node = document.getElementById('critical-css');
      if (node) {
        node.parentElement.removeChild(node);
        initialRendering = false;
      }
    }
  });
