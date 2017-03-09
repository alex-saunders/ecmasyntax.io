/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(26);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(27);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(25);

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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

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
			}).catch(function () {
				dispatch(pageFetchError(true));
				document.title = 'nope fail';
			});
		}, 0);
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(33);

var _path2 = _interopRequireDefault(_path);

var _walk = __webpack_require__(35);

var _walk2 = _interopRequireDefault(_walk);

var _express = __webpack_require__(29);

var _express2 = _interopRequireDefault(_express);

var _fs = __webpack_require__(31);

var _fs2 = _interopRequireDefault(_fs);

var _frontMatter = __webpack_require__(30);

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _bodyParser = __webpack_require__(28);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(6);

var _server = __webpack_require__(34);

var _reducers = __webpack_require__(17);

var _reducers2 = _interopRequireDefault(_reducers);

var _App = __webpack_require__(9);

var _App2 = _interopRequireDefault(_App);

var _reactRedux = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var __api = 'articles';
var __dirname = 'public';

var app = (0, _express2.default)();

var StaticRouter = _express2.default.Router();

// middleware used for all public requests
StaticRouter.use(function (req, res, next) {
  // console.log('request made.');
  next();
});

// no page deep linked (homepage)
StaticRouter.get('/', function (req, res) {
  handleRender(req, res, {});
});

// page deep linked
StaticRouter.route('/articles/:dirId?/:pageId').get(function (req, res) {
  fetchPage(req, res, function (err, data) {
    if (err) {
      res.status(404).send(data);
      return;
    } else {
      var fmData = (0, _frontMatter2.default)(data);
      var preloadedState = {
        activePage: {
          article: fmData,
          route: req.url
        }
      };
      handleRender(req, res, preloadedState);
    }
  });
});

function fetchPage(req, res, callback) {
  var filePath = req.params.dirId ? _path2.default.join(__dirname, __api, req.params.dirId, req.params.pageId) : _path2.default.join(__dirname, __api, req.params.pageId);
  _fs2.default.readFile(filePath, 'utf8', function (err, data) {
    setTimeout(function (_) {
      return callback(err, data);
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
  var response = '\n      <!doctype html>\n      <html>\n        <head>\n          <title>' + title + '</title>\n          <style>\n            ' + [].concat(_toConsumableArray(css)).join('') + '\n          </style>\n        </head>\n        <body>\n          <div id="root">' + html + '</div>\n          <script>\n            window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n          </script>\n          <script src="/static/app.js" async></script>\n        </body>\n      </html>\n      ';

  res.send(response);
}

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

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
  walker.on("file", function (root, fileStats, next) {
    if (fileStats.type === 'file') {
      files.push(_path2.default.join(root, fileStats.name).substr(6));
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
      res.status(404).send(data);
    } else {
      res.status(200).json((0, _frontMatter2.default)(data));
    }
  });
});

app.use('/static', _express2.default.static(_path2.default.join(__dirname, 'static')));

app.use('/api', APIRouter);

app.use('/', StaticRouter);

var port = process.env.PORT || 8080;

app.listen(port);
console.log('server listening on port ' + port + '...');

/***/ }),
/* 8 */
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
				dispatch(pageListFetchSuccess(pageList));Promise.resolve(true);
			}).catch(function () {
				return dispatch(pageListFetchError(true));
			});
		}, 0);
	};
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _appRouter = __webpack_require__(13);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _articleList = __webpack_require__(14);

