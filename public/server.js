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
/******/ 	return __webpack_require__(__webpack_require__.s = 90);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(78);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(79);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(77);

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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react");

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
var toggleDrawer = exports.toggleDrawer = function toggleDrawer(bool) {
  return {
    type: 'TOGGLE_DRAWER',
    payload: bool
  };
};

var toggleSearch = exports.toggleSearch = function toggleSearch(bool) {
  return {
    type: 'TOGGLE_SEARCH',
    payload: bool
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ripple = __webpack_require__(59);

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ripple = function (_React$Component) {
  _inherits(Ripple, _React$Component);

  function Ripple(props) {
    _classCallCheck(this, Ripple);

    var _this = _possibleConstructorReturn(this, (Ripple.__proto__ || Object.getPrototypeOf(Ripple)).call(this, props));

    _this.onTouchStart = function (e) {
      e.stopPropagation();

      var rect = _this.container.getBoundingClientRect();
      _this.parentHeight = rect.height;
      _this.parentWidth = rect.width;
      _this.parentX = rect.left;
      _this.parentY = rect.top;

      var clickX = e.touches[0].pageX;
      var clickY = e.touches[0].pageY;

      var x = clickX - _this.parentX;
      var y = clickY - _this.parentY;

      _this.createRipple(x, y);
    };

    _this.onMouseDown = function (e) {
      var rect = _this.container.getBoundingClientRect();
      _this.parentHeight = rect.height;
      _this.parentWidth = rect.width;
      _this.parentX = rect.left;
      _this.parentY = rect.top;

      var clickX = e.pageX;
      var clickY = e.pageY;

      var x = clickX - _this.parentX;
      var y = clickY - _this.parentY;

      _this.createRipple(x, y);
    };

    _this.onMouseUp = function () {
      if (_this.state.activeRipple) {
        _this.fadeOutRipple(_this.state.activeRipple);
      }
    };

    _this.onMouseLeave = function () {
      if (_this.state.activeRipple) {
        _this.fadeOutRipple(_this.state.activeRipple);
      }
    };

    _this.createRipple = function (x, y) {
      var ripple = document.createElement('span');
      ripple.classList.add(_ripple2.default['ripple-origin']);

      ripple.style.transform = 'scale(0)';

      var size = Math.sqrt(Math.pow(_this.parentWidth, 2) + Math.pow(_this.parentHeight, 2));
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = x - size / 2 + 'px';
      ripple.style.top = y - size / 2 + 'px';

      ripple.classList.add(_ripple2.default.animatable);

      _this.container.appendChild(ripple);

      _this.setState({
        activeRipple: ripple
      });

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          ripple.style.transform = 'scale(2)';
        });
      });
    };

    _this.fadeOutRipple = function (ripple) {
      ripple.classList.add(_ripple2.default.out);

      ripple.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'opacity') {
          _this.removeRipple(ripple);
        }
      });
    };

    _this.removeRipple = function (ripple) {
      if (ripple && ripple.parentNode === _this.container) {
        _this.container.removeChild(ripple);
      }
    };

    _this.state = {
      activeRipple: null
    };
    return _this;
  }

  _createClass(Ripple, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: _ripple2.default['ripple-container'],
          onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp,
          onMouseLeave: this.onMouseLeave,
          ref: function ref(div) {
            _this2.container = div;
          }
        },
        this.props.children
      );
    }
  }]);

  return Ripple;
}(_react2.default.Component);

Ripple.propTypes = {
  children: _react.PropTypes.element
};

Ripple.defaultProps = {
  children: null
};

exports.default = (0, _withStyles2.default)(_ripple2.default)(Ripple);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var search = exports.search = function search(query) {
  return {
    type: 'SEARCH_QUERY',
    payload: query
  };
};

var addFilter = exports.addFilter = function addFilter(filter) {
  return {
    type: 'ADD_FILTER',
    payload: filter
  };
};

var removeFilter = exports.removeFilter = function removeFilter(filter) {
  return {
    type: 'REMOVE_FILTER',
    payload: filter
  };
};

var pageListLoading = exports.pageListLoading = function pageListLoading(bool) {
  return {
    type: 'PAGELIST_LOADING',
    payload: bool
  };
};

var pageListError = exports.pageListError = function pageListError(bool) {
  return {
    type: 'PAGELIST_ERROR',
    payload: bool
  };
};

var pageListFetchSuccess = exports.pageListFetchSuccess = function pageListFetchSuccess(entries) {
  console.log(entries);
  return {
    type: 'PAGELIST_FETCH_SUCCESS',
    payload: entries
  };
};

var fetchPageList = exports.fetchPageList = function fetchPageList() {
  return function (dispatch) {
    dispatch(pageListLoading(true));
    dispatch(pageListError(false));

    setTimeout(function () {
      fetch('/api/pages').then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        dispatch(pageListLoading(false));
        dispatch(pageListFetchSuccess(response));
      }).catch(function (err) {
        dispatch(pageListFetchSuccess(true));
        throw err;
      });
    }, 0);
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _activePage = __webpack_require__(9);

var _route = __webpack_require__(72);

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Route.__proto__ || Object.getPrototypeOf(Route)).call.apply(_ref, [this].concat(args))), _this), _this.clickHandler = function (e) {
      e.preventDefault();
      // console.info(`MANUAL SELECT %c${this.props.route}`, 'color: darkblue;');
      window.history.pushState(null, null, _this.props.route);
      _this.props.fetchPage(_this.props.route);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Route, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        {
          href: this.props.route,
          onClick: this.clickHandler,
          className: _route2.default.route
        },
        this.props.children
      );
    }
  }]);

  return Route;
}(_react2.default.Component);

Route.propTypes = {
  route: _react.PropTypes.string.isRequired,
  children: _react.PropTypes.element,
  fetchPage: _react.PropTypes.func.isRequired
};

Route.defaultProps = {
  children: null
};

function mapStateToProps() {
  return {};
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: function fetchPage(url) {
      dispatch((0, _activePage.fetchPage)(url));
    }
  };
}

exports.default = (0, _withStyles2.default)(_route2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(Route));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPage = exports.pageFetchSuccess = exports.setActivePage = exports.setActiveRoute = exports.pageIsLoading = exports.pageFetchError = undefined;

var _utils = __webpack_require__(5);

var _pageList = __webpack_require__(7);

var pageFetchError = exports.pageFetchError = function pageFetchError(bool) {
  return {
    type: 'PAGE_ERROR',
    payload: bool
  };
};

var pageIsLoading = exports.pageIsLoading = function pageIsLoading(bool) {
  return {
    type: 'PAGE_LOADING',
    payload: bool
  };
};

var setActiveRoute = exports.setActiveRoute = function setActiveRoute(route) {
  return {
    type: 'ACTIVE_ROUTE',
    payload: route
  };
};

var setActivePage = exports.setActivePage = function setActivePage(page) {
  document.title = 'ECMASyntax - ' + page.fields.name;
  return {
    type: 'ACTIVE_PAGE',
    payload: page
  };
};

var pageFetchSuccess = exports.pageFetchSuccess = function pageFetchSuccess(page) {
  return function (dispatch) {
    dispatch(setActivePage(page));
    dispatch(pageIsLoading(false));
  };
};

var fetchPage = exports.fetchPage = function fetchPage(route) {
  return function (dispatch) {
    dispatch(setActiveRoute(route));
    dispatch(pageIsLoading(true));
    dispatch(pageFetchError(false));

    dispatch((0, _utils.toggleDrawer)(false));
    dispatch((0, _utils.toggleSearch)(false));
    dispatch((0, _pageList.search)(''));

    switch (true) {
      case /\/$/.test(route):
        dispatch(pageIsLoading(false));
        dispatch(pageFetchSuccess({ fields: { name: 'Home', route: '/' } }));
        break;
      case /\/pages\/(.*)/.test(route):
        setTimeout(function () {
          fetch('/api' + route).then(function (response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            dispatch(pageFetchSuccess(response));
          }).catch(function (err) {
            dispatch(pageFetchError(true));
            throw err;
          });
        }, 0);
        break;
      default:
        throw Error('Invalid url: ' + route);
    }
  };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _loadingView = __webpack_require__(58);

var _loadingView2 = _interopRequireDefault(_loadingView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingView = function (_React$Component) {
  _inherits(LoadingView, _React$Component);

  function LoadingView(props) {
    _classCallCheck(this, LoadingView);

    var _this = _possibleConstructorReturn(this, (LoadingView.__proto__ || Object.getPrototypeOf(LoadingView)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(LoadingView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        _this2.setState({
          visible: true
        });
      }, 0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _loadingView2.default['loading-container'] },
        this.state.visible ? _react2.default.createElement(
          'svg',
          { className: _loadingView2.default.spinner, width: '65px', height: '65px', viewBox: '0 0 66 66', xmlns: 'http://www.w3.org/2000/svg' },
          _react2.default.createElement('circle', { className: _loadingView2.default.path, fill: 'none', strokeWidth: '6', strokeLinecap: 'round', cx: '33', cy: '33', r: '30' })
        ) : ''
      );
    }
  }]);

  return LoadingView;
}(_react2.default.Component);

LoadingView.propTypes = {
  color: _react.PropTypes.string,
  size: _react.PropTypes.string
};

LoadingView.defaultProps = {
  color: '#fff',
  size: '60px'
};

exports.default = (0, _withStyles2.default)(_loadingView2.default)(LoadingView);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// meta
var VERSION_NO = exports.VERSION_NO = '1.0.0';

// content model
var TAGGED_IN = exports.TAGGED_IN = 'taggedin';

// drawer
var INITIATE_DRAGGING_THRESHOLD = exports.INITIATE_DRAGGING_THRESHOLD = 30;
var DRAWER_CLOSE_THRESHOLD = exports.DRAWER_CLOSE_THRESHOLD = 30;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = __webpack_require__(87);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(83);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(80);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(12);

var _server = __webpack_require__(88);

var _reactRedux = __webpack_require__(4);

var _marked = __webpack_require__(86);

var _marked2 = _interopRequireDefault(_marked);

var _dompurify = __webpack_require__(82);

var _dompurify2 = _interopRequireDefault(_dompurify);

var _jsdom = __webpack_require__(85);

var _jsdom2 = _interopRequireDefault(_jsdom);

var _reducers = __webpack_require__(32);

var _reducers2 = _interopRequireDefault(_reducers);

var _app = __webpack_require__(14);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contentful = __webpack_require__(81);
var highlightjs = __webpack_require__(84);

