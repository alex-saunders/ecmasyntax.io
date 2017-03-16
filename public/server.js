/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(43);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(44);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(42);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;

      if (--inserted[id] <= 0) {
        var elem = document.getElementById(prefix + id);
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && btoa) {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var pageFetchError = exports.pageFetchError = function pageFetchError(bool) {
	return {
		type: "PAGE_ERROR",
		payload: bool
	};
};

var pageIsLoading = exports.pageIsLoading = function pageIsLoading(bool) {
	return {
		type: "PAGE_LOADING",
		payload: bool
	};
};

var pageFetchSuccess = exports.pageFetchSuccess = function pageFetchSuccess(page) {
	return {
		type: "PAGE_FETCH_SUCCESS",
		payload: page
	};
};

var setActiveRoute = exports.setActiveRoute = function setActiveRoute(page) {
	return {
		type: "ACTIVE_ROUTE",
		payload: page
	};
};

var fetchPage = exports.fetchPage = function fetchPage(page) {
	return function (dispatch) {
		dispatch(pageIsLoading(true));
		dispatch(pageFetchError(false));
		setTimeout(function () {

			fetch("/api" + page).then(function (response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(pageIsLoading(false));
				return response;
			}).then(function (response) {
				return response.json();
			}).then(function (response) {
				dispatch(pageFetchSuccess(response));
				dispatch(setActiveRoute(page));
				document.title = response.attributes.title;
			}).catch(function (err) {
				console.log('ERROR', err);
				dispatch(pageFetchError(true));
				document.title = 'nope fail';
			});
		}, 100);
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("replace-ext");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("walk");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(7);

var _path2 = _interopRequireDefault(_path);

var _walk = __webpack_require__(10);

var _walk2 = _interopRequireDefault(_walk);

var _express = __webpack_require__(47);

var _express2 = _interopRequireDefault(_express);

var _fs = __webpack_require__(6);

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = __webpack_require__(45);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _replaceExt = __webpack_require__(9);

var _replaceExt2 = _interopRequireDefault(_replaceExt);

var _redux = __webpack_require__(8);

var _server = __webpack_require__(52);

var _reducers = __webpack_require__(24);

var _reducers2 = _interopRequireDefault(_reducers);

var _App = __webpack_require__(14);

var _App2 = _interopRequireDefault(_App);

var _reactRedux = __webpack_require__(4);

var _build = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var __api = 'articles';
var __dirname = 'public';

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

function startServer() {
  app.listen(port);
  console.log('server listening on port ' + port + ' in ' + "development" + ' mode');
}

function fetchPage(req, res, callback) {
  var filePath = req.params.dirId ? _path2.default.join(__dirname, __api, req.params.dirId, req.params.pageId) : _path2.default.join(__dirname, __api, req.params.pageId);
  filePath = (0, _replaceExt2.default)(filePath, '.json');
  _fs2.default.readFile(filePath, 'utf8', function (err, data) {
    setTimeout(function (_) {
      return callback(err, data ? JSON.parse(data) : data);
    }, 0);
  });
}

function handleRender(req, res, preloadedState) {

  var store = (0, _redux.createStore)(_reducers2.default, preloadedState);

  var css = new Set(); // CSS for all rendered React components
  var context = { insertCss: function insertCss() {
      for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
        styles[_key] = arguments[_key];
      }

      return styles.forEach(function (style) {
        return css.add(style._getCss());
      });
    } };
  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, { context: context })
  ));

  var finalState = store.getState();
  var title = preloadedState.activePage ? preloadedState.activePage.article.attributes.title : 'ECMASyntax.io';
  var response = '\n      <!doctype html>\n      <html>\n        <head>\n          <meta charset="utf-8">\n          <meta http-equiv="x-ua-compatible" content="ie=edge">\n          <meta name="viewport" content="width=device-width, initial-scale=1">\n          <title>' + title + '</title>\n          <style>\n            ' + [].concat(_toConsumableArray(css)).join('') + '\n          </style>\n        </head>\n        <body>\n          <div id="root">' + html + '</div>\n          <script>\n            window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n          </script>\n          <script src="/static/app.js" async></script>\n        </body>\n      </html>\n      ';
  res.send(response);
}

function handle404(req, res) {
  res.status(404).send('handling 404');
}

var router = _express2.default.Router();

// middleware used for all public requests
router.use(function (req, res, next) {
  // console.log('request made.');
  next();
});

// page deep linked
router.route('/articles/:dirId?/:pageId').get(function (req, res) {
  fetchPage(req, res, function (err, data) {
    if (err) {
      handle404(req, res);
    } else {
      var preloadedState = {
        activePage: {
          article: data,
          route: req.url
        }
      };
      handleRender(req, res, preloadedState);
    }
  });
});

// no page deep linked (homepage)
router.get('', function (req, res) {
  handleRender(req, res, {});
});

router.get('*', function (req, res) {
  return handle404(req, res);
});

var APIRouter = _express2.default.Router();

// middleware used for all API requests
APIRouter.use(function (req, res, next) {
  // console.log('api request made.');
  next();
});