var _articleList2 = _interopRequireDefault(_articleList);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _drawer = __webpack_require__(23);

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

    _this.searchFocused = function () {
      _this.searchContainer.classList.add('focused');
      _this.searchInput.click();
    };

    _this.searchUnfocused = function () {
      _this.searchContainer.classList.remove('focused');
    };

    _this.handleInput = function (e) {
      _this.setState({
        searchQuery: e.target.value
      });

      if (e.target.value.length > 0) {
        _this.searchContainer.classList.add('non-empty');
      } else {
        _this.searchContainer.classList.remove('non-empty');
      }
    };

    _this.clearInput = function (e) {
      _this.setState({
        searchQuery: ''
      });
      _this.searchContainer.click();
      _this.searchContainer.classList.remove('non-empty');
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
        { className: 'drawer' },
        _react2.default.createElement(
          'a',
          { className: 'drawer-logo', href: '/' },
          _react2.default.createElement('img', { src: '/static/img/ecmasyntax-logo.png', alt: 'logo' })
        ),
        _react2.default.createElement('hr', { className: 'drawer-divider' }),
        _react2.default.createElement(
          'div',
          { className: 'search-container' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'search',
              className: 'search-label',
              onFocus: this.searchFocused,
              ref: function ref(label) {
                _this2.searchContainer = label;
              } },
            _react2.default.createElement(
              'button',
              { className: 'icon-container' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons search-icon' },
                'search'
              )
            ),
            _react2.default.createElement('input', { type: 'text', id: 'search', placeholder: 'Search for syntax',
              value: this.state.searchQuery,
              className: 'search-input',
              onChange: this.handleInput,
              onBlur: this.searchUnfocused,
              ref: function ref(input) {
                _this2.searchInput = input;
              } }),
            _react2.default.createElement(
              'button',
              { className: 'icon-container search-closeIcon', onClick: this.clearInput },
              _react2.default.createElement(
                'i',
                { className: 'material-icons ' },
                'close'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pageList-wrapper' },
          _react2.default.createElement(_articleList2.default, {
            query: this.state.searchQuery,
            selectRoute: function selectRoute(page) {
              return _this2.props.selectRoute(page);
            } })
        ),
        _react2.default.createElement('hr', { className: 'drawer-divider' }),
        _react2.default.createElement('div', { className: 'drawer-footer' })
      );
    }
  }]);

  return Drawer;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_drawer2.default)(Drawer);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

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
      _this.props.selectRoute(_this.props.route);
    };

    return _this;
  }

  _createClass(RouteLink, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "a",
        {
          className: this.props.active ? "pageList-item active" : "pageList-item",
          href: this.props.route,
          onClick: this.clickHandler },
        this.props.children
      );
    }
  }]);

  return RouteLink;
}(_react2.default.Component);

exports.default = RouteLink;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _articleView = __webpack_require__(15);

var _articleView2 = _interopRequireDefault(_articleView);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _main = __webpack_require__(24);

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

      return _react2.default.createElement(
        'main',
        { className: 'main' },
        _react2.default.createElement(
          'div',
          { className: 'content-wrapper' },
          _react2.default.createElement(_articleView2.default, null),
          _react2.default.createElement('footer', { className: 'footer' })
        )
      );
    }
  }]);

  return Main;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(_main2.default)(Main);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _activePage = __webpack_require__(5);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _base = __webpack_require__(22);

var _base2 = _interopRequireDefault(_base);

var _drawer = __webpack_require__(10);

var _drawer2 = _interopRequireDefault(_drawer);

var _main = __webpack_require__(12);

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
      _this.setState({
        activeRoute: path
      });
      _this.props.fetchPage(path);
    };

    _this.selectRoute = function (page) {
      console.log('manual select', page);

      window.history.pushState(null, null, page);
      return _this.onPopstate();
    };

    return _this;
  }

  _createClass(AppRouter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('popstate', this.onPopstate);
      // if (window.location.pathname !== '/') {
      //   console.log('WINDOW PATHNAME', window.location.pathname);
      //   this.props.fetchPage(window.location.pathname);
      // }
    }

    // route change function

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'app-container' },
        _react2.default.createElement(_drawer2.default, { selectRoute: this.selectRoute }),
        _react2.default.createElement(_main2.default, null)
      );
    }
  }]);

  return AppRouter;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _articleList = __webpack_require__(8);

var _activePage = __webpack_require__(5);

var _routeLink = __webpack_require__(11);