var Server = function () {
  function Server() {
    _classCallCheck(this, Server);

    this.app = (0, _express2.default)();
    this.port = 5000;
    this.router = _express2.default.Router();
    this.APIRouter = _express2.default.Router();

    this.__api = 'articles';
    this.__dirname = 'public';

    // test api keys, will be replaced with environment vars when time comes to productionise
    this.contentfulClient = contentful.createClient({
      space: 'ygp49j9ncoqn',
      accessToken: '3ff5816ecb76807c88a570e0e7ab89b77ddde9697d29945ca82d60399d6182e8'
    });

    _marked2.default.setOptions({
      highlight: function highlight(code) {
        return highlightjs.highlightAuto(code).value;
      }
    });
    var window = _jsdom2.default.jsdom('', {
      features: {
        FetchExternalResources: false,
        ProcessExternalResources: false
      }
    }).defaultView;
    this.DOMPurify = (0, _dompurify2.default)(window);

    this.preloadedState = {
      activePage: {
        page: {
          fields: {
            name: 'Home',
            route: '/'
          }
        },
        route: null,
        isLoading: true,
        hasErrored: false
      },
      utils: {
        drawerOpen: false,
        searchOpen: false
      },
      pageList: {
        entries: [],
        isLoading: true,
        hasErrored: false,
        activePages: [],
        filters: [],
        query: ''
      }
    };

    this.app.set('port', undefined || 5000);
    this.app.use(_bodyParser2.default.urlencoded({ extended: true }));
    this.app.use(_bodyParser2.default.json());
  }

  _createClass(Server, [{
    key: '_fetchPage',
    value: function _fetchPage(req) {
      var _this = this;

      var spec = decodeURI(req.params.specId);
      var cat = decodeURI(req.params.catId);
      var pageName = decodeURI(req.params.pageId);

      return new Promise(function (resolve, reject) {
        var index = _this.pages.findIndex(function (page) {
          var category = page.fields.category;
          var specification = category.fields.specification;

          return page.fields.name === pageName && category.fields.name === cat && specification.fields.name === spec;
        });
        if (index > -1) {
          resolve(_this.pages[index]);
        } else {
          reject();
        }
      });
    }
  }, {
    key: '_render',
    value: function _render(req, res) {
      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.preloadedState;

      var store = (0, _redux.createStore)(_reducers2.default, state);

      var css = new Set(); // CSS for all rendered React components
      var context = { insertCss: function insertCss() {
          for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
            styles[_key] = arguments[_key];
          }

          styles.forEach(function (style) {
            css.add(style._getCss());
          });
        } };
      var html = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_app2.default, { context: context })
      ));
      var title = state.activePage.page ? 'ECMASyntax - ' + state.activePage.page.fields.name : 'ECMASyntax';
      var response = '\n      <!doctype html>\n      <html lang="en">\n        <head>\n          <meta charset="utf-8">\n          <meta http-equiv="x-ua-compatible" content="ie=edge">\n          <meta name="viewport" content="width=device-width, initial-scale=1">\n          <title>' + title + '</title>\n          <style id="server-css">\n            ' + [].concat(_toConsumableArray(css)).join('') + '\n          </style>\n          <link rel="stylesheet" href="/static/font-awesome-4.7.0/css/font-awesome.min.css">\n          <link rel="shortcut icon" href="/static/icons/favicon.ico">\n          <link rel="manifest" href="/manifest.json">\n          <meta name="theme-color" content="#28353e">\n        </head>\n        <body>\n          <div id="root">' + html + '</div>\n          <script>\n            window.__PRELOADED_STATE__ = ' + JSON.stringify(state).replace(/</g, '\\u003c') + '\n          </script>\n          ' + ( false ? '<script>\n              (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n              })(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');\n\n              ga(\'create\', \'UA-91502214-2\', \'auto\');\n              ga(\'send\', \'pageview\');\n\n            </script>' : '') + '\n          <script src="/static/app.js" async></script>\n        </body>\n      </html>\n      ';
      res.send(response);
    }
  }, {
    key: '_setupRoutes',
    value: function _setupRoutes() {
      var _this2 = this;

      this.router.use(function (req, res, next) {
        next();
      });

      this.router.get('/sw.js', function (req, res) {
        res.sendFile('sw.js', { root: _this2.__dirname });
      });

      this.router.get('/manifest.json', function (req, res) {
        res.sendFile('manifest.json', { root: _this2.__dirname });
      });

      this.router.route('/pages/:specId/:catId/:pageId').get(function (req, res) {
        _this2._render(req, res);
      });

      this.router.get('/', function (req, res) {
        _this2._render(req, res);
      });

      this.router.get('*', function (req, res) {
        Server.handle404(req, res);
      });
    }
  }, {
    key: '_setupAPIRoutes',
    value: function _setupAPIRoutes() {
      var _this3 = this;

      this.APIRouter.use(function (req, res, next) {
        next();
      });

      this.APIRouter.get('/', function (req, res) {
        res.json({
          message: 'Welcome to my api'
        });
      });

      this.APIRouter.route('/pages/').get(function (req, res) {
        var preloadedPageInfo = _this3.pages.map(function (page) {
          return {
            fields: {
              category: page.fields.category,
              name: page.fields.name,
              route: page.fields.route,
              tags: page.fields.tags
            },
            sys: {
              id: page.sys.id
            }
          };
        });
        preloadedPageInfo.sort(function (a, b) {
          return a.fields.category.fields.name.charCodeAt(0) - b.fields.category.fields.name.charCodeAt(0);
        });
        res.status(200).json(preloadedPageInfo);
      });

      this.APIRouter.route('/pages/:specId/:catId/:pageId').get(function (req, res) {
        _this3._fetchPage(req, res).then(function (entry) {
          res.status(200).json(entry);
        }).catch(function () {
          Server.handle404(req, res);
        });
      });
    }
  }, {
    key: '_initCompression',
    value: function _initCompression() {
      this.app.get('/static/app.js', function (req, res, next) {
        req.url += '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
      });
    }
  }, {
    key: '_setupRouters',
    value: function _setupRouters() {
      this._setupRoutes();
      this._setupAPIRoutes();

      this.app.use('/static', _express2.default.static(_path2.default.join(this.__dirname, 'static')));

      // required for material-components-web
      this.app.use('/node_modules', _express2.default.static(_path2.default.join('node_modules')));

      this.app.use('/api', this.APIRouter);

      this.app.use('/', this.router);

      this.app.use('*', function (req, res) {
        Server.handle404(req, res);
      });
    }
  }, {
    key: '_buildArticles',
    value: function _buildArticles() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.contentfulClient.getEntries({
          content_type: 'syntaxEntry',
          include: 2
        }).then(function (entries) {
          var markedEntries = entries;
          entries.items.forEach(function (item, index) {
            // create url for each page
            var category = item.fields.category;
            var specification = category.fields.specification;
            var route = '/pages/' + specification.fields.name + '/' + category.fields.name + '/' + item.fields.name;

            markedEntries.items[index].fields.route = encodeURI(route);

            if (item.fields.blob) {
              var html = (0, _marked2.default)(item.fields.blob);
              markedEntries.items[index].fields.blob = html;
            } else {
              markedEntries.items[index].fields.blob = '';
            }
          });
          resolve(markedEntries);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this5 = this;

      this._initCompression();
      this._setupRouters();
      this._buildArticles().then(function (pages) {
        _this5.pages = pages.items;
        _this5.app.listen(_this5.app.get('port'));
        console.log('server listening on port ' + _this5.app.get('port') + ' in ' + 'development' + ' mode');
      });
    }
  }], [{
    key: 'handle404',
    value: function handle404(req, res) {
      res.status(404).send('404 Page');
    }
  }]);

  return Server;
}();

var server = new Server();
server.start();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _appRouter = __webpack_require__(27);

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

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ripple = __webpack_require__(6);

var _ripple2 = _interopRequireDefault(_ripple);

var _route = __webpack_require__(8);

var _route2 = _interopRequireDefault(_route);

var _categorySection = __webpack_require__(60);

var _categorySection2 = _interopRequireDefault(_categorySection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategorySection = function (_React$Component) {
  _inherits(CategorySection, _React$Component);

  function CategorySection() {
    _classCallCheck(this, CategorySection);

    return _possibleConstructorReturn(this, (CategorySection.__proto__ || Object.getPrototypeOf(CategorySection)).apply(this, arguments));
  }

  _createClass(CategorySection, [{
    key: 'mapLinks',
    value: function mapLinks() {
      var _this2 = this;

      // active={(this.props.activeRoute ? this.props.activeRoute : null) === page.route}
      var entries = this.props.category.entries;
      entries.sort(function (a, b) {
        return a.fields.name.charCodeAt(0) - b.fields.name.charCodeAt(0);
      });
      return entries.map(function (entry) {
        return _react2.default.createElement(
          _route2.default,
          {
            route: entry.fields.route,
            key: entry.sys.id
          },
          _react2.default.createElement(
            'div',
            {
              className: _this2.props.activeRoute && _this2.props.activeRoute === entry.fields.route ? _categorySection2.default['pageList-item'] + ' ' + _categorySection2.default.active : _categorySection2.default['pageList-item']
            },
            _react2.default.createElement(_ripple2.default, null),
            entry.fields.name
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: _categorySection2.default.categorySection, ref: function ref(div) {
            _this3.container = div;
          } },
        _react2.default.createElement(
          'div',
          { className: _categorySection2.default['categorySection-header'], href: '#' },
          this.props.category.fields.name
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

CategorySection.propTypes = {
  activeRoute: _react.PropTypes.string,
  category: _react.PropTypes.object.isRequired
};

CategorySection.defaultProps = {
  activeRoute: null
};

exports.default = (0, _withStyles2.default)(_categorySection2.default)(CategorySection);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _pageList = __webpack_require__(61);

var _pageList2 = _interopRequireDefault(_pageList);

var _loadingView = __webpack_require__(10);

var _loadingView2 = _interopRequireDefault(_loadingView);

var _categorySection = __webpack_require__(15);

var _categorySection2 = _interopRequireDefault(_categorySection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageList = function (_React$Component) {
  _inherits(PageList, _React$Component);

  function PageList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PageList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageList.__proto__ || Object.getPrototypeOf(PageList)).call.apply(_ref, [this].concat(args))), _this), _this.mapPages = function () {
      var pages = PageList.organisePages(_this.props.pages);
      var output = pages.map(function (category) {
        return _react2.default.createElement(_categorySection2.default, {
          key: category.sys.id,
          category: category,
          activeRoute: _this.props.activeRoute
        });
      });
      return output;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PageList, [{
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
        return _react2.default.createElement(_loadingView2.default, null);
      }

      return _react2.default.createElement(
        'div',
        { className: _pageList2.default['pagelist-wrapper'] },
        this.mapPages()
      );
    }
  }], [{
    key: 'getCategoryIndex',
    value: function getCategoryIndex(category, pages) {
      var matchedCat = pages.findIndex(function (cat) {
        return cat.sys.id === category.sys.id;
      });
      if (matchedCat < 0) {
        matchedCat = pages.length;
      }
      return matchedCat;
    }
  }, {
    key: 'organisePages',
    value: function organisePages(entries) {
      var _this2 = this;

      var pages = [];
      entries.forEach(function (entry) {
        var category = entry.fields.category;

        var categoryIndex = _this2.getCategoryIndex(category, pages);

        pages = _this2.addEntryToCategory(category, categoryIndex, entry, pages);
      });
      return pages;
    }
  }, {
    key: 'addEntryToCategory',
    value: function addEntryToCategory(category, categoryIndex, entry, pages) {
      if (!pages[categoryIndex]) {
        pages.push(Object.assign({}, category, { entries: [] }));
      }

      pages[categoryIndex].entries.push(entry);
      return pages;
    }
  }]);

  return PageList;
}(_react2.default.Component);

PageList.propTypes = {
  hasErrored: _react.PropTypes.bool.isRequired,
  isLoading: _react.PropTypes.bool.isRequired,
  activeRoute: _react.PropTypes.string,
  pages: _react.PropTypes.array.isRequired
};

PageList.defaultProps = {
  activeRoute: null
};

exports.default = (0, _withStyles2.default)(_pageList2.default)(PageList);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _homepageView = __webpack_require__(18);

var _homepageView2 = _interopRequireDefault(_homepageView);

var _markdownContainer = __webpack_require__(19);

var _markdownContainer2 = _interopRequireDefault(_markdownContainer);

var _loadingView = __webpack_require__(10);

var _loadingView2 = _interopRequireDefault(_loadingView);

var _contentView = __webpack_require__(62);

var _contentView2 = _interopRequireDefault(_contentView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBLE = { transform: 'translateX(0)', opacity: '1' };
var HIDDEN = { transform: 'translateX(60px)', opacity: '0' };

var OUT_KEYFRAMES = [VISIBLE, HIDDEN];
var IN_KEYFRAMES = [HIDDEN, VISIBLE];
var ANIM_OPTIONS = {
  duration: 350,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  iterations: 1
};

var ContentView = function (_React$Component) {
  _inherits(ContentView, _React$Component);

  function ContentView(props) {
    _classCallCheck(this, ContentView);

    var _this = _possibleConstructorReturn(this, (ContentView.__proto__ || Object.getPrototypeOf(ContentView)).call(this, props));

    _this.ANIMATING_OUT = false;
    return _this;
  }

  _createClass(ContentView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      // if (nextProps.isLoading) {
      //   this._out(nextProps.activePage);
      // }
      // if (!nextProps.isLoading
      // && !nextProps.hasErrored
      // && (nextProps.activePage !== this.props.activePage)) {
      //   this._in(nextProps)
      // }
    }
  }, {
    key: '_out',
    value: function _out() {
      var _this2 = this;

      if (this.ANIMATING_OUT) {
        return;
      }

      this.ANIMATING_OUT = true;
      this.outAnim = this.pageContainer.animate(OUT_KEYFRAMES, ANIM_OPTIONS);
      this.outAnim.onfinish = function () {
        // TODO: Loading
        _this2.pageContainer.style.opacity = 0;
        _this2.ANIMATING_OUT = false;
      };
    }
  }, {
    key: '_in',
    value: function _in(nextProps) {
      var _this3 = this;

      if (this.ANIMATING_OUT) {
        this.outAnim.onfinish = function () {
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
        content: _react2.default.createElement(_markdownContainer2.default, { content: nextProps.activePage.fields.blob })
      });

      this.pageContainer.style.opacity = 1;

      this.inAnim = this.pageContainer.animate(IN_KEYFRAMES, ANIM_OPTIONS);
      this.isAnim.onfinish = function () {
        _this4.pageContainer.style.transform = 'scale(1)';
        _this4.pageContainer.style.opacity = '1';
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var content = void 0;
      if (this.props.isLoading) {
        content = _react2.default.createElement(_loadingView2.default, { color: '#28353e', size: '45px' });
      } else if (this.props.activePage.fields.name !== 'Home') {
        content = _react2.default.createElement(_markdownContainer2.default, {
          content: this.props.activePage.fields.blob,
          references: this.props.activePage.fields.references,
          tags: this.props.activePage.fields.tags
        });
      } else {
        // no content - homepage
        content = _react2.default.createElement(_homepageView2.default, null);
      }

      return _react2.default.createElement(
        'div',
        { className: _contentView2.default['page-view'], ref: function ref(div) {
            _this5.pageContainer = div;
          } },
        content
      );
    }
  }]);

  return ContentView;
}(_react2.default.Component);

ContentView.propTypes = {
  isLoading: _react.PropTypes.bool.isRequired,
  activePage: _react.PropTypes.object
};

ContentView.defaultProps = {
  activePage: null
};

exports.default = (0, _withStyles2.default)(_contentView2.default)(ContentView);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _homepageView = __webpack_require__(63);

var _homepageView2 = _interopRequireDefault(_homepageView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Homepage = function Homepage() {
  return _react2.default.createElement(
    'div',
    { className: _homepageView2.default['homepage-container'] },
    _react2.default.createElement(
      'h1',
      null,
      'ECMASyntax.io'
    ),
    _react2.default.createElement(
      'p',
      { className: _homepageView2.default.subtitle },
      'A free ECMAScript (JavaScript) syntax reference'
    ),
    _react2.default.createElement(
      'a',
      { href: 'https://www.facebook.com/sharer/sharer.php?u=https%3A//ecmasyntax.io', target: '_blank', rel: 'noopener noreferrer', className: _homepageView2.default.share },
      _react2.default.createElement('i', { className: _homepageView2.default.facebook + ' fa fa-facebook-square', 'aria-hidden': 'true' })
    ),
    _react2.default.createElement(
      'a',
      { href: 'https://twitter.com/home?status=Javascript%20syntax%20reference%3A%20https%3A//ecmasyntax.io', target: '_blank', rel: 'noopener noreferrer', className: _homepageView2.default.share },
      _react2.default.createElement('i', { className: _homepageView2.default.twitter + ' fa fa-twitter-square', 'aria-hidden': 'true' })
    ),
    _react2.default.createElement(
      'p',
      null,
      'Design inspired by',
      _react2.default.createElement(
        'a',
        { href: 'http://cssreference.io/', target: '_blank', rel: 'noopener noreferrer' },
        ' HTML/CSSReference.io'
      ),
      ', created by',
      _react2.default.createElement(
        'a',
        { href: 'https://twitter.com/jgthms', target: '_blank', rel: 'noopener noreferrer' },
        ' @jgthms'
      )
    )
  );
};

exports.default = (0, _withStyles2.default)(_homepageView2.default)(Homepage);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _markdownContainer = __webpack_require__(64);

var _markdownContainer2 = _interopRequireDefault(_markdownContainer);

var _atelierEstuaryLight = __webpack_require__(57);

var _atelierEstuaryLight2 = _interopRequireDefault(_atelierEstuaryLight);

var _panel = __webpack_require__(91);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownContainer = function (_React$Component) {
  _inherits(MarkdownContainer, _React$Component);

  function MarkdownContainer() {
    _classCallCheck(this, MarkdownContainer);

    return _possibleConstructorReturn(this, (MarkdownContainer.__proto__ || Object.getPrototypeOf(MarkdownContainer)).apply(this, arguments));
  }

  _createClass(MarkdownContainer, [{
    key: 'mapReferences',
    value: function mapReferences() {
      var references = this.props.references.map(function (reference) {
        var referenceText = void 0;
        switch (reference.fields.type) {
          case 'MDN':
            referenceText = _react2.default.createElement(
              'li',
              { key: reference.sys.id },
              _react2.default.createElement(
                'a',
                { href: reference.fields.link, target: '_blank', rel: 'noopener noreferrer' },
                reference.fields.name
              ),
              '\xA0by ',
              _react2.default.createElement(
                'a',
                { href: 'https://developer.mozilla.org/en-US/docs/MDN/About$history', target: '_blank', rel: 'noopener noreferrer' },
                'Mozilla Contributors'
              ),
              ', licensed under ',
              _react2.default.createElement(
                'a',
                { href: 'https://creativecommons.org/licenses/by-sa/2.5/', target: '_blank', rel: 'noopener noreferrer' },
                'CC-BY-SA 2.5'
              ),
              '.'
            );
            break;
          case 'es6-features':
            referenceText = _react2.default.createElement(
              'li',
              { key: reference.sys.id },
              _react2.default.createElement(
                'a',
                { href: reference.fields.link, target: '_blank', rel: 'noopener noreferrer' },
                'es6-features.org \u2013 ',
                _react2.default.createElement(
                  'i',
                  null,
                  reference.fields.name
                )
              ),
              '\xA0by ',
              _react2.default.createElement(
                'a',
                { href: '', target: '_blank', rel: 'noopener noreferrer' },
                'Ralf S. Engelschall'
              ),
              ', licensed under ',
              _react2.default.createElement(
                'a',
                { href: 'https://github.com/rse/es6-features/blob/gh-pages/LICENSE.txt', target: '_blank', rel: 'noopener noreferrer' },
                'MIT'
              ),
              '.'
            );
            break;
          default:
            referenceText = _react2.default.createElement(
              'li',
              { key: reference.sys.id },
              _react2.default.createElement(
                'a',
                { href: reference.fields.link, target: '_blank', rel: 'noopener noreferrer' },
                reference.fields.name
              )
            );
        }
        return referenceText;
      });
      return references;
    }
  }, {
    key: 'mapTags',
    value: function mapTags() {
      var tags = this.props.tags.map(function (tag, index) {
        return _react2.default.createElement(
          'span',
          { key: tag.sys.id, className: _markdownContainer2.default.tag },
          index > 0 ? ', ' : '',
          tag.fields.name
        );
      });
      return tags;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _markdownContainer2.default['markdown-wrapper'] },
        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content } }),
        _react2.default.createElement(
          'div',
          { className: _markdownContainer2.default['footer-container'] },
          _react2.default.createElement(_panel2.default, {
            icon: _react2.default.createElement(
              'svg',
              null,
              _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
              _react2.default.createElement('path', { d: 'M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z' })
            ),
            title: 'Tags',
            body: this.mapTags()
          }),
          _react2.default.createElement(_panel2.default, {
            icon: _react2.default.createElement(
              'svg',
              null,
              _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
              _react2.default.createElement('path', { d: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z' })
            ),
            title: 'References',
            body: _react2.default.createElement(
              'ol',
              null,
              this.mapReferences()
            ),
            closed: true
          })
        )
      );
    }
  }]);

  return MarkdownContainer;
}(_react2.default.Component);

MarkdownContainer.propTypes = {
  content: _react.PropTypes.string.isRequired,
  references: _react.PropTypes.array,
  tags: _react.PropTypes.array
};

MarkdownContainer.defaultProps = {
  references: null,
  tags: []
};

exports.default = (0, _withStyles2.default)(_markdownContainer2.default, _atelierEstuaryLight2.default)(MarkdownContainer);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ripple = __webpack_require__(6);

var _ripple2 = _interopRequireDefault(_ripple);

var _headerIcon = __webpack_require__(65);

var _headerIcon2 = _interopRequireDefault(_headerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderIcon = function (_React$Component) {
  _inherits(HeaderIcon, _React$Component);

  function HeaderIcon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HeaderIcon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeaderIcon.__proto__ || Object.getPrototypeOf(HeaderIcon)).call.apply(_ref, [this].concat(args))), _this), _this.openDrawer = function () {
      _this.props.toggleDrawer(!_this.props.drawerOpen);
    }, _this.closeSearch = function () {
      _this.props.search('');
      _this.props.toggleSearch(false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HeaderIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _headerIcon2.default['header-icon'] },
        _react2.default.createElement(
          'button',
          { onClick: this.openDrawer, className: _headerIcon2.default['icon-container'] + ' ' + _headerIcon2.default.menuIcon + ' ' + (this.props.searchOpen ? _headerIcon2.default.searchOpen : '') },
          _react2.default.createElement(
            'svg',
            { fill: '#fff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
            _react2.default.createElement('path', { d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' })
          ),
          _react2.default.createElement(_ripple2.default, null)
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.closeSearch, className: _headerIcon2.default['icon-container'] + ' ' + _headerIcon2.default.backIcon + ' ' + (this.props.searchOpen ? _headerIcon2.default.searchOpen : '') },
          _react2.default.createElement(
            'svg',
            { fill: '#fff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
            _react2.default.createElement('path', { d: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' })
          ),
          _react2.default.createElement(_ripple2.default, null)
        )
      );
    }
  }]);

  return HeaderIcon;
}(_react2.default.Component);

HeaderIcon.propTypes = {
  drawerOpen: _react.PropTypes.bool.isRequired,
  searchOpen: _react.PropTypes.bool.isRequired,
  toggleDrawer: _react.PropTypes.func.isRequired,
  toggleSearch: _react.PropTypes.func.isRequired,
  search: _react.PropTypes.func.isRequired
};

exports.default = (0, _withStyles2.default)(_headerIcon2.default)(HeaderIcon);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _headerIcon = __webpack_require__(20);

var _headerIcon2 = _interopRequireDefault(_headerIcon);

var _searchInput = __webpack_require__(22);

var _searchInput2 = _interopRequireDefault(_searchInput);

var _mainHeader = __webpack_require__(66);

var _mainHeader2 = _interopRequireDefault(_mainHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainHeader = function (_React$Component) {
  _inherits(MainHeader, _React$Component);

  function MainHeader(props) {
    _classCallCheck(this, MainHeader);

    var _this = _possibleConstructorReturn(this, (MainHeader.__proto__ || Object.getPrototypeOf(MainHeader)).call(this, props));

    _this.searchFocused = function (bool) {
      _this.setState({
        searchFocused: bool
      });
    };

    _this.state = {
      searchFocused: false
    };
    return _this;
  }

  _createClass(MainHeader, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: _mainHeader2.default.header + ' \n        ' + (this.props.searchOpen ? _mainHeader2.default.searchOpen : '') + '\n        ' + (this.props.showWaterfallHeader ? _mainHeader2.default.waterfallOpen : '') + '\n        '
        },
        _react2.default.createElement(
          'div',
          { className: _mainHeader2.default['toggle-container'] },
          _react2.default.createElement(_headerIcon2.default, {
            drawerOpen: this.props.drawerOpen,
            searchOpen: this.props.searchOpen,
            toggleDrawer: this.props.toggleDrawer,
            toggleSearch: this.props.toggleSearch,
            search: this.props.search
          })
        ),
        _react2.default.createElement(
          'span',
          { className: _mainHeader2.default.title },
          'ECMASyntax',
          _react2.default.createElement('span', {
            dangerouslySetInnerHTML: {
              __html: this.props.activePage ? ' &ndash; ' + this.props.activePage.fields.name : '' }
          })
        ),
        _react2.default.createElement(_searchInput2.default, {
          currQuery: this.props.currQuery,
          search: this.props.search,
          searchOpen: this.props.searchOpen,
          toggleSearch: this.props.toggleSearch
        })
      );
    }
  }]);

  return MainHeader;
}(_react2.default.Component);