APIRouter.get('/', function (req, res) {
  res.json({
    message: 'Welcome to my api'
  });
});

APIRouter.route('/articles').get(function (req, res) {
  var files = [];
  var walker = _walk2.default.walk(_path2.default.join(__dirname, __api));
  walker.on("file", function (root, file, next) {
    if (file.type === 'file') {
      var fileObj = {
        category: root.replace(__dirname, '').replace(__api, '').replace(/\//g, ''),
        name: (0, _replaceExt2.default)(file.name, ''),
        route: (0, _replaceExt2.default)(_path2.default.join(root, file.name).replace(__dirname, ''), '')
      };
      files.push(fileObj);
    }
    next();
  });
  walker.on("end", function () {
    res.json(files);
  });
});

APIRouter.route('/articles/:dirId?/:pageId').get(function (req, res) {
  var data = fetchPage(req, res, function (err, data) {
    if (err) {
      handle404(req, res);
    } else {
      res.status(200).json(data);
    }
  });
});

if (false) {
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
}

app.use('/static', _express2.default.static(_path2.default.join(__dirname, 'static')));

app.use('/api', APIRouter);

app.use('/', router);

app.use('*', function (req, res) {
  return handle404(req, res);
});

var port = __webpack_require__.i({"NODE_ENV":"development"}).PORT || 8080;

if (false) {
  (0, _build.buildArticles)().then(function (_) {
    startServer();
  });
} else {
  startServer();
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var pageListLoading = exports.pageListLoading = function pageListLoading(bool) {
	return {
		type: "PAGELIST_LOADING",
		payload: bool
	};
};

var pageListFetchError = exports.pageListFetchError = function pageListFetchError(bool) {
	return {
		type: "PAGELIST_ERROR",
		payload: bool
	};
};

var pageListFetchSuccess = exports.pageListFetchSuccess = function pageListFetchSuccess(pageList) {
	return {
		type: "PAGELIST_FETCH_SUCCESS",
		payload: pageList
	};
};

var fetchPageList = exports.fetchPageList = function fetchPageList() {

	return function (dispatch) {
		dispatch(pageListLoading(true));
		setTimeout(function () {

			fetch("/api/articles/").then(function (response) {
				dispatch(pageListLoading(false));
				return response;
			}).then(function (response) {
				return response.json();
			}).then(function (pageList) {
				dispatch(pageListFetchSuccess(pageList));
				return Promise.resolve(true);
			}).catch(function () {
				return dispatch(pageListFetchError(true));
			});
		}, 0);
	};
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildArticles = undefined;

var _fs = __webpack_require__(6);

var _fs2 = _interopRequireDefault(_fs);

var _frontMatter = __webpack_require__(48);

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _walk = __webpack_require__(10);

var _walk2 = _interopRequireDefault(_walk);

var _path = __webpack_require__(7);

var _path2 = _interopRequireDefault(_path);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _replaceExt = __webpack_require__(9);

var _replaceExt2 = _interopRequireDefault(_replaceExt);

var _marked = __webpack_require__(51);

var _marked2 = _interopRequireDefault(_marked);

var _dompurify = __webpack_require__(46);

var _dompurify2 = _interopRequireDefault(_dompurify);

var _jsdom = __webpack_require__(50);

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __src = 'src';
var __public = 'public';
var __articles = 'articles';

var window = _jsdom2.default.jsdom('', {
  features: {
    FetchExternalResources: false, // disables resource loading over HTTP / filesystem
    ProcessExternalResources: false // do not execute JS within script blocks
  }
}).defaultView;
var DOMPurify = (0, _dompurify2.default)(window);

_marked2.default.setOptions({
  highlight: function highlight(code) {
    return __webpack_require__(49).highlightAuto(code).value;
  }
});

function deleteFolder(folder) {
  if (_fs2.default.existsSync(folder)) {
    _fs2.default.readdirSync(folder).forEach(function (file, index) {
      var curPath = _path2.default.join(folder, file);
      if (_fs2.default.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        _fs2.default.unlinkSync(curPath);
      }
    });
    _fs2.default.rmdirSync(folder);
  }
};

var buildArticles = exports.buildArticles = function buildArticles() {

  return new Promise(function (resolve, reject) {

    deleteFolder(_path2.default.join(__public, __articles));
    _fs2.default.mkdirSync(_path2.default.join(__public, __articles));

    var files = [];
    var walker = _walk2.default.walk(_path2.default.join(__src, __articles));
    walker.on("file", function (root, file, next) {

      var absPath = _path2.default.join(root, file.name);
      var content = _fs2.default.readFileSync(absPath, 'utf-8');
      var obj = (0, _frontMatter2.default)(content);
      // sanitize (just in case), convert to html & syntax highlight the article body
      obj.html = (0, _marked2.default)(DOMPurify.sanitize(obj.body));

      var buildFolder = root.replace(__src, __public);
      var buildPath = (0, _replaceExt2.default)(absPath.replace(__src, __public), '.json');

      if (!_fs2.default.existsSync(buildFolder)) {
        _fs2.default.mkdirSync(buildFolder);
      }
      _fs2.default.writeFile(buildPath, JSON.stringify(obj), 'utf8');
      next();
    });
    walker.on("end", function () {
      console.log('Articles built');
      resolve();
    });
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _appRouter = __webpack_require__(20);

var _appRouter2 = _interopRequireDefault(_appRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextType = {
	// Enables critical path CSS rendering
	insertCss: _react.PropTypes.func.isRequired
};

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return this.props.context;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_appRouter2.default, null);
		}
	}]);

	return App;
}(_react2.default.Component);

App.propTypes = {
	context: _react.PropTypes.shape(ContextType).isRequired
};
App.childContextTypes = ContextType;
exports.default = App;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routeLink = __webpack_require__(16);

var _routeLink2 = _interopRequireDefault(_routeLink);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _categorySection = __webpack_require__(34);

var _categorySection2 = _interopRequireDefault(_categorySection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategorySection = function (_React$Component) {
  _inherits(CategorySection, _React$Component);

  function CategorySection(props) {
    _classCallCheck(this, CategorySection);

    var _this = _possibleConstructorReturn(this, (CategorySection.__proto__ || Object.getPrototypeOf(CategorySection)).call(this, props));

    _this.handleClick = function (e) {
      e.preventDefault();

      _this.icon.classList.toggle(_categorySection2.default['hidden']);
      _this.linksContainer.classList.toggle(_categorySection2.default['hidden']);
    };

    return _this;
  }

  _createClass(CategorySection, [{
    key: 'mapLinks',
    value: function mapLinks() {
      var _this2 = this;

      return this.props.links.map(function (page, index) {
        return _react2.default.createElement(
          _routeLink2.default,
          {
            key: index,
            active: (_this2.props.activeRoute ? _this2.props.activeRoute : null) === page.route,
            route: page.route,
            category: page.category,
            selectRoute: _this2.props.selectRoute },
          page.name
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: _categorySection2.default['categorySection'] },
        _react2.default.createElement(
          'a',
          { className: _categorySection2.default['categorySection-header'], href: '#', onClick: this.handleClick, ref: function ref(a) {
              _this3.header = a;
            } },
          this.props.category,
          _react2.default.createElement(
            'i',
            { className: 'material-icons ' + _categorySection2.default['chevron'], ref: function ref(i) {
                _this3.icon = i;
              } },
            'keyboard_arrow_down'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _categorySection2.default['categorySection-body'], ref: function ref(div) {
              _this3.linksContainer = div;
            } },
          this.mapLinks()
        )
      );
    }
  }]);

  return CategorySection;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_categorySection2.default)(CategorySection);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _routeLink = __webpack_require__(35);

var _routeLink2 = _interopRequireDefault(_routeLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouteLink = function (_React$Component) {
  _inherits(RouteLink, _React$Component);

  function RouteLink(props) {
    _classCallCheck(this, RouteLink);

    var _this = _possibleConstructorReturn(this, (RouteLink.__proto__ || Object.getPrototypeOf(RouteLink)).call(this, props));

    _this.clickHandler = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.props.selectRoute(_this.props.route);
    };

    return _this;
  }

  _createClass(RouteLink, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        {
          className: this.props.active ? _routeLink2.default['pageList-item'] + ' ' + _routeLink2.default['pageList-item-active'] : _routeLink2.default['pageList-item'],
          href: this.props.route,
          onClick: this.clickHandler },
        this.props.children
      );
    }
  }]);

  return RouteLink;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_routeLink2.default)(RouteLink);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _articleList = __webpack_require__(21);

