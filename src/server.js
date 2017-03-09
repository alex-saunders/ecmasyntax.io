import path from 'path';
import walk from 'walk';
import express from 'express';
import fs from 'fs';
import fm from 'front-matter';
import bodyParser from 'body-parser';
import React from 'react';
import { createStore } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import allReducers from "./reducers";
import App from './components/App';
import { Provider } from 'react-redux';

const __api = 'articles';
var __dirname = 'public';

var app = express();

var StaticRouter = express.Router();

// middleware used for all public requests
StaticRouter.use(function(req, res, next) {
  // console.log('request made.');
  next();
});

// no page deep linked (homepage)
StaticRouter.get('/', function(req, res) {
  handleRender(req, res, {})
});

// page deep linked
StaticRouter.route('/articles/:dirId?/:pageId').get(function(req, res) {
  fetchPage(req, res, (err, data) => {
    if (err) {
      res.status(404).send(data);
      return;
    }
    else {
      let fmData = fm(data);
      let preloadedState = {
        activePage: {
          article: fmData,
          route: req.url
        }
      }
      handleRender(req, res, preloadedState);
    }
  });
});

function fetchPage(req, res, callback) {
  var filePath = req.params.dirId ? path.join(__dirname, __api, req.params.dirId, req.params.pageId) : path.join(__dirname, __api, req.params.pageId);
  fs.readFile(filePath, 'utf8', (err, data) => {
    setTimeout(_ => {
      return callback(err, data);
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

    const response = `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  walker.on("file", function (root, fileStats, next) {
    if (fileStats.type === 'file') {
      files.push(path.join(root, fileStats.name).substr(6));
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
      res.status(200).json(fm(data))
    }
  });
})

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/api', APIRouter);

app.use('/', StaticRouter);

var port = process.env.PORT || 8080;

app.listen(port);
console.log(`server listening on port ${port}...`)
