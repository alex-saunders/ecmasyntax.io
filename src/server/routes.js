import express              from 'express';
import fs                   from 'fs';
import path                 from 'path';
import crypto               from 'crypto';
import staticModule         from 'static-module';
import React                from 'react'
import PropTypes            from 'prop-types'; 
import { createStore }      from 'redux'
import { Provider }         from 'react-redux'
import { renderToString }   from 'react-dom/server'

import { RUNTIME_CACHE }  from '../client/js/utils/constants';
import manifest           from '../../dist/client/static/manifest.json';
import App                from '../client/js/app';
import allReducers        from '../client/js/reducers/index';

const ContextType = {
  insertCss: PropTypes.func.isRequired,
};

function renderServerSide(req, res) {
  
  const store = createStore(allReducers);

  // Critical path CSS rendering
  const css = new Set(); // CSS for all rendered React components
  const context = { insertCss: (...styles) => {
    styles.forEach((style) => { css.add(style._getCss()); });
  } };

  const html = renderToString(
    <Provider store={store}>
      <App context={context}></App>
    </Provider>
  );

  const preloadedState = store.getState()
  
  renderFullPage(res, html, css, preloadedState); 
}

function renderFullPage(res, html = false, css = false, preloadedState = false) {
  res.send(`
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="preload" as="style" crossorigin onload="this.rel='stylesheet'">
        <link rel="shortcut icon" href="${manifest['icons/favicon.ico']}">
        <link rel="manifest" href="/manifest.json">
        ${css ? 
        `<style id="critical-css">
          ${[...css].join('').replace(/(\r\n|\n|\r)/gm,"")}
        </style>`
        :
        ''
        }
      </head>
      <body>
        ${html ?
        `<div id="root"><div>${html}</div></div>`
        :
        '<div id="root"></div>'
        }
        <script>
          if (navigator.serviceWorker) {
            navigator.serviceWorker.register('/sw.js');
          }
        </script>
        ${preloadedState ? 
        `<script>
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>`
        :
        ''
        }
        <script src="${manifest['vendor.js']}"></script>
        <script src="${manifest['app.js']}"></script>
      </body>
    </html>
  `);
}

const router = express.Router();

router.get('/sw.js', async (req, res) => {

  const input = fs.createReadStream(path.join('src', 'client', 'js', 'sw.js'));

  let precacheassetsToCache = Object.values(manifest);

  const precacheHash  = crypto.createHash('md5');

  for (let asset of precacheassetsToCache) {
    precacheHash.update(asset);
  }    

  const precacheDigest  = precacheHash.digest('hex');

  res.set('Content-Type', 'application/javascript');  
  input.pipe(
    staticModule({
      'static-precache-version': () => JSON.stringify(precacheDigest),
      'static-precache': () => JSON.stringify(precacheassetsToCache),
      'static-runtime': () => JSON.stringify(RUNTIME_CACHE),
    })
  ).pipe(res);
});

router.get('/manifest.json', (req, res) => {
  res.send(`
    {
      "name": "ECMASyntax",
      "short_name": "ECMASyntax",
      "start_url": ".",
      "display": "standalone",
      "background_color": "#28353e",
      "theme_color": "#00b4a2",
      "icons": [{
        "src": "${manifest['icons/android-icon-36x36.png']}",
        "sizes": "36x36",
        "type": "image/png"
      }, {
        "src": "${manifest['icons/android-icon-48x48.png']}",
        "sizes": "48x48",
        "type": "image/png"
      }, {
        "src": "${manifest['icons/android-icon-72x72.png']}",
        "sizes": "72x72",
        "type": "image/png"
      }, {
        "src": "${manifest['icons/android-icon-96x96.png']}",
        "sizes": "96x96",
        "type": "image/png"
      }, {
        "src": "${manifest['icons/android-icon-144x144.png']}",
        "sizes": "144x144",
        "type": "image/png"
      }, {
        "src": "${manifest['icons/android-icon-192x192.png']}",
        "sizes": "192x192",
        "type": "image/png"
      }]
    }
  `);
});

router.use('/static/js', (req, res, next) => {
  if (process.env.NODE_ENV === "production") {  
    // gzip the main chunks
    if (req.url.startsWith('/app') || req.url.startsWith('/vendor')) {  
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
    }
    res.setHeader('Cache-Control', 'max-age=31536000');    
  }
  next();
});

router.use(express.static(path.join('dist', 'client')));

router.use((req, res) => {
  if (process.env.NODE_ENV === "production") {
    renderServerSide(req, res);
  } else {
    // in development, dont do server side rendering
    renderFullPage(res);
  }
});

module.exports = router;