var _articleList2 = _interopRequireDefault(_articleList);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _drawer = __webpack_require__(36);

var _drawer2 = _interopRequireDefault(_drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

    _this.searchIconClick = function () {
      _this.searchInput.focus();
    };

    _this.searchFocused = function () {
      _this.searchContainer.classList.add(_drawer2.default['focused']);
      _this.searchInput.click();
    };

    _this.searchUnfocused = function () {
      _this.searchContainer.classList.remove(_drawer2.default['focused']);
    };

    _this.handleInput = function (e) {
      _this.setState({
        searchQuery: e.target.value
      });

      if (e.target.value.length > 0) {
        _this.searchContainer.classList.add(_drawer2.default['non-empty']);
      } else {
        _this.searchContainer.classList.remove(_drawer2.default['non-empty']);
      }
    };

    _this.clearInput = function (e) {
      _this.setState({
        searchQuery: ''
      });
      _this.searchContainer.click();
      _this.searchContainer.classList.remove(_drawer2.default['non-empty']);
    };

    _this.state = {
      searchQuery: ''
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'aside',
        { className: _drawer2.default['drawer'] },
        _react2.default.createElement(
          'a',
          { className: _drawer2.default['drawer-logo'], href: '/' },
          _react2.default.createElement('img', { src: '/static/img/ecmasyntax-logo.png', alt: 'logo' })
        ),
        _react2.default.createElement('hr', { className: _drawer2.default['drawer-divider'] }),
        _react2.default.createElement(
          'div',
          { className: _drawer2.default['search-container'] },
          _react2.default.createElement(
            'label',
            { htmlFor: 'search',
              className: _drawer2.default['search-label'],
              onFocus: this.searchFocused,
              ref: function ref(label) {
                _this2.searchContainer = label;
              } },
            _react2.default.createElement(
              'button',
              { className: _drawer2.default['icon-container'], onClick: this.searchIconClick },
              _react2.default.createElement(
                'i',
                { className: 'material-icons ' + _drawer2.default['search-icon'] },
                'search'
              )
            ),
            _react2.default.createElement('input', { type: 'text', id: 'search', placeholder: 'Search for syntax',
              value: this.state.searchQuery,
              className: _drawer2.default['search-input'],
              onChange: this.handleInput,
              onBlur: this.searchUnfocused,
              ref: function ref(input) {
                _this2.searchInput = input;
              } }),
            _react2.default.createElement(
              'button',
              { className: _drawer2.default['icon-container'] + ' ' + _drawer2.default['search-closeIcon'], onClick: this.clearInput },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'close'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _drawer2.default['pageList-wrapper'] },
          _react2.default.createElement(_articleList2.default, {
            query: this.state.searchQuery,
            selectRoute: function selectRoute(page) {
              return _this2.props.selectRoute(page);
            } })
        ),
        _react2.default.createElement('hr', { className: _drawer2.default['drawer-divider'] }),
        _react2.default.createElement('div', { className: _drawer2.default['drawer-footer'] })
      );
    }
  }]);

  return Drawer;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_drawer2.default)(Drawer);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _articleView = __webpack_require__(22);