MainHeader.propTypes = {
  drawerOpen: _react.PropTypes.bool.isRequired,
  showWaterfallHeader: _react.PropTypes.bool.isRequired,
  searchOpen: _react.PropTypes.bool.isRequired,
  currQuery: _react.PropTypes.string.isRequired,
  activePage: _react.PropTypes.object,
  toggleDrawer: _react.PropTypes.func.isRequired,
  toggleSearch: _react.PropTypes.func.isRequired,
  search: _react.PropTypes.func.isRequired
};

MainHeader.defaultProps = {
  activePage: null
};

exports.default = (0, _withStyles2.default)(_mainHeader2.default)(MainHeader);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _searchInput = __webpack_require__(67);

var _searchInput2 = _interopRequireDefault(_searchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchInput = function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  function SearchInput(props) {
    _classCallCheck(this, SearchInput);

    var _this = _possibleConstructorReturn(this, (SearchInput.__proto__ || Object.getPrototypeOf(SearchInput)).call(this, props));

    _this.searchIconClick = function () {
      _this.searchInput.focus();
    };

    _this.searchFocused = function () {
      _this.setState({ focused: true });
      _this.props.toggleSearch(true);

      document.body.addEventListener('click', _this.searchUnfocused);
    };

    _this.searchUnfocused = function (evt) {
      if (_this.searchContainer.contains(evt.target)) {
        return;
      }
      document.body.removeEventListener('click', _this.searchUnfocused);

      if (_this.props.currQuery.length <= 0) {
        _this.props.toggleSearch(false);
      }
      _this.setState({
        focused: false
      });
    };

    _this.handleInput = function (e) {
      if (e.target.value.length > 0) {
        _this.setState({ nonEmpty: true });
      } else {
        _this.setState({ nonEmpty: false });
      }

      _this.props.search(e.target.value);
    };

    _this.clearInput = function () {
      _this.props.search('');
      _this.searchInput.focus();
    };

    _this.state = {
      focused: false,
      nonEmpty: false
    };
    return _this;
  }

  _createClass(SearchInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'label',
        {
          htmlFor: 'search',
          className: _searchInput2.default['search-label'] + ' \n          ' + (this.props.searchOpen ? _searchInput2.default.opened : '') + ' \n          ' + (this.state.focused ? _searchInput2.default.focused : '') + '\n          ' + (this.props.currQuery.length > 0 ? _searchInput2.default.nonEmpty : '') + '\n        ',
          ref: function ref(label) {
            _this2.searchContainer = label;
          }
        },
        _react2.default.createElement(
          'button',
          { className: _searchInput2.default['icon-container'] + ' ' + _searchInput2.default['search-searchIcon'], onClick: this.searchIconClick },
          _react2.default.createElement(
            'svg',
            { className: _searchInput2.default['search-icon'], fill: '#fff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' }),
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _searchInput2.default['search-input--container'] },
          _react2.default.createElement('input', {
            type: 'text', id: 'search', placeholder: 'Search for syntax',
            value: this.props.currQuery,
            className: _searchInput2.default['search-input'],
            onChange: this.handleInput,
            onFocus: this.searchFocused,
            ref: function ref(input) {
              _this2.searchInput = input;
            }
          }),
          _react2.default.createElement(
            'button',
            {
              className: _searchInput2.default['icon-container'] + ' ' + _searchInput2.default['search-closeIcon'],
              onClick: this.clearInput,
              ref: function ref(btn) {
                _this2.closeIcon = btn;
              }
            },
            _react2.default.createElement(
              'svg',
              { fill: '#fff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
              _react2.default.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' }),
              _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
            )
          )
        )
      );
    }
  }]);

  return SearchInput;
}(_react2.default.Component);

SearchInput.propTypes = {
  searchOpen: _react.PropTypes.bool.isRequired,
  currQuery: _react.PropTypes.string.isRequired,
  toggleSearch: _react.PropTypes.func.isRequired,
  search: _react.PropTypes.func.isRequired
};

exports.default = (0, _withStyles2.default)(_searchInput2.default)(SearchInput);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _progressIndicator = __webpack_require__(68);

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressIndicator = function (_React$Component) {
  _inherits(ProgressIndicator, _React$Component);

  function ProgressIndicator(props) {
    _classCallCheck(this, ProgressIndicator);

    var _this = _possibleConstructorReturn(this, (ProgressIndicator.__proto__ || Object.getPrototypeOf(ProgressIndicator)).call(this, props));

    _this._fadeout = function () {
      _this.progressIndicator.removeEventListener('transitionend', _this._fadeout);
      _this.setState({
        opacity: 0
      });
      _this.progressIndicator.addEventListener('transitionend', _this._reset);
    };

    _this._reset = function (evt) {
      if (evt.propertyName === 'opacity') {
        _this.progressIndicator.removeEventListener('transitionend', _this._reset);

        _this.setState({
          width: '0%',
          opacity: 1,
          animatable: false
        });
      }
    };

    _this.state = {
      width: '100%',
      opacity: 1,
      animatable: false
    };
    return _this;
  }

  _createClass(ProgressIndicator, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!nextProps.isLoading && !nextProps.hasErrored) {
        // this.progressIndicator.addEventListener('transitionend', this._fadeout);
        this.setState({
          width: '100%',
          opacity: 1,
          animatable: true
        });
      }

      if (nextProps.isLoading && !this.props.isLoading || this.props.hasErrored) {
        this.setState({
          width: '0%',
          opacity: 0,
          animatable: false
        });

        // Hacky and horrible, TODO: Improve this (extra action creator?)
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (_this2.props.isLoading) {
              _this2.setState({
                width: '42%',
                opacity: 1,
                animatable: true
              });
            }
          });
        });
      }
      // if (!nextProps.isLoading) {
      //   this.setState({
      //     width: '50%',
      //     opacity: 1,
      //     animatable: true,
      //   });
      // }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = {
        width: this.state.width,
        opacity: this.state.opacity
      };

      return _react2.default.createElement('div', {
        ref: function ref(div) {
          _this3.progressIndicator = div;
        },
        className: _progressIndicator2.default.progressIndicator + ' ' + (this.state.animatable ? _progressIndicator2.default.animatable : ''),
        style: style
      });
    }
  }]);

  return ProgressIndicator;
}(_react2.default.Component);

