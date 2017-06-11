import path from 'path';
import fs from 'fs';
import express from 'express';
import enforce from 'express-sslify';
import bodyParser from 'body-parser';
import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import jsdom from 'jsdom';
import allReducers from './reducers';
import App from './components/app';

const contentful = require('contentful');
const highlightjs = require('highlight.js');

class Server {
  constructor() {
    this.app = express();
    this.port = 5000;
    this.router = express.Router();
    this.APIRouter = express.Router();

    this.__api = 'articles';
    this.__dirname = 'public';

    // test api keys, will be replaced with environment vars when time comes to productionise
    this.contentfulClient = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE,
      accessToken: process.env.CONTENTFUL_TOKEN,
    });

    marked.setOptions({
      highlight: (code) => { return highlightjs.highlightAuto(code).value; },
    });
    const window = jsdom.jsdom('', {
      features: {
        FetchExternalResources: false,
        ProcessExternalResources: false,
      },
    }).defaultView;
    this.DOMPurify = createDOMPurify(window);

    this.preloadedState = {
      activePage: {
        page: {
          fields: {
            name: 'Home',
            route: '/',
          },
        },
        route: null,
        isLoading: true,
        hasErrored: false,
      },
      utils: {
        drawerOpen: false,
        searchOpen: false,
      },
      pageList: {
        entries: [],
        isLoading: true,
        hasErrored: false,
        activePages: [],
        filters: [],
        query: '',
      },
    };

    this.app.set('port', (process.env.PORT || 5000));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  _enforceHTTPS() {
    this.app.use(enforce.HTTPS());
  }

  _fetchPage(req) {
    const spec = decodeURI(req.params.specId);
    const cat = decodeURI(req.params.catId);
    const pageName = decodeURI(req.params.pageId);

    return new Promise((resolve, reject) => {
      const index = this.pages.findIndex((page) => {
        const category = page.fields.category;
        const specification = category.fields.specification;

        return ((page.fields.name === pageName) &&
                (category.fields.name === cat) &&
                (specification.fields.name === spec));
      });
      if (index > -1) {
        resolve(this.pages[index]);
      } else {
        reject();
      }
    });
  }

  _getBundlePath = () => {
    const stats = JSON.parse(fs.readFileSync(path.join('src', 'stats.json'), 'utf8'));
    this.bundlePath = stats.assetsByChunkName.main[0];
  }

  _render(req, res, state = this.preloadedState) {
    const store = createStore(allReducers, state);

    const css = new Set(); // CSS for all rendered React components
    const context = { insertCss: (...styles) => {
      styles.forEach((style) => { css.add(style._getCss()); });
    } };
    const html = renderToString(
      <Provider store={store}>
        <App context={context} />
      </Provider>,
    );

    const title = state.activePage.page ? `ECMASyntax - ${state.activePage.page.fields.name}` : 'ECMASyntax';
    const response = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${title}</title>
          <link rel="preload" href="https://fonts.googleapis.com/css?family=Roboto:400,500" as="font" crossorigin>
          <link rel="stylesheet" href="/static/font-awesome-4.7.0/css/font-awesome.min.css">
          <link rel="shortcut icon" href="/static/icons/favicon.ico">
          <link rel="manifest" href="/manifest.json">
          <meta name="theme-color" content="#28353e">

          <style id="server-css">
            ${[...css].join('')}
          </style>
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
          </script>
          ${process.env.NODE_ENV === 'production' ?
            `<script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-91502214-2', 'auto');
              ga('send', 'pageview');

            </script>`
            :
            ''
          }
          <script src="/static/output/${this.bundlePath}" async></script>
        </body>
      </html>
      `;
    res.send(response);
  }

  static handle404(req, res) {
    res.status(404).send('404 Page');
  }

  _setupRoutes() {
    this.router.use((req, res, next) => {
      next();
    });

    this.router.get('/sw.js', (req, res) => {
      res.sendFile('sw.js', { root: this.__dirname });
    });

    this.router.get('/manifest.json', (req, res) => {
      res.sendFile('manifest.json', { root: this.__dirname });
    });

    this.router.route('/pages/:specId/:catId/:pageId').get((req, res) => {
      this._render(req, res);
    });

    this.router.get('/', (req, res) => {
      this._render(req, res);
    });

    this.router.get('*', (req, res) => { Server.handle404(req, res); });
  }

  _setupAPIRoutes() {
    this.APIRouter.use((req, res, next) => {
      next();
    });

    this.APIRouter.get('/', (req, res) => {
      res.json({
        message: 'Welcome to my api',
      });
    });

    this.APIRouter.route('/pages/').get((req, res) => {
      const preloadedPageInfo = this.pages.map((page) => {
        return {
          fields: {
            category: page.fields.category,
            name: page.fields.name,
            route: page.fields.route,
            tags: page.fields.tags,
          },
          sys: {
            id: page.sys.id,
          },
        };
      });
      preloadedPageInfo.sort((a, b) => {
        return a.fields.category.fields.name.charCodeAt(0) -
                b.fields.category.fields.name.charCodeAt(0);
      });
      res.status(200).json(preloadedPageInfo);
    });

    this.APIRouter.route('/pages/:specId/:catId/:pageId').get((req, res) => {
      this._fetchPage(req, res)
      .then((entry) => {
        res.status(200).json(entry);
      })
      .catch(() => {
        Server.handle404(req, res);
      });
    });
  }

  _initCompression() {
    this.app.get(`/static/output/${this.bundlePath}`, (req, res, next) => {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
      res.setHeader('Cache-Control', 'max-age=31536000');
      next();
    });
  }

  _setupRouters() {
    this._setupRoutes();
    this._setupAPIRoutes();

    this.app.use('/static', express.static(path.join(this.__dirname, 'static')));

    // required for material-components-web
    this.app.use('/node_modules', express.static(path.join('node_modules')));

    this.app.use('/api', this.APIRouter);

    this.app.use('/', this.router);

    this.app.use('*', (req, res) => { Server.handle404(req, res); });
  }

  _buildArticles() {
    return new Promise((resolve, reject) => {
      this.contentfulClient.getEntries({
        content_type: 'syntaxEntry',
        include: 2,
      })
      .then((entries) => {
        const markedEntries = entries;
        entries.items.forEach((item, index) => {
          // create url for each page
          const category = item.fields.category;
          const specification = category.fields.specification;
          const route = `/pages/${specification.fields.name}/${category.fields.name}/${item.fields.name}`;

          markedEntries.items[index].fields.route = encodeURI(route);

          if (item.fields.blob) {
            const html = marked(item.fields.blob);
            markedEntries.items[index].fields.blob = html;
          } else {
            markedEntries.items[index].fields.blob = '';
          }
        });
        resolve(markedEntries);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  start() {
    this._getBundlePath();
    this._initCompression();
    this._setupRouters();
    this._enforceHTTPS();
    this._buildArticles()
    .then((pages) => {
      this.pages = pages.items;
      this.app.listen(this.app.get('port'));
      console.log(`server listening on port ${this.app.get('port')} in ${process.env.NODE_ENV} mode`);
    });
  }
}

const server = new Server();
server.start();