var _articleView2 = _interopRequireDefault(_articleView);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _main = __webpack_require__(37);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'main',
        { className: _main2.default['main'], ref: function ref(main) {
            _this2.main = main;
          } },
        _react2.default.createElement(
          'div',
          { className: _main2.default['content-wrapper'] },
          _react2.default.createElement(_articleView2.default, null),
          _react2.default.createElement('footer', { className: _main2.default['footer'] })
        )
      );
    }
  }]);

  return Main;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_main2.default)(Main);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _markdownContainer = __webpack_require__(39);

var _markdownContainer2 = _interopRequireDefault(_markdownContainer);

var _atelierEstuaryLight = __webpack_require__(38);

var _atelierEstuaryLight2 = _interopRequireDefault(_atelierEstuaryLight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownContainer = function (_React$Component) {
  _inherits(MarkdownContainer, _React$Component);

  function MarkdownContainer(props) {
    _classCallCheck(this, MarkdownContainer);

    return _possibleConstructorReturn(this, (MarkdownContainer.__proto__ || Object.getPrototypeOf(MarkdownContainer)).call(this, props));
  }

  _createClass(MarkdownContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: _markdownContainer2.default['markdown-wrapper'], dangerouslySetInnerHTML: { __html: this.props.content } });
    }
  }]);

  return MarkdownContainer;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_markdownContainer2.default, _atelierEstuaryLight2.default)(MarkdownContainer);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _activePage = __webpack_require__(5);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _base = __webpack_require__(41);

var _base2 = _interopRequireDefault(_base);

var _drawer = __webpack_require__(17);

var _drawer2 = _interopRequireDefault(_drawer);

var _main = __webpack_require__(18);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppRouter = function (_React$Component) {
  _inherits(AppRouter, _React$Component);

  function AppRouter(props) {
    _classCallCheck(this, AppRouter);

    var _this = _possibleConstructorReturn(this, (AppRouter.__proto__ || Object.getPrototypeOf(AppRouter)).call(this, props));

    _this.onPopstate = function () {
      var path = window.location.pathname;
      _this.props.fetchPage(path);
    };

    _this.selectRoute = function (page) {
      if (_this.props.route === page) return;

      console.log('MANUAL SELECT %c' + page, "color: darkblue;");

      window.history.pushState(null, null, page);
      return _this.onPopstate();
    };

    return _this;
  }

  _createClass(AppRouter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('popstate', this.onPopstate);

      if (this.props.route) {
        // route set from url
        console.log('DEEP LINKED TO %c' + this.props.route, "color: blue");
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('popstate', this.onPopstate);
    }

    // route change function

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _base2.default['app-container'] },
        _react2.default.createElement(_drawer2.default, { selectRoute: this.selectRoute }),
        _react2.default.createElement(_main2.default, null)
      );
    }
  }]);

  return AppRouter;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    route: state.activePage.route,
    hasErrored: state.activePage.pageListError,
    isLoading: state.activePage.pageListLoading
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: function fetchPage(url) {
      return dispatch((0, _activePage.fetchPage)(url));
    }
  };
}

exports.default = (0, _withStyles2.default)(_base2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(AppRouter));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _articleList = __webpack_require__(12);

var _activePage = __webpack_require__(5);

var _categorySection = __webpack_require__(15);