ProgressIndicator.propTypes = {
  isLoading: _react.PropTypes.bool.isRequired,
  hasErrored: _react.PropTypes.bool.isRequired
};

exports.default = (0, _withStyles2.default)(_progressIndicator2.default)(ProgressIndicator);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _route = __webpack_require__(8);

var _route2 = _interopRequireDefault(_route);

var _ripple = __webpack_require__(6);

var _ripple2 = _interopRequireDefault(_ripple);

var _searchResult = __webpack_require__(69);

var _searchResult2 = _interopRequireDefault(_searchResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResult = function (_React$Component) {
  _inherits(SearchResult, _React$Component);

  function SearchResult() {
    _classCallCheck(this, SearchResult);

    return _possibleConstructorReturn(this, (SearchResult.__proto__ || Object.getPrototypeOf(SearchResult)).apply(this, arguments));
  }

  _createClass(SearchResult, [{
    key: 'render',
    value: function render() {
      var page = this.props.page;
      var category = page.fields.category;
      var specification = category.fields.specification;

      var reg = new RegExp(this.props.currQuery, 'gi');

      var formattedName = page.fields.name.replace(reg, function (str) {
        return '<b>' + str + '</b>';
      });
      var formattedCat = category.fields.name.replace(reg, function (str) {
        return '<b>' + str + '</b>';
      });
      var formattedSpec = specification.fields.name.replace(reg, function (str) {
        return '<b>' + str + '</b>';
      });

      return _react2.default.createElement(
        _route2.default,
        { route: this.props.page.fields.route },
        _react2.default.createElement(
          'div',
          { className: _searchResult2.default.result },
          _react2.default.createElement('p', { className: _searchResult2.default['result-title'], dangerouslySetInnerHTML: { __html: formattedName } }),
          _react2.default.createElement(
            'p',
            { className: _searchResult2.default['result-url'] },
            page.fields.route
          ),
          _react2.default.createElement('p', { className: _searchResult2.default['result-route'], dangerouslySetInnerHTML: { __html: formattedSpec + ' > ' + formattedCat + ' > ' + formattedName } }),
          _react2.default.createElement(
            'div',
            { className: _searchResult2.default.ripple },
            _react2.default.createElement(_ripple2.default, null)
          )
        )
      );
    }
  }]);

  return SearchResult;
}(_react2.default.Component);

SearchResult.propTypes = {
  currQuery: _react.PropTypes.string.isRequired,
  page: _react.PropTypes.object.isRequired
};

exports.default = (0, _withStyles2.default)(_searchResult2.default)(SearchResult);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _mdcSwitch = __webpack_require__(56);

var _mdcSwitch2 = _interopRequireDefault(_mdcSwitch);

var _offlineSwitch = __webpack_require__(70);

var _offlineSwitch2 = _interopRequireDefault(_offlineSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OfflineSwitch = function (_React$Component) {
  _inherits(OfflineSwitch, _React$Component);

  function OfflineSwitch(props) {
    _classCallCheck(this, OfflineSwitch);

    var _this = _possibleConstructorReturn(this, (OfflineSwitch.__proto__ || Object.getPrototypeOf(OfflineSwitch)).call(this, props));

    _this._updateState = function (activeRoute) {
      _this._checkCache(activeRoute).then(function (cached) {
        _this.setState({
          checked: cached
        });
      });
    };

    _this._checkCache = function (activeRoute) {
      _this.apiRequest = location.origin + '/api' + activeRoute;
      return new Promise(function (resolve, reject) {
        caches.match(_this.apiRequest).then(function (cachedResponse) {
          if (cachedResponse) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch(function (err) {
          reject(err);
        });
      });
    };

    _this.handleClick = function () {
      if (!window.CacheStorage) {
        alert('Sorry, this feature is not available in your browser!');
      }
      _this._checkCache(_this.props.activeRoute).then(function (cached) {
        if (cached) {
          caches.open('ecmasyntax-runtime').then(function (cache) {
            cache.delete(_this.apiRequest).then(function () {
              _this.setState({
                checked: false
              });
            });
          });
        } else {
          caches.open('ecmasyntax-runtime').then(function (cache) {
            document.body.style.cursor = 'wait';
            fetch(_this.apiRequest).then(function (response) {
              cache.put(_this.apiRequest, response.clone()).then(function () {
                document.body.style.cursor = '';
                _this.setState({
                  checked: true
                });
              });
            });
          });
        }
      });
    };

    _this.state = {
      checked: false
    };
    return _this;
  }

  _createClass(OfflineSwitch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateState(this.props.activeRoute);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeRoute !== this.props.activeRoute) {
        this._updateState(nextProps.activeRoute);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _offlineSwitch2.default['switch-container'] + ' ' + (this.state.checked ? _offlineSwitch2.default.active : '') },
        _react2.default.createElement(
          'span',
          { className: _offlineSwitch2.default['switch-label'] },
          'Available Offline'
        ),
        _react2.default.createElement(
          'label',
          { htmlFor: 'basic-switch' },
          _react2.default.createElement(
            'button',
            { className: 'mdc-switch ' + _offlineSwitch2.default.button, onClick: this.handleClick },
            _react2.default.createElement('input', {
              type: 'checkbox', id: 'basic-switch',
              className: 'mdc-switch__native-control ' + _offlineSwitch2.default.input, checked: this.state.checked
            }),
            _react2.default.createElement(
              'div',
              { className: 'mdc-switch__background' },
              _react2.default.createElement('div', { className: 'mdc-switch__knob' })
            )
          )
        )
      );
    }
  }]);

  return OfflineSwitch;
}(_react2.default.Component);

OfflineSwitch.propTypes = {
  activeRoute: _react.PropTypes.string
};

OfflineSwitch.defaultProps = {
  activeRoute: null
};

exports.default = (0, _withStyles2.default)(_offlineSwitch2.default, _mdcSwitch2.default)(OfflineSwitch);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _offlineSwitch = __webpack_require__(25);

var _offlineSwitch2 = _interopRequireDefault(_offlineSwitch);

var _waterfallHeader = __webpack_require__(71);

var _waterfallHeader2 = _interopRequireDefault(_waterfallHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WaterfallHeader = function WaterfallHeader(_ref) {
  var visible = _ref.visible,
      activeRoute = _ref.activeRoute;

  var style = {
    maxHeight: visible ? '57px' : '0px'
  };
  return _react2.default.createElement(
    'div',
    { className: _waterfallHeader2.default.header, style: style },
    _react2.default.createElement(
      'div',
      { className: _waterfallHeader2.default['header-contentWrapper'] },
      _react2.default.createElement(_offlineSwitch2.default, { activeRoute: activeRoute })
    )
  );
};

WaterfallHeader.propTypes = {
  visible: _react.PropTypes.bool.isRequired,
  activeRoute: _react.PropTypes.string
};

WaterfallHeader.defaultProps = {
  activeRoute: null
};

exports.default = (0, _withStyles2.default)(_waterfallHeader2.default)(WaterfallHeader);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _base = __webpack_require__(76);

var _base2 = _interopRequireDefault(_base);

var _activePage = __webpack_require__(9);

var _utils = __webpack_require__(5);

var _pageList = __webpack_require__(7);

var _progressIndicator = __webpack_require__(23);

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

var _mainHeader = __webpack_require__(21);

var _mainHeader2 = _interopRequireDefault(_mainHeader);

var _drawer = __webpack_require__(28);

var _drawer2 = _interopRequireDefault(_drawer);

var _main = __webpack_require__(29);

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

    _this.onPopState = function () {
      console.log('POP STATE', location.pathname);
      _this.props.fetchPage(location.pathname);
    };

    _this.scrolled = function (bool) {
      _this.setState({
        scrolled: bool
      });
    };

    _this.state = {
      activeRoute: _this.props.activeRoute,
      scrolled: false,
      cacheStorage: false
    };

    _this.caches = false;
    return _this;
  }

  _createClass(AppRouter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // async fetch pagelist
      this.props.fetchPageList();
      // async fetch routed page
      this.props.fetchPage(location.pathname);
      // check service worker functionality is available
      this.caches = window.caches;

      window.addEventListener('popstate', this.onPopState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('popstate', this.onPopState);
    }
  }, {
    key: 'render',
    value: function render() {
      var showWaterfallHeader = this.caches && this.props.activePage && new RegExp(/^\/pages\//).test(this.props.activePage.fields.route) && !this.props.searchOpen && !this.props.isLoading && !this.state.scrolled;

      return _react2.default.createElement(
        'div',
        { className: _base2.default['app-container'] },
        _react2.default.createElement(_progressIndicator2.default, {
          activePage: this.props.activePage,
          activeRoute: this.props.activeRoute,
          hasErrored: this.props.hasErrored,
          isLoading: this.props.isLoading
        }),
        _react2.default.createElement(_mainHeader2.default, {
          activePage: this.props.activePage,
          drawerOpen: this.props.drawerOpen,
          searchOpen: this.props.searchOpen,
          toggleDrawer: this.props.toggleDrawer,
          toggleSearch: this.props.toggleSearch,
          currQuery: this.props.currQuery,
          search: this.props.search,
          showWaterfallHeader: showWaterfallHeader
        }),
        _react2.default.createElement(
          'div',
          { className: _base2.default['main-container'] },
          _react2.default.createElement(_drawer2.default, null),
          _react2.default.createElement(_main2.default, {
            scrolled: this.scrolled,
            showWaterfallHeader: showWaterfallHeader
          })
        )
      );
    }
  }]);

  return AppRouter;
}(_react2.default.Component);

AppRouter.propTypes = {
  activeRoute: _react.PropTypes.string,
  currQuery: _react.PropTypes.string.isRequired,
  activePage: _react.PropTypes.object,
  hasErrored: _react.PropTypes.bool,
  isLoading: _react.PropTypes.bool,
  drawerOpen: _react.PropTypes.bool,
  searchOpen: _react.PropTypes.bool,
  fetchPageList: _react.PropTypes.func.isRequired,
  fetchPage: _react.PropTypes.func.isRequired,
  toggleDrawer: _react.PropTypes.func.isRequired,
  toggleSearch: _react.PropTypes.func.isRequired,
  search: _react.PropTypes.func.isRequired
};

AppRouter.defaultProps = {
  hasErrored: false,
  isLoading: false,
  drawerOpen: false,
  searchOpen: false,
  activeRoute: null,
  activePage: null
};

function mapStateToProps(state) {
  return {
    activePage: state.activePage.page,
    activeRoute: state.activePage.route,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    currQuery: state.pageList.query,
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: function fetchPageList() {
      dispatch((0, _pageList.fetchPageList)());
    },
    search: function search(query) {
      dispatch((0, _pageList.search)(query));
    },
    fetchPage: function fetchPage(url) {
      dispatch((0, _activePage.fetchPage)(url));
    },
    toggleDrawer: function toggleDrawer(open) {
      dispatch((0, _utils.toggleDrawer)(open));
    },
    toggleSearch: function toggleSearch(open) {
      dispatch((0, _utils.toggleSearch)(open));
    }
  };
}

exports.default = (0, _withStyles2.default)(_base2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(AppRouter));

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _drawer = __webpack_require__(73);

var _drawer2 = _interopRequireDefault(_drawer);

var _constants = __webpack_require__(11);

var _utils = __webpack_require__(5);

var _pageList = __webpack_require__(7);

var _route = __webpack_require__(8);

var _route2 = _interopRequireDefault(_route);

var _ripple = __webpack_require__(6);

var _ripple2 = _interopRequireDefault(_ripple);

var _pageList2 = __webpack_require__(16);

var _pageList3 = _interopRequireDefault(_pageList2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

    _this.onTouchStart = function (evt) {
      if (!_this.drawerContainer.classList.contains(_drawer2.default.active)) {
        return;
      }

      _this.drawer.classList.add(_drawer2.default.draggable);

      _this.setState({
        startX: evt.touches[0].pageX,
        currentX: _this.startX,
        touchingSideNav: true
      });

      requestAnimationFrame(_this.update);
    };

    _this.onTouchMove = function (evt) {
      if (!_this.state.touchingSideNav) {
        return;
      }

      _this.setState({
        currentX: evt.touches[0].pageX
      });
    };

    _this.onTouchEnd = function () {
      if (!_this.state.touchingSideNav) {
        return;
      }

      _this.setState({
        touchingSideNav: false,
        initialisedDragging: false
      });

      _this.drawer.classList.remove(_drawer2.default.draggable);

      var translateX = Math.min(0, _this.state.currentX - _this.state.startX);
      _this.drawer.style.transform = '';

      if (translateX < _constants.DRAWER_CLOSE_THRESHOLD) {
        _this.props.toggleDrawer(false);
      }
    };

    _this.update = function () {
      if (!_this.state.touchingSideNav) {
        return;
      }

      requestAnimationFrame(_this.update);

      var translateX = Math.min(0, _this.state.currentX - _this.state.startX);

      if (!_this.state.initialisedDragging && Math.abs(translateX) < _constants.INITIATE_DRAGGING_THRESHOLD) {
        return;
      }

      if (!_this.state.initialisedDragging) {
        _this.setState({
          initialisedDragging: true
        });
      }

      _this.drawer.style.transform = 'translateX(' + translateX + 'px)';
    };

    _this.hideSideNav = function (evt) {
      if (evt.target.contains(_this.drawer)) {
        _this.props.toggleDrawer(false);
      }
    };

    _this.state = {
      startX: 0,
      currentX: 0,
      touchingSideNav: false,
      initialisedDragging: false
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addEventListeners();
    }
  }, {
    key: 'applyPassive',
    value: function applyPassive() {
      if (this.supportsPassive !== undefined) {
        return this.supportsPassive ? { passive: true } : false;
      }
      var isSupported = false;
      try {
        document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {
        return function () {};
      }
      this.supportsPassive = isSupported;
      return this.applyPassive();
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      this.drawerContainer.addEventListener('click', this.hideSideNav);

      this.drawer.addEventListener('touchstart', this.onTouchStart, this.applyPassive());
      this.drawer.addEventListener('touchmove', this.onTouchMove, this.applyPassive());
      this.drawer.addEventListener('touchend', this.onTouchEnd);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: _drawer2.default['drawer-container'] + ' ' + (this.props.drawerOpen ? _drawer2.default.active : ''),
          ref: function ref(div) {
            _this2.drawerContainer = div;
          }
        },
        _react2.default.createElement(
          'aside',
          { className: _drawer2.default.drawer, ref: function ref(aside) {
              _this2.drawer = aside;
            } },
          _react2.default.createElement(
            'div',
            { className: _drawer2.default['drawer-homeContainer'] },
            _react2.default.createElement(
              _route2.default,
              { route: '/' },
              _react2.default.createElement(
                'div',
                {
                  className: _drawer2.default['drawer-home'] + ' ' + (this.props.activePage && this.props.activePage.fields.name === 'Home' ? _drawer2.default.active : '')
                },
                _react2.default.createElement(
                  'svg',
                  { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                  _react2.default.createElement('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' }),
                  _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Home'
                ),
                _react2.default.createElement(_ripple2.default, null)
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _drawer2.default['pageList-wrapper'] },
            _react2.default.createElement(_pageList3.default, {
              hasErrored: this.props.hasErrored,
              isLoading: this.props.isLoading,
              pages: this.props.entries,
              activePages: this.props.activePages,
              activeRoute: this.props.activeRoute
            })
          ),
          _react2.default.createElement('div', { className: _drawer2.default['drawer-footer'] })
        )
      );
    }
  }]);

  return Drawer;
}(_react2.default.Component);

