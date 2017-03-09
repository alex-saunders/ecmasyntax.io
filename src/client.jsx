import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configure-store';
import App from './components/app';

require('babel-polyfill');

const store = configureStore();

const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
};

render(
  (<Provider store={store}>
    <App context={context}/>
  </Provider>),
  document.getElementById('root'));