var _categorySection2 = _interopRequireDefault(_categorySection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleList = function (_React$Component) {
  _inherits(ArticleList, _React$Component);

  function ArticleList(props) {
    _classCallCheck(this, ArticleList);

    var _this = _possibleConstructorReturn(this, (ArticleList.__proto__ || Object.getPrototypeOf(ArticleList)).call(this, props));

    _this.organisePages = function () {
      var pages = void 0;
      if (_this.props.query.length > 0) {
        pages = _this.props.pages.filter(function (page) {
          return page.name.toLowerCase().match(_this.props.query) || page.category.toLowerCase().match(_this.props.query);
        });
      } else {
        pages = _this.props.pages;
      }

      var sortedPages = {};
      pages.forEach(function (page) {
        if (!sortedPages[page.category]) {
          sortedPages[page.category] = {
            pages: []
          };
        }
        sortedPages[page.category].pages.push(page);
      });
      return _this.mapPages(sortedPages);
    };

    _this.mapPages = function (pages) {
      var output = Object.keys(pages).map(function (category, index) {
        var links = pages[category].pages;
        return _react2.default.createElement(_categorySection2.default, { key: index, category: category, links: links, activeRoute: _this.props.activeRoute, selectRoute: _this.selectRoute });
      });
      return output;
    };

    _this.selectRoute = function (page) {
      _this.props.selectRoute(page);
    };

    return _this;
  }

  _createClass(ArticleList, [{
    key: 'gotPageList',
    value: function gotPageList() {
      console.log('got page list');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchPageList(this.gotPageList);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.hasErrored) {
        return _react2.default.createElement(
          'p',
          null,
          'Sorry! There was an error loading the items'
        );
      }

      if (this.props.isLoading) {
        return _react2.default.createElement('p', null);
      }

      return _react2.default.createElement(
        'div',
        { className: 'pageList' },
        this.organisePages()
      );
    }
  }]);

  return ArticleList;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    hasErrored: state.pageList.pageListError,
    isLoading: state.pageList.pageListLoading,
    pages: state.pageList.pages,
    activeRoute: state.activePage.route
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: function fetchPageList() {
      return dispatch((0, _articleList.fetchPageList)());
    }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(ArticleList);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _markdownContainer = __webpack_require__(19);

var _markdownContainer2 = _interopRequireDefault(_markdownContainer);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _articleView = __webpack_require__(40);

var _articleView2 = _interopRequireDefault(_articleView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBLE = { transform: 'translateX(0)', opacity: '1' },
    HIDDEN = { transform: 'translateX(60px)', opacity: '0' };

var OUT_KEYFRAMES = [VISIBLE, HIDDEN];
var IN_KEYFRAMES = [HIDDEN, VISIBLE];
var ANIM_OPTIONS = {
  duration: 350,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  iterations: 1
};

var ArticleView = function (_React$Component) {
  _inherits(ArticleView, _React$Component);

  function ArticleView(props) {
    _classCallCheck(this, ArticleView);

    var _this = _possibleConstructorReturn(this, (ArticleView.__proto__ || Object.getPrototypeOf(ArticleView)).call(this, props));

    _this.ANIMATING_OUT = false;
    _this.outAnim;
    _this.inAnim;

    if (_this.props.activePage) {
      _this.state = {
        content: _react2.default.createElement(_markdownContainer2.default, { content: _this.props.activePage.jsx })
      };
    } else {
      _this.state = {
        content: _react2.default.createElement(
          'div',
          null,
          'no page selected'
        )
      };
    }
    return _this;
  }

  _createClass(ArticleView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isLoading) {
        this._out(nextProps.activePage);
      }
      if (!nextProps.isLoading && !nextProps.hasErrored) {
        this._in(nextProps);
      }
    }
  }, {
    key: '_out',
    value: function _out() {
      var _this2 = this;

      if (this.ANIMATING_OUT) return;

      this.ANIMATING_OUT = true;
      this.outAnim = this.pageContainer.animate(OUT_KEYFRAMES, ANIM_OPTIONS);
      this.outAnim.onfinish = function (_) {
        _this2.setState({
          content: _react2.default.createElement(
            'div',
            null,
            'loading'
          )
        });
        _this2.ANIMATING_OUT = false;
      };
    }
  }, {
    key: '_in',
    value: function _in(nextProps) {
      var _this3 = this;

      if (this.ANIMATING_OUT) {
        this.outAnim.onfinish = function (_) {
          _this3.ANIMATING_OUT = false;
          _this3._animateIn(nextProps);
        };
      } else {
        this._animateIn(nextProps);
      }
    }
  }, {
    key: '_animateIn',
    value: function _animateIn(nextProps) {
      var _this4 = this;

      this.setState({
        content: _react2.default.createElement(_markdownContainer2.default, { content: nextProps.activePage.jsx })
      });

      this.inAnim = this.pageContainer.animate(IN_KEYFRAMES, ANIM_OPTIONS).onfinish = function (_) {
        _this4.pageContainer.style.transform = 'scale(1)';
        _this4.pageContainer.style.opacity = '1';
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { className: _articleView2.default['page-view'], ref: function ref(div) {
            _this5.pageContainer = div;
          } },
        this.state.content
      );
    }
  }]);

  return ArticleView;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    activePage: state.activePage.article,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading
  };
}