var _routeLink2 = _interopRequireDefault(_routeLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleList = function (_React$Component) {
  _inherits(ArticleList, _React$Component);

  function ArticleList(props) {
    _classCallCheck(this, ArticleList);

    var _this = _possibleConstructorReturn(this, (ArticleList.__proto__ || Object.getPrototypeOf(ArticleList)).call(this, props));

    _this.selectRoute = function (page) {
      _this.props.selectRoute(page);
    };

    return _this;
  }

  _createClass(ArticleList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchPageList();

      if (this.props.activeRoute) {
        // route set from url
        console.log('deep linked to', this.props.activeRoute);
      }
    }
  }, {
    key: 'mapPages',
    value: function mapPages() {
      var _this2 = this;

      var pages = void 0;
      if (this.props.query.length > 0) {
        pages = this.props.pages.filter(function (page) {
          return page.toLowerCase().match(_this2.props.query);
        });
      } else {
        pages = this.props.pages;
      }
      var items = pages.map(function (page, index) {
        return _react2.default.createElement(
          _routeLink2.default,
          {
            key: index,
            active: (_this2.props.activeRoute ? _this2.props.activeRoute : null) === page,
            route: page,
            selectRoute: _this2.selectRoute },
          page
        );
      });
      return items;
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
        return _react2.default.createElement(
          'p',
          null,
          'Loading\u2026'
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'pageList' },
        this.mapPages()
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _markdownToJsx = __webpack_require__(32);

var _markdownToJsx2 = _interopRequireDefault(_markdownToJsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleView = function (_React$Component) {
  _inherits(ArticleView, _React$Component);

  function ArticleView(props) {
    _classCallCheck(this, ArticleView);

    var _this = _possibleConstructorReturn(this, (ArticleView.__proto__ || Object.getPrototypeOf(ArticleView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ArticleView, [{
    key: 'render',
    value: function render() {
      var content = void 0;

      if (this.props.hasErrored) {
        content = _react2.default.createElement(
          'p',
          null,
          'Sorry! There was an error loading the items'
        );
      } else if (this.props.isLoading) {
        content = _react2.default.createElement(
          'p',
          null,
          'Loading\u2026'
        );
      } else if (this.props.activePage) {
        content = _react2.default.createElement(
          'div',
          { className: 'markdown-wrapper' },
          _react2.default.createElement(
            _markdownToJsx2.default,
            null,
            this.props.activePage.body
          )
        );
      } else {
        content = _react2.default.createElement(
          'div',
          null,
          'no page selected'
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'page-view' },
        content
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

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ArticleView);

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(6);

var _pageList = __webpack_require__(18);

var _pageList2 = _interopRequireDefault(_pageList);

var _activePage = __webpack_require__(16);

var _activePage2 = _interopRequireDefault(_activePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  pageList: _pageList2.default,
  activePage: _activePage2.default
});

exports.default = allReducers;

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/icon?family=Material+Icons);", ""]);

// module
exports.push([module.i, "html, body {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  font-family: 'Source Sans Pro', sans-serif;\n  font-size: 16px; }\n\n* {\n  box-sizing: border-box; }\n\n.app-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  height: 100vh;\n  width: 100vw; }\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".drawer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  z-index: 99;\n  height: 100vh;\n  width: 90%;\n  max-width: 280px;\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);\n  overflow: hidden; }\n\n.drawer-logo {\n  display: block;\n  padding: 18px; }\n\n.drawer-logo img {\n  width: 100%; }\n\n.drawer-divider {\n  border: 1px solid #e6e6e6;\n  border-bottom: none;\n  margin: 0; }\n\n.search-container {\n  padding: 18px; }\n\n.search-label {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  width: 100%;\n  height: 24px; }\n\n.search-icon {\n  height: 24px;\n  width: 24px;\n  color: #454444;\n  opacity: 0.8;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-closeIcon {\n  position: absolute;\n  right: 0;\n  bottom: 2px;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-closeIcon i {\n  width: 18px;\n  height: 22px;\n  font-size: 18px;\n  line-height: 22px; }\n\n.search-input {\n  position: relative;\n  bottom: 6px;\n  height: 30px;\n  outline: 0;\n  border: none;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 4px 22px 4px 4px;\n  border-bottom: 1px solid #454444;\n  overflow: hidden;\n  font-size: 14px; }\n\n.search-label:after {\n  display: block;\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 24px;\n  height: 2px;\n  background-color: #454444;\n  width: 10px;\n  visibility: hidden;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-label.focused .search-icon, .search-label.non-empty .search-icon {\n  opacity: 1; }\n\n.search-label.focused::after {\n  visibility: visible;\n  width: calc(100% - 24px); }\n\n.search-label.non-empty .search-closeIcon {\n  visibility: visible;\n  opacity: 1;\n  -webkit-transform: scale(1);\n          transform: scale(1); }\n\n.icon-container {\n  background: none;\n  border: none;\n  padding: 0;\n  margin: 0;\n  cursor: pointer; }\n\n.pageList-wrapper {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 0px 0px 18px;\n  overflow: auto; }\n\n.pageList {\n  min-height: 900px; }\n\n.pageList-item {\n  display: block;\n  position: relative;\n  text-decoration: none;\n  color: #333;\n  padding: 5px 16px;\n  cursor: pointer;\n  -webkit-transition: all .1s linear;\n  transition: all .1s linear; }\n\n.pageList-item:hover, .pageList-item.active {\n  background-color: #fbce13; }\n\n.drawer-footer {\n  height: 200px;\n  background-color: #fcfcfc; }\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".main {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  min-height: 100vh;\n  border-top: 5px solid #fbce13;\n  background-color: #fcfcfc;\n  overflow: auto; }\n\n.content-wrapper {\n  min-height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n.page-view {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 16px; }\n\n.footer {\n  height: 50px;\n  width: 100%;\n  background: #fbce13;\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2); }\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(19);
    var insertCss = __webpack_require__(3);

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
      module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./base.scss", function() {
        content = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./base.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(20);
    var insertCss = __webpack_require__(3);

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
      module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./drawer.scss", function() {
        content = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./drawer.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(21);
    var insertCss = __webpack_require__(3);

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
      module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
        content = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--1-2!../../node_modules/sass-loader/lib/loader.js!./main.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("front-matter");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("markdown-to-jsx");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("walk");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);