Drawer.propTypes = {
  hasErrored: _react.PropTypes.bool,
  isLoading: _react.PropTypes.bool,
  drawerOpen: _react.PropTypes.bool.isRequired,
  entries: _react.PropTypes.array.isRequired,
  activePages: _react.PropTypes.array.isRequired,
  activePage: _react.PropTypes.object,
  activeRoute: _react.PropTypes.string,
  toggleDrawer: _react.PropTypes.func.isRequired
};

Drawer.defaultProps = {
  hasErrored: false,
  isLoading: false,
  activePage: null,
  activeRoute: null
};

function mapStateToProps(state) {
  return {
    hasErrored: state.pageList.hasErrored,
    isLoading: state.pageList.isLoading,
    entries: state.pageList.entries,
    activePages: state.pageList.activePages,
    activePage: state.activePage.page,
    activeRoute: state.activePage.route,
    currFilters: state.pageList.filters,
    drawerOpen: state.utils.drawerOpen
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: function toggleDrawer(open) {
      dispatch((0, _utils.toggleDrawer)(open));
    },
    addFilter: function addFilter(filter) {
      dispatch((0, _pageList.addFilter)(filter));
    },
    removeFilter: function removeFilter(filter) {
      dispatch((0, _pageList.removeFilter)(filter));
    }
  };
}

exports.default = (0, _withStyles2.default)(_drawer2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(Drawer));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _CSSTransitionGroup = __webpack_require__(89);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _utils = __webpack_require__(5);

var _waterfallHeader = __webpack_require__(26);

var _waterfallHeader2 = _interopRequireDefault(_waterfallHeader);

var _searchResults = __webpack_require__(30);

var _searchResults2 = _interopRequireDefault(_searchResults);

var _contentView = __webpack_require__(17);

var _contentView2 = _interopRequireDefault(_contentView);

var _main = __webpack_require__(74);

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

    _this.scrollHandler = function () {
      if (_this.contentWrapper.scrollTop > 0 && !_this.state.scrolled) {
        _this.props.scrolled(true);
        _this.setState({
          scrolled: true
        });
      }
      if (_this.contentWrapper.scrollTop < 1 && _this.state.scrolled) {
        _this.props.scrolled(false);
        _this.setState({
          scrolled: false
        });
      }
    };

    _this.state = {
      scrolled: false
    };
    return _this;
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'main',
        { className: _main2.default.main, ref: function ref(main) {
            _this2.main = main;
          } },
        _react2.default.createElement(_waterfallHeader2.default, {
          visible: this.props.showWaterfallHeader,
          activeRoute: this.props.activeRoute
        }),
        _react2.default.createElement(
          'div',
          { className: _main2.default['content-wrapper'], onScroll: this.scrollHandler, ref: function ref(div) {
              _this2.contentWrapper = div;
            } },
          _react2.default.createElement(
            'div',
            { className: _main2.default['flex-wrapper'] },
            _react2.default.createElement(
              _CSSTransitionGroup2.default,
              {
                transitionName: {
                  enter: _main2.default.enter,
                  enterActive: _main2.default.enterActive,
                  leave: _main2.default.leave,
                  leaveActive: _main2.default.leaveActive,
                  appear: _main2.default.appear,
                  appearActive: _main2.default.appearActive
                },
                component: 'div',
                className: _main2.default['transition-container'],
                transitionEnterTimeout: 500,
                transitionLeaveTimeout: 300
              },
              this.props.searchOpen ? _react2.default.createElement(_searchResults2.default, null) : _react2.default.createElement(_contentView2.default, {
                activeRoute: this.props.activeRoute,
                activePage: this.props.activePage,
                hasErrored: this.props.hasErrored,
                isLoading: this.props.isLoading, key: 2
              })
            ),
            !this.props.searchOpen ? _react2.default.createElement(
              'footer',
              { className: _main2.default.footer },
              _react2.default.createElement(
                'div',
                { className: _main2.default.section },
                _react2.default.createElement(
                  'h1',
                  null,
                  'A free, open source project to help web developers'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'v1.0.0 | Created by ',
                  _react2.default.createElement(
                    'a',
                    { href: 'https://twitter.com/AlexJRsaunders', target: '_blank', rel: 'noopener noreferrer' },
                    '@alexjrsaunders'
                  )
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'Released under the',
                  _react2.default.createElement(
                    'a',
                    { href: 'https://github.com/alex-saunders/ecmasyntax.io/blob/master/LICENSE.txt', target: '_blank', rel: 'noopener noreferrer' },
                    '\xA0MIT license.'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: _main2.default.section },
                _react2.default.createElement(
                  'h1',
                  null,
                  'Share'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'https://www.facebook.com/sharer/sharer.php?u=https%3A//ecmasyntax.io', target: '_blank', rel: 'noopener noreferrer' },
                    _react2.default.createElement('i', { className: _main2.default.facebook + ' fa fa-facebook-square', 'aria-hidden': 'true' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: 'https://twitter.com/home?status=Javascript%20syntax%20reference%3A%20https%3A//ecmasyntax.io' },
                    _react2.default.createElement('i', { className: _main2.default.twitter + ' fa fa-twitter-square', 'aria-hidden': 'true' })
                  )
                ),
                _react2.default.createElement('iframe', { src: 'https://ghbtns.com/github-btn.html?user=alex-saunders&repo=ecmasyntax.io&type=star&count=true', frameBorder: '0', scrolling: '0', width: '160px', height: '30px' })
              )
            ) : ''
          )
        )
      );
    }
  }]);

  return Main;
}(_react2.default.Component);

Main.propTypes = {
  activePage: _react.PropTypes.object,
  activeRoute: _react.PropTypes.string,
  searchOpen: _react.PropTypes.bool.isRequired,
  hasErrored: _react.PropTypes.bool,
  isLoading: _react.PropTypes.bool,
  showWaterfallHeader: _react.PropTypes.bool.isRequired,
  scrolled: _react.PropTypes.func.isRequired
};

Main.defaultProps = {
  hasErrored: false,
  isLoading: false,
  activePage: null,
  activeRoute: null
};

function mapStateToProps(state) {
  return {
    activeRoute: state.activePage.route,
    activePage: state.activePage.page,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen,
    currQuery: state.pageList.query
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: function toggleDrawer(open) {
      dispatch((0, _utils.toggleDrawer)(open));
    }
  };
}

exports.default = (0, _withStyles2.default)(_main2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(Main));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _searchResult = __webpack_require__(24);

var _searchResult2 = _interopRequireDefault(_searchResult);

var _searchResults = __webpack_require__(75);

var _searchResults2 = _interopRequireDefault(_searchResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults() {
    _classCallCheck(this, SearchResults);

    return _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).apply(this, arguments));
  }

  _createClass(SearchResults, [{
    key: 'mapResults',
    value: function mapResults() {
      var _this2 = this;

      if (this.props.currQuery.length < 1) {
        return [];
      }
      var results = this.props.activePages.map(function (page) {
        return _react2.default.createElement(_searchResult2.default, {
          key: page.sys.id,
          currQuery: _this2.props.currQuery,
          page: page
        });
      });
      return results;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _searchResults2.default['search-container'] },
        _react2.default.createElement(
          'div',
          { className: _searchResults2.default['search-results'] },
          _react2.default.createElement(
            'h1',
            { className: _searchResults2.default['search-title'] },
            'Results for ',
            _react2.default.createElement(
              'span',
              { className: _searchResults2.default['search-query'] },
              this.props.currQuery
            )
          ),
          this.mapResults()
        )
      );
    }
  }]);

  return SearchResults;
}(_react2.default.Component);

SearchResults.propTypes = {
  currQuery: _react.PropTypes.string.isRequired,
  activePages: _react.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    activePages: state.pageList.activePages,
    currQuery: state.pageList.query
  };
}

exports.default = (0, _withStyles2.default)(_searchResults2.default)((0, _reactRedux.connect)(mapStateToProps)(SearchResults));

/***/ }),
/* 31 */
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
    case 'ACTIVE_PAGE':
      {
        return Object.assign({}, state, {
          page: action.payload
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
  page: null,
  route: null,
  isLoading: false,
  hasErrored: false
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(12);

var _utils = __webpack_require__(34);

var _utils2 = _interopRequireDefault(_utils);

var _pageList = __webpack_require__(33);

var _pageList2 = _interopRequireDefault(_pageList);

var _activePage = __webpack_require__(31);

var _activePage2 = _interopRequireDefault(_activePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  utils: _utils2.default,
  pageList: _pageList2.default,
  activePage: _activePage2.default
});

exports.default = allReducers;

/***/ }),
/* 33 */
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
          hasErrored: action.payload
        });
      }
    case 'PAGELIST_LOADING':
      {
        return Object.assign({}, state, {
          isLoading: action.payload
        });
      }
    case 'PAGELIST_FETCH_SUCCESS':
      {
        return Object.assign({}, state, {
          entries: action.payload
        });
      }
    case 'SEARCH_QUERY':
      {
        var activePages = filterPages(state.filters, state.entries);
        return Object.assign({}, state, {
          query: action.payload,
          activePages: queryPages(action.payload, activePages)
        });
      }
    case 'ADD_FILTER':
      {
        var _activePages = queryPages(state.query, state.entries);
        var newFilters = state.filters;
        newFilters.push(action.payload);

        return Object.assign({}, state, {
          activePages: filterPages(newFilters, _activePages),
          filters: newFilters
        });
      }
    case 'REMOVE_FILTER':
      {
        var filter = action.payload;
        var _newFilters = state.filters;
        var _activePages2 = queryPages(state.query, state.entries);
        _newFilters.splice(_newFilters.indexOf(filter), 1);

        return Object.assign({}, state, {
          activePages: filterPages(_newFilters, _activePages2),
          filters: _newFilters
        });
      }
    default:
      {
        return state;
      }
  }
};

var _constants = __webpack_require__(11);

var initialState = {
  entries: [],
  isLoading: false,
  hasErrored: false,
  activePages: [],
  filters: [],
  query: ''
};

var filterPages = function filterPages(filters, pages) {
  var filteredPages = pages;
  if (filters.length > 0) {
    filteredPages = pages.filter(function (page) {
      return filters.includes(page.fields.category.fields.specification.fields.name);
    });
  }
  return filteredPages;
};

var queryPages = function queryPages(query, pages) {
  var syntaxEntries = pages;
  var matchedEntries = syntaxEntries;
  if (query.length > 0) {
    var regex = '^' + _constants.TAGGED_IN + ':([^ ]*)';
    var regexp = new RegExp(regex, 'g');
    var match = regexp.exec(query);
    if (match && match[1]) {
      matchedEntries = syntaxEntries.filter(function (entry) {
        if (!entry.fields.tags) {
          return false;
        }
        return entry.fields.tags.filter(function (tag) {
          return tag.fields.name.trim().toLowerCase().match(match[1]);
        }).length > 0;
      });
      return matchedEntries;
    } else {
      matchedEntries = syntaxEntries.filter(function (entry) {
        return entry.fields.name.trim().toLowerCase().match(query.toLowerCase()); // ||
      });
      return matchedEntries;
    }
  }
  return [];
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'TOGGLE_DRAWER':
      {
        return Object.assign({}, state, {
          drawerOpen: action.payload
        });
      }
    case 'TOGGLE_SEARCH':
      {
        return Object.assign({}, state, {
          searchOpen: action.payload
        });
      }
    default:
      {
        return state;
      }
  }
};

