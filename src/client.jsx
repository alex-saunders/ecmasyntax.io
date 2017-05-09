import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configure-store';
import App from './components/app';

require('babel-polyfill');

console.log(`RUNNING IN %c${process.env.NODE_ENV.toUpperCase()} %cMODE`, "color: red;", "");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const store = configureStore();

const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
};

render(
  (<Provider store={store}>
    <App context={context}/>
  </Provider>),
  document.getElementById('root'));
