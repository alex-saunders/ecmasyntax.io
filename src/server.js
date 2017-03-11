import path from 'path';
import walk from 'walk';
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import React from 'react';
import { createStore } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import allReducers from "./reducers";
import App from './components/App';
import { Provider } from 'react-redux';

import { buildArticles } from './build';

const __api = 'articles';
var __dirname = 'public';

buildArticles().then(_ => {

  var app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  function fetchPage(req, res, callback) {
    var filePath = req.params.dirId ? path.join(__dirname, __api, req.params.dirId, req.params.pageId) : path.join(__dirname, __api, req.params.pageId);
    fs.readFile(filePath, 'utf8', (err, data) => {
      setTimeout(_ => {
        return callback(err, data ? JSON.parse(data) : data);
      }, 0);
    })
  }

  function handleRender(req, res, preloadedState) {

      const store = createStore(allReducers, preloadedState);

      const css = new Set(); // CSS for all rendered React components
      const context = { insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())) };
      const html = renderToString(
          <Provider store={store}>
              <App context={context}></App>
          </Provider>
      );

      const finalState = store.getState();
      const title = preloadedState.activePage ? preloadedState.activePage.article.attributes.title : 'ECMASyntax.io'
      const response = `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>
            <style>
              ${[...css].join('')}
            </style>
          </head>
          <body>
            <div id="root">${html}</div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="/static/app.js" async></script>
          </body>
        </html>
        `

      res.send(response);
  }

  var router = express.Router();

  // middleware used for all public requests
  router.use(function(req, res, next) {
    // console.log('request made.');
    next();
  });

  // page deep linked
  router.route('/articles/:dirId?/:pageId').get(function(req, res) {
    fetchPage(req, res, (err, data) => {
      if (err) {
        res.status(404).send(data);
        // handleRender(req, res, {});
      }
      else {
        let preloadedState = {
          activePage: {
            article: data,
            route: req.url
          }
        }
        handleRender(req, res, preloadedState);
      }
    });
  });

  // no page deep linked (homepage)
  router.get('*', function(req, res) {
    handleRender(req, res, {})
  });

  var APIRouter = express.Router();

  // middleware used for all API requests
  APIRouter.use(function(req, res, next) {
    // console.log('api request made.');
    next();
  });

  APIRouter.get('/', function(req, res) {
    res.json({
      message: 'Welcome to my api'
    });
  });

  APIRouter.route('/articles').get(function(req, res) {
    var files = [];
    var walker = walk.walk(path.join(__dirname, __api));
    walker.on("file", function (root, file, next) {
      if (file.type === 'file') {
        let fileObj = {
          category: root.replace(__dirname, '').replace(__api, '').replace(/\//g, ''),
          name: file.name,
          route: path.join(root, file.name).replace(__dirname, '')
        }
        files.push(fileObj);
      }
      next();
    });
    walker.on("end", function () {
      res.json(files)
    });
  });

  APIRouter.route('/articles/:dirId?/:pageId').get(function(req, res) {
    var data = fetchPage(req, res, (err, data) => {
      if (err) {
        res.status(404).send(data);
      }
      else {
        res.status(200).json(data)
      }
    });
  })

  app.use('/static', express.static(path.join(__dirname, 'static')));

  app.use('/api', APIRouter);

  app.use('/', router);

  app.use('*', (req, res) => {
    res.status(404);
  })

  var port = process.env.PORT || 8080;

  app.listen(port);
  console.log(`server listening on port ${port}...`);

});