var initialState = {
  drawerOpen: false,
  searchOpen: false
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*!\n Material Components for the web\n Copyright (c) 2017 Google Inc.\n License: Apache-2.0\n*/\n/**\n * The css property used for elevation. In most cases this should not be changed. It is exposed\n * as a variable for abstraction / easy use when needing to reference the property directly, for\n * example in a `will-change` rule.\n */\n/**\n * The default duration value for elevation transitions.\n */\n/**\n * The default easing value for elevation transitions.\n */\n/**\n * Applies the correct css rules to an element to give it the elevation specified by $z-value.\n * The $z-value must be between 0 and 24.\n */\n/**\n * Returns a string that can be used as the value for a `transition` property for elevation.\n * Calling this function directly is useful in situations where a component needs to transition\n * more than one property.\n *\n * ```scss\n * .foo {\n *   transition: mdc-elevation-transition-rule(), opacity 100ms ease;\n *   will-change: $mdc-elevation-property, opacity;\n * }\n * ```\n */\n/**\n * Applies the correct css rules needed to have an element transition between elevations.\n * This mixin should be applied to elements whose elevation values will change depending on their\n * context (e.g. when active or disabled).\n */\n/*\n  Precomputed linear color channel values, for use in contrast calculations.\n  See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n\n  Algorithm, for c in 0 to 255:\n  f(c) {\n    c = c / 255;\n    return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);\n  }\n\n  This lookup table is needed since there is no `pow` in SASS.\n*/\n/**\n * Calculate the luminance for a color.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Calculate the contrast ratio between two colors.\n * See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n */\n/**\n * Determine whether to use dark or light text on top of given color.\n * Returns \"dark\" for dark text and \"light\" for light text.\n */\n/*\n  Main theme colors.\n  If you're a user customizing your color scheme in SASS, these are probably the only variables you need to change.\n*/\n/* Indigo 500 */\n/* Pink A200 */\n/* White */\n/* Which set of text colors to use for each main theme color (light or dark) */\n/* Text colors according to light vs dark and text type */\n/* Primary text colors for each of the theme colors */\n/**\n * Applies the correct theme color style to the specified property.\n * $property is typically color or background-color, but can be any CSS property that accepts color values.\n * $style should be one of the map keys in $mdc-theme-property-values (_variables.scss).\n */\n/**\n * Creates a rule to be used in MDC-Web components for dark theming, and applies the provided contents.\n * Should provide the $root-selector option if applied to anything other than the root selector.\n * When used with a modifier class, provide a second argument of `true` for the $compound parameter\n * to specify that this should be attached as a compound class.\n *\n * Usage example:\n *\n * ```scss\n * .mdc-foo {\n *   color: black;\n *\n *   @include mdc-theme-dark {\n *     color: white;\n *   }\n *\n *   &__bar {\n *     background: black;\n *\n *     @include mdc-theme-dark(\".mdc-foo\") {\n *       background: white;\n *     }\n *   }\n * }\n *\n * .mdc-foo--disabled {\n *   opacity: .38;\n *\n *   @include mdc-theme-dark(\".mdc-foo\", true) {\n *     opacity: .5;\n *   }\n * }\n * ```\n */\n.mdc-switch {\n  display: inline-block;\n  position: relative; }\n  .mdc-switch__native-control {\n    display: inline-block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 34px;\n    height: 14px;\n    cursor: pointer;\n    opacity: 0;\n    z-index: 2; }\n  .mdc-switch__background {\n    display: block;\n    position: relative;\n    width: 34px;\n    height: 14px;\n    border-radius: 7px;\n    outline: none;\n    background-color: transparent;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none; }\n    .mdc-switch--theme-dark .mdc-switch__background,\n    .mdc-theme--dark .mdc-switch__background {\n      background-color: transparent; }\n    .mdc-switch__background::before {\n      display: block;\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n      border-radius: 7px;\n      background-color: #000;\n      content: \"\";\n      opacity: .38; }\n      .mdc-switch--theme-dark .mdc-switch__background::before,\n      .mdc-theme--dark .mdc-switch__background::before {\n        background-color: #fff;\n        opacity: .3; }\n    .mdc-switch__background .mdc-switch__knob {\n      display: block;\n      position: absolute;\n      top: -3px;\n      left: 0;\n      width: 20px;\n      height: 20px;\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n      transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n      border-radius: 10px;\n      background-color: #fafafa;\n      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n      z-index: 1; }\n      .mdc-switch--theme-dark .mdc-switch__background .mdc-switch__knob,\n      .mdc-theme--dark .mdc-switch__background .mdc-switch__knob {\n        background-color: #bdbdbd; }\n      .mdc-switch__background .mdc-switch__knob::before {\n        position: absolute;\n        top: -14px;\n        left: -14px;\n        width: 48px;\n        height: 48px;\n        -webkit-transform: scale(0);\n                transform: scale(0);\n        transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n        border-radius: 24px;\n        background-color: transparent;\n        content: \"\";\n        opacity: .2; }\n\n.mdc-switch__native-control:focus ~ .mdc-switch__background .mdc-switch__knob::before {\n  position: absolute;\n  width: 48px;\n  height: 48px;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  border-radius: 24px;\n  background-color: #9e9e9e; }\n  .mdc-switch--theme-dark .mdc-switch__native-control:focus ~ .mdc-switch__background .mdc-switch__knob::before,\n  .mdc-theme--dark .mdc-switch__native-control:focus ~ .mdc-switch__background .mdc-switch__knob::before {\n    background-color: #f1f1f1;\n    opacity: .14; }\n\n.mdc-switch__native-control:checked ~ .mdc-switch__background::before {\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5);\n  opacity: .5; }\n\n.mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob {\n  -webkit-transform: translateX(14px);\n          transform: translateX(14px);\n  transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: #3f51b5;\n  background-color: var(--mdc-theme-primary, #3f51b5); }\n  .mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob::before {\n    background-color: #3f51b5;\n    background-color: var(--mdc-theme-primary, #3f51b5);\n    opacity: .15; }\n    .mdc-switch--theme-dark .mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob::before,\n    .mdc-theme--dark .mdc-switch__native-control:checked ~ .mdc-switch__background .mdc-switch__knob::before {\n      background-color: #3f51b5;\n      background-color: var(--mdc-theme-primary, #3f51b5); }\n\n.mdc-switch__native-control:disabled {\n  cursor: initial; }\n\n.mdc-switch__native-control:disabled ~ .mdc-switch__background::before {\n  background-color: #000;\n  opacity: .12; }\n  .mdc-switch--theme-dark .mdc-switch__native-control:disabled ~ .mdc-switch__background::before,\n  .mdc-theme--dark .mdc-switch__native-control:disabled ~ .mdc-switch__background::before {\n    background-color: #fff;\n    opacity: .1; }\n\n.mdc-switch__native-control:disabled ~ .mdc-switch__background .mdc-switch__knob {\n  background-color: #bdbdbd; }\n  .mdc-switch--theme-dark .mdc-switch__native-control:disabled ~ .mdc-switch__background .mdc-switch__knob,\n  .mdc-theme--dark .mdc-switch__native-control:disabled ~ .mdc-switch__background .mdc-switch__knob {\n    background-color: #424242; }\n", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".hljs-comment,\n.hljs-quote {\n    color: #6c6b5a\n}\n.hljs-variable,\n.hljs-template-variable,\n.hljs-attribute,\n.hljs-tag,\n.hljs-name,\n.hljs-regexp,\n.hljs-link,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class {\n    color: #ba6236\n}\n.hljs-number,\n.hljs-meta,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-literal,\n.hljs-type,\n.hljs-params {\n    color: #ae7313\n}\n.hljs-string,\n.hljs-symbol,\n.hljs-bullet {\n    color: #7d9726\n}\n.hljs-title,\n.hljs-section {\n    color: #36a166\n}\n.hljs-keyword,\n.hljs-selector-tag {\n    color: #5f9182\n}\n.hljs-deletion,\n.hljs-addition {\n    color: #22221b;\n    display: inline-block;\n    width: 100%\n}\n.hljs-deletion {\n    background-color: #ba6236\n}\n.hljs-addition {\n    background-color: #7d9726\n}\n.hljs {\n    display: block;\n    overflow-x: auto;\n    background: #f4f3ec;\n    color: #5f5e4e;\n    padding: 0.5em\n}\n.hljs-emphasis {\n    font-style: italic\n}\n.hljs-strong {\n    font-weight: bold\n}\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes loading-view_fadeIn_QDE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes loading-view_fadeIn_QDE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.loading-view_loading-container_SLC {\n  width: 100%;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.loading-view_loading-wrapper_2l8 {\n  -webkit-animation: loading-view_fadeIn_QDE .6s 1;\n          animation: loading-view_fadeIn_QDE .6s 1; }\n\n.loading-view_spinner_11t {\n  -webkit-animation: loading-view_rotator_23I 1.4s linear infinite;\n          animation: loading-view_rotator_23I 1.4s linear infinite; }\n\n@-webkit-keyframes loading-view_rotator_23I {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n@keyframes loading-view_rotator_23I {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n.loading-view_path_1Du {\n  stroke-dasharray: 187;\n  stroke-dashoffset: 0;\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  -webkit-animation: loading-view_dash_2r4 1.4s ease-in-out infinite, loading-view_colors_3q3 5.6s ease-in-out infinite;\n          animation: loading-view_dash_2r4 1.4s ease-in-out infinite, loading-view_colors_3q3 5.6s ease-in-out infinite; }\n\n@-webkit-keyframes loading-view_colors_3q3 {\n  0% {\n    stroke: #28353e; }\n  50% {\n    stroke: #00b4a2; }\n  100% {\n    stroke: #28353e; } }\n\n@keyframes loading-view_colors_3q3 {\n  0% {\n    stroke: #28353e; }\n  50% {\n    stroke: #00b4a2; }\n  100% {\n    stroke: #28353e; } }\n\n@-webkit-keyframes loading-view_dash_2r4 {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n\n@keyframes loading-view_dash_2r4 {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n", ""]);

// exports
exports.locals = {
	"loading-container": "loading-view_loading-container_SLC",
	"loading-wrapper": "loading-view_loading-wrapper_2l8",
	"fadeIn": "loading-view_fadeIn_QDE",
	"spinner": "loading-view_spinner_11t",
	"rotator": "loading-view_rotator_23I",
	"path": "loading-view_path_1Du",
	"dash": "loading-view_dash_2r4",
	"colors": "loading-view_colors_3q3"
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".ripple_ripple-container_3Lr {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.ripple_ripple-container_3Lr:hover {\n  background-color: rgba(155, 155, 155, 0.13); }\n\n.ripple_ripple-origin_2F7 {\n  position: absolute;\n  z-index: 9999999;\n  background: rgba(155, 155, 155, 0.3);\n  border-radius: 50%;\n  pointer-events: none; }\n\n.ripple_ripple-origin_2F7.ripple_animatable_mao {\n  -webkit-transition: opacity 0.6s ease-in, -webkit-transform 0.3s ease-in;\n  transition: opacity 0.6s ease-in, -webkit-transform 0.3s ease-in;\n  transition: transform 0.3s ease-in, opacity 0.6s ease-in;\n  transition: transform 0.3s ease-in, opacity 0.6s ease-in, -webkit-transform 0.3s ease-in; }\n\n.ripple_ripple-origin_2F7.ripple_out_2Fx {\n  opacity: 0; }\n", ""]);

// exports
exports.locals = {
	"ripple-container": "ripple_ripple-container_3Lr",
	"ripple-origin": "ripple_ripple-origin_2F7",
	"animatable": "ripple_animatable_mao",
	"out": "ripple_out_2Fx"
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes category-section_fadeIn_3c- {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes category-section_fadeIn_3c- {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.category-section_categorySection_3rD {\n  padding: 8px 0;\n  border-bottom: 1px solid #324047; }\n\n.category-section_categorySection-header_VGu {\n  -webkit-animation: category-section_fadeIn_3c- 0.6s 1;\n          animation: category-section_fadeIn_3c- 0.6s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n  display: block;\n  text-decoration: none;\n  padding: 8px 24px;\n  margin: 0;\n  color: silver;\n  font-size: 14px;\n  text-transform: uppercase;\n  line-height: 16px;\n  font-weight: 500; }\n  .category-section_categorySection-header_VGu .category-section_chevron_3TA {\n    float: right;\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear;\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n\n.category-section_categorySection-body_3Pm {\n  -webkit-animation: category-section_fadeIn_3c- 0.4s 1;\n          animation: category-section_fadeIn_3c- 0.4s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n\n.category-section_categorySection_3rD.category-section_hidden_2uW {\n  padding-bottom: 0px; }\n  .category-section_categorySection_3rD.category-section_hidden_2uW .category-section_chevron_3TA {\n    -webkit-transform: rotateX(180deg);\n            transform: rotateX(180deg); }\n  .category-section_categorySection_3rD.category-section_hidden_2uW .category-section_categorySection-body_3Pm {\n    display: none; }\n\n.category-section_pageList-item_2GC {\n  display: block;\n  position: relative;\n  text-decoration: none;\n  color: #fff;\n  padding: 0px 32px 0px 32px;\n  cursor: pointer;\n  line-height: 36px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  -webkit-transition: all .1s linear;\n  transition: all .1s linear; }\n\n.category-section_pageList-item_2GC.category-section_active_2Dx {\n  font-weight: 500;\n  color: #00b4a2; }\n", ""]);

// exports
exports.locals = {
	"categorySection": "category-section_categorySection_3rD",
	"categorySection-header": "category-section_categorySection-header_VGu",
	"fadeIn": "category-section_fadeIn_3c-",
	"chevron": "category-section_chevron_3TA",
	"categorySection-body": "category-section_categorySection-body_3Pm",
	"hidden": "category-section_hidden_2uW",
	"pageList-item": "category-section_pageList-item_2GC",
	"active": "category-section_active_2Dx"
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes page-list_fadeIn_Wfa {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes page-list_fadeIn_Wfa {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.page-list_pagelist-wrapper_2Me {\n  width: 100%; }\n\n.page-list_noResults_Klv {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-animation: page-list_fadeIn_Wfa 0.6s 1;\n          animation: page-list_fadeIn_Wfa 0.6s 1; }\n\n.page-list_noResults-copy_30m {\n  color: rgba(255, 255, 255, 0.6); }\n\n.page-list_noResults-copy_30m i {\n  padding-right: 4px; }\n\n.page-list_noResults-copy_30m span {\n  display: inline-block;\n  line-height: 24px;\n  position: relative;\n  bottom: 5px; }\n", ""]);

// exports
exports.locals = {
	"pagelist-wrapper": "page-list_pagelist-wrapper_2Me",
	"noResults": "page-list_noResults_Klv",
	"fadeIn": "page-list_fadeIn_Wfa",
	"noResults-copy": "page-list_noResults-copy_30m"
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes content-view_fadeIn_2mA {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes content-view_fadeIn_2mA {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.content-view_page-view_aIc {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  padding: 16px 32px 16px 32px;\n  overflow-x: hidden; }\n  @media (max-width: 500px) {\n    .content-view_page-view_aIc {\n      padding: 16px; } }\n\n.content-view_transition-container_NUV {\n  flex: 1;\n  display: flex;\n  flex-direction: column; }\n\n.content-view_loading_e-1 {\n  flex: 1;\n  padding: 16px; }\n\n.content-view_loading_e-1.content-view_enterActive_2yb {\n  top: 0;\n  left: 0; }\n\n.content-view_enter_3lA {\n  position: relative;\n  -webkit-transform: translateX(100px);\n          transform: translateX(100px);\n  opacity: 0.01; }\n\n.content-view_enter_3lA.content-view_enterActive_2yb {\n  opacity: 1;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  -webkit-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.content-view_leave_3Q4 {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  opacity: 1; }\n\n.content-view_leave_3Q4.content-view_leaveActive_35b {\n  position: absolute;\n  top: 16px;\n  left: 48px;\n  -webkit-transform: translateX(-100px);\n          transform: translateX(-100px);\n  opacity: 0;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.content-view_appear_t3f {\n  opacity: 0.01; }\n\n.content-view_appear_t3f.content-view_appearActive_16k {\n  opacity: 1;\n  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1); }\n", ""]);

// exports
exports.locals = {
	"page-view": "content-view_page-view_aIc",
	"transition-container": "content-view_transition-container_NUV",
	"loading": "content-view_loading_e-1",
	"enterActive": "content-view_enterActive_2yb",
	"enter": "content-view_enter_3lA",
	"leave": "content-view_leave_3Q4",
	"leaveActive": "content-view_leaveActive_35b",
	"appear": "content-view_appear_t3f",
	"appearActive": "content-view_appearActive_16k",
	"fadeIn": "content-view_fadeIn_2mA"
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes homepage-view_fadeIn_2op {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes homepage-view_fadeIn_2op {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.homepage-view_homepage-container_1TF {\n  -webkit-animation: homepage-view_fadeIn_2op .6s 1;\n          animation: homepage-view_fadeIn_2op .6s 1; }\n  .homepage-view_homepage-container_1TF .homepage-view_subtitle_yaZ {\n    font-weight: 500;\n    padding-bottom: 8px;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1); }\n  .homepage-view_homepage-container_1TF .homepage-view_share_32z {\n    display: inline-block;\n    height: 28px;\n    width: 28px; }\n    .homepage-view_homepage-container_1TF .homepage-view_share_32z i {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      font-size: 28px; }\n    .homepage-view_homepage-container_1TF .homepage-view_share_32z .homepage-view_facebook_35s {\n      color: #3B5998; }\n    .homepage-view_homepage-container_1TF .homepage-view_share_32z .homepage-view_twitter_1sm {\n      color: #4099FF; }\n  .homepage-view_homepage-container_1TF a {\n    text-decoration: none;\n    color: #007468; }\n", ""]);

// exports
exports.locals = {
	"homepage-container": "homepage-view_homepage-container_1TF",
	"fadeIn": "homepage-view_fadeIn_2op",
	"subtitle": "homepage-view_subtitle_yaZ",
	"share": "homepage-view_share_32z",
	"facebook": "homepage-view_facebook_35s",
	"twitter": "homepage-view_twitter_1sm"
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Inconsolata);", ""]);

// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes markdown-container_fadeIn_TfY {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes markdown-container_fadeIn_TfY {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.markdown-container_footer-container_1vn {\n  margin-top: 24px;\n  border-top: 1px solid #eaecef; }\n\n.markdown-container_references-container_3Cn li {\n  font-size: 16px; }\n\n.markdown-container_markdown-wrapper_36r {\n  line-height: 1.5;\n  -webkit-animation: markdown-container_fadeIn_TfY 0.6s 1;\n          animation: markdown-container_fadeIn_TfY 0.6s 1; }\n  .markdown-container_markdown-wrapper_36r h1,\n  .markdown-container_markdown-wrapper_36r h2,\n  .markdown-container_markdown-wrapper_36r strong {\n    color: #333; }\n  .markdown-container_markdown-wrapper_36r h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em;\n    border-bottom: 1px solid #eaecef; }\n  .markdown-container_markdown-wrapper_36r h2 {\n    padding-bottom: 0.3em;\n    font-size: 1.5em;\n    border-bottom: 1px solid #eaecef; }\n  .markdown-container_markdown-wrapper_36r p {\n    color: #373737; }\n  .markdown-container_markdown-wrapper_36r pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 4px solid #00b4a2;\n    border-radius: 0px 3px 3px 0px;\n    white-space: pre-wrap;\n    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); }\n    .markdown-container_markdown-wrapper_36r pre code {\n      font-family: 'Inconsolata', monospace;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .markdown-container_markdown-wrapper_36r table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .markdown-container_markdown-wrapper_36r table tr {\n      background-color: #fff; }\n      .markdown-container_markdown-wrapper_36r table tr th, .markdown-container_markdown-wrapper_36r table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .markdown-container_markdown-wrapper_36r table tr th {\n        font-weight: 600; }\n  .markdown-container_markdown-wrapper_36r hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, 0.1); }\n  .markdown-container_markdown-wrapper_36r a {\n    text-decoration: none;\n    color: #007468; }\n  .markdown-container_markdown-wrapper_36r img {\n    max-width: 100%; }\n", ""]);

// exports
exports.locals = {
	"footer-container": "markdown-container_footer-container_1vn",
	"references-container": "markdown-container_references-container_3Cn",
	"markdown-wrapper": "markdown-container_markdown-wrapper_36r",
	"fadeIn": "markdown-container_fadeIn_TfY"
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes header-icon_fadeIn_3_t {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes header-icon_fadeIn_3_t {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes header-icon_grow_N9V {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes header-icon_grow_N9V {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n.header-icon_header-icon_2Mt {\n  display: flex;\n  position: relative;\n  z-index: 98;\n  text-decoration: none;\n  cursor: pointer;\n  border-radius: 50%;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  background: none;\n  border: none; }\n\n.header-icon_icon-container_Lhr {\n  -webkit-appearance: none;\n  background: none;\n  border: none;\n  outline: none;\n  padding: 8px;\n  cursor: pointer; }\n\n@media (max-width: 500px) {\n  .header-icon_menuIcon_3g0.header-icon_searchOpen_LoU {\n    display: none; } }\n\n.header-icon_backIcon__g9 {\n  display: none; }\n\n.header-icon_backIcon__g9.header-icon_searchOpen_LoU {\n  -webkit-animation: header-icon_grow_N9V 0.2s 1;\n          animation: header-icon_grow_N9V 0.2s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  @media (max-width: 500px) {\n    .header-icon_backIcon__g9.header-icon_searchOpen_LoU {\n      display: block; } }\n", ""]);

// exports
exports.locals = {
	"header-icon": "header-icon_header-icon_2Mt",
	"icon-container": "header-icon_icon-container_Lhr",
	"menuIcon": "header-icon_menuIcon_3g0",
	"searchOpen": "header-icon_searchOpen_LoU",
	"backIcon": "header-icon_backIcon__g9",
	"grow": "header-icon_grow_N9V",
	"fadeIn": "header-icon_fadeIn_3_t"
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes main-header_fadeIn_1wX {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes main-header_fadeIn_1wX {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.main-header_header_2ao {\n  position: relative;\n  padding: 16px 24px 16px 72px;\n  z-index: 100;\n  width: 100%;\n  background-color: #28353e;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3); }\n  @media (max-width: 500px) {\n    .main-header_header_2ao {\n      padding: 16px 24px 16px 48px; } }\n\n.main-header_toggle-container_1WI {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 48px; }\n  @media (min-width: 500px) {\n    .main-header_toggle-container_1WI {\n      left: 16px; } }\n\n.main-header_title_3U7 {\n  display: block;\n  flex: 1;\n  padding-right: 16px;\n  color: #fff;\n  font-size: 18px;\n  -webkit-transition: all 0.2s linear;\n  transition: all 0.2s linear;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n\n@media (max-width: 500px) {\n  .main-header_header_2ao.main-header_searchOpen_109 .main-header_title_3U7 {\n    opacity: 0;\n    padding: 0; } }\n\n@media (max-width: 500px) {\n  .main-header_header_2ao.main-header_waterfallOpen_3M_ {\n    box-shadow: none; } }\n", ""]);

// exports
exports.locals = {
	"header": "main-header_header_2ao",
	"toggle-container": "main-header_toggle-container_1WI",
	"title": "main-header_title_3U7",
	"searchOpen": "main-header_searchOpen_109",
	"waterfallOpen": "main-header_waterfallOpen_3M_",
	"fadeIn": "main-header_fadeIn_1wX"
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes search-input_fadeIn_1TH {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-input_fadeIn_1TH {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.search-input_search-label_2BU {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  width: 24px;\n  overflow: hidden;\n  -webkit-transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_icon-container_orR {\n  background: none;\n  border: none;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n  color: #fff; }\n\n.search-input_search-icon_b0B {\n  height: 24px;\n  width: 24px;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_search-closeIcon_3Jx {\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  opacity: 0;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  display: flex;\n  align-items: center; }\n  .search-input_search-closeIcon_3Jx i {\n    padding: 0px;\n    font-size: 20px; }\n\n.search-input_search-input--container_3Tj {\n  border-bottom: 1px solid #324047;\n  position: relative;\n  flex: 1;\n  margin-left: 8px; }\n\n.search-input_search-input--container_3Tj::after {\n  display: block;\n  content: '';\n  position: absolute;\n  bottom: -1px;\n  left: 0px;\n  height: 2px;\n  background-color: #fff;\n  width: 10px;\n  visibility: hidden;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_search-input_1uU {\n  position: relative;\n  height: 30px;\n  width: 100%;\n  outline: 0;\n  border: none;\n  padding: 4px 28px 4px 4px;\n  overflow: hidden;\n  font-size: 16px;\n  background: none;\n  color: #fff; }\n\n.search-input_search-label_2BU.search-input_opened_3zw {\n  width: 360px; }\n  @media (max-width: 500px) {\n    .search-input_search-label_2BU.search-input_opened_3zw {\n      width: 100%; } }\n  @media (max-width: 500px) {\n    .search-input_search-label_2BU.search-input_opened_3zw .search-input_search-input--container_3Tj {\n      margin-left: 0; } }\n  .search-input_search-label_2BU.search-input_opened_3zw .search-input_search-closeIcon_3Jx {\n    opacity: 1; }\n  @media (max-width: 500px) {\n    .search-input_search-label_2BU.search-input_opened_3zw .search-input_search-searchIcon_2em {\n      display: none; } }\n\n.search-input_search-label_2BU.search-input_focused_WIx .search-input_search-input--container_3Tj::after {\n  visibility: visible;\n  width: 100%; }\n", ""]);

// exports
exports.locals = {
	"search-label": "search-input_search-label_2BU",
	"icon-container": "search-input_icon-container_orR",
	"search-icon": "search-input_search-icon_b0B",
	"search-closeIcon": "search-input_search-closeIcon_3Jx",
	"search-input--container": "search-input_search-input--container_3Tj",
	"search-input": "search-input_search-input_1uU",
	"opened": "search-input_opened_3zw",
	"search-searchIcon": "search-input_search-searchIcon_2em",
	"focused": "search-input_focused_WIx",
	"fadeIn": "search-input_fadeIn_1TH"
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes progress-indicator_fadeIn_F5i {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes progress-indicator_fadeIn_F5i {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.progress-indicator_progressIndicator_2I_ {\n  position: relative;\n  z-index: 101;\n  background-color: #00b4a2;\n  height: 4px; }\n\n.progress-indicator_progressIndicator_2I_.progress-indicator_animatable_3qR {\n  -webkit-transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s linear;\n  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s linear; }\n", ""]);

// exports
exports.locals = {
	"progressIndicator": "progress-indicator_progressIndicator_2I_",
	"animatable": "progress-indicator_animatable_3qR",
	"fadeIn": "progress-indicator_fadeIn_F5i"
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes search-result_fadeIn_11R {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-result_fadeIn_11R {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.search-result_result_1_F {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  padding: 4px 0 25px 0;\n  border-bottom: 1px solid #324047;\n  cursor: pointer;\n  text-decoration: none; }\n  @media (max-width: 500px) {\n    .search-result_result_1_F {\n      padding: 0px 8px 0px 48px;\n      border-bottom: none; } }\n\n.search-result_ripple_1lD {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n  @media (min-width: 500px) {\n    .search-result_ripple_1lD {\n      display: none; } }\n\n.search-result_result-title_2z7 {\n  color: #00b4a2;\n  font-size: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-title_2z7 {\n      color: #373737;\n      font-size: 16px;\n      margin: 16px 0; } }\n\n.search-result_result-url_3fq {\n  font-size: 13px;\n  color: #007468;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  @media (max-width: 500px) {\n    .search-result_result-url_3fq {\n      display: none; } }\n\n.search-result_result-route_2ho {\n  color: #373737;\n  font-size: 13px;\n  line-height: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-route_2ho {\n      display: none; } }\n", ""]);

// exports
exports.locals = {
	"result": "search-result_result_1_F",
	"ripple": "search-result_ripple_1lD",
	"result-title": "search-result_result-title_2z7",
	"result-url": "search-result_result-url_3fq",
	"result-route": "search-result_result-route_2ho",
	"fadeIn": "search-result_fadeIn_11R"
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes offline-switch_fadeIn_cJz {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes offline-switch_fadeIn_cJz {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.offline-switch_switch-container_1E3 {\n  display: inline-block; }\n\n.offline-switch_button_182 {\n  background: none;\n  border: none;\n  outline: none; }\n\n.offline-switch_input_38l {\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); }\n\n.offline-switch_switch-label_3YW {\n  color: silver;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  margin-right: 16px;\n  -webkit-transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.offline-switch_switch-container_1E3.offline-switch_active_1tA .offline-switch_switch-label_3YW {\n  color: #00b4a2; }\n", ""]);

// exports
exports.locals = {
	"switch-container": "offline-switch_switch-container_1E3",
	"button": "offline-switch_button_182",
	"input": "offline-switch_input_38l",
	"switch-label": "offline-switch_switch-label_3YW",
	"active": "offline-switch_active_1tA",
	"fadeIn": "offline-switch_fadeIn_cJz"
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes waterfall-header_fadeIn_3R7 {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes waterfall-header_fadeIn_3R7 {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.waterfall-header_header_OFd {\n  position: relative;\n  top: -1px;\n  z-index: 100;\n  width: 100%;\n  background-color: #28353e;\n  overflow: hidden;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);\n  -webkit-transition: max-height 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: max-height 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.waterfall-header_header-contentWrapper_2lk {\n  float: right;\n  padding: 20px; }\n", ""]);

// exports
exports.locals = {
	"header": "waterfall-header_header_OFd",
	"header-contentWrapper": "waterfall-header_header-contentWrapper_2lk",
	"fadeIn": "waterfall-header_fadeIn_3R7"
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".route_route_1sY {\n  display: inline-block;\n  width: 100%;\n  text-decoration: none; }\n", ""]);

// exports
exports.locals = {
	"route": "route_route_1sY"
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes drawer_fadeIn_3EK {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes drawer_fadeIn_3EK {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.drawer_drawer-container_31e {\n  position: relative;\n  z-index: 99;\n  height: 100%;\n  width: 40%;\n  max-width: 300px; }\n  @media (max-width: 500px) {\n    .drawer_drawer-container_31e {\n      position: fixed;\n      z-index: 102;\n      left: 0;\n      top: 0;\n      width: 100%;\n      max-width: none;\n      height: 100%;\n      overflow: hidden;\n      pointer-events: none; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_31e::after {\n    display: block;\n    content: '';\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.4);\n    opacity: 0;\n    will-change: opacity;\n    -webkit-transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); } }\n\n@media (min-width: 500px) {\n  .drawer_drawer-container_31e.drawer_active_SOS {\n    display: none; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_31e.drawer_active_SOS {\n    pointer-events: auto; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_31e.drawer_active_SOS::after {\n    opacity: 1; } }\n\n.drawer_drawer_2Js {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }\n  @media (max-width: 500px) {\n    .drawer_drawer_2Js {\n      box-shadow: 2px 0 12px rgba(0, 0, 0, 0.4);\n      left: 0;\n      top: 0;\n      max-width: 400px;\n      width: 80%;\n      -webkit-transform: translateX(-107%);\n              transform: translateX(-107%);\n      will-change: transform; } }\n\n.drawer_drawer_2Js.drawer_draggable_iwv {\n  -webkit-transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1), -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1); }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_31e.drawer_active_SOS .drawer_drawer_2Js {\n    -webkit-transform: translateX(0px);\n            transform: translateX(0px); } }\n\n.drawer_drawer-homeContainer_1Bo {\n  padding: 8px 0;\n  border-bottom: 1px solid #324047;\n  background-color: #1e2b32; }\n\n.drawer_drawer-home_2Lu {\n  position: relative;\n  overflow: hidden;\n  padding: 0 24px;\n  height: 40px;\n  text-decoration: none;\n  display: flex;\n  align-items: center; }\n  .drawer_drawer-home_2Lu svg {\n    margin-right: 27px;\n    fill: #fff; }\n  .drawer_drawer-home_2Lu span {\n    color: #fff; }\n\n.drawer_drawer-home_2Lu.drawer_active_SOS i {\n  color: #00b4a2; }\n\n.drawer_drawer-home_2Lu.drawer_active_SOS span {\n  font-weight: 500;\n  color: #00b4a2; }\n\n.drawer_drawer-logo_108 {\n  display: none;\n  background-color: #1e2b32; }\n  .drawer_drawer-logo_108 img {\n    width: 100%; }\n\n.drawer_drawer-divider_3-J {\n  border: 1px solid #324047;\n  border-bottom: none;\n  margin: 0; }\n\n.drawer_search-container_2-X {\n  padding: 16px;\n  background-color: #324047;\n  border-bottom: 1px solid #324047; }\n\n.drawer_articleFilters-wrapper_3oY {\n  background-color: #1e2b32; }\n\n.drawer_pageList-wrapper_2-C {\n  background-color: #1e2b32;\n  flex: 1;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n  display: flex; }\n\n.drawer_drawer-footer_2Nz {\n  height: 0px;\n  background-color: #1e2b32; }\n", ""]);

// exports
exports.locals = {
	"drawer-container": "drawer_drawer-container_31e",
	"active": "drawer_active_SOS",
	"drawer": "drawer_drawer_2Js",
	"draggable": "drawer_draggable_iwv",
	"drawer-homeContainer": "drawer_drawer-homeContainer_1Bo",
	"drawer-home": "drawer_drawer-home_2Lu",
	"drawer-logo": "drawer_drawer-logo_108",
	"drawer-divider": "drawer_drawer-divider_3-J",
	"search-container": "drawer_search-container_2-X",
	"articleFilters-wrapper": "drawer_articleFilters-wrapper_3oY",
	"pageList-wrapper": "drawer_pageList-wrapper_2-C",
	"drawer-footer": "drawer_drawer-footer_2Nz",
	"fadeIn": "drawer_fadeIn_3EK"
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes main_fadeIn_3Wz {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes main_fadeIn_3Wz {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.main_main_3IX {\n  position: relative;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  background-color: #fff;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch; }\n\n.main_progressBar_3PJ {\n  /* TEMP */\n  display: none;\n  /* *** */\n  position: relative;\n  z-index: 96;\n  width: 100%;\n  background-color: #28353e;\n  height: 5px;\n  -webkit-transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.main_content-wrapper_2tP {\n  flex: 1;\n  position: relative;\n  z-index: 9;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n  display: inline-block; }\n\n.main_flex-wrapper_2W6 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 100%; }\n\n.main_footer_110 {\n  position: relative;\n  z-index: 10;\n  padding: 16px;\n  width: 100%;\n  background: #1e2b32;\n  color: #fff;\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2); }\n  .main_footer_110 .main_section_zKk {\n    display: inline-block;\n    width: 50%;\n    vertical-align: top;\n    word-break: break-word;\n    background-color: #1e2b32; }\n    @media (max-width: 500px) {\n      .main_footer_110 .main_section_zKk {\n        width: 100%; } }\n    .main_footer_110 .main_section_zKk p {\n      color: #fff; }\n      .main_footer_110 .main_section_zKk p a {\n        color: #00b4a2;\n        text-decoration: none; }\n      .main_footer_110 .main_section_zKk p i {\n        font-size: 24px;\n        margin-right: 8px;\n        -webkit-transition: all 0.2s linear;\n        transition: all 0.2s linear; }\n      .main_footer_110 .main_section_zKk p i:hover {\n        opacity: 0.8; }\n      .main_footer_110 .main_section_zKk p i:active {\n        -webkit-transform: scale(0.94);\n                transform: scale(0.94); }\n      .main_footer_110 .main_section_zKk p .main_facebook_K7i {\n        color: #3B5998; }\n      .main_footer_110 .main_section_zKk p .main_twitter_1q4 {\n        color: #4099FF; }\n    .main_footer_110 .main_section_zKk h1 {\n      font-size: 16px; }\n  @media (min-width: 500px) {\n    .main_footer_110 .main_section_zKk:nth-child(1) {\n      padding-right: 24px;\n      border-right: 1px solid #324047; } }\n  @media (min-width: 500px) {\n    .main_footer_110 .main_section_zKk:nth-child(2) {\n      padding-left: 24px; } }\n\n.main_transition-container_17I {\n  flex: 1;\n  display: flex;\n  flex-direction: column; }\n\n.main_enter_267 {\n  opacity: 0.01; }\n\n.main_enter_267.main_enterActive_1AK {\n  opacity: 1;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.main_leave_wDn {\n  opacity: 0;\n  position: absolute; }\n\n.main_leave_wDn.main_leaveActive_1oa {\n  opacity: 0.01;\n  -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.main_appear_IkB {\n  opacity: 0.01; }\n\n.main_appear_IkB.main_appearActive_2wP {\n  opacity: 1;\n  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1); }\n", ""]);

// exports
exports.locals = {
	"main": "main_main_3IX",
	"progressBar": "main_progressBar_3PJ",
	"content-wrapper": "main_content-wrapper_2tP",
	"flex-wrapper": "main_flex-wrapper_2W6",
	"footer": "main_footer_110",
	"section": "main_section_zKk",
	"facebook": "main_facebook_K7i",
	"twitter": "main_twitter_1q4",
	"transition-container": "main_transition-container_17I",
	"enter": "main_enter_267",
	"enterActive": "main_enterActive_1AK",
	"leave": "main_leave_wDn",
	"leaveActive": "main_leaveActive_1oa",
	"appear": "main_appear_IkB",
	"appearActive": "main_appearActive_2wP",
	"fadeIn": "main_fadeIn_3Wz"
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes search-results_fadeIn_pSZ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-results_fadeIn_pSZ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes search-results_flyIn_1xB {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n@keyframes search-results_flyIn_1xB {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n.search-results_search-container_-Li {\n  flex: 1;\n  width: 75%;\n  padding: 80px 0;\n  margin: 0 auto; }\n  @media (max-width: 500px) {\n    .search-results_search-container_-Li {\n      width: 100%;\n      padding: 8px 0; } }\n\n.search-results_search-results_27x {\n  padding: 16px; }\n  @media (max-width: 500px) {\n    .search-results_search-results_27x {\n      padding: 0; } }\n\n.search-results_search-title_1sI {\n  font-weight: 400; }\n  @media (max-width: 500px) {\n    .search-results_search-title_1sI {\n      display: none; } }\n\n.search-results_search-query_2hs {\n  color: #00b4a2;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n", ""]);

// exports
exports.locals = {
	"search-container": "search-results_search-container_-Li",
	"search-results": "search-results_search-results_27x",
	"search-title": "search-results_search-title_1sI",
	"search-query": "search-results_search-query_2hs",
	"fadeIn": "search-results_fadeIn_pSZ",
	"flyIn": "search-results_flyIn_1xB"
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/icon?family=Material+Icons);", ""]);

// module
exports.push([module.i, "html, body {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px; }\n\n* {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); }\n\n.base_app-container_1op {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  width: 100vw; }\n\n.base_main-container_Scb {\n  width: 100%;\n  flex: 1;\n  display: flex;\n  flex-direction: row; }\n", ""]);

// exports
exports.locals = {
	"app-container": "base_app-container_1op",
	"main-container": "base_main-container_Scb"
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(35);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../css-loader/index.js!./mdc.switch.css", function() {
        content = require("!!../../../css-loader/index.js!./mdc.switch.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(36);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js!./atelier-estuary-light.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js!./atelier-estuary-light.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(37);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./loading-view.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./loading-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(38);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./ripple.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./ripple.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(39);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(40);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./page-list.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./page-list.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(41);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./content-view.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./content-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(42);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./homepage-view.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./homepage-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(43);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./markdown-container.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./markdown-container.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(44);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./header-icon.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./header-icon.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(45);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./main-header.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./main-header.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(46);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./search-input.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./search-input.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(47);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./progress-indicator.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./progress-indicator.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(48);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./search-result.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./search-result.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(49);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./offline-switch.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./offline-switch.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(50);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./waterfall-header.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./waterfall-header.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(51);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./route.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./route.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(52);
    var insertCss = __webpack_require__(1);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(53);
    var insertCss = __webpack_require__(1);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(54);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./search-results.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??ref--1-2!../../../node_modules/sass-loader/lib/loader.js!./search-results.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(55);
    var insertCss = __webpack_require__(1);

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
/* 77 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("contentful");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("dompurify");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("highlight.js");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("react-transition-group/CSSTransitionGroup");

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _panel = __webpack_require__(93);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel(props) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this._handleClick = function () {
      _this.setState(function (prevState) {
        return {
          closed: !prevState.closed
        };
      });
    };

    _this.state = {
      closed: _this.props.closed
    };
    return _this;
  }

  _createClass(Panel, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _panel2.default.panel },
        _react2.default.createElement(
          'button',
          { className: _panel2.default['panel-title'], onClick: this._handleClick },
          _react2.default.createElement(
            'svg',
            { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg', className: _panel2.default.icon },
            this.props.icon
          ),
          this.props.title,
          _react2.default.createElement('div', { className: _panel2.default.filler }),
          _react2.default.createElement(
            'svg',
            {
              fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg',
              className: _panel2.default.expand + ' ' + (this.state.closed ? _panel2.default.closed : '')
            },
            _react2.default.createElement('path', { d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' }),
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _panel2.default['panel-body'] + ' ' + (this.state.closed ? _panel2.default.closed : '') },
          this.props.body
        )
      );
    }
  }]);

  return Panel;
}(_react2.default.Component);

Panel.propTypes = {
  icon: _react.PropTypes.element.isRequired,
  title: _react.PropTypes.string.isRequired,
  body: _react.PropTypes.any.isRequired,
  closed: _react.PropTypes.bool
};

Panel.defaultProps = {
  closed: false
};

exports.default = (0, _withStyles2.default)(_panel2.default)(Panel);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".panel_panel_zYq {\n  border: 1px solid #eaeaea;\n  border-radius: 3px 3px 0 0;\n  margin: 16px 0;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05); }\n\n.panel_panel-title_1-o {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  display: flex;\n  width: 100%;\n  border: none;\n  align-items: center;\n  font-weight: 500;\n  text-transform: uppercase;\n  font-size: 14px;\n  background: #f6f8fa;\n  padding: 8px;\n  margin: 0; }\n  .panel_panel-title_1-o .panel_icon_3am {\n    height: 16px;\n    margin-right: 4px; }\n  .panel_panel-title_1-o .panel_filler_2Md {\n    flex: 1; }\n  .panel_panel-title_1-o .panel_expand_2Ol.panel_closed_3ea {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg); }\n\n.panel_panel-body_2w2 {\n  padding: 16px;\n  border-top: 1px solid #eaeaea; }\n  .panel_panel-body_2w2 p, .panel_panel-body_2w2 ol {\n    margin: 0; }\n\n.panel_panel-body_2w2.panel_closed_3ea {\n  display: none; }\n", ""]);

// exports
exports.locals = {
	"panel": "panel_panel_zYq",
	"panel-title": "panel_panel-title_1-o",
	"icon": "panel_icon_3am",
	"filler": "panel_filler_2Md",
	"expand": "panel_expand_2Ol",
	"closed": "panel_closed_3ea",
	"panel-body": "panel_panel-body_2w2"
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(92);
    var insertCss = __webpack_require__(1);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./panel.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./panel.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map