exports.default = (0, _withStyles2.default)(_articleView2.default)((0, _reactRedux.connect)(mapStateToProps)(ArticleView));

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PAGE_ERROR':
      {
        return Object.assign({}, state, {
          hasErrored: action.payload
        });
      }
    case 'PAGE_LOADING':
      {
        return Object.assign({}, state, {
          isLoading: action.payload
        });
      }
    case 'PAGE_FETCH_SUCCESS':
      {
        return Object.assign({}, state, {
          article: action.payload
        });
      }
    case 'ACTIVE_ROUTE':
      {
        return Object.assign({}, state, {
          route: action.payload
        });
      }
    default:
      {
        return state;
      }
  }
};

var initialState = {
  pageIsLoading: false,
  pageHasErrored: false,
  route: null
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(8);

var _pageList = __webpack_require__(25);

var _pageList2 = _interopRequireDefault(_pageList);

var _activePage = __webpack_require__(23);

var _activePage2 = _interopRequireDefault(_activePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  pageList: _pageList2.default,
  activePage: _activePage2.default
});

exports.default = allReducers;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PAGELIST_ERROR':
      {
        return Object.assign({}, state, {
          pageListError: action.payload
        });
      }
    case 'PAGELIST_LOADING':
      {
        return Object.assign({}, state, {
          pageListLoading: action.payload
        });
      }
    case 'PAGELIST_FETCH_SUCCESS':
      {
        return Object.assign({}, state, {
          pages: action.payload
        });
      }
    default:
      {
        return state;
      }
  }
};

