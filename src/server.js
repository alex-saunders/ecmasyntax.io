import path from 'path';
import express from 'express';
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
        page: null,
        route: null,
        pageIsLoading: false,
        pageHasErrored: false,
      },
      utils: {
        drawerOpen: false,
        searchOpen: false,
      },
      pageList: {
        entries: [],
        activePages: [],
        filters: [],
        query: '',
      },
    };

    this.app.set('port', (process.env.PORT || 5000));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  _fetchPage(req) {
    const spec = decodeURI(req.params.specId);
    const cat = decodeURI(req.params.catId);
    const pageName = decodeURI(req.params.pageId);

    return new Promise((resolve, reject) => {
      const index = this.preloadedState.pageList.entries.findIndex((page) => {
        const category = page.fields.category;
        const specification = category.fields.specification[0];

        return ((page.fields.name === pageName) &&
                (category.fields.name === cat) &&
                (specification.fields.name === spec));
      });
      if (index > -1) {
        resolve(this.preloadedState.pageList.entries[index]);
      } else {
        reject();
      }
    });
  }

  _handleRender(req, res, state = this.preloadedState) {
    const store = createStore(allReducers, state);

    const css = new Set(); // CSS for all rendered React components
    const context = { insertCss: (...styles) => { styles.forEach((style) => { css.add(style._getCss()); }); } };
    const html = renderToString(
      <Provider store={store}>
        <App context={context} />
      </Provider>,
    );
    const title = state.activePage.page ? `ECMASyntax - ${state.activePage.page.fields.name}` : 'ECMASyntax';
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
          <link rel="stylesheet" href="/static/font-awesome-4.7.0/css/font-awesome.min.css">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
          </script>
          <script src="/static/app.js" async></script>
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

    this.router.route('/:specId/:catId/:pageId').get((req, res) => {
      this._fetchPage(req)
      .then((entry) => {
        const newPreloadedState = {
          activePage: {
            page: entry,
            route: req.url,
            pageIsLoading: false,
            pageHasErrored: false,
          },
        };
        const state = Object.assign({}, this.preloadedState, newPreloadedState);
        this._handleRender(req, res, state);
      })
      .catch(() => {
        Server.handle404(req, res);
      });
    });

    this.router.get('/', (req, res) => {
      this._handleRender(req, res);
    });

    this.router.get('*', (req, res) => Server.handle404(req, res));
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

    this.APIRouter.route('/articles').get((req, res) => {
      // TODO
    });

    this.APIRouter.route('/articles/:specId/:catId/:pageId').get((req, res) => {
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
    this.app.get('*.js', (req, res, next) => {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
      next();
    });
  }

  _setupRouters() {
    this._setupRoutes();
    this._setupAPIRoutes();

    this.app.use('/static', express.static(path.join(this.__dirname, 'static')));

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
          const specification = category.fields.specification[0];
          const route = `/${specification.fields.name}/${category.fields.name}/${item.fields.name}`;

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
    if (process.env.NODE_ENV === 'production') {
      this._initCompression();
    }
    this._setupRouters();

    this._buildArticles().then((articles) => {
      const initialLoadedState = {
        pageList: {
          entries: articles.items,
          filters: [],
          query: '',
          activePages: articles.items,
        },
      };
      this.preloadedState = Object.assign({}, this.preloadedState, initialLoadedState);
      this.app.listen(this.app.get('port'));
      console.log(`server listening on port ${this.app.get('port')} in ${process.env.NODE_ENV} mode`);
    })
    .catch((err) => {
      throw err;
    });
  }
}

const server = new Server();
server.start();