var initialState = {
  pages: [],
  pageListError: false,
  pageListLoading: false
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes category-section_fadeIn_29l {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes category-section_fadeIn_29l {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.category-section_categorySection_21v {\n  padding-bottom: 8px; }\n\n.category-section_categorySection-header_33d {\n  -webkit-animation: category-section_fadeIn_29l 0.2s;\n          animation: category-section_fadeIn_29l 0.2s;\n  position: relative;\n  display: block;\n  text-decoration: none;\n  padding: 8px 8px 8px 16px;\n  margin: 0;\n  font-size: 16px;\n  color: #666; }\n  .category-section_categorySection-header_33d .category-section_chevron_izC {\n    float: right;\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear; }\n  .category-section_categorySection-header_33d .category-section_chevron_izC.category-section_hidden_2po {\n    -webkit-transform: rotateX(180deg);\n            transform: rotateX(180deg); }\n\n.category-section_categorySection-body_3ZU {\n  -webkit-animation: category-section_fadeIn_29l 0.2s;\n          animation: category-section_fadeIn_29l 0.2s; }\n\n.category-section_categorySection-body_3ZU.category-section_hidden_2po {\n  display: none; }\n", ""]);

// exports
exports.locals = {
	"categorySection": "category-section_categorySection_21v",
	"categorySection-header": "category-section_categorySection-header_33d",
	"fadeIn": "category-section_fadeIn_29l",
	"chevron": "category-section_chevron_izC",
	"hidden": "category-section_hidden_2po",
	"categorySection-body": "category-section_categorySection-body_3ZU"
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes route-link_fadeIn_3MB {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes route-link_fadeIn_3MB {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.route-link_pageList-item_1lY {\n  display: block;\n  position: relative;\n  text-decoration: none;\n  color: #333;\n  padding: 5px 16px 5px 24px;\n  cursor: pointer;\n  -webkit-transition: all .1s linear;\n  transition: all .1s linear; }\n\n.route-link_pageList-item_1lY:hover, .route-link_pageList-item-active_3n- {\n  background-color: #fbce13; }\n", ""]);

// exports
exports.locals = {
	"pageList-item": "route-link_pageList-item_1lY",
	"pageList-item-active": "route-link_pageList-item-active_3n-",
	"fadeIn": "route-link_fadeIn_3MB"
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes drawer_fadeIn_2FE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes drawer_fadeIn_2FE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.drawer_drawer_3d3 {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  z-index: 99;\n  height: 100vh;\n  width: 90%;\n  max-width: 280px;\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);\n  overflow: hidden; }\n\n.drawer_drawer-logo_28M {\n  display: block;\n  padding: 16px; }\n  .drawer_drawer-logo_28M img {\n    width: 100%;\n    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); }\n\n.drawer_drawer-divider__tl {\n  border: 1px solid #e6e6e6;\n  border-bottom: none;\n  margin: 0; }\n\n.drawer_search-container_T81 {\n  padding: 18px; }\n\n.drawer_search-label_2Qu {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  width: 100%;\n  height: 24px; }\n\n.drawer_search-icon_3Kp {\n  height: 24px;\n  width: 24px;\n  color: #454444;\n  opacity: 0.8;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.drawer_search-closeIcon_1XQ {\n  position: absolute;\n  right: 0;\n  bottom: 2px;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n  .drawer_search-closeIcon_1XQ i {\n    width: 18px;\n    height: 22px;\n    font-size: 18px;\n    line-height: 22px; }\n\n.drawer_search-input_1II {\n  position: relative;\n  bottom: 6px;\n  height: 30px;\n  outline: 0;\n  border: none;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 4px 22px 4px 4px;\n  border-bottom: 1px solid #454444;\n  overflow: hidden;\n  font-size: 14px; }\n\n.drawer_search-label_2Qu:after {\n  display: block;\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 24px;\n  height: 2px;\n  background-color: #454444;\n  width: 10px;\n  visibility: hidden;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.drawer_search-label_2Qu.drawer_focused_Fis .drawer_search-icon_3Kp, .drawer_search-label_2Qu.drawer_non-empty_35T .drawer_search-icon_3Kp {\n  opacity: 1; }\n\n.drawer_search-label_2Qu.drawer_focused_Fis::after {\n  visibility: visible;\n  width: calc(100% - 24px); }\n\n.drawer_search-label_2Qu.drawer_non-empty_35T .drawer_search-closeIcon_1XQ {\n  visibility: visible;\n  opacity: 1;\n  -webkit-transform: scale(1);\n          transform: scale(1); }\n\n.drawer_icon-container_2BX {\n  background: none;\n  border: none;\n  padding: 0;\n  margin: 0;\n  cursor: pointer; }\n\n.drawer_pageList-wrapper_xWh {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 0px 0px 18px;\n  overflow: auto; }\n\n.drawer_drawer-footer_2Eb {\n  height: 200px;\n  background-color: #fcfcfc; }\n", ""]);

// exports
exports.locals = {
	"drawer": "drawer_drawer_3d3",
	"drawer-logo": "drawer_drawer-logo_28M",
	"drawer-divider": "drawer_drawer-divider__tl",
	"search-container": "drawer_search-container_T81",
	"search-label": "drawer_search-label_2Qu",
	"search-icon": "drawer_search-icon_3Kp",
	"search-closeIcon": "drawer_search-closeIcon_1XQ",
	"search-input": "drawer_search-input_1II",
	"focused": "drawer_focused_Fis",
	"non-empty": "drawer_non-empty_35T",
	"icon-container": "drawer_icon-container_2BX",
	"pageList-wrapper": "drawer_pageList-wrapper_xWh",
	"drawer-footer": "drawer_drawer-footer_2Eb",
	"fadeIn": "drawer_fadeIn_2FE"
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes main_fadeIn_27_ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes main_fadeIn_27_ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.main_main_2sg {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  min-height: 100vh;\n  border-top: 5px solid #fbce13;\n  background-color: #fcfcfc;\n  overflow: auto; }\n\n.main_content-wrapper_SPa {\n  min-height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n.main_footer_Qhq {\n  padding: 16px;\n  width: 100%;\n  background: #fbce13;\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2); }\n  .main_footer_Qhq .main_githubButton-container_1SI {\n    float: right; }\n    .main_footer_Qhq .main_githubButton-container_1SI iframe {\n      float: right; }\n", ""]);

// exports
exports.locals = {
	"main": "main_main_2sg",
	"content-wrapper": "main_content-wrapper_SPa",
	"footer": "main_footer_Qhq",
	"githubButton-container": "main_githubButton-container_1SI",
	"fadeIn": "main_fadeIn_27_"
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-comment_OVg,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-quote_3yX {\n  color: #6c6b5a; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-variable_2M_,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-template-variable_23K,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-attribute_3l9,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-tag_2Xt,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-name_t5C,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-regexp_31E,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-link_3jF,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-name_t5C,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-selector-id_11K,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-selector-class_1W6 {\n  color: #ba6236; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-number_1bs,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-meta_do_,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-built_in_FLt,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-builtin-name_3Ev,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-literal_1aZ,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-type_lTD,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-params_3Cv {\n  color: #ae7313; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-string_3kC,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-symbol_McP,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-bullet_3vg {\n  color: #7d9726; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-title_27x,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-section_KEp {\n  color: #36a166; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-keyword_3Ph,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-selector-tag_1On {\n  color: #5f9182; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-deletion_2Ap,\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-addition_1wa {\n  color: #22221b;\n  display: inline-block;\n  width: 100%; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-deletion_2Ap {\n  background-color: #ba6236; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-addition_1wa {\n  background-color: #7d9726; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs_22u {\n  display: block;\n  overflow-x: auto;\n  background: #f4f3ec;\n  color: #5f5e4e;\n  padding: 0.5em; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-emphasis_2rT {\n  font-style: italic; }\n\n.atelier-estuary-light_markdown-wrapper_3Q9 .atelier-estuary-light_hljs-strong_1nx {\n  font-weight: bold; }\n", ""]);

// exports
exports.locals = {
	"markdown-wrapper": "atelier-estuary-light_markdown-wrapper_3Q9",
	"hljs-comment": "atelier-estuary-light_hljs-comment_OVg",
	"hljs-quote": "atelier-estuary-light_hljs-quote_3yX",
	"hljs-variable": "atelier-estuary-light_hljs-variable_2M_",
	"hljs-template-variable": "atelier-estuary-light_hljs-template-variable_23K",
	"hljs-attribute": "atelier-estuary-light_hljs-attribute_3l9",
	"hljs-tag": "atelier-estuary-light_hljs-tag_2Xt",
	"hljs-name": "atelier-estuary-light_hljs-name_t5C",
	"hljs-regexp": "atelier-estuary-light_hljs-regexp_31E",
	"hljs-link": "atelier-estuary-light_hljs-link_3jF",
	"hljs-selector-id": "atelier-estuary-light_hljs-selector-id_11K",
	"hljs-selector-class": "atelier-estuary-light_hljs-selector-class_1W6",
	"hljs-number": "atelier-estuary-light_hljs-number_1bs",
	"hljs-meta": "atelier-estuary-light_hljs-meta_do_",
	"hljs-built_in": "atelier-estuary-light_hljs-built_in_FLt",
	"hljs-builtin-name": "atelier-estuary-light_hljs-builtin-name_3Ev",
	"hljs-literal": "atelier-estuary-light_hljs-literal_1aZ",
	"hljs-type": "atelier-estuary-light_hljs-type_lTD",
	"hljs-params": "atelier-estuary-light_hljs-params_3Cv",
	"hljs-string": "atelier-estuary-light_hljs-string_3kC",
	"hljs-symbol": "atelier-estuary-light_hljs-symbol_McP",
	"hljs-bullet": "atelier-estuary-light_hljs-bullet_3vg",
	"hljs-title": "atelier-estuary-light_hljs-title_27x",
	"hljs-section": "atelier-estuary-light_hljs-section_KEp",
	"hljs-keyword": "atelier-estuary-light_hljs-keyword_3Ph",
	"hljs-selector-tag": "atelier-estuary-light_hljs-selector-tag_1On",
	"hljs-deletion": "atelier-estuary-light_hljs-deletion_2Ap",
	"hljs-addition": "atelier-estuary-light_hljs-addition_1wa",
	"hljs": "atelier-estuary-light_hljs_22u",
	"hljs-emphasis": "atelier-estuary-light_hljs-emphasis_2rT",
	"hljs-strong": "atelier-estuary-light_hljs-strong_1nx"
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Inconsolata);", ""]);

// module
exports.push([module.i, "@-webkit-keyframes markdown-container_fadeIn_1dl {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n@keyframes markdown-container_fadeIn_1dl {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.markdown-container_markdown-wrapper_14K {\n  line-height: 1.5;\n  -webkit-animation: markdown-container_fadeIn_1dl 0.4s;\n          animation: markdown-container_fadeIn_1dl 0.4s; }\n  .markdown-container_markdown-wrapper_14K h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em;\n    border-bottom: 1px solid #eaecef; }\n  .markdown-container_markdown-wrapper_14K h2 {\n    padding-bottom: 0.3em;\n    font-size: 1.5em;\n    border-bottom: 1px solid #eaecef; }\n  .markdown-container_markdown-wrapper_14K pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 5px solid #fbce13;\n    border-radius: 0px 3px 3px 0px; }\n    .markdown-container_markdown-wrapper_14K pre code {\n      font-family: 'Inconsolata', monospace;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .markdown-container_markdown-wrapper_14K table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .markdown-container_markdown-wrapper_14K table tr {\n      background-color: #fff; }\n      .markdown-container_markdown-wrapper_14K table tr th, .markdown-container_markdown-wrapper_14K table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .markdown-container_markdown-wrapper_14K table tr th {\n        font-weight: 600; }\n  .markdown-container_markdown-wrapper_14K hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, 0.1); }\n  .markdown-container_markdown-wrapper_14K a {\n    text-decoration: none;\n    color: #0366d6; }\n", ""]);

// exports
exports.locals = {
	"markdown-wrapper": "markdown-container_markdown-wrapper_14K",
	"fadeIn": "markdown-container_fadeIn_1dl"
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".article-view_page-view_2jS {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 16px; }\n", ""]);

// exports
exports.locals = {
	"page-view": "article-view_page-view_2jS"
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/icon?family=Material+Icons);", ""]);

// module
exports.push([module.i, "html, body {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  font-family: 'Source Sans Pro', sans-serif;\n  font-size: 16px; }\n\n* {\n  box-sizing: border-box; }\n\n.base_app-container_1op {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  height: 100vh;\n  width: 100vw; }\n", ""]);

// exports
exports.locals = {
	"app-container": "base_app-container_1op"
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(26);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(27);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./route-link.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./route-link.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(28);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./drawer.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./drawer.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(29);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./main.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(30);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./atelier-estuary-light.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./atelier-estuary-light.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(31);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./markdown-container.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./markdown-container.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(32);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./article-view.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./article-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(33);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./base.scss", function() {
        content = require("!!../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./base.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("dompurify");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("front-matter");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("highlight.js");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map