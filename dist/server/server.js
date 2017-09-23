/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

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


var _stringify = __webpack_require__(64);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(65);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(63);

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
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAutoDownload = exports.setAutoDownloadResult = exports.popToast = exports.pushToast = exports.progressUpdate = exports.toggleWaterfallHeader = exports.toggleSearch = exports.toggleDrawer = undefined;

var _constants = __webpack_require__(8);

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

var toggleWaterfallHeader = exports.toggleWaterfallHeader = function toggleWaterfallHeader(bool) {
  return {
    type: 'TOGGLE_WATERFALL_HEADER',
    payload: bool
  };
};

var progressUpdate = exports.progressUpdate = function progressUpdate(percentage) {
  return {
    type: 'PROGRESS_UPDATE',
    payload: percentage
  };
};

var pushToast = exports.pushToast = function pushToast(messageText, actionText, timeout, callback) {
  return {
    type: 'PUSH_TOAST',
    payload: {
      messageText: messageText,
      actionText: actionText,
      timeout: timeout,
      callback: callback
    }
  };
};

var popToast = exports.popToast = function popToast() {
  return {
    type: 'POP_TOAST'
  };
};

var setAutoDownloadResult = exports.setAutoDownloadResult = function setAutoDownloadResult(bool) {
  return {
    type: 'AUTO_DOWNLOAD',
    payload: bool
  };
};

var setAutoDownload = exports.setAutoDownload = function setAutoDownload(bool) {
  return function (dispatch) {

    dispatch(setAutoDownloadResult(bool));
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPageList = exports.pageListFetchSuccess = exports.pageListError = exports.pageListLoading = exports.removeFilter = exports.addFilter = exports.search = undefined;

var _utils = __webpack_require__(6);

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
  return {
    type: 'PAGELIST_FETCH_SUCCESS',
    payload: entries
  };
};

var fetchPageList = exports.fetchPageList = function fetchPageList() {
  return function (dispatch) {
    var networkDataRecieved = false;
    var cacheDataRecieved = false;

    dispatch(pageListLoading(true));
    dispatch(pageListError(false));

    var networkUpdate = fetch('/api/pages').then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      networkDataRecieved = true;

      if (!cacheDataRecieved) {
        dispatch(pageListLoading(false));
        dispatch(pageListFetchSuccess(response.fields));
      } else {
        // compare the cached and retrieved pagelists
        if (cacheDataRecieved.sys.id !== response.sys.id) {
          // the network request response has newer content than the cached response
          dispatch((0, _utils.pushToast)('Newer content is available, reload to update', 'reload', false, function () {
            location.reload();
          }));
        } else {
          // cached pagelist is up to date
        }
      }
    }).catch(function (err) {
      dispatch(pageListFetchSuccess(true));
      throw err;
    });

    // fetch cached data
    caches.match('/api/pages').then(function (response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function (data) {
      cacheDataRecieved = data;
      // we have used the data from the cache as the response here
      if (!networkDataRecieved) {
        dispatch(pageListLoading(false));
        dispatch(pageListFetchSuccess(data.fields));
      }
    }).catch(function () {
      return networkUpdate;
    }).catch(function (err) {
      console.log(err);
    });
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// meta
var IDB_VERSION_NO = exports.IDB_VERSION_NO = 1;

// content model
var TAGGED_IN = exports.TAGGED_IN = 'taggedin';

// drawer
var INITIATE_DRAGGING_THRESHOLD = exports.INITIATE_DRAGGING_THRESHOLD = 30;
var DRAWER_CLOSE_THRESHOLD = exports.DRAWER_CLOSE_THRESHOLD = 30;

// caches
var RUNTIME_CACHE = exports.RUNTIME_CACHE = 'ecmasyntax-runtime';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ripple = __webpack_require__(50);

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
  children: _propTypes2.default.element
};

Ripple.defaultProps = {
  children: null
};

exports.default = (0, _withStyles2.default)(_ripple2.default)(Ripple);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(5);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _urlSearchParams = __webpack_require__(71);

var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);

var _link = __webpack_require__(56);

var _link2 = _interopRequireDefault(_link);

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

      if (_this.props.route.startsWith('?')) {
        // location.search = this.props.route;

        var url = new URL(location.href);
        url.search = _this.props.route;
        window.history.replaceState(null, null, url.href);
      } else {
        window.history.pushState(null, null, _this.props.route);
      }

      window.dispatchEvent(new Event('popstate'));

      if (_this.props.handleClick) _this.props.handleClick(e);
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
          className: _link2.default.route
        },
        this.props.children
      );
    }
  }]);

  return Route;
}(_react2.default.Component);

Route.propTypes = {
  route: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.element,
  handleClick: _propTypes2.default.func
};

Route.defaultProps = {
  children: null,
  disabled: false
};

function mapStateToProps() {
  return {};
}

exports.default = (0, _withStyles2.default)(_link2.default)((0, _reactRedux.connect)(mapStateToProps)(Route));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(5);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _routeHandler = __webpack_require__(57);

var _routeHandler2 = _interopRequireDefault(_routeHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouteHandler = function (_React$Component) {
  _inherits(RouteHandler, _React$Component);

  function RouteHandler(props) {
    _classCallCheck(this, RouteHandler);

    var _this = _possibleConstructorReturn(this, (RouteHandler.__proto__ || Object.getPrototypeOf(RouteHandler)).call(this, props));

    _this.onPopState = function () {
      _this.props.progressUpdate(0);
      _this.chooseActiveRoute();
    };

    _this.chooseActiveRoute = function () {
      var content = void 0;

      if (location.search) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.validRoutes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var validRoute = _step.value;

            if (validRoute.props.query) {
              var regex = new RegExp(validRoute.props.path);
              if (regex.test(location.search)) {
                content = validRoute;
                break;
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

      if (!content) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _this.validRoutes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _validRoute = _step2.value;

            var _regex = new RegExp(_validRoute.props.path);
            if (_regex.test(location.pathname)) {
              content = _validRoute;
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      };
      if (content) {
        _this.props.progressUpdate(50);
      }
      content = content || _this.state.notFoundRoute;

      _this.setState({
        content: _react2.default.cloneElement(content, { location: '' + location.href })
      });
    };

    _this.state = {
      validRoutes: [],
      notFoundRoute: _react2.default.createElement(
        'div',
        null,
        '404'
      )
    };
    return _this;
  }

  _createClass(RouteHandler, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      window.addEventListener('popstate', this.onPopState);

      var validRoutes = [];
      _react2.default.Children.forEach(this.props.children, function (child) {
        if (child.props.hasOwnProperty('notfound')) {
          _this2.setState({ notFoundRoute: child });
        } else {
          validRoutes.push(child);
        }
      });

      this.validRoutes = validRoutes;

      this.setState({
        location: location.href
      });

      this.onPopState();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('popstate', this.onPopState);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _routeHandler2.default['page-view'] },
        this.state.content
      );
    }
  }], [{
    key: 'UpdateRoute',
    value: function UpdateRoute(route) {
      window.history.pushState(null, null, route);
      window.dispatchEvent(new Event('popstate'));
    }
  }, {
    key: 'ReplaceRoute',
    value: function ReplaceRoute(route) {
      window.history.replaceState(null, null, route);
      window.dispatchEvent(new Event('popstate'));
    }
  }]);

  return RouteHandler;
}(_react2.default.Component);

RouteHandler.defaultProps = {
  activePage: null
};

exports.default = (0, _withStyles2.default)(_routeHandler2.default)(RouteHandler);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _api = __webpack_require__(35);

var _api2 = _interopRequireDefault(_api);

var _routes = __webpack_require__(36);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = undefined || 5000;

var app = (0, _express2.default)();

app.use('/api', _api2.default);

app.use('/', _routes2.default);

app.listen(port, function () {
  console.log('server listening on port ' + port);
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {"404.js":"/static/js/404.chunk.js","about.js":"/static/js/about.chunk.js","app.js":"/static/js/app.bundle.js","article.js":"/static/js/article.chunk.js","search.js":"/static/js/search.chunk.js","vendor.js":"/static/js/vendor.bundle.js"}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPage = exports.pageFetchSuccess = exports.setActivePageTitle = exports.setActivePageType = exports.setActivePage = exports.setActiveRoute = exports.pageIsLoading = exports.pageFetchError = undefined;

var _utils = __webpack_require__(6);

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
  return {
    type: 'ACTIVE_PAGE',
    payload: page
  };
};

var setActivePageType = exports.setActivePageType = function setActivePageType(type) {
  return {
    type: 'ACTIVE_PAGE_TYPE',
    payload: type
  };
};

var setActivePageTitle = exports.setActivePageTitle = function setActivePageTitle(title) {
  document.title = 'ECMASyntax - ' + title;
  return {
    type: 'ACTIVE_PAGE_TITLE',
    payload: title
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
    var networkDataRecieved = false;
    var cacheDataRecieved = false;

    dispatch(setActiveRoute(route));
    dispatch((0, _utils.progressUpdate)(0));
    dispatch(pageIsLoading(true));
    dispatch(pageFetchError(false));

    dispatch((0, _utils.toggleDrawer)(false));

    switch (true) {
      case /^\/pages\/(.*)$/.test(route):
        // here we make two requests, one to the cache, one to the network. 
        // The idea is to show the cached data first, 
        // then inform the user when/if the network data arrives and the
        // content is newer than the cached response.

        dispatch((0, _utils.progressUpdate)(50));

        // fetch fresh data
        var networkUpdate = fetch('/api' + route).then(function (response) {
          if (!response.ok) {
            throw Error(response.statusText);
            if (!cacheDataRecieved) dispatch((0, _utils.progressUpdate)(0));
          }
          return response;
        }).then(function (response) {
          if (!cacheDataRecieved) dispatch((0, _utils.progressUpdate)(75));
          return response.json();
        }).then(function (response) {
          networkDataRecieved = true;
          if (!cacheDataRecieved) {
            // we have used the data from the network request as the response here
            dispatch((0, _utils.progressUpdate)(100));
            dispatch(setActivePageType('article'));
            dispatch(pageFetchSuccess(response));
            dispatch(setActivePageTitle(response.fields.name));
          }
          if (cacheDataRecieved) {
            if (cacheDataRecieved.sys.updatedAt !== response.sys.updatedAt) {
              // the network request response has newer content than the cached response
              dispatch((0, _utils.pushToast)('Newer content is available, reload to update', 'reload', false, function () {
                location.reload();
              }));
            } else {
              // the cached content is up to date
            }
          }
        }).catch(function (err) {
          dispatch((0, _utils.progressUpdate)(0));
          dispatch(pageFetchError(true));
          throw err;
        });

        // fetch cached data
        caches.match('/api' + route).then(function (response) {
          if (!response) throw Error("No data");
          return response.json();
        }).then(function (data) {
          cacheDataRecieved = data;

          if (!networkDataRecieved) {
            // we have used the data from the cache as the response here
            dispatch((0, _utils.progressUpdate)(100));
            dispatch(setActivePageType('article'));
            dispatch(pageFetchSuccess(data));
            dispatch(setActivePageTitle(data.fields.name));
          }
        }).catch(function () {
          return networkUpdate;
        }).catch(function (err) {
          console.log(err);
        });
        break;
      default:
        dispatch(pageIsLoading(false));
        dispatch(pageFetchSuccess({ fields: { name: route.substring(1), route: route } }));
    }
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _appShell = __webpack_require__(27);

var _appShell2 = _interopRequireDefault(_appShell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextType = {
  // Enables critical path CSS rendering
  insertCss: _propTypes2.default.func.isRequired
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return this.props.context;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _appShell2.default,
        null,
        this.props.children
      );
    }
  }]);

  return App;
}(_react2.default.Component);

App.propTypes = {
  context: _propTypes2.default.shape(ContextType).isRequired
};
App.childContextTypes = ContextType;
exports.default = App;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ripple = __webpack_require__(9);

var _ripple2 = _interopRequireDefault(_ripple);

var _link = __webpack_require__(10);

var _link2 = _interopRequireDefault(_link);

var _categorySection = __webpack_require__(51);

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
          'div',
          {
            className: _this2.props.activeRoute && _this2.props.activeRoute === entry.fields.route ? _categorySection2.default['pageList-item'] + ' ' + _categorySection2.default.active : _categorySection2.default['pageList-item'],
            key: entry.sys.id
          },
          _react2.default.createElement(
            _link2.default,
            {
              route: entry.fields.route
            },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_ripple2.default, null),
              entry.fields.name
            )
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
  activeRoute: _propTypes2.default.string,
  category: _propTypes2.default.object.isRequired
};

CategorySection.defaultProps = {
  activeRoute: null
};

exports.default = (0, _withStyles2.default)(_categorySection2.default)(CategorySection);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _pageList = __webpack_require__(52);

var _pageList2 = _interopRequireDefault(_pageList);

var _loadingView = __webpack_require__(26);

var _loadingView2 = _interopRequireDefault(_loadingView);

var _categorySection = __webpack_require__(21);

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
  hasErrored: _propTypes2.default.bool.isRequired,
  isLoading: _propTypes2.default.bool.isRequired,
  activeRoute: _propTypes2.default.string,
  pages: _propTypes2.default.array.isRequired
};

PageList.defaultProps = {
  activeRoute: null
};

exports.default = (0, _withStyles2.default)(_pageList2.default)(PageList);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ripple = __webpack_require__(9);

var _ripple2 = _interopRequireDefault(_ripple);

var _routeHandler = __webpack_require__(11);

var _routeHandler2 = _interopRequireDefault(_routeHandler);

var _headerIcon = __webpack_require__(53);

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
      // this.props.search('');
      _routeHandler2.default.UpdateRoute(location.pathname);
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
  drawerOpen: _propTypes2.default.bool.isRequired,
  searchOpen: _propTypes2.default.bool.isRequired,
  toggleDrawer: _propTypes2.default.func.isRequired
};

exports.default = (0, _withStyles2.default)(_headerIcon2.default)(HeaderIcon);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _searchInput = __webpack_require__(54);

var _searchInput2 = _interopRequireDefault(_searchInput);

var _routeHandler = __webpack_require__(11);

var _routeHandler2 = _interopRequireDefault(_routeHandler);

var _link = __webpack_require__(10);

var _link2 = _interopRequireDefault(_link);

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

      document.body.addEventListener('click', _this.searchUnfocused);
    };

    _this.searchUnfocused = function (evt) {
      if (_this.searchContainer.contains(evt.target)) {
        return;
      }
      document.body.removeEventListener('click', _this.searchUnfocused);

      if (_this.props.currQuery.length <= 0) {
        // removes the hash, getting rid of the search page
        _routeHandler2.default.UpdateRoute(location.pathname);
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
          className: _searchInput2.default['search-label'] + ' \n            ' + (this.props.searchOpen ? _searchInput2.default.opened : '') + ' \n            ' + (this.state.focused ? _searchInput2.default.focused : '') + '\n            ' + (this.props.currQuery.length > 0 ? _searchInput2.default.nonEmpty : '') + '\n          ',
          ref: function ref(label) {
            _this2.searchContainer = label;
          }
        },
        _react2.default.createElement(
          'div',
          { className: _searchInput2.default['icon-container'] + ' ' + _searchInput2.default['search-searchIcon'] },
          _react2.default.createElement(
            _link2.default,
            {
              route: '?search=' + this.props.currQuery,
              handleClick: this.searchIconClick
            },
            _react2.default.createElement(
              'svg',
              { className: _searchInput2.default['search-icon'], fill: '#fff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
              _react2.default.createElement('path', { d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' }),
              _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
            )
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
  searchOpen: _propTypes2.default.bool.isRequired,
  currQuery: _propTypes2.default.string.isRequired,
  search: _propTypes2.default.func.isRequired
};

exports.default = (0, _withStyles2.default)(_searchInput2.default)(SearchInput);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _progressIndicator = __webpack_require__(55);

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

    _this.state = {
      width: '0%',
      opacity: 1,
      animatable: true
    };
    return _this;
  }

  _createClass(ProgressIndicator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        width: this.props.progress + '%'
      };

      return _react2.default.createElement('div', {
        ref: function ref(div) {
          _this2.progressIndicator = div;
        },
        className: _progressIndicator2.default.progressIndicator + ' ' + (this.state.animatable ? _progressIndicator2.default.animatable : ''),
        style: style
      });
    }
  }]);

  return ProgressIndicator;
}(_react2.default.Component);

ProgressIndicator.propTypes = {
  progress: _propTypes2.default.number.isRequired
};

exports.default = (0, _withStyles2.default)(_progressIndicator2.default)(ProgressIndicator);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

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
  color: _propTypes2.default.string,
  size: _propTypes2.default.string
};

LoadingView.defaultProps = {
  color: '#fff',
  size: '60px'
};

exports.default = (0, _withStyles2.default)(_loadingView2.default)(LoadingView);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _reactRedux = __webpack_require__(5);

var _base = __webpack_require__(62);

var _base2 = _interopRequireDefault(_base);

var _activePage = __webpack_require__(19);

var _utils = __webpack_require__(6);

var _pageList = __webpack_require__(7);

var _progressIndicator = __webpack_require__(25);

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

var _mainHeader = __webpack_require__(29);

var _mainHeader2 = _interopRequireDefault(_mainHeader);

var _drawer = __webpack_require__(28);

var _drawer2 = _interopRequireDefault(_drawer);

var _toastManager = __webpack_require__(30);

var _toastManager2 = _interopRequireDefault(_toastManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppShell = function (_React$Component) {
  _inherits(AppShell, _React$Component);

  function AppShell(props) {
    _classCallCheck(this, AppShell);

    var _this = _possibleConstructorReturn(this, (AppShell.__proto__ || Object.getPrototypeOf(AppShell)).call(this, props));

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

  _createClass(AppShell, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // async fetch pagelist
      this.props.fetchPageList();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _base2.default['app-container'] },
        _react2.default.createElement(_progressIndicator2.default, { progress: this.props.progress }),
        _react2.default.createElement(_mainHeader2.default, { scrolled: this.state.scrolled }),
        _react2.default.createElement(
          'div',
          { className: _base2.default['main-container'] },
          _react2.default.createElement(_drawer2.default, null),
          this.props.children,
          _react2.default.createElement(_toastManager2.default, null)
        )
      );
    }
  }]);

  return AppShell;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    progress: state.utils.progress
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: function fetchPageList() {
      dispatch((0, _pageList.fetchPageList)());
    }
  };
}

exports.default = (0, _withStyles2.default)(_base2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(AppShell));

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(5);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _drawer = __webpack_require__(59);

var _drawer2 = _interopRequireDefault(_drawer);

var _constants = __webpack_require__(8);

var _utils = __webpack_require__(6);

var _pageList = __webpack_require__(7);

var _routeHandler = __webpack_require__(11);

var _routeHandler2 = _interopRequireDefault(_routeHandler);

var _link = __webpack_require__(10);

var _link2 = _interopRequireDefault(_link);

var _ripple = __webpack_require__(9);

var _ripple2 = _interopRequireDefault(_ripple);

var _pageList2 = __webpack_require__(22);

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
        currentX: evt.touches[0].pageX,
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

      if (translateX < -_constants.DRAWER_CLOSE_THRESHOLD) {
        _this.props.toggleDrawer(false);
      }
    };

    _this.update = function () {
      if (!_this.state.touchingSideNav) {
        return;
      }

      requestAnimationFrame(_this.update);

      var translateX = Math.min(0, _this.state.currentX - _this.state.startX);

      if (!_this.state.initialisedDragging && translateX > -_constants.INITIATE_DRAGGING_THRESHOLD) {
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // got page list
      if (prevProps.entries.length < 1 && this.props.entries.length > 0) {
        if (window.location.pathname !== '/') {
          return;
        }
        console.log('replacing state');
        _routeHandler2.default.ReplaceRoute(this.props.entries[0].fields.route);
      }
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
              _link2.default,
              { route: '/about' },
              _react2.default.createElement(
                'div',
                {
                  className: _drawer2.default['drawer-home'] + ' \n                ' + (this.props.activeRoute === '/about' ? _drawer2.default.active : '')
                },
                _react2.default.createElement(
                  'svg',
                  { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                  _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
                  _react2.default.createElement('path', { d: 'M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z' })
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'About'
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
  hasErrored: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  drawerOpen: _propTypes2.default.bool.isRequired,
  entries: _propTypes2.default.array.isRequired,
  activePages: _propTypes2.default.array.isRequired,
  activePage: _propTypes2.default.object,
  activeRoute: _propTypes2.default.string,
  toggleDrawer: _propTypes2.default.func.isRequired
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(5);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _utils = __webpack_require__(6);

var _pageList = __webpack_require__(7);

var _headerIcon = __webpack_require__(23);

var _headerIcon2 = _interopRequireDefault(_headerIcon);

var _searchInput = __webpack_require__(24);

var _searchInput2 = _interopRequireDefault(_searchInput);

var _mainHeader = __webpack_require__(60);

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
          { className: _mainHeader2.default['title-container'] },
          _react2.default.createElement(
            'div',
            { className: _mainHeader2.default['toggle-container'] },
            _react2.default.createElement(_headerIcon2.default, {
              drawerOpen: this.props.drawerOpen,
              searchOpen: this.props.searchOpen,
              toggleDrawer: this.props.toggleDrawer
            })
          ),
          _react2.default.createElement(
            'span',
            { className: _mainHeader2.default.title },
            'ECMASyntax',
            _react2.default.createElement('span', {
              className: _mainHeader2.default['title-detail'],
              dangerouslySetInnerHTML: {
                __html: this.props.activePageTitle ? ' &ndash; ' + this.props.activePageTitle : '' }
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _mainHeader2.default['search-container'] },
          _react2.default.createElement(_searchInput2.default, {
            currQuery: this.props.currQuery,
            searchOpen: this.props.searchOpen,
            search: this.props.search
          })
        )
      );
    }
  }]);

  return MainHeader;
}(_react2.default.Component);

MainHeader.propTypes = {
  drawerOpen: _propTypes2.default.bool.isRequired,
  searchOpen: _propTypes2.default.bool.isRequired,
  currQuery: _propTypes2.default.string.isRequired,
  toggleDrawer: _propTypes2.default.func.isRequired,
  search: _propTypes2.default.func.isRequired
};

MainHeader.defaultProps = {
  setActivePageTitle: null
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen,
    currQuery: state.pageList.query,
    activePageTitle: state.activePage.title
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: function toggleDrawer(open) {
      dispatch((0, _utils.toggleDrawer)(open));
    },
    search: function search(query) {
      dispatch((0, _pageList.search)(query));
    }
  };
}

exports.default = (0, _withStyles2.default)(_mainHeader2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(MainHeader));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(5);

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _utils = __webpack_require__(6);

var _toastManager = __webpack_require__(61);

var _toastManager2 = _interopRequireDefault(_toastManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToastManager = function (_React$Component) {
  _inherits(ToastManager, _React$Component);

  function ToastManager(props) {
    _classCallCheck(this, ToastManager);

    var _this = _possibleConstructorReturn(this, (ToastManager.__proto__ || Object.getPrototypeOf(ToastManager)).call(this, props));

    _this._closeToast = function () {
      _this.setState({
        active: false
      });
      _this.toast.addEventListener('transitionend', _this._removeToast);
    };

    _this._removeToast = function () {
      _this.toast.removeEventListener('transitionend', _this._removeToast);
      _this.props.popToast();
    };

    _this._handleClick = function () {
      clearTimeout(_this.timeout);
      _this._closeToast();
      if (_this.state.toast.callback) {
        _this.state.toast.callback();
      }
    };

    _this.state = {
      active: false,
      toast: {}
    };
    return _this;
  }

  _createClass(ToastManager, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.toasts.length < 1) {
        return;
      }

      this._triggerToast(nextProps.toasts[nextProps.toasts.length - 1]);
    }
  }, {
    key: '_triggerToast',
    value: function _triggerToast(toast) {
      var _this2 = this;

      if (this.state.active) {
        return;
      }

      this.setState({
        toast: toast,
        active: true
      });

      if (toast.timeout) {
        this.timeout = setTimeout(function () {
          _this2._closeToast();
        }, toast.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: _toastManager2.default['toast-container'] },
        _react2.default.createElement(
          'div',
          {
            className: _toastManager2.default['toast-wrapper'] + ' ' + (this.state.active ? _toastManager2.default.active : ''),
            ref: function ref(div) {
              _this3.toast = div;
            }
          },
          _react2.default.createElement(
            'div',
            { className: _toastManager2.default.toast },
            _react2.default.createElement(
              'p',
              { className: _toastManager2.default.message },
              this.state.toast.messageText
            ),
            _react2.default.createElement(
              'button',
              { className: _toastManager2.default.action, onClick: this._handleClick },
              this.state.toast.actionText
            )
          )
        )
      );
    }
  }]);

  return ToastManager;
}(_react2.default.Component);

ToastManager.propTypes = {
  toasts: _propTypes2.default.array.isRequired,
  popToast: _propTypes2.default.func.isRequired
};

function mapStateToProps(state) {
  return {
    toasts: state.utils.toasts
  };
}

function matchDispatchToProps(dispatch) {
  return {
    popToast: function popToast() {
      dispatch((0, _utils.popToast)());
    }
  };
}

exports.default = (0, _withStyles2.default)(_toastManager2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(ToastManager));

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
    case 'ACTIVE_PAGE_TITLE':
      {
        return Object.assign({}, state, {
          title: action.payload
        });
      }
    case 'ACTIVE_PAGE_TYPE':
      {
        return Object.assign({}, state, {
          type: action.payload
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
  title: 'Loading',
  type: null,
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

var _redux = __webpack_require__(15);

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
          entries: Object.values(action.payload)
        });
      }
    case 'SEARCH_QUERY':
      {
        // while (state.entries.length < 1) { }
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

var _constants = __webpack_require__(8);

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
    var formattedQuery = query.toLowerCase();
    var regex = '^' + _constants.TAGGED_IN + ':([^ ]*)';
    var regexp = new RegExp(regex, 'g');
    var match = regexp.exec(formattedQuery);
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
        return entry.fields.name.trim().toLowerCase().match(formattedQuery.toLowerCase()); // ||
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
    case 'TOGGLE_WATERFALL_HEADER':
      {
        if (action.payload && navigator.serviceWorker) action.payload = true;

        return Object.assign({}, state, {
          waterfallHeaderOpen: action.payload
        });
      }
    case 'PUSH_TOAST':
      {
        return Object.assign({}, state, {
          toasts: [].concat(_toConsumableArray(state.toasts), [action.payload])
        });
      }
    case 'POP_TOAST':
      {
        var arr = [].concat(_toConsumableArray(state.toasts));
        arr.shift();
        return Object.assign({}, state, {
          toasts: arr
        });
      }
    case 'PROGRESS_UPDATE':
      {
        return Object.assign({}, state, {
          progress: action.payload
        });
      }
    default:
      {
        return state;
      }
  }
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  drawerOpen: false,
  searchOpen: false,
  waterfallHeaderOpen: false,
  toasts: [],
  progress: 0
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _contentful = __webpack_require__(66);

var contentful = _interopRequireWildcard(_contentful);

var _crypto = __webpack_require__(13);

var _crypto2 = _interopRequireDefault(_crypto);

var _marked = __webpack_require__(68);

var _marked2 = _interopRequireDefault(_marked);

var _credentials = __webpack_require__(73);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var contentfulClient = contentful.createClient({
  space: _credentials.space,
  accessToken: _credentials.accessToken
});

var loadArticles = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var entries, linkedEntries, includes, hash, id;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return contentfulClient.getEntries({
              content_type: 'syntaxEntry',
              select: "sys.id,sys.updatedAt,fields.name,fields.tags,fields.category",
              include: 2
            });

          case 3:
            entries = _context.sent;
            linkedEntries = Object.assign({}, entries.items);
            includes = entries.includes.Entry;
            hash = _crypto2.default.createHash('md5');

            Object.keys(linkedEntries).forEach(function (key) {
              var entry = linkedEntries[key];
              linkEntry(includes, entry, 'category');
              linkEntry(includes, entry.fields.category, 'specification');

              var category = entry.fields.category;
              var specification = category.fields.specification;
              var route = '/pages/' + specification.fields.name + '/' + category.fields.name + '/' + entry.fields.name;

              entry.fields.route = encodeURI(route);
              hash.update(entry.sys.id);
            });

            id = hash.digest('hex');
            return _context.abrupt('return', {
              sys: {
                id: id
              },
              fields: linkedEntries
            });

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function loadArticles() {
    return _ref.apply(this, arguments);
  };
}();

var fetchPage = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
    var pageName, entries, entry;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pageName = decodeURI(req.params.pageId);

            // the page name acts as a primary key so we can query using it as the only parameter

            _context2.next = 3;
            return contentfulClient.getEntries({
              content_type: 'syntaxEntry',
              'fields.name': pageName
            });

          case 3:
            entries = _context2.sent;
            entry = entries.items[0];

            entry.fields.blob = (0, _marked2.default)(entry.fields.blob);
            return _context2.abrupt('return', entry);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchPage(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var linkEntry = function linkEntry(includes, entry, param) {
  entry.fields[param] = includes.find(function (include) {
    return include.sys.id === entry.fields[param].sys.id;
  });
};

var apiRouter = _express2.default.Router();

apiRouter.get('/', function (req, res) {
  res.send('ecmasyntax.io API');
});

apiRouter.get('/pages', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var pages;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return loadArticles();

          case 2:
            pages = _context3.sent;

            res.send(JSON.stringify(pages));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}());

apiRouter.get('/pages/:specId/:catId/:pageId', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var article;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetchPage(req, res);

          case 2:
            article = _context4.sent;

            res.status(200).json(article);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}());

module.exports = apiRouter;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _fs = __webpack_require__(67);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _crypto = __webpack_require__(13);

var _crypto2 = _interopRequireDefault(_crypto);

var _staticModule = __webpack_require__(70);

var _staticModule2 = _interopRequireDefault(_staticModule);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = __webpack_require__(15);

var _reactRedux = __webpack_require__(5);

var _server = __webpack_require__(69);

var _constants = __webpack_require__(8);

var _manifest = __webpack_require__(18);

var _manifest2 = _interopRequireDefault(_manifest);

var _app = __webpack_require__(20);

var _app2 = _interopRequireDefault(_app);

var _index = __webpack_require__(32);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ContextType = {
  insertCss: _propTypes2.default.func.isRequired
};

function renderServerSide(req, res) {

  var store = (0, _redux.createStore)(_index2.default);

  // Critical path CSS rendering
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

  var preloadedState = store.getState();

  renderFullPage(res, html, css, preloadedState);
}

function renderFullPage(res) {
  var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var css = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var preloadedState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  res.send('\n    <html>\n      <head>\n        <meta charset="utf-8">\n        <meta http-equiv="x-ua-compatible" content="ie=edge">\n        <meta name="viewport" content="width=device-width, initial-scale=1">\n\n        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="preload" as="style" crossorigin onload="this.rel=\'stylesheet\'">\n        <link rel="shortcut icon" href="/static/icons/favicon.ico">\n        <link rel="manifest" href="/manifest.json">\n        ' + (css ? '<style id="critical-css">\n          ' + [].concat(_toConsumableArray(css)).join('').replace(/(\r\n|\n|\r)/gm, "") + '\n        </style>' : '') + '\n      </head>\n      <body>\n        ' + (html ? '<div id="root"><div>' + html + '</div></div>' : '<div id="root"></div>') + '\n        <script>\n          if (navigator.serviceWorker) {\n            navigator.serviceWorker.register(\'/sw.js\');\n          }\n        </script>\n        ' + (preloadedState ? '<script>\n          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n        </script>' : '') + '\n        <script src="' + _manifest2.default['vendor.js'] + '"></script>\n        <script src="' + _manifest2.default['app.js'] + '"></script>\n      </body>\n    </html>\n  ');
}

var router = _express2.default.Router();

router.get('/sw.js', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var input, precacheassetsToCache, precacheHash, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, asset, precacheDigest;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = _fs2.default.createReadStream(_path2.default.join('dist', 'client', 'sw.js'));
            precacheassetsToCache = Object.values(_manifest2.default);
            precacheHash = _crypto2.default.createHash('md5');
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;


            for (_iterator = precacheassetsToCache[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              asset = _step.value;

              precacheHash.update(asset);
            }

            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 14:
            _context.prev = 14;
            _context.prev = 15;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 17:
            _context.prev = 17;

            if (!_didIteratorError) {
              _context.next = 20;
              break;
            }

            throw _iteratorError;

          case 20:
            return _context.finish(17);

          case 21:
            return _context.finish(14);

          case 22:
            precacheDigest = precacheHash.digest('hex');


            res.set('Content-Type', 'application/javascript');
            input.pipe((0, _staticModule2.default)({
              'static-precache-version': function staticPrecacheVersion() {
                return JSON.stringify(precacheDigest);
              },
              'static-precache': function staticPrecache() {
                return JSON.stringify(precacheassetsToCache);
              },
              'static-runtime': function staticRuntime() {
                return JSON.stringify(_constants.RUNTIME_CACHE);
              }
            })).pipe(res);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
  }));

  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());

router.use('/static/js', function (req, res, next) {
  if (false) {
    // gzip the main chunks
    if (req.url.startsWith('/app') || req.url.startsWith('/vendor')) {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
    }
    res.setHeader('Cache-Control', 'max-age=31536000');
  }
  next();
});

router.use(_express2.default.static(_path2.default.join('dist', 'client')));

router.use(function (req, res) {
  if (false) {
    renderServerSide(req, res);
  } else {
    // in development, dont do server side rendering
    renderFullPage(res);
  }
});

module.exports = router;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".ripple_ripple-container_mZO {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.ripple_ripple-container_mZO:hover {\n  background-color: rgba(155, 155, 155, .13); }\n\n.ripple_ripple-origin_3EH {\n  position: absolute;\n  z-index: 9999999;\n  background: rgba(155, 155, 155, .3);\n  border-radius: 50%;\n  pointer-events: none; }\n\n.ripple_ripple-origin_3EH.ripple_animatable_3A0 {\n  -webkit-transition: opacity 0.6s ease-in, -webkit-transform 0.3s ease-in;\n  transition: opacity 0.6s ease-in, -webkit-transform 0.3s ease-in;\n  transition: transform 0.3s ease-in, opacity 0.6s ease-in;\n  transition: transform 0.3s ease-in, opacity 0.6s ease-in, -webkit-transform 0.3s ease-in; }\n\n.ripple_ripple-origin_3EH.ripple_out_3W0 {\n  opacity: 0; }\n", ""]);

// exports
exports.locals = {
	"ripple-container": "ripple_ripple-container_mZO",
	"ripple-origin": "ripple_ripple-origin_3EH",
	"animatable": "ripple_animatable_3A0",
	"out": "ripple_out_3W0"
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes category-section_fadeIn_2LQ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes category-section_fadeIn_2LQ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.category-section_categorySection_10o {\n  padding: 8px 0;\n  border-bottom: 1px solid #324047; }\n\n.category-section_categorySection-header_1Nc {\n  -webkit-animation: category-section_fadeIn_2LQ 0.6s 1;\n          animation: category-section_fadeIn_2LQ 0.6s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n  display: block;\n  text-decoration: none;\n  padding: 8px 24px;\n  margin: 0;\n  color: silver;\n  font-size: 14px;\n  text-transform: uppercase;\n  line-height: 16px;\n  font-weight: 500; }\n  .category-section_categorySection-header_1Nc .category-section_chevron_2Lt {\n    float: right;\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear;\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n\n.category-section_categorySection-body_3SM {\n  -webkit-animation: category-section_fadeIn_2LQ 0.4s 1;\n          animation: category-section_fadeIn_2LQ 0.4s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n\n.category-section_categorySection_10o.category-section_hidden_2sf {\n  padding-bottom: 0px; }\n  .category-section_categorySection_10o.category-section_hidden_2sf .category-section_chevron_2Lt {\n    -webkit-transform: rotateX(180deg);\n            transform: rotateX(180deg); }\n  .category-section_categorySection_10o.category-section_hidden_2sf .category-section_categorySection-body_3SM {\n    display: none; }\n\n.category-section_pageList-item_3t4 {\n  display: block;\n  position: relative;\n  text-decoration: none;\n  color: #fff;\n  padding: 0px 32px 0px 32px;\n  cursor: pointer;\n  line-height: 48px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  -webkit-transition: all .1s linear;\n  transition: all .1s linear; }\n\n.category-section_pageList-item_3t4.category-section_active_25U {\n  font-weight: 500;\n  color: #00b4a2; }\n", ""]);

// exports
exports.locals = {
	"categorySection": "category-section_categorySection_10o",
	"categorySection-header": "category-section_categorySection-header_1Nc",
	"fadeIn": "category-section_fadeIn_2LQ",
	"chevron": "category-section_chevron_2Lt",
	"categorySection-body": "category-section_categorySection-body_3SM",
	"hidden": "category-section_hidden_2sf",
	"pageList-item": "category-section_pageList-item_3t4",
	"active": "category-section_active_25U"
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes page-list_fadeIn_3Ws {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes page-list_fadeIn_3Ws {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.page-list_pagelist-wrapper_1BC {\n  width: 100%; }\n\n.page-list_noResults_1R9 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-animation: page-list_fadeIn_3Ws 0.6s 1;\n          animation: page-list_fadeIn_3Ws 0.6s 1; }\n\n.page-list_noResults-copy_2Bg {\n  color: rgba(255, 255, 255, .6); }\n\n.page-list_noResults-copy_2Bg i {\n  padding-right: 4px; }\n\n.page-list_noResults-copy_2Bg span {\n  display: inline-block;\n  line-height: 24px;\n  position: relative;\n  bottom: 5px; }\n", ""]);

// exports
exports.locals = {
	"pagelist-wrapper": "page-list_pagelist-wrapper_1BC",
	"noResults": "page-list_noResults_1R9",
	"fadeIn": "page-list_fadeIn_3Ws",
	"noResults-copy": "page-list_noResults-copy_2Bg"
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes header-icon_fadeIn_33z {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes header-icon_fadeIn_33z {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes header-icon_grow_2IA {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes header-icon_grow_2IA {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n.header-icon_header-icon_1Qs {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  z-index: 98;\n  text-decoration: none;\n  cursor: pointer;\n  border-radius: 50%;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  background: none;\n  border: none; }\n\n.header-icon_icon-container_3Je {\n  -webkit-appearance: none;\n  background: none;\n  border: none;\n  outline: none;\n  padding: 8px;\n  cursor: pointer; }\n\n@media (max-width: 500px) {\n  .header-icon_menuIcon_1pa.header-icon_searchOpen_1BF {\n    display: none; } }\n\n.header-icon_backIcon_2Et {\n  display: none; }\n\n.header-icon_backIcon_2Et.header-icon_searchOpen_1BF {\n  -webkit-animation: header-icon_grow_2IA 0.2s 1;\n          animation: header-icon_grow_2IA 0.2s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  @media (max-width: 500px) {\n    .header-icon_backIcon_2Et.header-icon_searchOpen_1BF {\n      display: block; } }\n", ""]);

// exports
exports.locals = {
	"header-icon": "header-icon_header-icon_1Qs",
	"icon-container": "header-icon_icon-container_3Je",
	"menuIcon": "header-icon_menuIcon_1pa",
	"searchOpen": "header-icon_searchOpen_1BF",
	"backIcon": "header-icon_backIcon_2Et",
	"grow": "header-icon_grow_2IA",
	"fadeIn": "header-icon_fadeIn_33z"
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes search-input_fadeIn_Qt- {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-input_fadeIn_Qt- {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.search-input_search-label_25K {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  width: 24px;\n  overflow: hidden;\n  -webkit-transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_icon-container_2dR {\n  background: none;\n  border: none;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n  color: #fff; }\n\n.search-input_search-icon_ViP {\n  height: 24px;\n  width: 24px;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_search-closeIcon_3Nj {\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  opacity: 0;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .search-input_search-closeIcon_3Nj i {\n    padding: 0px;\n    font-size: 20px; }\n\n.search-input_search-input--container_1cN {\n  border-bottom: 1px solid #324047;\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-left: 8px; }\n\n.search-input_search-input--container_1cN::after {\n  display: block;\n  content: '';\n  position: absolute;\n  bottom: -1px;\n  left: 0px;\n  height: 2px;\n  background-color: #fff;\n  width: 10px;\n  visibility: hidden;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_search-input_1MP {\n  position: relative;\n  height: 30px;\n  width: 100%;\n  outline: 0;\n  border: none;\n  padding: 4px 28px 4px 4px;\n  overflow: hidden;\n  font-size: 16px;\n  background: none;\n  color: #fff; }\n\n.search-input_search-label_25K.search-input_opened_A_q {\n  width: 360px; }\n  @media (max-width: 500px) {\n    .search-input_search-label_25K.search-input_opened_A_q {\n      width: 100%; } }\n  @media (max-width: 500px) {\n    .search-input_search-label_25K.search-input_opened_A_q .search-input_search-input--container_1cN {\n      margin-left: 0; } }\n  .search-input_search-label_25K.search-input_opened_A_q .search-input_search-closeIcon_3Nj {\n    opacity: 1; }\n  @media (max-width: 500px) {\n    .search-input_search-label_25K.search-input_opened_A_q .search-input_search-searchIcon_1vQ {\n      display: none; } }\n\n.search-input_search-label_25K.search-input_focused_1HP .search-input_search-input--container_1cN::after {\n  visibility: visible;\n  width: 100%; }\n", ""]);

// exports
exports.locals = {
	"search-label": "search-input_search-label_25K",
	"icon-container": "search-input_icon-container_2dR",
	"search-icon": "search-input_search-icon_ViP",
	"search-closeIcon": "search-input_search-closeIcon_3Nj",
	"search-input--container": "search-input_search-input--container_1cN",
	"search-input": "search-input_search-input_1MP",
	"opened": "search-input_opened_A_q",
	"search-searchIcon": "search-input_search-searchIcon_1vQ",
	"focused": "search-input_focused_1HP",
	"fadeIn": "search-input_fadeIn_Qt-"
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes progress-indicator_fadeIn_3ET {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes progress-indicator_fadeIn_3ET {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.progress-indicator_progressIndicator_3yA {\n  position: relative;\n  z-index: 101;\n  background-color: #00b4a2;\n  height: 4px; }\n\n.progress-indicator_progressIndicator_3yA.progress-indicator_animatable_1lU {\n  -webkit-transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s linear;\n  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s linear; }\n", ""]);

// exports
exports.locals = {
	"progressIndicator": "progress-indicator_progressIndicator_3yA",
	"animatable": "progress-indicator_animatable_1lU",
	"fadeIn": "progress-indicator_fadeIn_3ET"
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".link_route_2ci {\n  width: 100%;\n  display: inline-block;\n  text-decoration: none;\n  color: inherit; }\n", ""]);

// exports
exports.locals = {
	"route": "link_route_2ci"
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes route-handler_fadeIn_QHn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes route-handler_fadeIn_QHn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.route-handler_transition-container_2mn {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n.route-handler_loading_1FO {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 16px; }\n\n.route-handler_loading_1FO.route-handler_enterActive_11b {\n  top: 0;\n  left: 0; }\n\n.route-handler_enter_2MP {\n  position: relative;\n  -webkit-transform: translateX(100px);\n          transform: translateX(100px);\n  opacity: 0.01; }\n\n.route-handler_enter_2MP.route-handler_enterActive_11b {\n  opacity: 1;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  -webkit-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.route-handler_leave_3ET {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  opacity: 1; }\n\n.route-handler_leave_3ET.route-handler_leaveActive_y6L {\n  position: absolute;\n  top: 16px;\n  left: 48px;\n  -webkit-transform: translateX(-100px);\n          transform: translateX(-100px);\n  opacity: 0;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.route-handler_appear_2TA {\n  opacity: 0.01; }\n\n.route-handler_appear_2TA.route-handler_appearActive_2tB {\n  opacity: 1;\n  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1); }\n", ""]);

// exports
exports.locals = {
	"transition-container": "route-handler_transition-container_2mn",
	"loading": "route-handler_loading_1FO",
	"enterActive": "route-handler_enterActive_11b",
	"enter": "route-handler_enter_2MP",
	"leave": "route-handler_leave_3ET",
	"leaveActive": "route-handler_leaveActive_y6L",
	"appear": "route-handler_appear_2TA",
	"appearActive": "route-handler_appearActive_2tB",
	"fadeIn": "route-handler_fadeIn_QHn"
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes loading-view_fadeIn_1Hb {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes loading-view_fadeIn_1Hb {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.loading-view_loading-container_X1X {\n  width: 100%;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.loading-view_loading-wrapper_1YC {\n  -webkit-animation: loading-view_fadeIn_1Hb .6s 1;\n          animation: loading-view_fadeIn_1Hb .6s 1; }\n\n.loading-view_spinner_283 {\n  -webkit-animation: loading-view_rotator_343 1.4s linear infinite;\n          animation: loading-view_rotator_343 1.4s linear infinite; }\n\n@-webkit-keyframes loading-view_rotator_343 {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n@keyframes loading-view_rotator_343 {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n.loading-view_path_3Dl {\n  stroke-dasharray: 187;\n  stroke-dashoffset: 0;\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  -webkit-animation: loading-view_dash_1je 1.4s ease-in-out infinite, loading-view_colors_UZK 5.6s ease-in-out infinite;\n          animation: loading-view_dash_1je 1.4s ease-in-out infinite, loading-view_colors_UZK 5.6s ease-in-out infinite; }\n\n@-webkit-keyframes loading-view_colors_UZK {\n  0% {\n    stroke: #28353e; }\n  50% {\n    stroke: #00b4a2; }\n  100% {\n    stroke: #28353e; } }\n\n@keyframes loading-view_colors_UZK {\n  0% {\n    stroke: #28353e; }\n  50% {\n    stroke: #00b4a2; }\n  100% {\n    stroke: #28353e; } }\n\n@-webkit-keyframes loading-view_dash_1je {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n\n@keyframes loading-view_dash_1je {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n", ""]);

// exports
exports.locals = {
	"loading-container": "loading-view_loading-container_X1X",
	"loading-wrapper": "loading-view_loading-wrapper_1YC",
	"fadeIn": "loading-view_fadeIn_1Hb",
	"spinner": "loading-view_spinner_283",
	"rotator": "loading-view_rotator_343",
	"path": "loading-view_path_3Dl",
	"dash": "loading-view_dash_1je",
	"colors": "loading-view_colors_UZK"
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes drawer_fadeIn_3RE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes drawer_fadeIn_3RE {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.drawer_drawer-container_2Bz {\n  position: relative;\n  z-index: 99;\n  height: 100%;\n  width: 40%;\n  max-width: 300px; }\n  @media (max-width: 500px) {\n    .drawer_drawer-container_2Bz {\n      position: fixed;\n      z-index: 102;\n      left: 0;\n      top: 0;\n      width: 100%;\n      max-width: none;\n      height: 100%;\n      overflow: hidden;\n      pointer-events: none; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz::after {\n    display: block;\n    content: '';\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, .4);\n    opacity: 0;\n    will-change: opacity;\n    -webkit-transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); } }\n\n@media (min-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf {\n    display: none; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf {\n    pointer-events: auto; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf::after {\n    opacity: 1; } }\n\n.drawer_drawer_3zw {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }\n  @media (max-width: 500px) {\n    .drawer_drawer_3zw {\n      -webkit-box-shadow: 2px 0 12px rgba(0, 0, 0, .4);\n              box-shadow: 2px 0 12px rgba(0, 0, 0, .4);\n      left: 0;\n      top: 0;\n      max-width: 400px;\n      width: 80%;\n      -webkit-transform: translateX(-107%);\n              transform: translateX(-107%);\n      will-change: transform; } }\n\n.drawer_drawer_3zw.drawer_draggable_2pc {\n  -webkit-transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1), -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1); }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf .drawer_drawer_3zw {\n    -webkit-transform: translateX(0px);\n            transform: translateX(0px); } }\n\n.drawer_drawer-homeContainer_3Hh {\n  padding: 8px 0;\n  border-bottom: 1px solid #324047;\n  background-color: #1e2b32; }\n\n.drawer_drawer-home_1LM {\n  position: relative;\n  overflow: hidden;\n  padding: 0 24px;\n  height: 40px;\n  text-decoration: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .drawer_drawer-home_1LM svg {\n    margin-right: 27px;\n    fill: #fff; }\n  .drawer_drawer-home_1LM span {\n    color: #fff; }\n\n.drawer_drawer-home_1LM.drawer_active_3Bf i {\n  color: #00b4a2; }\n\n.drawer_drawer-home_1LM.drawer_active_3Bf span {\n  font-weight: 500;\n  color: #00b4a2; }\n\n.drawer_drawer-logo_jzF {\n  display: none;\n  background-color: #1e2b32; }\n  .drawer_drawer-logo_jzF img {\n    width: 100%; }\n\n.drawer_drawer-divider_Y1X {\n  border: 1px solid #324047;\n  border-bottom: none;\n  margin: 0; }\n\n.drawer_search-container_2fv {\n  padding: 16px;\n  background-color: #324047;\n  border-bottom: 1px solid #324047; }\n\n.drawer_articleFilters-wrapper_3GA {\n  background-color: #1e2b32; }\n\n.drawer_pageList-wrapper_1jE {\n  background-color: #1e2b32;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.drawer_drawer-footer_1aM {\n  height: 0px;\n  background-color: #1e2b32; }\n", ""]);

// exports
exports.locals = {
	"drawer-container": "drawer_drawer-container_2Bz",
	"active": "drawer_active_3Bf",
	"drawer": "drawer_drawer_3zw",
	"draggable": "drawer_draggable_2pc",
	"drawer-homeContainer": "drawer_drawer-homeContainer_3Hh",
	"drawer-home": "drawer_drawer-home_1LM",
	"drawer-logo": "drawer_drawer-logo_jzF",
	"drawer-divider": "drawer_drawer-divider_Y1X",
	"search-container": "drawer_search-container_2fv",
	"articleFilters-wrapper": "drawer_articleFilters-wrapper_3GA",
	"pageList-wrapper": "drawer_pageList-wrapper_1jE",
	"drawer-footer": "drawer_drawer-footer_1aM",
	"fadeIn": "drawer_fadeIn_3RE"
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes main-header_fadeIn_1w8 {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes main-header_fadeIn_1w8 {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.main-header_header_2Bv {\n  position: relative;\n  padding: 16px 24px 16px 72px;\n  z-index: 100;\n  width: 100%;\n  background-color: #28353e;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, .3);\n          box-shadow: 0px 2px 4px rgba(0, 0, 0, .3); }\n  @media (max-width: 500px) {\n    .main-header_header_2Bv {\n      padding: 16px 24px 16px 48px; } }\n\n.main-header_title-container_3Mt {\n  overflow: hidden; }\n\n.main-header_toggle-container_3oi {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 48px; }\n  @media (min-width: 500px) {\n    .main-header_toggle-container_3oi {\n      left: 16px; } }\n\n.main-header_title_1gD {\n  display: block;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding-right: 8px;\n  color: #fff;\n  font-size: 18px;\n  -webkit-transition: all 0.2s linear;\n  transition: all 0.2s linear;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  .main-header_title_1gD .main-header_title-detail_3NY {\n    text-transform: capitalize; }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_searchOpen_1fU .main-header_title_1gD {\n    opacity: 0;\n    padding: 0; } }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_searchOpen_1fU .main-header_title-container_3Mt {\n    width: 0; } }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_searchOpen_1fU .main-header_search-container_iHD {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; } }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_waterfallOpen_2uq {\n    -webkit-box-shadow: none;\n            box-shadow: none; } }\n", ""]);

// exports
exports.locals = {
	"header": "main-header_header_2Bv",
	"title-container": "main-header_title-container_3Mt",
	"toggle-container": "main-header_toggle-container_3oi",
	"title": "main-header_title_1gD",
	"title-detail": "main-header_title-detail_3NY",
	"searchOpen": "main-header_searchOpen_1fU",
	"search-container": "main-header_search-container_iHD",
	"waterfallOpen": "main-header_waterfallOpen_2uq",
	"fadeIn": "main-header_fadeIn_1w8"
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes toast-manager_fadeIn_3vb {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes toast-manager_fadeIn_3vb {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.toast-manager_toast-container_1Ri {\n  position: fixed;\n  z-index: 99;\n  width: 100vw;\n  top: 100%;\n  left: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n  @media (max-width: 500px) {\n    .toast-manager_toast-container_1Ri {\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; } }\n  .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq {\n    padding: 8px;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 0;\n    -webkit-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n    @media (max-width: 500px) {\n      .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq {\n        padding: 0; } }\n    .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq .toast-manager_toast_3AS {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      background: #1e2b32;\n      padding: 4px 8px 4px 24px;\n      border-radius: 2px;\n      -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, .4);\n              box-shadow: 0px 2px 4px rgba(0, 0, 0, .4); }\n      .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq .toast-manager_toast_3AS .toast-manager_message_39G {\n        -webkit-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n        color: #fff;\n        font-size: 14px;\n        letter-spacing: 0.5px;\n        line-height: 40px;\n        margin: 0 4px 0 0; }\n      .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq .toast-manager_toast_3AS .toast-manager_action_1gL {\n        position: relative;\n        background: none;\n        border: none;\n        padding: 0;\n        margin: 0;\n        font-size: 14px;\n        line-height: 40px;\n        padding: 0 16px;\n        text-transform: uppercase;\n        color: #00b4a2;\n        outline: none;\n        cursor: pointer; }\n  .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq.toast-manager_active_3KD {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%);\n    opacity: 1; }\n", ""]);

// exports
exports.locals = {
	"toast-container": "toast-manager_toast-container_1Ri",
	"toast-wrapper": "toast-manager_toast-wrapper_2Pq",
	"toast": "toast-manager_toast_3AS",
	"message": "toast-manager_message_39G",
	"action": "toast-manager_action_1gL",
	"active": "toast-manager_active_3KD",
	"fadeIn": "toast-manager_fadeIn_3vb"
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes base_fadeIn_3OM {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes base_fadeIn_3OM {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\nhtml, body {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px; }\n\n* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); }\n\n.base_app-container_Wx2 {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  width: 100vw; }\n\n.base_main-container_TY8 {\n  width: 100%;\n  height: 100%;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  overflow-y: auto; }\n", ""]);

// exports
exports.locals = {
	"app-container": "base_app-container_Wx2",
	"main-container": "base_main-container_TY8",
	"fadeIn": "base_fadeIn_3OM"
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(37);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./ripple.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./ripple.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(38);
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
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../../node_modules/sass-loader/lib/loader.js!./category-section.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(39);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./page-list.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./page-list.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(40);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./header-icon.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./header-icon.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(41);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./search-input.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./search-input.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(42);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./progress-indicator.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./progress-indicator.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(43);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./link.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./link.scss");

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


    var content = __webpack_require__(44);
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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./route-handler.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./route-handler.scss");

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


    var content = __webpack_require__(45);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./loading-view.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js!./loading-view.scss");

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


    var content = __webpack_require__(46);
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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./drawer.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./drawer.scss");

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


    var content = __webpack_require__(47);
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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./main-header.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./main-header.scss");

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


    var content = __webpack_require__(48);
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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./toast-manager.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??postcss!../../../../node_modules/sass-loader/lib/loader.js!./toast-manager.scss");

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


    var content = __webpack_require__(49);
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
      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??postcss!../../../node_modules/sass-loader/lib/loader.js!./base.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js??postcss!../../../node_modules/sass-loader/lib/loader.js!./base.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("contentful");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("static-module");

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("url-search-params");

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(16);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  space: 'ygp49j9ncoqn',
  accessToken: '3ff5816ecb76807c88a570e0e7ab89b77ddde9697d29945ca82d60399d6182e8'
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjBhOThlZDk4NDJiMzI5YTM3NWQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvYWN0aW9ucy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2FjdGlvbnMvcGFnZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9jb21tb24vcmlwcGxlL3JpcHBsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvbGluay9saW5rLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9yb3V0ZS1oYW5kbGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9kaXN0L2NsaWVudC9zdGF0aWMvanMvbWFuaWZlc3QuanNvbiIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2FjdGlvbnMvYWN0aXZlLXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9hcHAuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L2NhdGVnb3J5LXNlY3Rpb24vY2F0ZWdvcnktc2VjdGlvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2RyYXdlci9wYWdlLWxpc3QvcGFnZS1saXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1pY29uL2hlYWRlci1pY29uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9tYWluL3Byb2dyZXNzLWluZGljYXRvci9wcm9ncmVzcy1pbmRpY2F0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvYXBwLXNoZWxsL2FwcC1zaGVsbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL2RyYXdlci9kcmF3ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29udGFpbmVycy9oZWFkZXIvbWFpbi1oZWFkZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29udGFpbmVycy90b2FzdC1tYW5hZ2VyL3RvYXN0LW1hbmFnZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvcmVkdWNlcnMvYWN0aXZlLXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3JlZHVjZXJzL3BhZ2UtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3JlZHVjZXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9jb21tb24vcmlwcGxlL3JpcHBsZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L2NhdGVnb3J5LXNlY3Rpb24vY2F0ZWdvcnktc2VjdGlvbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L3BhZ2UtbGlzdC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWljb24vaGVhZGVyLWljb24uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvbWFpbi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvbGluay9saW5rLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvcm91dGUtaGFuZGxlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL2RyYXdlci9kcmF3ZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvaGVhZGVyL21haW4taGVhZGVyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL3RvYXN0LW1hbmFnZXIvdG9hc3QtbWFuYWdlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvc2Nzcy9iYXNlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlLnNjc3M/MGRjYSIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvZHJhd2VyL3BhZ2UtbGlzdC9jYXRlZ29yeS1zZWN0aW9uL2NhdGVnb3J5LXNlY3Rpb24uc2Nzcz9hOTcwIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L3BhZ2UtbGlzdC5zY3NzP2RiNjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2hlYWRlci9oZWFkZXItaWNvbi9oZWFkZXItaWNvbi5zY3NzPzM4M2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2hlYWRlci9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0LnNjc3M/MjgzZiIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvbWFpbi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3M/NmM0NyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9saW5rL2xpbmsuc2Nzcz85MjVhIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9yb3V0ZS1oYW5kbGVyL3JvdXRlLWhhbmRsZXIuc2Nzcz8yOTczIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LnNjc3M/NDY1MCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvZHJhd2VyL2RyYXdlci5zY3NzPzEwODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL2hlYWRlci9tYWluLWhlYWRlci5zY3NzP2VmZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL3RvYXN0LW1hbmFnZXIvdG9hc3QtbWFuYWdlci5zY3NzPzk5ZTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9zY3NzL2Jhc2Uuc2Nzcz8zYmJmIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnRlbnRmdWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hcmtlZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdGF0aWMtbW9kdWxlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsLXNlYXJjaC1wYXJhbXNcIiIsIndlYnBhY2s6Ly8vLi9jcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6WyJ0b2dnbGVEcmF3ZXIiLCJib29sIiwidHlwZSIsInBheWxvYWQiLCJ0b2dnbGVTZWFyY2giLCJ0b2dnbGVXYXRlcmZhbGxIZWFkZXIiLCJwcm9ncmVzc1VwZGF0ZSIsInBlcmNlbnRhZ2UiLCJwdXNoVG9hc3QiLCJtZXNzYWdlVGV4dCIsImFjdGlvblRleHQiLCJ0aW1lb3V0IiwiY2FsbGJhY2siLCJwb3BUb2FzdCIsInNldEF1dG9Eb3dubG9hZFJlc3VsdCIsInNldEF1dG9Eb3dubG9hZCIsImRpc3BhdGNoIiwic2VhcmNoIiwicXVlcnkiLCJhZGRGaWx0ZXIiLCJmaWx0ZXIiLCJyZW1vdmVGaWx0ZXIiLCJwYWdlTGlzdExvYWRpbmciLCJwYWdlTGlzdEVycm9yIiwicGFnZUxpc3RGZXRjaFN1Y2Nlc3MiLCJlbnRyaWVzIiwiZmV0Y2hQYWdlTGlzdCIsIm5ldHdvcmtEYXRhUmVjaWV2ZWQiLCJjYWNoZURhdGFSZWNpZXZlZCIsIm5ldHdvcmtVcGRhdGUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwianNvbiIsImZpZWxkcyIsInN5cyIsImlkIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjYXRjaCIsImVyciIsImNhY2hlcyIsIm1hdGNoIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJJREJfVkVSU0lPTl9OTyIsIlRBR0dFRF9JTiIsIklOSVRJQVRFX0RSQUdHSU5HX1RIUkVTSE9MRCIsIkRSQVdFUl9DTE9TRV9USFJFU0hPTEQiLCJSVU5USU1FX0NBQ0hFIiwiUmlwcGxlIiwicHJvcHMiLCJvblRvdWNoU3RhcnQiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVjdCIsImNvbnRhaW5lciIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhcmVudEhlaWdodCIsImhlaWdodCIsInBhcmVudFdpZHRoIiwid2lkdGgiLCJwYXJlbnRYIiwibGVmdCIsInBhcmVudFkiLCJ0b3AiLCJjbGlja1giLCJ0b3VjaGVzIiwicGFnZVgiLCJjbGlja1kiLCJwYWdlWSIsIngiLCJ5IiwiY3JlYXRlUmlwcGxlIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJzdGF0ZSIsImFjdGl2ZVJpcHBsZSIsImZhZGVPdXRSaXBwbGUiLCJvbk1vdXNlTGVhdmUiLCJyaXBwbGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsInRyYW5zZm9ybSIsInNpemUiLCJNYXRoIiwic3FydCIsImFuaW1hdGFibGUiLCJhcHBlbmRDaGlsZCIsInNldFN0YXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByb3BlcnR5TmFtZSIsInJlbW92ZVJpcHBsZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRpdiIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiZWxlbWVudCIsImRlZmF1bHRQcm9wcyIsIlJvdXRlIiwiY2xpY2tIYW5kbGVyIiwicHJldmVudERlZmF1bHQiLCJyb3V0ZSIsInN0YXJ0c1dpdGgiLCJ1cmwiLCJVUkwiLCJocmVmIiwid2luZG93IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInB1c2hTdGF0ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImhhbmRsZUNsaWNrIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImRpc2FibGVkIiwiZnVuYyIsIm1hcFN0YXRlVG9Qcm9wcyIsIlJvdXRlSGFuZGxlciIsIm9uUG9wU3RhdGUiLCJjaG9vc2VBY3RpdmVSb3V0ZSIsImNvbnRlbnQiLCJ2YWxpZFJvdXRlcyIsInZhbGlkUm91dGUiLCJyZWdleCIsIlJlZ0V4cCIsInBhdGgiLCJ0ZXN0IiwicGF0aG5hbWUiLCJub3RGb3VuZFJvdXRlIiwiY2xvbmVFbGVtZW50IiwiQ2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGQiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWN0aXZlUGFnZSIsInBvcnQiLCJhcHAiLCJ1c2UiLCJsaXN0ZW4iLCJwYWdlRmV0Y2hFcnJvciIsInBhZ2VJc0xvYWRpbmciLCJzZXRBY3RpdmVSb3V0ZSIsInNldEFjdGl2ZVBhZ2UiLCJwYWdlIiwic2V0QWN0aXZlUGFnZVR5cGUiLCJzZXRBY3RpdmVQYWdlVGl0bGUiLCJ0aXRsZSIsInBhZ2VGZXRjaFN1Y2Nlc3MiLCJmZXRjaFBhZ2UiLCJuYW1lIiwidXBkYXRlZEF0Iiwic3Vic3RyaW5nIiwiQ29udGV4dFR5cGUiLCJpbnNlcnRDc3MiLCJBcHAiLCJjb250ZXh0Iiwic2hhcGUiLCJjaGlsZENvbnRleHRUeXBlcyIsIkNhdGVnb3J5U2VjdGlvbiIsImNhdGVnb3J5Iiwic29ydCIsImEiLCJiIiwiY2hhckNvZGVBdCIsIm1hcCIsImVudHJ5IiwiYWN0aXZlUm91dGUiLCJhY3RpdmUiLCJjYXRlZ29yeVNlY3Rpb24iLCJsaW5rc0NvbnRhaW5lciIsIm1hcExpbmtzIiwib2JqZWN0IiwiUGFnZUxpc3QiLCJtYXBQYWdlcyIsInBhZ2VzIiwib3JnYW5pc2VQYWdlcyIsIm91dHB1dCIsImhhc0Vycm9yZWQiLCJpc0xvYWRpbmciLCJtYXRjaGVkQ2F0IiwiZmluZEluZGV4IiwiY2F0IiwibGVuZ3RoIiwiY2F0ZWdvcnlJbmRleCIsImdldENhdGVnb3J5SW5kZXgiLCJhZGRFbnRyeVRvQ2F0ZWdvcnkiLCJPYmplY3QiLCJhc3NpZ24iLCJhcnJheSIsIkhlYWRlckljb24iLCJvcGVuRHJhd2VyIiwiZHJhd2VyT3BlbiIsImNsb3NlU2VhcmNoIiwiVXBkYXRlUm91dGUiLCJtZW51SWNvbiIsInNlYXJjaE9wZW4iLCJiYWNrSWNvbiIsIlNlYXJjaElucHV0Iiwic2VhcmNoSWNvbkNsaWNrIiwic2VhcmNoSW5wdXQiLCJmb2N1cyIsInNlYXJjaEZvY3VzZWQiLCJmb2N1c2VkIiwiYm9keSIsInNlYXJjaFVuZm9jdXNlZCIsImV2dCIsInNlYXJjaENvbnRhaW5lciIsImNvbnRhaW5zIiwidGFyZ2V0IiwiY3VyclF1ZXJ5IiwiaGFuZGxlSW5wdXQiLCJ2YWx1ZSIsIm5vbkVtcHR5IiwiY2xlYXJJbnB1dCIsIm9wZW5lZCIsImxhYmVsIiwiaW5wdXQiLCJidG4iLCJjbG9zZUljb24iLCJQcm9ncmVzc0luZGljYXRvciIsIm9wYWNpdHkiLCJwcm9ncmVzcyIsInByb2dyZXNzSW5kaWNhdG9yIiwibnVtYmVyIiwiTG9hZGluZ1ZpZXciLCJ2aXNpYmxlIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInNwaW5uZXIiLCJjb2xvciIsIkFwcFNoZWxsIiwic2Nyb2xsZWQiLCJjYWNoZVN0b3JhZ2UiLCJ1dGlscyIsIm1hdGNoRGlzcGF0Y2hUb1Byb3BzIiwiRHJhd2VyIiwiZHJhd2VyQ29udGFpbmVyIiwiZHJhd2VyIiwiZHJhZ2dhYmxlIiwic3RhcnRYIiwiY3VycmVudFgiLCJ0b3VjaGluZ1NpZGVOYXYiLCJ1cGRhdGUiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJpbml0aWFsaXNlZERyYWdnaW5nIiwicmVtb3ZlIiwidHJhbnNsYXRlWCIsIm1pbiIsImhpZGVTaWRlTmF2IiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJwcmV2UHJvcHMiLCJSZXBsYWNlUm91dGUiLCJzdXBwb3J0c1Bhc3NpdmUiLCJ1bmRlZmluZWQiLCJwYXNzaXZlIiwiaXNTdXBwb3J0ZWQiLCJhcHBseVBhc3NpdmUiLCJhc2lkZSIsImFjdGl2ZVBhZ2VzIiwicGFnZUxpc3QiLCJjdXJyRmlsdGVycyIsImZpbHRlcnMiLCJvcGVuIiwiTWFpbkhlYWRlciIsImhlYWRlciIsInNob3dXYXRlcmZhbGxIZWFkZXIiLCJ3YXRlcmZhbGxPcGVuIiwiX19odG1sIiwiYWN0aXZlUGFnZVRpdGxlIiwiVG9hc3RNYW5hZ2VyIiwiX2Nsb3NlVG9hc3QiLCJ0b2FzdCIsIl9yZW1vdmVUb2FzdCIsIl9oYW5kbGVDbGljayIsIm5leHRQcm9wcyIsInRvYXN0cyIsIl90cmlnZ2VyVG9hc3QiLCJtZXNzYWdlIiwiYWN0aW9uIiwiaW5pdGlhbFN0YXRlIiwiYWxsUmVkdWNlcnMiLCJ2YWx1ZXMiLCJmaWx0ZXJQYWdlcyIsInF1ZXJ5UGFnZXMiLCJuZXdGaWx0ZXJzIiwic3BsaWNlIiwiaW5kZXhPZiIsImZpbHRlcmVkUGFnZXMiLCJpbmNsdWRlcyIsInNwZWNpZmljYXRpb24iLCJzeW50YXhFbnRyaWVzIiwibWF0Y2hlZEVudHJpZXMiLCJmb3JtYXR0ZWRRdWVyeSIsInRvTG93ZXJDYXNlIiwicmVnZXhwIiwiZXhlYyIsInRhZ3MiLCJ0YWciLCJ0cmltIiwibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsIndhdGVyZmFsbEhlYWRlck9wZW4iLCJhcnIiLCJzaGlmdCIsImNvbnRlbnRmdWwiLCJjb250ZW50ZnVsQ2xpZW50IiwiY3JlYXRlQ2xpZW50Iiwic3BhY2UiLCJhY2Nlc3NUb2tlbiIsImxvYWRBcnRpY2xlcyIsImdldEVudHJpZXMiLCJjb250ZW50X3R5cGUiLCJzZWxlY3QiLCJpbmNsdWRlIiwibGlua2VkRW50cmllcyIsIml0ZW1zIiwiRW50cnkiLCJoYXNoIiwiY3JlYXRlSGFzaCIsImtleXMiLCJrZXkiLCJsaW5rRW50cnkiLCJlbmNvZGVVUkkiLCJkaWdlc3QiLCJyZXEiLCJwYWdlTmFtZSIsImRlY29kZVVSSSIsInBhcmFtcyIsInBhZ2VJZCIsImJsb2IiLCJwYXJhbSIsImZpbmQiLCJhcGlSb3V0ZXIiLCJSb3V0ZXIiLCJnZXQiLCJyZXMiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsImFydGljbGUiLCJzdGF0dXMiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyU2VydmVyU2lkZSIsInN0b3JlIiwiY3NzIiwiU2V0Iiwic3R5bGVzIiwiX2dldENzcyIsImh0bWwiLCJwcmVsb2FkZWRTdGF0ZSIsImdldFN0YXRlIiwicmVuZGVyRnVsbFBhZ2UiLCJqb2luIiwicmVwbGFjZSIsInJvdXRlciIsImNyZWF0ZVJlYWRTdHJlYW0iLCJwcmVjYWNoZWFzc2V0c1RvQ2FjaGUiLCJwcmVjYWNoZUhhc2giLCJhc3NldCIsInByZWNhY2hlRGlnZXN0Iiwic2V0IiwicGlwZSIsIm5leHQiLCJzZXRIZWFkZXIiLCJzdGF0aWMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQSx1Qzs7Ozs7O0FDQUEsa0M7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9CQUFvQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDakRBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMERBQTBELEVBQUU7QUFDNUQ7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdFQUFnRSxnRUFBZ0U7QUFDaEk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFlBQVksRUFBRTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUZBQW1GO0FBQ25GO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQjs7Ozs7O0FDcEpBLG1FOzs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFTyxJQUFNQSxzQ0FBZSxTQUFmQSxZQUFlLENBQUNDLElBQUQsRUFBVTtBQUNwQyxTQUFPO0FBQ0xDLFVBQU0sZUFERDtBQUVMQyxhQUFTRjtBQUZKLEdBQVA7QUFJRCxDQUxNOztBQU9BLElBQU1HLHNDQUFlLFNBQWZBLFlBQWUsQ0FBQ0gsSUFBRCxFQUFVO0FBQ3BDLFNBQU87QUFDTEMsVUFBTSxlQUREO0FBRUxDLGFBQVNGO0FBRkosR0FBUDtBQUlELENBTE07O0FBT0EsSUFBTUksd0RBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQ0osSUFBRCxFQUFVO0FBQzdDLFNBQU87QUFDTEMsVUFBTSx5QkFERDtBQUVMQyxhQUFTRjtBQUZKLEdBQVA7QUFJRCxDQUxNOztBQU9BLElBQU1LLDBDQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ0MsVUFBRCxFQUFnQjtBQUM1QyxTQUFPO0FBQ0xMLFVBQU0saUJBREQ7QUFFTEMsYUFBU0k7QUFGSixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNQyxnQ0FBWSxTQUFaQSxTQUFZLENBQUNDLFdBQUQsRUFBY0MsVUFBZCxFQUEwQkMsT0FBMUIsRUFBbUNDLFFBQW5DLEVBQWdEO0FBQ3ZFLFNBQU87QUFDTFYsVUFBTSxZQUREO0FBRUxDLGFBQVM7QUFDUE0sOEJBRE87QUFFUEMsNEJBRk87QUFHUEMsc0JBSE87QUFJUEM7QUFKTztBQUZKLEdBQVA7QUFTRCxDQVZNOztBQVlBLElBQU1DLDhCQUFXLFNBQVhBLFFBQVcsR0FBTTtBQUM1QixTQUFPO0FBQ0xYLFVBQU07QUFERCxHQUFQO0FBR0QsQ0FKTTs7QUFNQSxJQUFNWSx3REFBd0IsU0FBeEJBLHFCQUF3QixDQUFDYixJQUFELEVBQVU7QUFDN0MsU0FBTztBQUNMQyxVQUFNLGVBREQ7QUFFTEMsYUFBU0Y7QUFGSixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNYyw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNkLElBQUQsRUFBVTtBQUN2QyxTQUFPLFVBQUNlLFFBQUQsRUFBYzs7QUFFbkJBLGFBQVNGLHNCQUFzQmIsSUFBdEIsQ0FBVDtBQUNELEdBSEQ7QUFJRCxDQUxNLEM7Ozs7Ozs7Ozs7Ozs7O0FDdkRQOztBQUVPLElBQU1nQiwwQkFBUyxTQUFUQSxNQUFTLENBQUNDLEtBQUQsRUFBVztBQUMvQixTQUFPO0FBQ0xoQixVQUFNLGNBREQ7QUFFTEMsYUFBU2U7QUFGSixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNQyxnQ0FBWSxTQUFaQSxTQUFZLENBQUNDLE1BQUQsRUFBWTtBQUNuQyxTQUFPO0FBQ0xsQixVQUFNLFlBREQ7QUFFTEMsYUFBU2lCO0FBRkosR0FBUDtBQUlELENBTE07O0FBT0EsSUFBTUMsc0NBQWUsU0FBZkEsWUFBZSxDQUFDRCxNQUFELEVBQVk7QUFDdEMsU0FBTztBQUNMbEIsVUFBTSxlQUREO0FBRUxDLGFBQVNpQjtBQUZKLEdBQVA7QUFJRCxDQUxNOztBQU9BLElBQU1FLDRDQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ3JCLElBQUQsRUFBVTtBQUN2QyxTQUFPO0FBQ0xDLFVBQU0sa0JBREQ7QUFFTEMsYUFBU0Y7QUFGSixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNc0Isd0NBQWdCLFNBQWhCQSxhQUFnQixDQUFDdEIsSUFBRCxFQUFVO0FBQ3JDLFNBQU87QUFDTEMsVUFBTSxnQkFERDtBQUVMQyxhQUFTRjtBQUZKLEdBQVA7QUFJRCxDQUxNOztBQU9BLElBQU11QixzREFBdUIsU0FBdkJBLG9CQUF1QixDQUFDQyxPQUFELEVBQWE7QUFDL0MsU0FBTztBQUNMdkIsVUFBTSx3QkFERDtBQUVMQyxhQUFTc0I7QUFGSixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNQyx3Q0FBZ0IsU0FBaEJBLGFBQWdCLEdBQU07QUFDakMsU0FBTyxVQUFDVixRQUFELEVBQWM7QUFDbkIsUUFBSVcsc0JBQXNCLEtBQTFCO0FBQ0EsUUFBSUMsb0JBQW9CLEtBQXhCOztBQUVBWixhQUFTTSxnQkFBZ0IsSUFBaEIsQ0FBVDtBQUNBTixhQUFTTyxjQUFjLEtBQWQsQ0FBVDs7QUFFQSxRQUFNTSxnQkFBZ0JDLE1BQU0sWUFBTixFQUNyQkMsSUFEcUIsQ0FDaEIsVUFBQ0MsUUFBRCxFQUFjO0FBQ2xCLFVBQUksQ0FBQ0EsU0FBU0MsRUFBZCxFQUFrQjtBQUNoQixjQUFNQyxNQUFNRixTQUFTRyxVQUFmLENBQU47QUFDRDtBQUNELGFBQU9ILFFBQVA7QUFDRCxLQU5xQixFQU9yQkQsSUFQcUIsQ0FPaEIsVUFBQ0MsUUFBRCxFQUFjO0FBQUUsYUFBT0EsU0FBU0ksSUFBVCxFQUFQO0FBQXlCLEtBUHpCLEVBUXJCTCxJQVJxQixDQVFoQixVQUFDQyxRQUFELEVBQWM7QUFDbEJMLDRCQUFzQixJQUF0Qjs7QUFFQSxVQUFJLENBQUNDLGlCQUFMLEVBQXdCO0FBQ3RCWixpQkFBU00sZ0JBQWdCLEtBQWhCLENBQVQ7QUFDQU4saUJBQVNRLHFCQUFxQlEsU0FBU0ssTUFBOUIsQ0FBVDtBQUNELE9BSEQsTUFHTztBQUNMO0FBQ0EsWUFBSVQsa0JBQWtCVSxHQUFsQixDQUFzQkMsRUFBdEIsS0FBNkJQLFNBQVNNLEdBQVQsQ0FBYUMsRUFBOUMsRUFBa0Q7QUFDaEQ7QUFDQXZCLG1CQUFTLHNCQUFVLDhDQUFWLEVBQTBELFFBQTFELEVBQW9FLEtBQXBFLEVBQTJFLFlBQU07QUFDeEZ3QixxQkFBU0MsTUFBVDtBQUNELFdBRlEsQ0FBVDtBQUdELFNBTEQsTUFLTztBQUNMO0FBQ0Q7QUFDRjtBQUVGLEtBMUJxQixFQTJCckJDLEtBM0JxQixDQTJCZixVQUFDQyxHQUFELEVBQVM7QUFDZDNCLGVBQVNRLHFCQUFxQixJQUFyQixDQUFUO0FBQ0EsWUFBTW1CLEdBQU47QUFDRCxLQTlCcUIsQ0FBdEI7O0FBZ0NBO0FBQ0FDLFdBQU9DLEtBQVAsQ0FBYSxZQUFiLEVBQTJCZCxJQUEzQixDQUFnQyxVQUFDQyxRQUFELEVBQWM7QUFDNUMsVUFBSSxDQUFDQSxRQUFMLEVBQWUsTUFBTUUsTUFBTSxTQUFOLENBQU47QUFDZixhQUFPRixTQUFTSSxJQUFULEVBQVA7QUFDRCxLQUhELEVBR0dMLElBSEgsQ0FHUSxVQUFDZSxJQUFELEVBQVU7QUFDaEJsQiwwQkFBb0JrQixJQUFwQjtBQUNBO0FBQ0EsVUFBSSxDQUFDbkIsbUJBQUwsRUFBMEI7QUFDeEJYLGlCQUFTTSxnQkFBZ0IsS0FBaEIsQ0FBVDtBQUNBTixpQkFBU1EscUJBQXFCc0IsS0FBS1QsTUFBMUIsQ0FBVDtBQUNEO0FBQ0YsS0FWRCxFQVVHSyxLQVZILENBVVMsWUFBTTtBQUNiLGFBQU9iLGFBQVA7QUFDRCxLQVpELEVBWUdhLEtBWkgsQ0FZUyxVQUFDQyxHQUFELEVBQVM7QUFDaEJJLGNBQVFDLEdBQVIsQ0FBWUwsR0FBWjtBQUNELEtBZEQ7QUFlRCxHQXZERDtBQXdERCxDQXpETSxDOzs7Ozs7Ozs7Ozs7QUM1Q1A7QUFDTyxJQUFNTSwwQ0FBaUIsQ0FBdkI7O0FBRVA7QUFDTyxJQUFNQyxnQ0FBWSxVQUFsQjs7QUFFUDtBQUNPLElBQU1DLG9FQUE4QixFQUFwQztBQUNBLElBQU1DLDBEQUF5QixFQUEvQjs7QUFFUDtBQUNPLElBQU1DLHdDQUFnQixvQkFBdEIsQzs7Ozs7Ozs7Ozs7Ozs7O0FDWFA7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVNQyxNOzs7QUFFSixrQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGdIQUNYQSxLQURXOztBQUFBLFVBUW5CQyxZQVJtQixHQVFKLFVBQUNDLENBQUQsRUFBTztBQUNwQkEsUUFBRUMsZUFBRjs7QUFFQSxVQUFNQyxPQUFPLE1BQUtDLFNBQUwsQ0FBZUMscUJBQWYsRUFBYjtBQUNBLFlBQUtDLFlBQUwsR0FBb0JILEtBQUtJLE1BQXpCO0FBQ0EsWUFBS0MsV0FBTCxHQUFtQkwsS0FBS00sS0FBeEI7QUFDQSxZQUFLQyxPQUFMLEdBQWVQLEtBQUtRLElBQXBCO0FBQ0EsWUFBS0MsT0FBTCxHQUFlVCxLQUFLVSxHQUFwQjs7QUFFQSxVQUFNQyxTQUFTYixFQUFFYyxPQUFGLENBQVUsQ0FBVixFQUFhQyxLQUE1QjtBQUNBLFVBQU1DLFNBQVNoQixFQUFFYyxPQUFGLENBQVUsQ0FBVixFQUFhRyxLQUE1Qjs7QUFFQSxVQUFNQyxJQUFJTCxTQUFTLE1BQUtKLE9BQXhCO0FBQ0EsVUFBTVUsSUFBSUgsU0FBUyxNQUFLTCxPQUF4Qjs7QUFFQSxZQUFLUyxZQUFMLENBQWtCRixDQUFsQixFQUFxQkMsQ0FBckI7QUFDRCxLQXhCa0I7O0FBQUEsVUEwQm5CRSxXQTFCbUIsR0EwQkwsVUFBQ3JCLENBQUQsRUFBTztBQUNuQixVQUFNRSxPQUFPLE1BQUtDLFNBQUwsQ0FBZUMscUJBQWYsRUFBYjtBQUNBLFlBQUtDLFlBQUwsR0FBb0JILEtBQUtJLE1BQXpCO0FBQ0EsWUFBS0MsV0FBTCxHQUFtQkwsS0FBS00sS0FBeEI7QUFDQSxZQUFLQyxPQUFMLEdBQWVQLEtBQUtRLElBQXBCO0FBQ0EsWUFBS0MsT0FBTCxHQUFlVCxLQUFLVSxHQUFwQjs7QUFFQSxVQUFNQyxTQUFTYixFQUFFZSxLQUFqQjtBQUNBLFVBQU1DLFNBQVNoQixFQUFFaUIsS0FBakI7O0FBRUEsVUFBTUMsSUFBSUwsU0FBUyxNQUFLSixPQUF4QjtBQUNBLFVBQU1VLElBQUlILFNBQVMsTUFBS0wsT0FBeEI7O0FBRUEsWUFBS1MsWUFBTCxDQUFrQkYsQ0FBbEIsRUFBcUJDLENBQXJCO0FBQ0QsS0F4Q2tCOztBQUFBLFVBMENuQkcsU0ExQ21CLEdBMENQLFlBQU07QUFDaEIsVUFBSSxNQUFLQyxLQUFMLENBQVdDLFlBQWYsRUFBNkI7QUFDM0IsY0FBS0MsYUFBTCxDQUFtQixNQUFLRixLQUFMLENBQVdDLFlBQTlCO0FBQ0Q7QUFDRixLQTlDa0I7O0FBQUEsVUFnRG5CRSxZQWhEbUIsR0FnREosWUFBTTtBQUNuQixVQUFJLE1BQUtILEtBQUwsQ0FBV0MsWUFBZixFQUE2QjtBQUMzQixjQUFLQyxhQUFMLENBQW1CLE1BQUtGLEtBQUwsQ0FBV0MsWUFBOUI7QUFDRDtBQUNGLEtBcERrQjs7QUFBQSxVQXNEbkJKLFlBdERtQixHQXNESixVQUFDRixDQUFELEVBQUlDLENBQUosRUFBVTtBQUN2QixVQUFNUSxTQUFTQyxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQWY7QUFDQUYsYUFBT0csU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsaUJBQUUsZUFBRixDQUFyQjs7QUFFQUosYUFBT0ssS0FBUCxDQUFhQyxTQUFiLEdBQXlCLFVBQXpCOztBQUdBLFVBQU1DLE9BQU9DLEtBQUtDLElBQUwsQ0FBVSxTQUFDLE1BQUs3QixXQUFOLEVBQXFCLENBQXJCLGFBQTJCLE1BQUtGLFlBQWhDLEVBQWdELENBQWhELENBQVYsQ0FBYjtBQUNBc0IsYUFBT0ssS0FBUCxDQUFheEIsS0FBYixHQUF3QjBCLElBQXhCO0FBQ0FQLGFBQU9LLEtBQVAsQ0FBYTFCLE1BQWIsR0FBeUI0QixJQUF6QjtBQUNBUCxhQUFPSyxLQUFQLENBQWF0QixJQUFiLEdBQXVCUSxJQUFLZ0IsT0FBTyxDQUFuQztBQUNBUCxhQUFPSyxLQUFQLENBQWFwQixHQUFiLEdBQXNCTyxJQUFLZSxPQUFPLENBQWxDOztBQUVBUCxhQUFPRyxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixpQkFBRU0sVUFBdkI7O0FBRUEsWUFBS2xDLFNBQUwsQ0FBZW1DLFdBQWYsQ0FBMkJYLE1BQTNCOztBQUVBLFlBQUtZLFFBQUwsQ0FBYztBQUNaZixzQkFBY0c7QUFERixPQUFkOztBQUlBYSw0QkFBc0IsWUFBTTtBQUMxQkEsOEJBQXNCLFlBQU07QUFDMUJiLGlCQUFPSyxLQUFQLENBQWFDLFNBQWIsR0FBeUIsVUFBekI7QUFDRCxTQUZEO0FBR0QsT0FKRDtBQUtELEtBaEZrQjs7QUFBQSxVQWtGbkJSLGFBbEZtQixHQWtGSCxVQUFDRSxNQUFELEVBQVk7QUFDMUJBLGFBQU9HLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLGlCQUFFVSxHQUF2Qjs7QUFFQWQsYUFBT2UsZ0JBQVAsQ0FBd0IsZUFBeEIsRUFBeUMsVUFBQzFDLENBQUQsRUFBTztBQUM5QyxZQUFJQSxFQUFFMkMsWUFBRixLQUFtQixTQUF2QixFQUFrQztBQUNoQyxnQkFBS0MsWUFBTCxDQUFrQmpCLE1BQWxCO0FBQ0Q7QUFDRixPQUpEO0FBS0QsS0ExRmtCOztBQUFBLFVBNEZuQmlCLFlBNUZtQixHQTRGSixVQUFDakIsTUFBRCxFQUFZO0FBQ3pCLFVBQUlBLFVBQVVBLE9BQU9rQixVQUFQLEtBQXNCLE1BQUsxQyxTQUF6QyxFQUFvRDtBQUNsRCxjQUFLQSxTQUFMLENBQWUyQyxXQUFmLENBQTJCbkIsTUFBM0I7QUFDRDtBQUNGLEtBaEdrQjs7QUFHakIsVUFBS0osS0FBTCxHQUFhO0FBQ1hDLG9CQUFjO0FBREgsS0FBYjtBQUhpQjtBQU1sQjs7Ozs2QkE0RlE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFXLGlCQUFFLGtCQUFGLENBRGI7QUFFRSx1QkFBYSxLQUFLSCxXQUZwQixFQUVpQyxXQUFXLEtBQUtDLFNBRmpEO0FBR0Usd0JBQWMsS0FBS0ksWUFIckI7QUFJRSxlQUFLLGFBQUNxQixHQUFELEVBQVM7QUFBRSxtQkFBSzVDLFNBQUwsR0FBaUI0QyxHQUFqQjtBQUF1QjtBQUp6QztBQU1HLGFBQUtqRCxLQUFMLENBQVdrRDtBQU5kLE9BREY7QUFVRDs7OztFQS9Ha0IsZ0JBQU1DLFM7O0FBa0gzQnBELE9BQU9xRCxTQUFQLEdBQW1CO0FBQ2pCRixZQUFVLG9CQUFVRztBQURILENBQW5COztBQUlBdEQsT0FBT3VELFlBQVAsR0FBc0I7QUFDcEJKLFlBQVU7QUFEVSxDQUF0Qjs7a0JBSWUsNENBQWNuRCxNQUFkLEM7Ozs7Ozs7Ozs7Ozs7OztBQ2hJZjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTXdELEs7Ozs7Ozs7Ozs7Ozs7O29MQUVKQyxZLEdBQWUsVUFBQ3RELENBQUQsRUFBTztBQUNwQkEsUUFBRXVELGNBQUY7O0FBRUEsVUFBSSxNQUFLekQsS0FBTCxDQUFXMEQsS0FBWCxDQUFpQkMsVUFBakIsQ0FBNEIsR0FBNUIsQ0FBSixFQUFzQztBQUNwQzs7QUFFQSxZQUFNQyxNQUFNLElBQUlDLEdBQUosQ0FBUTVFLFNBQVM2RSxJQUFqQixDQUFaO0FBQ0FGLFlBQUlsRyxNQUFKLEdBQWEsTUFBS3NDLEtBQUwsQ0FBVzBELEtBQXhCO0FBQ0FLLGVBQU9DLE9BQVAsQ0FBZUMsWUFBZixDQUE0QixJQUE1QixFQUFrQyxJQUFsQyxFQUF3Q0wsSUFBSUUsSUFBNUM7QUFDRCxPQU5ELE1BTU87QUFDTEMsZUFBT0MsT0FBUCxDQUFlRSxTQUFmLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXNDLE1BQUtsRSxLQUFMLENBQVcwRCxLQUFqRDtBQUNEOztBQUVESyxhQUFPSSxhQUFQLENBQXFCLElBQUlDLEtBQUosQ0FBVSxVQUFWLENBQXJCOztBQUVBLFVBQUksTUFBS3BFLEtBQUwsQ0FBV3FFLFdBQWYsRUFBNEIsTUFBS3JFLEtBQUwsQ0FBV3FFLFdBQVgsQ0FBdUJuRSxDQUF2QjtBQUM3QixLOzs7Ozs2QkFHUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsZ0JBQU0sS0FBS0YsS0FBTCxDQUFXMEQsS0FEbkI7QUFFRSxtQkFBUyxLQUFLRixZQUZoQjtBQUdFLHFCQUFXLGVBQUVFO0FBSGY7QUFLRyxhQUFLMUQsS0FBTCxDQUFXa0Q7QUFMZCxPQURGO0FBU0Q7Ozs7RUEvQmlCLGdCQUFNQyxTOztBQW1DMUJJLE1BQU1ILFNBQU4sR0FBa0I7QUFDaEJNLFNBQU8sb0JBQVVZLE1BQVYsQ0FBaUJDLFVBRFI7QUFFaEJDLFlBQVUsb0JBQVU5SCxJQUZKO0FBR2hCd0csWUFBVSxvQkFBVUcsT0FISjtBQUloQmdCLGVBQWEsb0JBQVVJO0FBSlAsQ0FBbEI7O0FBT0FsQixNQUFNRCxZQUFOLEdBQXFCO0FBQ25CSixZQUFVLElBRFM7QUFFbkJzQixZQUFVO0FBRlMsQ0FBckI7O0FBS0EsU0FBU0UsZUFBVCxHQUEyQjtBQUN6QixTQUFPLEVBQVA7QUFFRDs7a0JBRWMsMENBQWMseUJBQVFBLGVBQVIsRUFBeUJuQixLQUF6QixDQUFkLEM7Ozs7Ozs7Ozs7Ozs7OztBQzdEZjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU1vQixZOzs7QUFDSix3QkFBWTNFLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw0SEFDWEEsS0FEVzs7QUFBQSxVQTZDbkI0RSxVQTdDbUIsR0E2Q04sWUFBTTtBQUNqQixZQUFLNUUsS0FBTCxDQUFXakQsY0FBWCxDQUEwQixDQUExQjtBQUNBLFlBQUs4SCxpQkFBTDtBQUNELEtBaERrQjs7QUFBQSxVQWtEbkJBLGlCQWxEbUIsR0FrREMsWUFBTTtBQUN4QixVQUFJQyxnQkFBSjs7QUFFQSxVQUFJN0YsU0FBU3ZCLE1BQWIsRUFBcUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDbkIsK0JBQXVCLE1BQUtxSCxXQUE1Qiw4SEFBeUM7QUFBQSxnQkFBaENDLFVBQWdDOztBQUN2QyxnQkFBSUEsV0FBV2hGLEtBQVgsQ0FBaUJyQyxLQUFyQixFQUE0QjtBQUMxQixrQkFBTXNILFFBQVEsSUFBSUMsTUFBSixDQUFXRixXQUFXaEYsS0FBWCxDQUFpQm1GLElBQTVCLENBQWQ7QUFDQSxrQkFBSUYsTUFBTUcsSUFBTixDQUFXbkcsU0FBU3ZCLE1BQXBCLENBQUosRUFBaUM7QUFDL0JvSCwwQkFBVUUsVUFBVjtBQUNBO0FBQ0Q7QUFDRjtBQUNGO0FBVGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVcEI7O0FBRUQsVUFBSSxDQUFDRixPQUFMLEVBQWM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDWixnQ0FBdUIsTUFBS0MsV0FBNUIsbUlBQXlDO0FBQUEsZ0JBQWhDQyxXQUFnQzs7QUFDdkMsZ0JBQU1DLFNBQVEsSUFBSUMsTUFBSixDQUFXRixZQUFXaEYsS0FBWCxDQUFpQm1GLElBQTVCLENBQWQ7QUFDQSxnQkFBSUYsT0FBTUcsSUFBTixDQUFXbkcsU0FBU29HLFFBQXBCLENBQUosRUFBbUM7QUFDakNQLHdCQUFVRSxXQUFWO0FBQ0E7QUFDRDtBQUNGO0FBUFc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFiO0FBQ0QsVUFBSUYsT0FBSixFQUFhO0FBQ1gsY0FBSzlFLEtBQUwsQ0FBV2pELGNBQVgsQ0FBMEIsRUFBMUI7QUFDRDtBQUNEK0gsZ0JBQVVBLFdBQVcsTUFBS3JELEtBQUwsQ0FBVzZELGFBQWhDOztBQUVBLFlBQUs3QyxRQUFMLENBQWM7QUFDWnFDLGlCQUFTLGdCQUFNUyxZQUFOLENBQ1BULE9BRE8sRUFFUCxFQUFFN0YsZUFBYUEsU0FBUzZFLElBQXhCLEVBRk87QUFERyxPQUFkO0FBTUQsS0FyRmtCOztBQUdqQixVQUFLckMsS0FBTCxHQUFhO0FBQ1hzRCxtQkFBYSxFQURGO0FBRVhPLHFCQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGSixLQUFiO0FBSGlCO0FBT2xCOzs7O3lDQUVvQjtBQUFBOztBQUNuQnZCLGFBQU9uQixnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxLQUFLZ0MsVUFBekM7O0FBRUEsVUFBSUcsY0FBYyxFQUFsQjtBQUNBLHNCQUFNUyxRQUFOLENBQWVDLE9BQWYsQ0FBdUIsS0FBS3pGLEtBQUwsQ0FBV2tELFFBQWxDLEVBQTRDLFVBQUN3QyxLQUFELEVBQVc7QUFDckQsWUFBSUEsTUFBTTFGLEtBQU4sQ0FBWTJGLGNBQVosQ0FBMkIsVUFBM0IsQ0FBSixFQUE0QztBQUMxQyxpQkFBS2xELFFBQUwsQ0FBYyxFQUFFNkMsZUFBZUksS0FBakIsRUFBZDtBQUNELFNBRkQsTUFFTztBQUNMWCxzQkFBWWEsSUFBWixDQUFpQkYsS0FBakI7QUFDRDtBQUNGLE9BTkQ7O0FBUUEsV0FBS1gsV0FBTCxHQUFtQkEsV0FBbkI7O0FBRUEsV0FBS3RDLFFBQUwsQ0FBYztBQUNaeEQsa0JBQVVBLFNBQVM2RTtBQURQLE9BQWQ7O0FBSUEsV0FBS2MsVUFBTDtBQUNEOzs7MkNBYXNCO0FBQ3JCYixhQUFPOEIsbUJBQVAsQ0FBMkIsVUFBM0IsRUFBdUMsS0FBS2pCLFVBQTVDO0FBQ0Q7Ozs2QkE2Q1E7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVcsdUJBQUUsV0FBRixDQUFoQjtBQUNHLGFBQUtuRCxLQUFMLENBQVdxRDtBQURkLE9BREY7QUFLRDs7O2dDQS9Ea0JwQixLLEVBQU87QUFDeEJLLGFBQU9DLE9BQVAsQ0FBZUUsU0FBZixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQ1IsS0FBckM7QUFDQUssYUFBT0ksYUFBUCxDQUFxQixJQUFJQyxLQUFKLENBQVUsVUFBVixDQUFyQjtBQUNEOzs7aUNBRW1CVixLLEVBQU87QUFDekJLLGFBQU9DLE9BQVAsQ0FBZUMsWUFBZixDQUE0QixJQUE1QixFQUFrQyxJQUFsQyxFQUF3Q1AsS0FBeEM7QUFDQUssYUFBT0ksYUFBUCxDQUFxQixJQUFJQyxLQUFKLENBQVUsVUFBVixDQUFyQjtBQUNEOzs7O0VBeEN3QixnQkFBTWpCLFM7O0FBa0dqQ3dCLGFBQWFyQixZQUFiLEdBQTRCO0FBQzFCd0MsY0FBWTtBQURjLENBQTVCOztrQkFJZSxrREFBY25CLFlBQWQsQzs7Ozs7O0FDN0dmLG9DOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTW9CLE9BQU8sYUFBb0IsSUFBakM7O0FBRUEsSUFBTUMsTUFBTSx3QkFBWjs7QUFFQUEsSUFBSUMsR0FBSixDQUFRLE1BQVI7O0FBRUFELElBQUlDLEdBQUosQ0FBUSxHQUFSOztBQUVBRCxJQUFJRSxNQUFKLENBQVdILElBQVgsRUFBaUIsWUFBTTtBQUNyQnZHLFVBQVFDLEdBQVIsK0JBQXdDc0csSUFBeEM7QUFDRCxDQUZELEU7Ozs7OztBQ2RBLDJDOzs7Ozs7QUNBQSxrQkFBa0IsNE87Ozs7Ozs7Ozs7Ozs7O0FDQWxCOztBQUNBOztBQUVPLElBQU1JLDBDQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ3pKLElBQUQsRUFBVTtBQUN0QyxTQUFPO0FBQ0xDLFVBQU0sWUFERDtBQUVMQyxhQUFTRjtBQUZKLEdBQVA7QUFJRCxDQUxNOztBQU9BLElBQU0wSix3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQUMxSixJQUFELEVBQVU7QUFDckMsU0FBTztBQUNMQyxVQUFNLGNBREQ7QUFFTEMsYUFBU0Y7QUFGSixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNMkosMENBQWlCLFNBQWpCQSxjQUFpQixDQUFDM0MsS0FBRCxFQUFXO0FBQ3ZDLFNBQU87QUFDTC9HLFVBQU0sY0FERDtBQUVMQyxhQUFTOEc7QUFGSixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNNEMsd0NBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxJQUFELEVBQVU7QUFDckMsU0FBTztBQUNMNUosVUFBTSxhQUREO0FBRUxDLGFBQVMySjtBQUZKLEdBQVA7QUFJRCxDQUxNOztBQU9BLElBQU1DLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUM3SixJQUFELEVBQVU7QUFDekMsU0FBTztBQUNMQSxVQUFNLGtCQUREO0FBRUxDLGFBQVNEO0FBRkosR0FBUDtBQUlELENBTE07O0FBT0EsSUFBTThKLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNDLEtBQUQsRUFBVztBQUMzQzVFLFdBQVM0RSxLQUFULHFCQUFpQ0EsS0FBakM7QUFDQSxTQUFPO0FBQ0wvSixVQUFNLG1CQUREO0FBRUxDLGFBQVM4SjtBQUZKLEdBQVA7QUFJRCxDQU5NOztBQVFBLElBQU1DLDhDQUFtQixTQUFuQkEsZ0JBQW1CLENBQUNKLElBQUQsRUFBVTtBQUN4QyxTQUFPLFVBQUM5SSxRQUFELEVBQWM7QUFDbkJBLGFBQVM2SSxjQUFjQyxJQUFkLENBQVQ7QUFDQTlJLGFBQVMySSxjQUFjLEtBQWQsQ0FBVDtBQUNELEdBSEQ7QUFJRCxDQUxNOztBQU9BLElBQU1RLGdDQUFZLFNBQVpBLFNBQVksQ0FBQ2xELEtBQUQsRUFBVztBQUNsQyxTQUFPLFVBQUNqRyxRQUFELEVBQWM7QUFDbkIsUUFBSVcsc0JBQXNCLEtBQTFCO0FBQ0EsUUFBSUMsb0JBQW9CLEtBQXhCOztBQUVBWixhQUFTNEksZUFBZTNDLEtBQWYsQ0FBVDtBQUNBakcsYUFBUywyQkFBZSxDQUFmLENBQVQ7QUFDQUEsYUFBUzJJLGNBQWMsSUFBZCxDQUFUO0FBQ0EzSSxhQUFTMEksZUFBZSxLQUFmLENBQVQ7O0FBRUExSSxhQUFTLHlCQUFhLEtBQWIsQ0FBVDs7QUFFQSxZQUFRLElBQVI7QUFDRSxXQUFLLGtCQUFrQjJILElBQWxCLENBQXVCMUIsS0FBdkIsQ0FBTDtBQUNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBakcsaUJBQVMsMkJBQWUsRUFBZixDQUFUOztBQUVBO0FBQ0EsWUFBTWEsZ0JBQWdCQyxlQUFhbUYsS0FBYixFQUNyQmxGLElBRHFCLENBQ2hCLFVBQUNDLFFBQUQsRUFBYztBQUNsQixjQUFJLENBQUNBLFNBQVNDLEVBQWQsRUFBa0I7QUFDaEIsa0JBQU1DLE1BQU1GLFNBQVNHLFVBQWYsQ0FBTjtBQUNBLGdCQUFJLENBQUNQLGlCQUFMLEVBQXdCWixTQUFTLDJCQUFlLENBQWYsQ0FBVDtBQUN6QjtBQUNELGlCQUFPZ0IsUUFBUDtBQUNELFNBUHFCLEVBUXJCRCxJQVJxQixDQVFoQixVQUFDQyxRQUFELEVBQWM7QUFDbEIsY0FBSSxDQUFDSixpQkFBTCxFQUF3QlosU0FBUywyQkFBZSxFQUFmLENBQVQ7QUFDeEIsaUJBQU9nQixTQUFTSSxJQUFULEVBQVA7QUFDRCxTQVhxQixFQVlyQkwsSUFacUIsQ0FZaEIsVUFBQ0MsUUFBRCxFQUFjO0FBQ2xCTCxnQ0FBc0IsSUFBdEI7QUFDQSxjQUFJLENBQUNDLGlCQUFMLEVBQXdCO0FBQ3RCO0FBQ0FaLHFCQUFTLDJCQUFlLEdBQWYsQ0FBVDtBQUNBQSxxQkFBUytJLGtCQUFrQixTQUFsQixDQUFUO0FBQ0EvSSxxQkFBU2tKLGlCQUFpQmxJLFFBQWpCLENBQVQ7QUFDQWhCLHFCQUFTZ0osbUJBQW1CaEksU0FBU0ssTUFBVCxDQUFnQitILElBQW5DLENBQVQ7QUFDRDtBQUNELGNBQUl4SSxpQkFBSixFQUF1QjtBQUNyQixnQkFBSUEsa0JBQWtCVSxHQUFsQixDQUFzQitILFNBQXRCLEtBQW9DckksU0FBU00sR0FBVCxDQUFhK0gsU0FBckQsRUFBZ0U7QUFDOUQ7QUFDQXJKLHVCQUFTLHNCQUFVLDhDQUFWLEVBQTBELFFBQTFELEVBQW9FLEtBQXBFLEVBQTJFLFlBQU07QUFDeEZ3Qix5QkFBU0MsTUFBVDtBQUNELGVBRlEsQ0FBVDtBQUdELGFBTEQsTUFLTztBQUNMO0FBQ0Q7QUFDRjtBQUNGLFNBL0JxQixFQWdDckJDLEtBaENxQixDQWdDZixVQUFDQyxHQUFELEVBQVM7QUFDZDNCLG1CQUFTLDJCQUFlLENBQWYsQ0FBVDtBQUNBQSxtQkFBUzBJLGVBQWUsSUFBZixDQUFUO0FBQ0EsZ0JBQU0vRyxHQUFOO0FBQ0QsU0FwQ3FCLENBQXRCOztBQXNDQTtBQUNBQyxlQUFPQyxLQUFQLFVBQW9Cb0UsS0FBcEIsRUFBNkJsRixJQUE3QixDQUFrQyxVQUFDQyxRQUFELEVBQWM7QUFDOUMsY0FBSSxDQUFDQSxRQUFMLEVBQWUsTUFBTUUsTUFBTSxTQUFOLENBQU47QUFDZixpQkFBT0YsU0FBU0ksSUFBVCxFQUFQO0FBQ0QsU0FIRCxFQUdHTCxJQUhILENBR1EsVUFBQ2UsSUFBRCxFQUFVO0FBQ2hCbEIsOEJBQW9Ca0IsSUFBcEI7O0FBRUEsY0FBSSxDQUFDbkIsbUJBQUwsRUFBMEI7QUFDeEI7QUFDQVgscUJBQVMsMkJBQWUsR0FBZixDQUFUO0FBQ0FBLHFCQUFTK0ksa0JBQWtCLFNBQWxCLENBQVQ7QUFDQS9JLHFCQUFTa0osaUJBQWlCcEgsSUFBakIsQ0FBVDtBQUNBOUIscUJBQVNnSixtQkFBbUJsSCxLQUFLVCxNQUFMLENBQVkrSCxJQUEvQixDQUFUO0FBQ0Q7QUFDRixTQWJELEVBYUcxSCxLQWJILENBYVMsWUFBTTtBQUNiLGlCQUFPYixhQUFQO0FBQ0QsU0FmRCxFQWVHYSxLQWZILENBZVMsVUFBQ0MsR0FBRCxFQUFTO0FBQ2hCSSxrQkFBUUMsR0FBUixDQUFZTCxHQUFaO0FBQ0QsU0FqQkQ7QUFrQkY7QUFDQTtBQUNFM0IsaUJBQVMySSxjQUFjLEtBQWQsQ0FBVDtBQUNBM0ksaUJBQVNrSixpQkFBaUIsRUFBRTdILFFBQVEsRUFBRStILE1BQU1uRCxNQUFNcUQsU0FBTixDQUFnQixDQUFoQixDQUFSLEVBQTRCckQsWUFBNUIsRUFBVixFQUFqQixDQUFUO0FBdEVKO0FBd0VELEdBbkZEO0FBb0ZELENBckZNLEM7Ozs7Ozs7Ozs7Ozs7OztBQ3JEUDs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1zRCxjQUFjO0FBQ2xCO0FBQ0FDLGFBQVcsb0JBQVV4QyxJQUFWLENBQWVGO0FBRlIsQ0FBcEI7O0lBS00yQyxHOzs7QUFDSixlQUFZbEgsS0FBWixFQUFtQjtBQUFBOztBQUFBLHFHQUNYQSxLQURXO0FBRWxCOzs7O3NDQVFpQjtBQUNoQixhQUFPLEtBQUtBLEtBQUwsQ0FBV21ILE9BQWxCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0ksYUFBS25ILEtBQUwsQ0FBV2tEO0FBRGYsT0FERjtBQUtEOzs7O0VBckJlLGdCQUFNQyxTOztBQUFsQitELEcsQ0FLRzlELFMsR0FBWTtBQUNqQitELFdBQVMsb0JBQVVDLEtBQVYsQ0FBZ0JKLFdBQWhCLEVBQTZCekM7QUFEckIsQztBQUxmMkMsRyxDQVNHRyxpQixHQUFvQkwsVztrQkFlZEUsRzs7Ozs7Ozs7Ozs7Ozs7O0FDakNmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU1JLGU7Ozs7Ozs7Ozs7OytCQUVPO0FBQUE7O0FBQ1Q7QUFDQSxVQUFNcEosVUFBVSxLQUFLOEIsS0FBTCxDQUFXdUgsUUFBWCxDQUFvQnJKLE9BQXBDO0FBQ0FBLGNBQVFzSixJQUFSLENBQWEsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDckIsZUFBT0QsRUFBRTNJLE1BQUYsQ0FBUytILElBQVQsQ0FBY2MsVUFBZCxDQUF5QixDQUF6QixJQUE4QkQsRUFBRTVJLE1BQUYsQ0FBUytILElBQVQsQ0FBY2MsVUFBZCxDQUF5QixDQUF6QixDQUFyQztBQUNELE9BRkQ7QUFHQSxhQUFPekosUUFBUTBKLEdBQVIsQ0FBWSxVQUFDQyxLQUFELEVBQVc7QUFDNUIsZUFDRTtBQUFBO0FBQUE7QUFDRSx1QkFDSSxPQUFLN0gsS0FBTCxDQUFXOEgsV0FBWixJQUE2QixPQUFLOUgsS0FBTCxDQUFXOEgsV0FBWCxLQUEyQkQsTUFBTS9JLE1BQU4sQ0FBYTRFLEtBQXRFLEdBRUksMEJBQUUsZUFBRixDQUZKLFNBRTBCLDBCQUFFcUUsTUFGNUIsR0FJQSwwQkFBRSxlQUFGLENBTko7QUFRRSxpQkFBS0YsTUFBTTlJLEdBQU4sQ0FBVUM7QUFSakI7QUFVQTtBQUFBO0FBQUE7QUFDRSxxQkFBTzZJLE1BQU0vSSxNQUFOLENBQWE0RTtBQUR0QjtBQUdFO0FBQUE7QUFBQTtBQUNFLG1FQURGO0FBRUdtRSxvQkFBTS9JLE1BQU4sQ0FBYStIO0FBRmhCO0FBSEY7QUFWQSxTQURGO0FBcUJELE9BdEJNLENBQVA7QUF1QkQ7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVywwQkFBRW1CLGVBQWxCLEVBQW1DLEtBQUssYUFBQy9FLEdBQUQsRUFBUztBQUFFLG1CQUFLNUMsU0FBTCxHQUFpQjRDLEdBQWpCO0FBQXVCLFdBQTFFO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVywwQkFBRSx3QkFBRixDQUFoQixFQUE2QyxNQUFLLEdBQWxEO0FBQ0csZUFBS2pELEtBQUwsQ0FBV3VILFFBQVgsQ0FBb0J6SSxNQUFwQixDQUEyQitIO0FBRDlCLFNBREY7QUFJRTtBQUFBO0FBQUEsWUFBSyxXQUFXLDBCQUFFLHNCQUFGLENBQWhCLEVBQTJDLEtBQUssYUFBQzVELEdBQUQsRUFBUztBQUFFLHFCQUFLZ0YsY0FBTCxHQUFzQmhGLEdBQXRCO0FBQTRCLGFBQXZGO0FBQ0ksZUFBS2lGLFFBQUw7QUFESjtBQUpGLE9BREY7QUFVRDs7OztFQTVDMkIsZ0JBQU0vRSxTOztBQStDcENtRSxnQkFBZ0JsRSxTQUFoQixHQUE0QjtBQUMxQjBFLGVBQWEsb0JBQVV4RCxNQURHO0FBRTFCaUQsWUFBVSxvQkFBVVksTUFBVixDQUFpQjVEO0FBRkQsQ0FBNUI7O0FBS0ErQyxnQkFBZ0JoRSxZQUFoQixHQUErQjtBQUM3QndFLGVBQWE7QUFEZ0IsQ0FBL0I7O2tCQUllLHFEQUFjUixlQUFkLEM7Ozs7Ozs7Ozs7Ozs7OztBQ2hFZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNYyxROzs7Ozs7Ozs7Ozs7OzswTEFpQ0pDLFEsR0FBVyxZQUFNO0FBQ2YsVUFBTUMsUUFBUUYsU0FBU0csYUFBVCxDQUF1QixNQUFLdkksS0FBTCxDQUFXc0ksS0FBbEMsQ0FBZDtBQUNBLFVBQU1FLFNBQVNGLE1BQU1WLEdBQU4sQ0FBVSxVQUFDTCxRQUFELEVBQWM7QUFDckMsZUFDRTtBQUNFLGVBQUtBLFNBQVN4SSxHQUFULENBQWFDLEVBRHBCO0FBRUUsb0JBQVV1SSxRQUZaO0FBR0UsdUJBQWEsTUFBS3ZILEtBQUwsQ0FBVzhIO0FBSDFCLFVBREY7QUFPRCxPQVJjLENBQWY7QUFTQSxhQUFPVSxNQUFQO0FBQ0QsSzs7Ozs7NkJBRVE7QUFDUCxVQUFJLEtBQUt4SSxLQUFMLENBQVd5SSxVQUFmLEVBQTJCO0FBQ3pCLGVBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFSO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLekksS0FBTCxDQUFXMEksU0FBZixFQUEwQjtBQUN4QixlQUFRLDBEQUFSO0FBQ0Q7O0FBRUQsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFXLG1CQUFFLGtCQUFGLENBQWhCO0FBQ0ksYUFBS0wsUUFBTDtBQURKLE9BREY7QUFLRDs7O3FDQTNEdUJkLFEsRUFBVWUsSyxFQUFPO0FBQ3ZDLFVBQUlLLGFBQWFMLE1BQU1NLFNBQU4sQ0FBZ0IsVUFBQ0MsR0FBRCxFQUFTO0FBQ3hDLGVBQVFBLElBQUk5SixHQUFKLENBQVFDLEVBQVIsS0FBZXVJLFNBQVN4SSxHQUFULENBQWFDLEVBQXBDO0FBQ0QsT0FGZ0IsQ0FBakI7QUFHQSxVQUFJMkosYUFBYSxDQUFqQixFQUFvQjtBQUNsQkEscUJBQWFMLE1BQU1RLE1BQW5CO0FBQ0Q7QUFDRCxhQUFPSCxVQUFQO0FBQ0Q7OztrQ0FFb0J6SyxPLEVBQVM7QUFBQTs7QUFDNUIsVUFBSW9LLFFBQVEsRUFBWjtBQUNBcEssY0FBUXVILE9BQVIsQ0FBZ0IsVUFBQ29DLEtBQUQsRUFBVztBQUN6QixZQUFNTixXQUFXTSxNQUFNL0ksTUFBTixDQUFheUksUUFBOUI7O0FBRUEsWUFBTXdCLGdCQUFnQixPQUFLQyxnQkFBTCxDQUFzQnpCLFFBQXRCLEVBQWdDZSxLQUFoQyxDQUF0Qjs7QUFFQUEsZ0JBQVEsT0FBS1csa0JBQUwsQ0FBd0IxQixRQUF4QixFQUFrQ3dCLGFBQWxDLEVBQWlEbEIsS0FBakQsRUFBd0RTLEtBQXhELENBQVI7QUFDRCxPQU5EO0FBT0EsYUFBT0EsS0FBUDtBQUNEOzs7dUNBRXlCZixRLEVBQVV3QixhLEVBQWVsQixLLEVBQU9TLEssRUFBTztBQUMvRCxVQUFJLENBQUNBLE1BQU1TLGFBQU4sQ0FBTCxFQUEyQjtBQUN6QlQsY0FBTTFDLElBQU4sQ0FBV3NELE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCNUIsUUFBbEIsRUFBNEIsRUFBRXJKLFNBQVMsRUFBWCxFQUE1QixDQUFYO0FBQ0Q7O0FBRURvSyxZQUFNUyxhQUFOLEVBQXFCN0ssT0FBckIsQ0FBNkIwSCxJQUE3QixDQUFrQ2lDLEtBQWxDO0FBQ0EsYUFBT1MsS0FBUDtBQUNEOzs7O0VBL0JvQixnQkFBTW5GLFM7O0FBZ0U3QmlGLFNBQVNoRixTQUFULEdBQXFCO0FBQ25CcUYsY0FBWSxvQkFBVS9MLElBQVYsQ0FBZTZILFVBRFI7QUFFbkJtRSxhQUFXLG9CQUFVaE0sSUFBVixDQUFlNkgsVUFGUDtBQUduQnVELGVBQWEsb0JBQVV4RCxNQUhKO0FBSW5CZ0UsU0FBTyxvQkFBVWMsS0FBVixDQUFnQjdFO0FBSkosQ0FBckI7O0FBT0E2RCxTQUFTOUUsWUFBVCxHQUF3QjtBQUN0QndFLGVBQWE7QUFEUyxDQUF4Qjs7a0JBSWUsOENBQWNNLFFBQWQsQzs7Ozs7Ozs7Ozs7Ozs7O0FDcEZmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU1pQixVOzs7Ozs7Ozs7Ozs7Ozs4TEFFSkMsVSxHQUFhLFlBQU07QUFDakIsWUFBS3RKLEtBQUwsQ0FBV3ZELFlBQVgsQ0FBd0IsQ0FBQyxNQUFLdUQsS0FBTCxDQUFXdUosVUFBcEM7QUFDRCxLLFFBRURDLFcsR0FBYyxZQUFNO0FBQ2xCO0FBQ0EsNkJBQWFDLFdBQWIsQ0FBeUJ4SyxTQUFTb0csUUFBbEM7QUFDRCxLOzs7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVyxxQkFBRSxhQUFGLENBQWhCO0FBRUU7QUFBQTtBQUFBLFlBQVEsU0FBUyxLQUFLaUUsVUFBdEIsRUFBa0MsV0FBYyxxQkFBRSxnQkFBRixDQUFkLFNBQXFDLHFCQUFFSSxRQUF2QyxVQUFtRCxLQUFLMUosS0FBTCxDQUFXMkosVUFBWCxHQUF3QixxQkFBRUEsVUFBMUIsR0FBdUMsRUFBMUYsQ0FBbEM7QUFDRTtBQUFBO0FBQUEsY0FBSyxNQUFLLE1BQVYsRUFBaUIsUUFBTyxJQUF4QixFQUE2QixTQUFRLFdBQXJDLEVBQWlELE9BQU0sSUFBdkQsRUFBNEQsT0FBTSw0QkFBbEU7QUFDRSxvREFBTSxHQUFFLGVBQVIsRUFBd0IsTUFBSyxNQUE3QixHQURGO0FBRUUsb0RBQU0sR0FBRSwrQ0FBUjtBQUZGLFdBREY7QUFLRTtBQUxGLFNBRkY7QUFVRTtBQUFBO0FBQUEsWUFBUSxTQUFTLEtBQUtILFdBQXRCLEVBQW1DLFdBQWMscUJBQUUsZ0JBQUYsQ0FBZCxTQUFxQyxxQkFBRUksUUFBdkMsVUFBbUQsS0FBSzVKLEtBQUwsQ0FBVzJKLFVBQVgsR0FBd0IscUJBQUVBLFVBQTFCLEdBQXVDLEVBQTFGLENBQW5DO0FBQ0U7QUFBQTtBQUFBLGNBQUssTUFBSyxNQUFWLEVBQWlCLFFBQU8sSUFBeEIsRUFBNkIsU0FBUSxXQUFyQyxFQUFpRCxPQUFNLElBQXZELEVBQTRELE9BQU0sNEJBQWxFO0FBQ0Usb0RBQU0sR0FBRSxlQUFSLEVBQXdCLE1BQUssTUFBN0IsR0FERjtBQUVFLG9EQUFNLEdBQUUsOERBQVI7QUFGRixXQURGO0FBS0U7QUFMRjtBQVZGLE9BREY7QUFxQkQ7Ozs7RUFqQ3NCLGdCQUFNeEcsUzs7QUFvQy9Ca0csV0FBV2pHLFNBQVgsR0FBdUI7QUFDckJtRyxjQUFZLG9CQUFVN00sSUFBVixDQUFlNkgsVUFETjtBQUVyQm9GLGNBQVksb0JBQVVqTixJQUFWLENBQWU2SCxVQUZOO0FBR3JCOUgsZ0JBQWMsb0JBQVVnSSxJQUFWLENBQWVGO0FBSFIsQ0FBdkI7O2tCQU1lLGdEQUFjOEUsVUFBZCxDOzs7Ozs7Ozs7Ozs7Ozs7QUNuRGY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTVEsVzs7O0FBQ0osdUJBQVk3SixLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEhBQ1hBLEtBRFc7O0FBQUEsVUFVbkI4SixlQVZtQixHQVVELFlBQU07QUFDdEIsWUFBS0MsV0FBTCxDQUFpQkMsS0FBakI7QUFDRCxLQVprQjs7QUFBQSxVQWNuQkMsYUFkbUIsR0FjSCxZQUFNO0FBQ3BCLFlBQUt4SCxRQUFMLENBQWMsRUFBRXlILFNBQVMsSUFBWCxFQUFkOztBQUVBcEksZUFBU3FJLElBQVQsQ0FBY3ZILGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLE1BQUt3SCxlQUE3QztBQUNELEtBbEJrQjs7QUFBQSxVQW9CbkJBLGVBcEJtQixHQW9CRCxVQUFDQyxHQUFELEVBQVM7QUFDekIsVUFBSSxNQUFLQyxlQUFMLENBQXFCQyxRQUFyQixDQUE4QkYsSUFBSUcsTUFBbEMsQ0FBSixFQUErQztBQUM3QztBQUNEO0FBQ0QxSSxlQUFTcUksSUFBVCxDQUFjdEUsbUJBQWQsQ0FBa0MsT0FBbEMsRUFBMkMsTUFBS3VFLGVBQWhEOztBQUVBLFVBQUksTUFBS3BLLEtBQUwsQ0FBV3lLLFNBQVgsQ0FBcUIzQixNQUFyQixJQUErQixDQUFuQyxFQUFzQztBQUNwQztBQUNBLCtCQUFhVyxXQUFiLENBQXlCeEssU0FBU29HLFFBQWxDO0FBQ0Q7QUFDRCxZQUFLNUMsUUFBTCxDQUFjO0FBQ1p5SCxpQkFBUztBQURHLE9BQWQ7QUFHRCxLQWpDa0I7O0FBQUEsVUFtQ25CUSxXQW5DbUIsR0FtQ0wsVUFBQ3hLLENBQUQsRUFBTztBQUNuQixVQUFJQSxFQUFFc0ssTUFBRixDQUFTRyxLQUFULENBQWU3QixNQUFmLEdBQXdCLENBQTVCLEVBQStCO0FBQzdCLGNBQUtyRyxRQUFMLENBQWMsRUFBRW1JLFVBQVUsSUFBWixFQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBS25JLFFBQUwsQ0FBYyxFQUFFbUksVUFBVSxLQUFaLEVBQWQ7QUFDRDs7QUFFRCxZQUFLNUssS0FBTCxDQUFXdEMsTUFBWCxDQUFrQndDLEVBQUVzSyxNQUFGLENBQVNHLEtBQTNCO0FBQ0QsS0EzQ2tCOztBQUFBLFVBNkNuQkUsVUE3Q21CLEdBNkNOLFlBQU07QUFDakIsWUFBSzdLLEtBQUwsQ0FBV3RDLE1BQVgsQ0FBa0IsRUFBbEI7QUFDQSxZQUFLcU0sV0FBTCxDQUFpQkMsS0FBakI7QUFDRCxLQWhEa0I7O0FBR2pCLFVBQUt2SSxLQUFMLEdBQWE7QUFDWHlJLGVBQVMsS0FERTtBQUVYVSxnQkFBVTtBQUZDLEtBQWI7O0FBSGlCO0FBUWxCOzs7OzZCQTBDUTtBQUFBOztBQUNQLGFBRUk7QUFBQTtBQUFBO0FBQ0UsbUJBQVEsUUFEVjtBQUVFLHFCQUFjLHNCQUFFLGNBQUYsQ0FBZCx3QkFDSSxLQUFLNUssS0FBTCxDQUFXMkosVUFBWCxHQUF3QixzQkFBRW1CLE1BQTFCLEdBQW1DLEVBRHZDLHlCQUVJLEtBQUtySixLQUFMLENBQVd5SSxPQUFYLEdBQXFCLHNCQUFFQSxPQUF2QixHQUFpQyxFQUZyQyx3QkFHSSxLQUFLbEssS0FBTCxDQUFXeUssU0FBWCxDQUFxQjNCLE1BQXJCLEdBQThCLENBQTlCLEdBQWtDLHNCQUFFOEIsUUFBcEMsR0FBK0MsRUFIbkQsa0JBRkY7QUFPRSxlQUFLLGFBQUNHLEtBQUQsRUFBVztBQUFFLG1CQUFLVCxlQUFMLEdBQXVCUyxLQUF2QjtBQUErQjtBQVBuRDtBQVNBO0FBQUE7QUFBQSxZQUFLLFdBQWMsc0JBQUUsZ0JBQUYsQ0FBZCxTQUFxQyxzQkFBRSxtQkFBRixDQUExQztBQUNFO0FBQUE7QUFBQTtBQUNFLGtDQUFrQixLQUFLL0ssS0FBTCxDQUFXeUssU0FEL0I7QUFFRSwyQkFBYSxLQUFLWDtBQUZwQjtBQUlJO0FBQUE7QUFBQSxnQkFBSyxXQUFXLHNCQUFFLGFBQUYsQ0FBaEIsRUFBa0MsTUFBSyxNQUF2QyxFQUE4QyxRQUFPLElBQXJELEVBQTBELFNBQVEsV0FBbEUsRUFBOEUsT0FBTSxJQUFwRixFQUF5RixPQUFNLDRCQUEvRjtBQUNFLHNEQUFNLEdBQUUsNE9BQVIsR0FERjtBQUVFLHNEQUFNLEdBQUUsZUFBUixFQUF3QixNQUFLLE1BQTdCO0FBRkY7QUFKSjtBQURGLFNBVEE7QUFxQkE7QUFBQTtBQUFBLFlBQUssV0FBVyxzQkFBRSx5QkFBRixDQUFoQjtBQUNFO0FBQ0Usa0JBQUssTUFEUCxFQUNjLElBQUcsUUFEakIsRUFDMEIsYUFBWSxtQkFEdEM7QUFFRSxtQkFBTyxLQUFLOUosS0FBTCxDQUFXeUssU0FGcEI7QUFHRSx1QkFBVyxzQkFBRSxjQUFGLENBSGI7QUFJRSxzQkFBVSxLQUFLQyxXQUpqQjtBQUtFLHFCQUFTLEtBQUtULGFBTGhCO0FBTUUsaUJBQUssYUFBQ2UsS0FBRCxFQUFXO0FBQUUscUJBQUtqQixXQUFMLEdBQW1CaUIsS0FBbkI7QUFBMkI7QUFOL0MsWUFERjtBQVVFO0FBQUE7QUFBQTtBQUNFLHlCQUFjLHNCQUFFLGdCQUFGLENBQWQsU0FBcUMsc0JBQUUsa0JBQUYsQ0FEdkM7QUFFRSx1QkFBUyxLQUFLSCxVQUZoQjtBQUdFLG1CQUFLLGFBQUNJLEdBQUQsRUFBUztBQUFFLHVCQUFLQyxTQUFMLEdBQWlCRCxHQUFqQjtBQUF1QjtBQUh6QztBQU1FO0FBQUE7QUFBQSxnQkFBSyxNQUFLLE1BQVYsRUFBaUIsUUFBTyxJQUF4QixFQUE2QixTQUFRLFdBQXJDLEVBQWlELE9BQU0sSUFBdkQsRUFBNEQsT0FBTSw0QkFBbEU7QUFDRSxzREFBTSxHQUFFLHVHQUFSLEdBREY7QUFFRSxzREFBTSxHQUFFLGVBQVIsRUFBd0IsTUFBSyxNQUE3QjtBQUZGO0FBTkY7QUFWRjtBQXJCQSxPQUZKO0FBK0NEOzs7O0VBbkd1QixnQkFBTTlILFM7O0FBc0doQzBHLFlBQVl6RyxTQUFaLEdBQXdCO0FBQ3RCdUcsY0FBWSxvQkFBVWpOLElBQVYsQ0FBZTZILFVBREw7QUFFdEJrRyxhQUFXLG9CQUFVbkcsTUFBVixDQUFpQkMsVUFGTjtBQUd0QjdHLFVBQVEsb0JBQVUrRyxJQUFWLENBQWVGO0FBSEQsQ0FBeEI7O2tCQU1lLGlEQUFjc0YsV0FBZCxDOzs7Ozs7Ozs7Ozs7Ozs7QUNySGY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNc0IsaUI7OztBQUNKLDZCQUFZbkwsS0FBWixFQUFtQjtBQUFBOztBQUFBLHNJQUNYQSxLQURXOztBQUdqQixVQUFLeUIsS0FBTCxHQUFhO0FBQ1hmLGFBQU8sSUFESTtBQUVYMEssZUFBUyxDQUZFO0FBR1g3SSxrQkFBWTtBQUhELEtBQWI7QUFIaUI7QUFRbEI7Ozs7NkJBRVE7QUFBQTs7QUFDUCxVQUFNTCxRQUFRO0FBQ1p4QixlQUFVLEtBQUtWLEtBQUwsQ0FBV3FMLFFBQXJCO0FBRFksT0FBZDs7QUFJQSxhQUNFO0FBQ0UsYUFBSyxhQUFDcEksR0FBRCxFQUFTO0FBQUUsaUJBQUtxSSxpQkFBTCxHQUF5QnJJLEdBQXpCO0FBQStCLFNBRGpEO0FBRUUsbUJBQWMsNEJBQUVxSSxpQkFBaEIsVUFBcUMsS0FBSzdKLEtBQUwsQ0FBV2MsVUFBWCxHQUF3Qiw0QkFBRUEsVUFBMUIsR0FBdUMsRUFBNUUsQ0FGRjtBQUdFLGVBQU9MO0FBSFQsUUFERjtBQU9EOzs7O0VBdkI2QixnQkFBTWlCLFM7O0FBMEJ0Q2dJLGtCQUFrQi9ILFNBQWxCLEdBQThCO0FBQzVCaUksWUFBVSxvQkFBVUUsTUFBVixDQUFpQmhIO0FBREMsQ0FBOUI7O2tCQUllLHVEQUFjNEcsaUJBQWQsQzs7Ozs7Ozs7Ozs7Ozs7O0FDbkNmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUssVzs7O0FBQ0osdUJBQVl4TCxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEhBQ1hBLEtBRFc7O0FBR2pCLFVBQUt5QixLQUFMLEdBQWE7QUFDWGdLLGVBQVM7QUFERSxLQUFiO0FBSGlCO0FBTWxCOzs7O3dDQUNtQjtBQUFBOztBQUNsQixXQUFLck8sT0FBTCxHQUFlc08sV0FBVyxZQUFNO0FBQzlCLGVBQUtqSixRQUFMLENBQWM7QUFDWmdKLG1CQUFTO0FBREcsU0FBZDtBQUdELE9BSmMsRUFJWixDQUpZLENBQWY7QUFLRDs7OzJDQUVzQjtBQUNyQkUsbUJBQWEsS0FBS3ZPLE9BQWxCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVyxzQkFBRSxtQkFBRixDQUFoQjtBQUNJLGFBQUtxRSxLQUFMLENBQVdnSyxPQUFYLEdBQ0E7QUFBQTtBQUFBLFlBQUssV0FBVyxzQkFBRUcsT0FBbEIsRUFBMkIsT0FBTSxNQUFqQyxFQUF3QyxRQUFPLE1BQS9DLEVBQXNELFNBQVEsV0FBOUQsRUFBMEUsT0FBTSw0QkFBaEY7QUFDRSxvREFBUSxXQUFXLHNCQUFFekcsSUFBckIsRUFBMkIsTUFBSyxNQUFoQyxFQUF1QyxhQUFZLEdBQW5ELEVBQXVELGVBQWMsT0FBckUsRUFBNkUsSUFBRyxJQUFoRixFQUFxRixJQUFHLElBQXhGLEVBQTZGLEdBQUUsSUFBL0Y7QUFERixTQURBLEdBS0E7QUFOSixPQURGO0FBV0Q7Ozs7RUFoQ3VCLGdCQUFNaEMsUzs7QUFtQ2hDcUksWUFBWXBJLFNBQVosR0FBd0I7QUFDdEJ5SSxTQUFPLG9CQUFVdkgsTUFESztBQUV0QmxDLFFBQU0sb0JBQVVrQztBQUZNLENBQXhCOztBQUtBa0gsWUFBWWxJLFlBQVosR0FBMkI7QUFDekJ1SSxTQUFPLE1BRGtCO0FBRXpCekosUUFBTTtBQUZtQixDQUEzQjs7a0JBS2UsaURBQWNvSixXQUFkLEM7Ozs7Ozs7Ozs7Ozs7OztBQ2xEZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTU0sUTs7O0FBQ0osb0JBQVk5TCxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsb0hBQ1hBLEtBRFc7O0FBQUEsVUFrQm5CK0wsUUFsQm1CLEdBa0JSLFVBQUNyUCxJQUFELEVBQVU7QUFDbkIsWUFBSytGLFFBQUwsQ0FBYztBQUNac0osa0JBQVVyUDtBQURFLE9BQWQ7QUFHRCxLQXRCa0I7O0FBR2pCLFVBQUsrRSxLQUFMLEdBQWE7QUFDWHFHLG1CQUFhLE1BQUs5SCxLQUFMLENBQVc4SCxXQURiO0FBRVhpRSxnQkFBVSxLQUZDO0FBR1hDLG9CQUFjO0FBSEgsS0FBYjs7QUFNQSxVQUFLM00sTUFBTCxHQUFjLEtBQWQ7QUFUaUI7QUFVbEI7Ozs7d0NBR21CO0FBQ2xCO0FBQ0EsV0FBS1csS0FBTCxDQUFXN0IsYUFBWDtBQUNEOzs7NkJBUVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVcsZUFBRSxlQUFGLENBQWhCO0FBQ0UscUVBQW1CLFVBQVUsS0FBSzZCLEtBQUwsQ0FBV3FMLFFBQXhDLEdBREY7QUFFRSw4REFBWSxVQUFVLEtBQUs1SixLQUFMLENBQVdzSyxRQUFqQyxHQUZGO0FBR0U7QUFBQTtBQUFBLFlBQUssV0FBVyxlQUFFLGdCQUFGLENBQWhCO0FBQ0UsK0RBREY7QUFFSSxlQUFLL0wsS0FBTCxDQUFXa0QsUUFGZjtBQUdFO0FBSEY7QUFIRixPQURGO0FBV0Q7Ozs7RUFyQ29CLGdCQUFNQyxTOztBQXdDN0IsU0FBU3VCLGVBQVQsQ0FBeUJqRCxLQUF6QixFQUFnQztBQUM5QixTQUFPO0FBQ0w0SixjQUFVNUosTUFBTXdLLEtBQU4sQ0FBWVo7QUFEakIsR0FBUDtBQUdEOztBQUVELFNBQVNhLG9CQUFULENBQThCek8sUUFBOUIsRUFBd0M7QUFDdEMsU0FBTztBQUNMVSxtQkFBZSx5QkFBTTtBQUFFVixlQUFTLDhCQUFUO0FBQTRCO0FBRDlDLEdBQVA7QUFHRDs7a0JBRWMsMENBQWMseUJBQVFpSCxlQUFSLEVBQXlCd0gsb0JBQXpCLEVBQStDSixRQUEvQyxDQUFkLEM7Ozs7Ozs7Ozs7Ozs7OztBQ25FZjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUssTTs7O0FBQ0osa0JBQVluTSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1hBLEtBRFc7O0FBQUEsVUEwQm5CQyxZQTFCbUIsR0EwQkosVUFBQ29LLEdBQUQsRUFBUztBQUN0QixVQUFJLENBQUMsTUFBSytCLGVBQUwsQ0FBcUJwSyxTQUFyQixDQUErQnVJLFFBQS9CLENBQXdDLGlCQUFFeEMsTUFBMUMsQ0FBTCxFQUF3RDtBQUN0RDtBQUNEOztBQUVELFlBQUtzRSxNQUFMLENBQVlySyxTQUFaLENBQXNCQyxHQUF0QixDQUEwQixpQkFBRXFLLFNBQTVCOztBQUVBLFlBQUs3SixRQUFMLENBQWM7QUFDWjhKLGdCQUFRbEMsSUFBSXJKLE9BQUosQ0FBWSxDQUFaLEVBQWVDLEtBRFg7QUFFWnVMLGtCQUFVbkMsSUFBSXJKLE9BQUosQ0FBWSxDQUFaLEVBQWVDLEtBRmI7QUFHWndMLHlCQUFpQjtBQUhMLE9BQWQ7O0FBTUEvSiw0QkFBc0IsTUFBS2dLLE1BQTNCO0FBQ0QsS0F4Q2tCOztBQUFBLFVBMENuQkMsV0ExQ21CLEdBMENMLFVBQUN0QyxHQUFELEVBQVM7QUFDckIsVUFBSSxDQUFDLE1BQUs1SSxLQUFMLENBQVdnTCxlQUFoQixFQUFpQztBQUMvQjtBQUNEOztBQUVELFlBQUtoSyxRQUFMLENBQWM7QUFDWitKLGtCQUFVbkMsSUFBSXJKLE9BQUosQ0FBWSxDQUFaLEVBQWVDO0FBRGIsT0FBZDtBQUdELEtBbERrQjs7QUFBQSxVQW9EbkIyTCxVQXBEbUIsR0FvRE4sWUFBTTtBQUNqQixVQUFJLENBQUMsTUFBS25MLEtBQUwsQ0FBV2dMLGVBQWhCLEVBQWlDO0FBQy9CO0FBQ0Q7O0FBRUQsWUFBS2hLLFFBQUwsQ0FBYztBQUNaZ0sseUJBQWlCLEtBREw7QUFFWkksNkJBQXFCO0FBRlQsT0FBZDs7QUFLQSxZQUFLUixNQUFMLENBQVlySyxTQUFaLENBQXNCOEssTUFBdEIsQ0FBNkIsaUJBQUVSLFNBQS9COztBQUVBLFVBQU1TLGFBQWExSyxLQUFLMkssR0FBTCxDQUFTLENBQVQsRUFBWSxNQUFLdkwsS0FBTCxDQUFXK0ssUUFBWCxHQUFzQixNQUFLL0ssS0FBTCxDQUFXOEssTUFBN0MsQ0FBbkI7QUFDQSxZQUFLRixNQUFMLENBQVluSyxLQUFaLENBQWtCQyxTQUFsQixHQUE4QixFQUE5Qjs7QUFFQSxVQUFJNEssYUFBYSxrQ0FBakIsRUFBMEM7QUFDeEMsY0FBSy9NLEtBQUwsQ0FBV3ZELFlBQVgsQ0FBd0IsS0FBeEI7QUFDRDtBQUNGLEtBdEVrQjs7QUFBQSxVQThGbkJpUSxNQTlGbUIsR0E4RlYsWUFBTTtBQUNiLFVBQUksQ0FBQyxNQUFLakwsS0FBTCxDQUFXZ0wsZUFBaEIsRUFBaUM7QUFDL0I7QUFDRDs7QUFFRC9KLDRCQUFzQixNQUFLZ0ssTUFBM0I7O0FBRUEsVUFBTUssYUFBYTFLLEtBQUsySyxHQUFMLENBQVMsQ0FBVCxFQUFZLE1BQUt2TCxLQUFMLENBQVcrSyxRQUFYLEdBQXNCLE1BQUsvSyxLQUFMLENBQVc4SyxNQUE3QyxDQUFuQjs7QUFFQSxVQUFJLENBQUMsTUFBSzlLLEtBQUwsQ0FBV29MLG1CQUFaLElBQW9DRSxhQUFhLHVDQUFyRCxFQUFvRjtBQUNsRjtBQUNEOztBQUVELFVBQUksQ0FBQyxNQUFLdEwsS0FBTCxDQUFXb0wsbUJBQWhCLEVBQXFDO0FBQ25DLGNBQUtwSyxRQUFMLENBQWM7QUFDWm9LLCtCQUFxQjtBQURULFNBQWQ7QUFHRDs7QUFFRCxZQUFLUixNQUFMLENBQVluSyxLQUFaLENBQWtCQyxTQUFsQixtQkFBNEM0SyxVQUE1QztBQUNELEtBbEhrQjs7QUFBQSxVQW9IbkJFLFdBcEhtQixHQW9ITCxVQUFDNUMsR0FBRCxFQUFTO0FBQ3JCLFVBQUlBLElBQUlHLE1BQUosQ0FBV0QsUUFBWCxDQUFvQixNQUFLOEIsTUFBekIsQ0FBSixFQUFzQztBQUNwQyxjQUFLck0sS0FBTCxDQUFXdkQsWUFBWCxDQUF3QixLQUF4QjtBQUNEO0FBQ0YsS0F4SGtCOztBQUdqQixVQUFLZ0YsS0FBTCxHQUFhO0FBQ1g4SyxjQUFRLENBREc7QUFFWEMsZ0JBQVUsQ0FGQztBQUdYQyx1QkFBaUIsS0FITjtBQUlYSSwyQkFBcUI7QUFKVixLQUFiO0FBSGlCO0FBU2xCOzs7O3dDQUVtQjtBQUNsQixXQUFLSyxpQkFBTDtBQUNEOzs7dUNBRWtCQyxTLEVBQVc7QUFDNUI7QUFDQSxVQUFJQSxVQUFValAsT0FBVixDQUFrQjRLLE1BQWxCLEdBQTJCLENBQTNCLElBQWdDLEtBQUs5SSxLQUFMLENBQVc5QixPQUFYLENBQW1CNEssTUFBbkIsR0FBNEIsQ0FBaEUsRUFBbUU7QUFDakUsWUFBSS9FLE9BQU85RSxRQUFQLENBQWdCb0csUUFBaEIsS0FBNkIsR0FBakMsRUFBc0M7QUFDcEM7QUFDRDtBQUNEN0YsZ0JBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLCtCQUFhMk4sWUFBYixDQUEwQixLQUFLcE4sS0FBTCxDQUFXOUIsT0FBWCxDQUFtQixDQUFuQixFQUFzQlksTUFBdEIsQ0FBNkI0RSxLQUF2RDtBQUNEO0FBQ0Y7OzttQ0FnRGM7QUFDYixVQUFJLEtBQUsySixlQUFMLEtBQXlCQyxTQUE3QixFQUF3QztBQUN0QyxlQUFPLEtBQUtELGVBQUwsR0FBdUIsRUFBRUUsU0FBUyxJQUFYLEVBQXZCLEdBQTJDLEtBQWxEO0FBQ0Q7QUFDRCxVQUFJQyxjQUFjLEtBQWxCO0FBQ0EsVUFBSTtBQUNGMUwsaUJBQVNjLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLElBQWxDLEVBQXdDLEVBQUUsSUFBSTJLLE9BQUosR0FBYztBQUN0REMsMEJBQWMsSUFBZDtBQUNELFdBRnVDLEVBQXhDO0FBR0QsT0FKRCxDQUlFLE9BQU90TixDQUFQLEVBQVU7QUFBRSxlQUFPLFlBQU0sQ0FBRSxDQUFmO0FBQWtCO0FBQ2hDLFdBQUttTixlQUFMLEdBQXVCRyxXQUF2QjtBQUNBLGFBQU8sS0FBS0MsWUFBTCxFQUFQO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsV0FBS3JCLGVBQUwsQ0FBcUJ4SixnQkFBckIsQ0FBc0MsT0FBdEMsRUFBK0MsS0FBS3FLLFdBQXBEOztBQUVBLFdBQUtaLE1BQUwsQ0FBWXpKLGdCQUFaLENBQTZCLFlBQTdCLEVBQTJDLEtBQUszQyxZQUFoRCxFQUE4RCxLQUFLd04sWUFBTCxFQUE5RDtBQUNBLFdBQUtwQixNQUFMLENBQVl6SixnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLK0osV0FBL0MsRUFBNEQsS0FBS2MsWUFBTCxFQUE1RDtBQUNBLFdBQUtwQixNQUFMLENBQVl6SixnQkFBWixDQUE2QixVQUE3QixFQUF5QyxLQUFLZ0ssVUFBOUM7QUFDRDs7OzZCQThCUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQWMsaUJBQUUsa0JBQUYsQ0FBZCxVQUF1QyxLQUFLNU0sS0FBTCxDQUFXdUosVUFBWCxHQUF3QixpQkFBRXhCLE1BQTFCLEdBQW1DLEVBQTFFLENBREY7QUFFRSxlQUFLLGFBQUM5RSxHQUFELEVBQVM7QUFBRSxtQkFBS21KLGVBQUwsR0FBdUJuSixHQUF2QjtBQUE2QjtBQUYvQztBQUlFO0FBQUE7QUFBQSxZQUFPLFdBQVcsaUJBQUVvSixNQUFwQixFQUE0QixLQUFLLGFBQUNxQixLQUFELEVBQVc7QUFBRSxxQkFBS3JCLE1BQUwsR0FBY3FCLEtBQWQ7QUFBc0IsYUFBcEU7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFXLGlCQUFFLHNCQUFGLENBQWhCO0FBQ0U7QUFBQTtBQUFBLGdCQUFNLE9BQU8sUUFBYjtBQUNFO0FBQUE7QUFBQTtBQUNFLDZCQUFjLGlCQUFFLGFBQUYsQ0FBZCw0QkFDRSxLQUFLMU4sS0FBTCxDQUFXOEgsV0FBWCxLQUEyQixRQUEzQixHQUFzQyxpQkFBRUMsTUFBeEMsR0FBaUQsRUFEbkQ7QUFERjtBQUlFO0FBQUE7QUFBQSxvQkFBSyxRQUFPLElBQVosRUFBaUIsU0FBUSxXQUF6QixFQUFxQyxPQUFNLElBQTNDLEVBQWdELE9BQU0sNEJBQXREO0FBQ0UsMERBQU0sR0FBRSxlQUFSLEVBQXdCLE1BQUssTUFBN0IsR0FERjtBQUVFLDBEQUFNLEdBQUUsOEpBQVI7QUFGRixpQkFKRjtBQVFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBUkY7QUFXRTtBQVhGO0FBREY7QUFERixXQURGO0FBa0JFO0FBQUE7QUFBQSxjQUFLLFdBQVcsaUJBQUUsa0JBQUYsQ0FBaEI7QUFDRTtBQUNFLDBCQUFZLEtBQUsvSCxLQUFMLENBQVd5SSxVQUR6QjtBQUVFLHlCQUFXLEtBQUt6SSxLQUFMLENBQVcwSSxTQUZ4QjtBQUdFLHFCQUFPLEtBQUsxSSxLQUFMLENBQVc5QixPQUhwQjtBQUlFLDJCQUFhLEtBQUs4QixLQUFMLENBQVcyTixXQUoxQjtBQUtFLDJCQUFhLEtBQUszTixLQUFMLENBQVc4SDtBQUwxQjtBQURGLFdBbEJGO0FBMkJFLGlEQUFLLFdBQVcsaUJBQUUsZUFBRixDQUFoQjtBQTNCRjtBQUpGLE9BREY7QUFzQ0Q7Ozs7RUFsS2tCLGdCQUFNM0UsUzs7QUFzSzNCZ0osT0FBTy9JLFNBQVAsR0FBbUI7QUFDakJxRixjQUFZLG9CQUFVL0wsSUFETDtBQUVqQmdNLGFBQVcsb0JBQVVoTSxJQUZKO0FBR2pCNk0sY0FBWSxvQkFBVTdNLElBQVYsQ0FBZTZILFVBSFY7QUFJakJyRyxXQUFTLG9CQUFVa0wsS0FBVixDQUFnQjdFLFVBSlI7QUFLakJvSixlQUFhLG9CQUFVdkUsS0FBVixDQUFnQjdFLFVBTFo7QUFNakJ1QixjQUFZLG9CQUFVcUMsTUFOTDtBQU9qQkwsZUFBYSxvQkFBVXhELE1BUE47QUFRakI3SCxnQkFBYyxvQkFBVWdJLElBQVYsQ0FBZUY7QUFSWixDQUFuQjs7QUFXQTRILE9BQU83SSxZQUFQLEdBQXNCO0FBQ3BCbUYsY0FBWSxLQURRO0FBRXBCQyxhQUFXLEtBRlM7QUFHcEI1QyxjQUFZLElBSFE7QUFJcEJnQyxlQUFhO0FBSk8sQ0FBdEI7O0FBT0EsU0FBU3BELGVBQVQsQ0FBeUJqRCxLQUF6QixFQUFnQztBQUM5QixTQUFPO0FBQ0xnSCxnQkFBWWhILE1BQU1tTSxRQUFOLENBQWVuRixVQUR0QjtBQUVMQyxlQUFXakgsTUFBTW1NLFFBQU4sQ0FBZWxGLFNBRnJCO0FBR0x4SyxhQUFTdUQsTUFBTW1NLFFBQU4sQ0FBZTFQLE9BSG5CO0FBSUx5UCxpQkFBYWxNLE1BQU1tTSxRQUFOLENBQWVELFdBSnZCO0FBS0w3SCxnQkFBWXJFLE1BQU1xRSxVQUFOLENBQWlCUyxJQUx4QjtBQU1MdUIsaUJBQWFyRyxNQUFNcUUsVUFBTixDQUFpQnBDLEtBTnpCO0FBT0xtSyxpQkFBYXBNLE1BQU1tTSxRQUFOLENBQWVFLE9BUHZCO0FBUUx2RSxnQkFBWTlILE1BQU13SyxLQUFOLENBQVkxQztBQVJuQixHQUFQO0FBVUQ7O0FBRUQsU0FBUzJDLG9CQUFULENBQThCek8sUUFBOUIsRUFBd0M7QUFDdEMsU0FBTztBQUNMaEIsa0JBQWMsc0JBQUNzUixJQUFELEVBQVU7QUFBRXRRLGVBQVMseUJBQWFzUSxJQUFiLENBQVQ7QUFBK0IsS0FEcEQ7QUFFTG5RLGVBQVcsbUJBQUNDLE1BQUQsRUFBWTtBQUFFSixlQUFTLHlCQUFVSSxNQUFWLENBQVQ7QUFBOEIsS0FGbEQ7QUFHTEMsa0JBQWMsc0JBQUNELE1BQUQsRUFBWTtBQUFFSixlQUFTLDRCQUFhSSxNQUFiLENBQVQ7QUFBaUM7QUFIeEQsR0FBUDtBQUtEOztrQkFFYyw0Q0FBYyx5QkFBUTZHLGVBQVIsRUFBeUJ3SCxvQkFBekIsRUFBK0NDLE1BQS9DLENBQWQsQzs7Ozs7Ozs7Ozs7Ozs7O0FDNU5mOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU02QixVOzs7QUFDSixzQkFBWWhPLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx3SEFDWEEsS0FEVzs7QUFBQSxVQVFuQmlLLGFBUm1CLEdBUUgsVUFBQ3ZOLElBQUQsRUFBVTtBQUN4QixZQUFLK0YsUUFBTCxDQUFjO0FBQ1p3SCx1QkFBZXZOO0FBREgsT0FBZDtBQUdELEtBWmtCOztBQUdqQixVQUFLK0UsS0FBTCxHQUFhO0FBQ1h3SSxxQkFBZTtBQURKLEtBQWI7QUFIaUI7QUFNbEI7Ozs7NkJBUVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFjLHFCQUFFZ0UsTUFBaEIsb0JBQ0UsS0FBS2pPLEtBQUwsQ0FBVzJKLFVBQVgsR0FBd0IscUJBQUVBLFVBQTFCLEdBQXVDLEVBRHpDLG9CQUVFLEtBQUszSixLQUFMLENBQVdrTyxtQkFBWCxHQUFpQyxxQkFBRUMsYUFBbkMsR0FBbUQsRUFGckQ7QUFERjtBQU1FO0FBQUE7QUFBQSxZQUFLLFdBQVcscUJBQUUsaUJBQUYsQ0FBaEI7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFXLHFCQUFFLGtCQUFGLENBQWhCO0FBQ0U7QUFDRSwwQkFBWSxLQUFLbk8sS0FBTCxDQUFXdUosVUFEekI7QUFFRSwwQkFBWSxLQUFLdkosS0FBTCxDQUFXMkosVUFGekI7QUFHRSw0QkFBYyxLQUFLM0osS0FBTCxDQUFXdkQ7QUFIM0I7QUFERixXQURGO0FBUUU7QUFBQTtBQUFBLGNBQU0sV0FBVyxxQkFBRWlLLEtBQW5CO0FBQUE7QUFFRTtBQUNFLHlCQUFXLHFCQUFFLGNBQUYsQ0FEYjtBQUVFLHVDQUF5QjtBQUN2QjBILHdCQUFRLEtBQUtwTyxLQUFMLENBQVdxTyxlQUFYLGlCQUNJLEtBQUtyTyxLQUFMLENBQVdxTyxlQURmLEdBR1IsRUFKdUI7QUFGM0I7QUFGRjtBQVJGLFNBTkY7QUEwQkU7QUFBQTtBQUFBLFlBQUssV0FBVyxxQkFBRSxrQkFBRixDQUFoQjtBQUVBO0FBQ0UsdUJBQVcsS0FBS3JPLEtBQUwsQ0FBV3lLLFNBRHhCO0FBRUUsd0JBQVksS0FBS3pLLEtBQUwsQ0FBVzJKLFVBRnpCO0FBR0Usb0JBQVEsS0FBSzNKLEtBQUwsQ0FBV3RDO0FBSHJCO0FBRkE7QUExQkYsT0FERjtBQXFDRDs7OztFQXJEc0IsZ0JBQU15RixTOztBQXdEL0I2SyxXQUFXNUssU0FBWCxHQUF1QjtBQUNyQm1HLGNBQVksb0JBQVU3TSxJQUFWLENBQWU2SCxVQUROO0FBRXJCb0YsY0FBWSxvQkFBVWpOLElBQVYsQ0FBZTZILFVBRk47QUFHckJrRyxhQUFXLG9CQUFVbkcsTUFBVixDQUFpQkMsVUFIUDtBQUlyQjlILGdCQUFjLG9CQUFVZ0ksSUFBVixDQUFlRixVQUpSO0FBS3JCN0csVUFBUSxvQkFBVStHLElBQVYsQ0FBZUY7QUFMRixDQUF2Qjs7QUFRQXlKLFdBQVcxSyxZQUFYLEdBQTBCO0FBQ3hCbUQsc0JBQW9CO0FBREksQ0FBMUI7O0FBSUEsU0FBUy9CLGVBQVQsQ0FBeUJqRCxLQUF6QixFQUFnQztBQUM5QixTQUFPO0FBQ0w4SCxnQkFBWTlILE1BQU13SyxLQUFOLENBQVkxQyxVQURuQjtBQUVMSSxnQkFBWWxJLE1BQU13SyxLQUFOLENBQVl0QyxVQUZuQjtBQUdMYyxlQUFXaEosTUFBTW1NLFFBQU4sQ0FBZWpRLEtBSHJCO0FBSUwwUSxxQkFBaUI1TSxNQUFNcUUsVUFBTixDQUFpQlk7QUFKN0IsR0FBUDtBQU1EOztBQUVELFNBQVN3RixvQkFBVCxDQUE4QnpPLFFBQTlCLEVBQXdDO0FBQ3RDLFNBQU87QUFDTGhCLGtCQUFjLHNCQUFDc1IsSUFBRCxFQUFVO0FBQUV0USxlQUFTLHlCQUFhc1EsSUFBYixDQUFUO0FBQStCLEtBRHBEO0FBRUxyUSxZQUFRLGdCQUFDQyxLQUFELEVBQVc7QUFBRUYsZUFBUyxzQkFBT0UsS0FBUCxDQUFUO0FBQTBCO0FBRjFDLEdBQVA7QUFJRDs7a0JBRWMsZ0RBQWMseUJBQVErRyxlQUFSLEVBQXlCd0gsb0JBQXpCLEVBQStDOEIsVUFBL0MsQ0FBZCxDOzs7Ozs7Ozs7Ozs7Ozs7QUNqR2Y7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVNTSxZOzs7QUFFSix3QkFBWXRPLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw0SEFDWEEsS0FEVzs7QUFBQSxVQWtDbkJ1TyxXQWxDbUIsR0FrQ0wsWUFBTTtBQUNsQixZQUFLOUwsUUFBTCxDQUFjO0FBQ1pzRixnQkFBUTtBQURJLE9BQWQ7QUFHQSxZQUFLeUcsS0FBTCxDQUFXNUwsZ0JBQVgsQ0FBNEIsZUFBNUIsRUFBNkMsTUFBSzZMLFlBQWxEO0FBQ0QsS0F2Q2tCOztBQUFBLFVBeUNuQkEsWUF6Q21CLEdBeUNKLFlBQU07QUFDbkIsWUFBS0QsS0FBTCxDQUFXM0ksbUJBQVgsQ0FBK0IsZUFBL0IsRUFBZ0QsTUFBSzRJLFlBQXJEO0FBQ0EsWUFBS3pPLEtBQUwsQ0FBVzFDLFFBQVg7QUFDRCxLQTVDa0I7O0FBQUEsVUE4Q25Cb1IsWUE5Q21CLEdBOENKLFlBQU07QUFDbkIvQyxtQkFBYSxNQUFLdk8sT0FBbEI7QUFDQSxZQUFLbVIsV0FBTDtBQUNBLFVBQUksTUFBSzlNLEtBQUwsQ0FBVytNLEtBQVgsQ0FBaUJuUixRQUFyQixFQUErQjtBQUM3QixjQUFLb0UsS0FBTCxDQUFXK00sS0FBWCxDQUFpQm5SLFFBQWpCO0FBQ0Q7QUFDRixLQXBEa0I7O0FBR2pCLFVBQUtvRSxLQUFMLEdBQWE7QUFDWHNHLGNBQVEsS0FERztBQUVYeUcsYUFBTztBQUZJLEtBQWI7QUFIaUI7QUFPbEI7Ozs7OENBRXlCRyxTLEVBQVc7QUFDbkMsVUFBSUEsVUFBVUMsTUFBVixDQUFpQjlGLE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDO0FBQy9CO0FBQ0Q7O0FBRUQsV0FBSytGLGFBQUwsQ0FBbUJGLFVBQVVDLE1BQVYsQ0FBaUJELFVBQVVDLE1BQVYsQ0FBaUI5RixNQUFqQixHQUEwQixDQUEzQyxDQUFuQjtBQUNEOzs7a0NBRWEwRixLLEVBQU87QUFBQTs7QUFDbkIsVUFBSSxLQUFLL00sS0FBTCxDQUFXc0csTUFBZixFQUF1QjtBQUNyQjtBQUNEOztBQUVELFdBQUt0RixRQUFMLENBQWM7QUFDWitMLG9CQURZO0FBRVp6RyxnQkFBUTtBQUZJLE9BQWQ7O0FBS0EsVUFBSXlHLE1BQU1wUixPQUFWLEVBQW1CO0FBQ2pCLGFBQUtBLE9BQUwsR0FBZXNPLFdBQVcsWUFBTTtBQUM5QixpQkFBSzZDLFdBQUw7QUFDRCxTQUZjLEVBRVpDLE1BQU1wUixPQUZNLENBQWY7QUFHRDtBQUNGOzs7NkJBc0JRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFXLHVCQUFFLGlCQUFGLENBQWhCO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsdUJBQWMsdUJBQUUsZUFBRixDQUFkLFVBQW9DLEtBQUtxRSxLQUFMLENBQVdzRyxNQUFYLEdBQW9CLHVCQUFFQSxNQUF0QixHQUErQixFQUFuRSxDQURGO0FBRUUsaUJBQUssYUFBQzlFLEdBQUQsRUFBUztBQUFFLHFCQUFLdUwsS0FBTCxHQUFhdkwsR0FBYjtBQUFtQjtBQUZyQztBQUlFO0FBQUE7QUFBQSxjQUFLLFdBQVcsdUJBQUV1TCxLQUFsQjtBQUNFO0FBQUE7QUFBQSxnQkFBRyxXQUFXLHVCQUFFTSxPQUFoQjtBQUNHLG1CQUFLck4sS0FBTCxDQUFXK00sS0FBWCxDQUFpQnRSO0FBRHBCLGFBREY7QUFJRTtBQUFBO0FBQUEsZ0JBQVEsV0FBVyx1QkFBRTZSLE1BQXJCLEVBQTZCLFNBQVMsS0FBS0wsWUFBM0M7QUFDRyxtQkFBS2pOLEtBQUwsQ0FBVytNLEtBQVgsQ0FBaUJyUjtBQURwQjtBQUpGO0FBSkY7QUFERixPQURGO0FBaUJEOzs7O0VBMUV3QixnQkFBTWdHLFM7O0FBNkVqQ21MLGFBQWFsTCxTQUFiLEdBQXlCO0FBQ3ZCd0wsVUFBUSxvQkFBVXhGLEtBQVYsQ0FBZ0I3RSxVQUREO0FBRXZCakgsWUFBVSxvQkFBVW1ILElBQVYsQ0FBZUY7QUFGRixDQUF6Qjs7QUFLQSxTQUFTRyxlQUFULENBQXlCakQsS0FBekIsRUFBZ0M7QUFDOUIsU0FBTztBQUNMbU4sWUFBUW5OLE1BQU13SyxLQUFOLENBQVkyQztBQURmLEdBQVA7QUFHRDs7QUFFRCxTQUFTMUMsb0JBQVQsQ0FBOEJ6TyxRQUE5QixFQUF3QztBQUN0QyxTQUFPO0FBQ0xILGNBQVUsb0JBQU07QUFBRUcsZUFBUyxzQkFBVDtBQUF1QjtBQURwQyxHQUFQO0FBR0Q7O2tCQUVjLGtEQUFjLHlCQUFRaUgsZUFBUixFQUF5QndILG9CQUF6QixFQUErQ29DLFlBQS9DLENBQWQsQzs7Ozs7Ozs7Ozs7OztrQkM5RkEsWUFBd0M7QUFBQSxNQUE5QjdNLEtBQThCLHVFQUF0QnVOLFlBQXNCO0FBQUEsTUFBUkQsTUFBUTs7QUFDckQsVUFBUUEsT0FBT3BTLElBQWY7QUFDRSxTQUFLLFlBQUw7QUFBbUI7QUFDakIsZUFBT3VNLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUgsS0FBbEIsRUFDTDtBQUNFZ0gsc0JBQVlzRyxPQUFPblM7QUFEckIsU0FESyxDQUFQO0FBS0Q7QUFDRCxTQUFLLGNBQUw7QUFBcUI7QUFDbkIsZUFBT3NNLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUgsS0FBbEIsRUFDTDtBQUNFaUgscUJBQVdxRyxPQUFPblM7QUFEcEIsU0FESyxDQUFQO0FBS0Q7QUFDRCxTQUFLLGFBQUw7QUFBb0I7QUFDbEIsZUFBT3NNLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUgsS0FBbEIsRUFDTDtBQUNFOEUsZ0JBQU13SSxPQUFPblM7QUFEZixTQURLLENBQVA7QUFLRDtBQUNELFNBQUssY0FBTDtBQUFxQjtBQUNuQixlQUFPc00sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IxSCxLQUFsQixFQUNMO0FBQ0VpQyxpQkFBT3FMLE9BQU9uUztBQURoQixTQURLLENBQVA7QUFLRDtBQUNELFNBQUssbUJBQUw7QUFBMEI7QUFDeEIsZUFBT3NNLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUgsS0FBbEIsRUFDTDtBQUNFaUYsaUJBQU9xSSxPQUFPblM7QUFEaEIsU0FESyxDQUFQO0FBS0Q7QUFDRCxTQUFLLGtCQUFMO0FBQXlCO0FBQ3ZCLGVBQU9zTSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjFILEtBQWxCLEVBQ0w7QUFDRTlFLGdCQUFNb1MsT0FBT25TO0FBRGYsU0FESyxDQUFQO0FBS0Q7QUFDRDtBQUFTO0FBQ1AsZUFBTzZFLEtBQVA7QUFDRDtBQTdDSDtBQStDRCxDOztBQXpERCxJQUFNdU4sZUFBZTtBQUNuQnpJLFFBQU0sSUFEYTtBQUVuQjdDLFNBQU8sSUFGWTtBQUduQmdELFNBQU8sU0FIWTtBQUluQi9KLFFBQU0sSUFKYTtBQUtuQitMLGFBQVcsS0FMUTtBQU1uQkQsY0FBWTtBQU5PLENBQXJCLEM7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU13RyxjQUFjLDRCQUNsQjtBQUNFaEQsd0JBREY7QUFFRTJCLDhCQUZGO0FBR0U5SDtBQUhGLENBRGtCLENBQXBCOztrQkFRZW1KLFc7Ozs7Ozs7Ozs7Ozs7a0JDb0NBLFlBQXdDO0FBQUEsTUFBOUJ4TixLQUE4Qix1RUFBdEJ1TixZQUFzQjtBQUFBLE1BQVJELE1BQVE7O0FBQ3JELFVBQVFBLE9BQU9wUyxJQUFmO0FBQ0UsU0FBSyxnQkFBTDtBQUF1QjtBQUNyQixlQUFPdU0sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IxSCxLQUFsQixFQUNMO0FBQ0VnSCxzQkFBWXNHLE9BQU9uUztBQURyQixTQURLLENBQVA7QUFLRDtBQUNELFNBQUssa0JBQUw7QUFBeUI7QUFDdkIsZUFBT3NNLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUgsS0FBbEIsRUFDTDtBQUNFaUgscUJBQVdxRyxPQUFPblM7QUFEcEIsU0FESyxDQUFQO0FBS0Q7QUFDRCxTQUFLLHdCQUFMO0FBQStCO0FBQzdCLGVBQU9zTSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjFILEtBQWxCLEVBQ0w7QUFDRXZELG1CQUFTZ0wsT0FBT2dHLE1BQVAsQ0FBY0gsT0FBT25TLE9BQXJCO0FBRFgsU0FESyxDQUFQO0FBS0Q7QUFDRCxTQUFLLGNBQUw7QUFBcUI7QUFDbkI7QUFDQSxZQUFNK1EsY0FBY3dCLFlBQVkxTixNQUFNcU0sT0FBbEIsRUFBMkJyTSxNQUFNdkQsT0FBakMsQ0FBcEI7QUFDQSxlQUFPZ0wsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IxSCxLQUFsQixFQUNMO0FBQ0U5RCxpQkFBT29SLE9BQU9uUyxPQURoQjtBQUVFK1EsdUJBQWF5QixXQUFXTCxPQUFPblMsT0FBbEIsRUFBMkIrUSxXQUEzQjtBQUZmLFNBREssQ0FBUDtBQU1EO0FBQ0QsU0FBSyxZQUFMO0FBQW1CO0FBQ2pCLFlBQU1BLGVBQWN5QixXQUFXM04sTUFBTTlELEtBQWpCLEVBQXdCOEQsTUFBTXZELE9BQTlCLENBQXBCO0FBQ0EsWUFBTW1SLGFBQWE1TixNQUFNcU0sT0FBekI7QUFDQXVCLG1CQUFXekosSUFBWCxDQUFnQm1KLE9BQU9uUyxPQUF2Qjs7QUFFQSxlQUFPc00sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IxSCxLQUFsQixFQUNMO0FBQ0VrTSx1QkFBYXdCLFlBQVlFLFVBQVosRUFBd0IxQixZQUF4QixDQURmO0FBRUVHLG1CQUFTdUI7QUFGWCxTQURLLENBQVA7QUFNRDtBQUNELFNBQUssZUFBTDtBQUFzQjtBQUNwQixZQUFNeFIsU0FBU2tSLE9BQU9uUyxPQUF0QjtBQUNBLFlBQU15UyxjQUFhNU4sTUFBTXFNLE9BQXpCO0FBQ0EsWUFBTUgsZ0JBQWN5QixXQUFXM04sTUFBTTlELEtBQWpCLEVBQXdCOEQsTUFBTXZELE9BQTlCLENBQXBCO0FBQ0FtUixvQkFBV0MsTUFBWCxDQUFrQkQsWUFBV0UsT0FBWCxDQUFtQjFSLE1BQW5CLENBQWxCLEVBQThDLENBQTlDOztBQUVBLGVBQU9xTCxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjFILEtBQWxCLEVBQ0w7QUFDRWtNLHVCQUFhd0IsWUFBWUUsV0FBWixFQUF3QjFCLGFBQXhCLENBRGY7QUFFRUcsbUJBQVN1QjtBQUZYLFNBREssQ0FBUDtBQU1EO0FBQ0Q7QUFBUztBQUNQLGVBQU81TixLQUFQO0FBQ0Q7QUEzREg7QUE2REQsQzs7QUEvR0Q7O0FBRUEsSUFBTXVOLGVBQWU7QUFDbkI5USxXQUFTLEVBRFU7QUFFbkJ3SyxhQUFXLEtBRlE7QUFHbkJELGNBQVksS0FITztBQUluQmtGLGVBQWEsRUFKTTtBQUtuQkcsV0FBUyxFQUxVO0FBTW5CblEsU0FBTztBQU5ZLENBQXJCOztBQVNBLElBQU13UixjQUFjLFNBQWRBLFdBQWMsQ0FBQ3JCLE9BQUQsRUFBVXhGLEtBQVYsRUFBb0I7QUFDdEMsTUFBSWtILGdCQUFnQmxILEtBQXBCO0FBQ0EsTUFBSXdGLFFBQVFoRixNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCMEcsb0JBQWdCbEgsTUFBTXpLLE1BQU4sQ0FBYSxVQUFDMEksSUFBRCxFQUFVO0FBQ3JDLGFBQU91SCxRQUFRMkIsUUFBUixDQUFpQmxKLEtBQUt6SCxNQUFMLENBQVl5SSxRQUFaLENBQXFCekksTUFBckIsQ0FBNEI0USxhQUE1QixDQUEwQzVRLE1BQTFDLENBQWlEK0gsSUFBbEUsQ0FBUDtBQUNELEtBRmUsQ0FBaEI7QUFHRDtBQUNELFNBQU8ySSxhQUFQO0FBQ0QsQ0FSRDs7QUFVQSxJQUFNSixhQUFhLFNBQWJBLFVBQWEsQ0FBQ3pSLEtBQUQsRUFBUTJLLEtBQVIsRUFBa0I7QUFDbkMsTUFBTXFILGdCQUFnQnJILEtBQXRCO0FBQ0EsTUFBSXNILGlCQUFpQkQsYUFBckI7QUFDQSxNQUFJaFMsTUFBTW1MLE1BQU4sR0FBZSxDQUFuQixFQUFzQjtBQUNwQixRQUFNK0csaUJBQWlCbFMsTUFBTW1TLFdBQU4sRUFBdkI7QUFDQSxRQUFNN0ssK0NBQU47QUFDQSxRQUFNOEssU0FBUyxJQUFJN0ssTUFBSixDQUFXRCxLQUFYLEVBQWtCLEdBQWxCLENBQWY7QUFDQSxRQUFNM0YsUUFBUXlRLE9BQU9DLElBQVAsQ0FBWUgsY0FBWixDQUFkO0FBQ0EsUUFBSXZRLFNBQVNBLE1BQU0sQ0FBTixDQUFiLEVBQXVCO0FBQ3JCc1EsdUJBQWlCRCxjQUFjOVIsTUFBZCxDQUFxQixVQUFDZ0ssS0FBRCxFQUFXO0FBQy9DLFlBQUksQ0FBQ0EsTUFBTS9JLE1BQU4sQ0FBYW1SLElBQWxCLEVBQXdCO0FBQ3RCLGlCQUFPLEtBQVA7QUFDRDtBQUNELGVBQVFwSSxNQUFNL0ksTUFBTixDQUFhbVIsSUFBYixDQUFrQnBTLE1BQWxCLENBQXlCLFVBQUNxUyxHQUFELEVBQVM7QUFDeEMsaUJBQU9BLElBQUlwUixNQUFKLENBQVcrSCxJQUFYLENBQWdCc0osSUFBaEIsR0FBdUJMLFdBQXZCLEdBQXFDeFEsS0FBckMsQ0FBMkNBLE1BQU0sQ0FBTixDQUEzQyxDQUFQO0FBQ0QsU0FGTyxFQUVMd0osTUFGSyxHQUVJLENBRlo7QUFHRCxPQVBnQixDQUFqQjtBQVFBLGFBQU84RyxjQUFQO0FBQ0QsS0FWRCxNQVVPO0FBQ0xBLHVCQUFpQkQsY0FBYzlSLE1BQWQsQ0FBcUIsVUFBQ2dLLEtBQUQsRUFBVztBQUMvQyxlQUFTQSxNQUFNL0ksTUFBTixDQUFhK0gsSUFBYixDQUFrQnNKLElBQWxCLEdBQXlCTCxXQUF6QixHQUF1Q3hRLEtBQXZDLENBQTZDdVEsZUFBZUMsV0FBZixFQUE3QyxDQUFULENBRCtDLENBQ3dDO0FBQ3hGLE9BRmdCLENBQWpCO0FBR0EsYUFBT0YsY0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEVBQVA7QUFDRCxDQTFCRCxDOzs7Ozs7Ozs7Ozs7O2tCQ2JlLFlBQXdDO0FBQUEsTUFBOUJuTyxLQUE4Qix1RUFBdEJ1TixZQUFzQjtBQUFBLE1BQVJELE1BQVE7O0FBQ3JELFVBQVFBLE9BQU9wUyxJQUFmO0FBQ0UsU0FBSyxlQUFMO0FBQXNCO0FBQ3BCLGVBQU91TSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjFILEtBQWxCLEVBQ0w7QUFDRThILHNCQUFZd0YsT0FBT25TO0FBRHJCLFNBREssQ0FBUDtBQUtEO0FBQ0QsU0FBSyxlQUFMO0FBQXNCO0FBQ3BCLGVBQU9zTSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjFILEtBQWxCLEVBQ0w7QUFDRWtJLHNCQUFZb0YsT0FBT25TO0FBRHJCLFNBREssQ0FBUDtBQUtEO0FBQ0QsU0FBSyx5QkFBTDtBQUFnQztBQUM5QixZQUFJbVMsT0FBT25TLE9BQVAsSUFBa0J3VCxVQUFVQyxhQUFoQyxFQUErQ3RCLE9BQU9uUyxPQUFQLEdBQWlCLElBQWpCOztBQUUvQyxlQUFPc00sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IxSCxLQUFsQixFQUNMO0FBQ0U2TywrQkFBcUJ2QixPQUFPblM7QUFEOUIsU0FESyxDQUFQO0FBS0Q7QUFDRCxTQUFLLFlBQUw7QUFBbUI7QUFDakIsZUFBT3NNLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUgsS0FBbEIsRUFDTDtBQUNFbU4sK0NBQVluTixNQUFNbU4sTUFBbEIsSUFBMEJHLE9BQU9uUyxPQUFqQztBQURGLFNBREssQ0FBUDtBQUtEO0FBQ0QsU0FBSyxXQUFMO0FBQWtCO0FBQ2hCLFlBQU0yVCxtQ0FBVTlPLE1BQU1tTixNQUFoQixFQUFOO0FBQ0EyQixZQUFJQyxLQUFKO0FBQ0EsZUFBT3RILE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMUgsS0FBbEIsRUFDTDtBQUNFbU4sa0JBQVEyQjtBQURWLFNBREssQ0FBUDtBQUtEO0FBQ0QsU0FBSyxpQkFBTDtBQUF3QjtBQUN0QixlQUFPckgsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IxSCxLQUFsQixFQUNMO0FBQ0U0SixvQkFBVTBELE9BQU9uUztBQURuQixTQURLLENBQVA7QUFLRDtBQUNEO0FBQVM7QUFDUCxlQUFPNkUsS0FBUDtBQUNEO0FBakRIO0FBbURELEM7Ozs7QUE1REQsSUFBTXVOLGVBQWU7QUFDbkJ6RixjQUFZLEtBRE87QUFFbkJJLGNBQVksS0FGTztBQUduQjJHLHVCQUFxQixLQUhGO0FBSW5CMUIsVUFBUSxFQUpXO0FBS25CdkQsWUFBVTtBQUxTLENBQXJCLEM7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7O0lBQVlvRixVOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQyxtQkFBbUJELFdBQVdFLFlBQVgsQ0FBd0I7QUFDL0NDLDJCQUQrQztBQUUvQ0M7QUFGK0MsQ0FBeEIsQ0FBekI7O0FBS0EsSUFBTUM7QUFBQSxxRUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUlKLGlCQUFpQkssVUFBakIsQ0FBNEI7QUFDOUNDLDRCQUFjLGFBRGdDO0FBRTlDQyxzQkFBUSw4REFGc0M7QUFHOUNDLHVCQUFTO0FBSHFDLGFBQTVCLENBRko7O0FBQUE7QUFFWmhULG1CQUZZO0FBUVppVCx5QkFSWSxHQVFJakksT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JqTCxRQUFRa1QsS0FBMUIsQ0FSSjtBQVNaM0Isb0JBVFksR0FTRHZSLFFBQVF1UixRQUFSLENBQWlCNEIsS0FUaEI7QUFXWkMsZ0JBWFksR0FXTCxpQkFBT0MsVUFBUCxDQUFrQixLQUFsQixDQVhLOztBQVlsQnJJLG1CQUFPc0ksSUFBUCxDQUFZTCxhQUFaLEVBQTJCMUwsT0FBM0IsQ0FBbUMsVUFBQ2dNLEdBQUQsRUFBUztBQUMxQyxrQkFBTTVKLFFBQVFzSixjQUFjTSxHQUFkLENBQWQ7QUFDQUMsd0JBQVVqQyxRQUFWLEVBQW9CNUgsS0FBcEIsRUFBMkIsVUFBM0I7QUFDQTZKLHdCQUFVakMsUUFBVixFQUFvQjVILE1BQU0vSSxNQUFOLENBQWF5SSxRQUFqQyxFQUEyQyxlQUEzQzs7QUFFQSxrQkFBTUEsV0FBV00sTUFBTS9JLE1BQU4sQ0FBYXlJLFFBQTlCO0FBQ0Esa0JBQU1tSSxnQkFBZ0JuSSxTQUFTekksTUFBVCxDQUFnQjRRLGFBQXRDO0FBQ0Esa0JBQU1oTSxvQkFBa0JnTSxjQUFjNVEsTUFBZCxDQUFxQitILElBQXZDLFNBQStDVSxTQUFTekksTUFBVCxDQUFnQitILElBQS9ELFNBQXVFZ0IsTUFBTS9JLE1BQU4sQ0FBYStILElBQTFGOztBQUVBZ0Isb0JBQU0vSSxNQUFOLENBQWE0RSxLQUFiLEdBQXFCaU8sVUFBVWpPLEtBQVYsQ0FBckI7QUFDQTROLG1CQUFLNUUsTUFBTCxDQUFZN0UsTUFBTTlJLEdBQU4sQ0FBVUMsRUFBdEI7QUFDRCxhQVhEOztBQWFNQSxjQXpCWSxHQXlCUHNTLEtBQUtNLE1BQUwsQ0FBWSxLQUFaLENBekJPO0FBQUEsNkNBMkJYO0FBQ043UyxtQkFBSztBQUNIQztBQURHLGVBREM7QUFJTkYsc0JBQVFxUztBQUpGLGFBM0JXOztBQUFBO0FBQUE7QUFBQTs7QUFtQ2xCM1Isb0JBQVFDLEdBQVI7O0FBbkNrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBdUNBLElBQU1tSDtBQUFBLHNFQUFZLGtCQUFPaUwsR0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWEMsb0JBRFcsR0FDQUMsVUFBVUYsSUFBSUcsTUFBSixDQUFXQyxNQUFyQixDQURBOztBQUdqQjs7QUFIaUI7QUFBQSxtQkFJS3ZCLGlCQUFpQkssVUFBakIsQ0FBNEI7QUFDaERDLDRCQUFjLGFBRGtDO0FBRWhELDZCQUFlYztBQUZpQyxhQUE1QixDQUpMOztBQUFBO0FBSVg1VCxtQkFKVztBQVNYMkosaUJBVFcsR0FTSDNKLFFBQVFrVCxLQUFSLENBQWMsQ0FBZCxDQVRHOztBQVVqQnZKLGtCQUFNL0ksTUFBTixDQUFhb1QsSUFBYixHQUFvQixzQkFBT3JLLE1BQU0vSSxNQUFOLENBQWFvVCxJQUFwQixDQUFwQjtBQVZpQiw4Q0FXVnJLLEtBWFU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWNBLElBQU02SixZQUFZLFNBQVpBLFNBQVksQ0FBQ2pDLFFBQUQsRUFBVzVILEtBQVgsRUFBa0JzSyxLQUFsQixFQUE0QjtBQUM1Q3RLLFFBQU0vSSxNQUFOLENBQWFxVCxLQUFiLElBQXNCMUMsU0FBUzJDLElBQVQsQ0FBYyxVQUFDbEIsT0FBRCxFQUFhO0FBQy9DLFdBQU9BLFFBQVFuUyxHQUFSLENBQVlDLEVBQVosS0FBbUI2SSxNQUFNL0ksTUFBTixDQUFhcVQsS0FBYixFQUFvQnBULEdBQXBCLENBQXdCQyxFQUFsRDtBQUNELEdBRnFCLENBQXRCO0FBR0QsQ0FKRDs7QUFNQSxJQUFNcVQsWUFBWSxrQkFBUUMsTUFBUixFQUFsQjs7QUFFQUQsVUFBVUUsR0FBVixDQUFjLEdBQWQsRUFBbUIsVUFBQ1YsR0FBRCxFQUFNVyxHQUFOLEVBQWM7QUFDL0JBLE1BQUlDLElBQUosQ0FBUyxtQkFBVDtBQUNELENBRkQ7O0FBSUFKLFVBQVVFLEdBQVYsQ0FBYyxRQUFkO0FBQUEsc0VBQXdCLGtCQUFPVixHQUFQLEVBQVlXLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDRjFCLGNBREU7O0FBQUE7QUFDaEJ4SSxpQkFEZ0I7O0FBRXRCa0ssZ0JBQUlDLElBQUosQ0FBU0MsS0FBS0MsU0FBTCxDQUFlckssS0FBZixDQUFUOztBQUZzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLQStKLFVBQVVFLEdBQVYsQ0FBYywrQkFBZDtBQUFBLHNFQUErQyxrQkFBT1YsR0FBUCxFQUFZVyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ3ZCNUwsVUFBVWlMLEdBQVYsRUFBZVcsR0FBZixDQUR1Qjs7QUFBQTtBQUN2Q0ksbUJBRHVDOztBQUU3Q0osZ0JBQUlLLE1BQUosQ0FBVyxHQUFYLEVBQWdCaFUsSUFBaEIsQ0FBcUIrVCxPQUFyQjs7QUFGNkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBL0M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS0FFLE9BQU9DLE9BQVAsR0FBaUJWLFNBQWpCLEM7Ozs7Ozs7OztBQ3RGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1yTCxjQUFjO0FBQ2xCQyxhQUFXLG9CQUFVeEMsSUFBVixDQUFlRjtBQURSLENBQXBCOztBQUlBLFNBQVN5TyxnQkFBVCxDQUEwQm5CLEdBQTFCLEVBQStCVyxHQUEvQixFQUFvQzs7QUFFbEMsTUFBTVMsUUFBUSx3Q0FBZDs7QUFFQTtBQUNBLE1BQU1DLE1BQU0sSUFBSUMsR0FBSixFQUFaLENBTGtDLENBS1g7QUFDdkIsTUFBTWhNLFVBQVUsRUFBRUYsV0FBVyxxQkFBZTtBQUFBLHdDQUFYbU0sTUFBVztBQUFYQSxjQUFXO0FBQUE7O0FBQzFDQSxhQUFPM04sT0FBUCxDQUFlLFVBQUN2RCxLQUFELEVBQVc7QUFBRWdSLFlBQUlqUixHQUFKLENBQVFDLE1BQU1tUixPQUFOLEVBQVI7QUFBMkIsT0FBdkQ7QUFDRCxLQUZlLEVBQWhCOztBQUlBLE1BQU1DLE9BQU8sNEJBQ1g7QUFBQTtBQUFBLE1BQVUsT0FBT0wsS0FBakI7QUFDRSxtREFBSyxTQUFTOUwsT0FBZDtBQURGLEdBRFcsQ0FBYjs7QUFNQSxNQUFNb00saUJBQWlCTixNQUFNTyxRQUFOLEVBQXZCOztBQUVBQyxpQkFBZWpCLEdBQWYsRUFBb0JjLElBQXBCLEVBQTBCSixHQUExQixFQUErQkssY0FBL0I7QUFDRDs7QUFFRCxTQUFTRSxjQUFULENBQXdCakIsR0FBeEIsRUFBZ0Y7QUFBQSxNQUFuRGMsSUFBbUQsdUVBQTVDLEtBQTRDO0FBQUEsTUFBckNKLEdBQXFDLHVFQUEvQixLQUErQjtBQUFBLE1BQXhCSyxjQUF3Qix1RUFBUCxLQUFPOztBQUM5RWYsTUFBSUMsSUFBSiw0ZUFVUVMsZ0RBRUUsNkJBQUlBLEdBQUosR0FBU1EsSUFBVCxDQUFjLEVBQWQsRUFBa0JDLE9BQWxCLENBQTBCLGdCQUExQixFQUEyQyxFQUEzQyxDQUZGLDBCQUtGLEVBZk4saURBbUJRTCxnQ0FDcUJBLElBRHJCLG9CQUdGLHVCQXRCTiwyS0E2QlFDLG1LQUcrQmIsS0FBS0MsU0FBTCxDQUFlWSxjQUFmLEVBQStCSSxPQUEvQixDQUF1QyxJQUF2QyxFQUE2QyxTQUE3QyxDQUgvQiwyQkFNRixFQW5DTixnQ0FxQ3FCLG1CQUFTLFdBQVQsQ0FyQ3JCLDBDQXNDcUIsbUJBQVMsUUFBVCxDQXRDckI7QUEwQ0Q7O0FBRUQsSUFBTUMsU0FBUyxrQkFBUXRCLE1BQVIsRUFBZjs7QUFFQXNCLE9BQU9yQixHQUFQLENBQVcsUUFBWDtBQUFBLHFFQUFxQixpQkFBT1YsR0FBUCxFQUFZVyxHQUFaO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFYnhILGlCQUZhLEdBRUwsYUFBRzZJLGdCQUFILENBQW9CLGVBQUtILElBQUwsQ0FBVSxNQUFWLEVBQWtCLFFBQWxCLEVBQTRCLE9BQTVCLENBQXBCLENBRks7QUFJZkksaUNBSmUsR0FJUzVLLE9BQU9nRyxNQUFQLG9CQUpUO0FBTWI2RSx3QkFOYSxHQU1HLGlCQUFPeEMsVUFBUCxDQUFrQixLQUFsQixDQU5IO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQVFuQiw2QkFBa0J1QyxxQkFBbEIsdUhBQXlDO0FBQWhDRSxtQkFBZ0M7O0FBQ3ZDRCwyQkFBYXJILE1BQWIsQ0FBb0JzSCxLQUFwQjtBQUNEOztBQVZrQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQVliQywwQkFaYSxHQVlLRixhQUFhbkMsTUFBYixDQUFvQixLQUFwQixDQVpMOzs7QUFjbkJZLGdCQUFJMEIsR0FBSixDQUFRLGNBQVIsRUFBd0Isd0JBQXhCO0FBQ0FsSixrQkFBTW1KLElBQU4sQ0FDRSw0QkFBYTtBQUNYLHlDQUEyQjtBQUFBLHVCQUFNekIsS0FBS0MsU0FBTCxDQUFlc0IsY0FBZixDQUFOO0FBQUEsZUFEaEI7QUFFWCxpQ0FBbUI7QUFBQSx1QkFBTXZCLEtBQUtDLFNBQUwsQ0FBZW1CLHFCQUFmLENBQU47QUFBQSxlQUZSO0FBR1gsZ0NBQWtCO0FBQUEsdUJBQU1wQixLQUFLQyxTQUFMLDBCQUFOO0FBQUE7QUFIUCxhQUFiLENBREYsRUFNRXdCLElBTkYsQ0FNTzNCLEdBTlA7O0FBZm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXdCQW9CLE9BQU8zTixHQUFQLENBQVcsWUFBWCxFQUF5QixVQUFDNEwsR0FBRCxFQUFNVyxHQUFOLEVBQVc0QixJQUFYLEVBQW9CO0FBQzNDLE1BQUksS0FBSixFQUEyQztBQUN6QztBQUNBLFFBQUl2QyxJQUFJak8sR0FBSixDQUFRRCxVQUFSLENBQW1CLE1BQW5CLEtBQThCa08sSUFBSWpPLEdBQUosQ0FBUUQsVUFBUixDQUFtQixTQUFuQixDQUFsQyxFQUFpRTtBQUMvRGtPLFVBQUlqTyxHQUFKLElBQVcsS0FBWDtBQUNBNE8sVUFBSTBCLEdBQUosQ0FBUSxrQkFBUixFQUE0QixNQUE1QjtBQUNEO0FBQ0QxQixRQUFJNkIsU0FBSixDQUFjLGVBQWQsRUFBK0Isa0JBQS9CO0FBQ0Q7QUFDREQ7QUFDRCxDQVZEOztBQVlBUixPQUFPM04sR0FBUCxDQUFXLGtCQUFRcU8sTUFBUixDQUFlLGVBQUtaLElBQUwsQ0FBVSxNQUFWLEVBQWtCLFFBQWxCLENBQWYsQ0FBWDs7QUFFQUUsT0FBTzNOLEdBQVAsQ0FBVyxVQUFDNEwsR0FBRCxFQUFNVyxHQUFOLEVBQWM7QUFDdkIsTUFBSSxLQUFKLEVBQTJDO0FBQ3pDUSxxQkFBaUJuQixHQUFqQixFQUFzQlcsR0FBdEI7QUFDRCxHQUZELE1BRU87QUFDTDtBQUNBaUIsbUJBQWVqQixHQUFmO0FBQ0Q7QUFDRixDQVBEOztBQVNBTSxPQUFPQyxPQUFQLEdBQWlCYSxNQUFqQixDOzs7Ozs7QUN2SUE7QUFDQTs7O0FBR0E7QUFDQSx1REFBd0QsbUJBQW1CLHVCQUF1QixXQUFXLFlBQVksZ0JBQWdCLGlCQUFpQixxQkFBcUIsOEJBQThCLDhCQUE4Qiw4QkFBOEIsOEJBQThCLDZDQUE2QyxFQUFFLHdDQUF3QywrQ0FBK0MsRUFBRSwrQkFBK0IsdUJBQXVCLHFCQUFxQix3Q0FBd0MsdUJBQXVCLHlCQUF5QixFQUFFLHFEQUFxRCw2RUFBNkUscUVBQXFFLDZEQUE2RCw2RkFBNkYsRUFBRSw4Q0FBOEMsZUFBZSxFQUFFOztBQUV0L0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDYkE7QUFDQTs7O0FBR0E7QUFDQSx5RUFBMEUsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsNENBQTRDLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLDJDQUEyQyxtQkFBbUIscUNBQXFDLEVBQUUsa0RBQWtELDBEQUEwRCwwREFBMEQsb0VBQW9FLG9FQUFvRSx1QkFBdUIsbUJBQW1CLDBCQUEwQixzQkFBc0IsY0FBYyxrQkFBa0Isb0JBQW9CLDhCQUE4QixzQkFBc0IscUJBQXFCLEVBQUUsZ0ZBQWdGLG1CQUFtQix3REFBd0QsZ0RBQWdELHdDQUF3Qyx1RUFBdUUsc0NBQXNDLHNDQUFzQyxFQUFFLGdEQUFnRCwwREFBMEQsMERBQTBELG9FQUFvRSxvRUFBb0UsRUFBRSx1RUFBdUUsd0JBQXdCLEVBQUUscUdBQXFHLHlDQUF5Qyx5Q0FBeUMsRUFBRSxrSEFBa0gsb0JBQW9CLEVBQUUseUNBQXlDLG1CQUFtQix1QkFBdUIsMEJBQTBCLGdCQUFnQiwrQkFBK0Isb0JBQW9CLHNCQUFzQixxQkFBcUIsd0JBQXdCLDRCQUE0Qix1Q0FBdUMsK0JBQStCLEVBQUUscUVBQXFFLHFCQUFxQixtQkFBbUIsRUFBRTs7QUFFcDNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDakJBO0FBQ0E7OztBQUdBO0FBQ0Esa0VBQW1FLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLHFDQUFxQyxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSxxQ0FBcUMsZ0JBQWdCLEVBQUUsOEJBQThCLHVCQUF1QixnQkFBZ0IsaUJBQWlCLHlCQUF5Qix5QkFBeUIsa0JBQWtCLDhCQUE4QiwrQkFBK0IsZ0NBQWdDLDZCQUE2Qiw4QkFBOEIsb0NBQW9DLG1EQUFtRCxtREFBbUQsRUFBRSxtQ0FBbUMsbUNBQW1DLEVBQUUscUNBQXFDLHVCQUF1QixFQUFFLHdDQUF3QywwQkFBMEIsc0JBQXNCLHVCQUF1QixnQkFBZ0IsRUFBRTs7QUFFeDlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2JBO0FBQ0E7OztBQUdBO0FBQ0Esb0VBQXFFLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLHVDQUF1QyxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSw2Q0FBNkMsUUFBUSxrQ0FBa0Msa0NBQWtDLGlCQUFpQixFQUFFLFVBQVUsa0NBQWtDLGtDQUFrQyxpQkFBaUIsRUFBRSxFQUFFLHFDQUFxQyxRQUFRLGtDQUFrQyxrQ0FBa0MsaUJBQWlCLEVBQUUsVUFBVSxrQ0FBa0Msa0NBQWtDLGlCQUFpQixFQUFFLEVBQUUsa0NBQWtDLHlCQUF5Qix5QkFBeUIsa0JBQWtCLHVCQUF1QixnQkFBZ0IsMEJBQTBCLG9CQUFvQix1QkFBdUIscUJBQXFCLDhCQUE4Qiw4QkFBOEIsOEJBQThCLDhCQUE4Qiw2Q0FBNkMscUJBQXFCLGlCQUFpQixFQUFFLHFDQUFxQyw2QkFBNkIscUJBQXFCLGlCQUFpQixrQkFBa0IsaUJBQWlCLG9CQUFvQixFQUFFLCtCQUErQiwwREFBMEQsb0JBQW9CLEVBQUUsRUFBRSwrQkFBK0Isa0JBQWtCLEVBQUUsMERBQTBELG1EQUFtRCxtREFBbUQsb0VBQW9FLEVBQUUsK0JBQStCLDREQUE0RCx1QkFBdUIsRUFBRSxFQUFFOztBQUUzd0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDaEJBO0FBQ0E7OztBQUdBO0FBQ0EscUVBQXNFLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLHdDQUF3QyxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSxvQ0FBb0MsdUJBQXVCLHlCQUF5Qix5QkFBeUIsa0JBQWtCLG1DQUFtQyxrQ0FBa0MsZ0NBQWdDLGdDQUFnQyxnQkFBZ0IscUJBQXFCLDhEQUE4RCxzREFBc0QsRUFBRSxzQ0FBc0MscUJBQXFCLGlCQUFpQixjQUFjLGVBQWUsb0JBQW9CLGtCQUFrQixnQkFBZ0IsRUFBRSxtQ0FBbUMsaUJBQWlCLGdCQUFnQiw4REFBOEQsc0RBQXNELEVBQUUsd0NBQXdDLHVCQUF1QixhQUFhLFdBQVcsaUJBQWlCLGVBQWUsOERBQThELHNEQUFzRCx5QkFBeUIseUJBQXlCLGtCQUFrQiw4QkFBOEIsK0JBQStCLGdDQUFnQyxFQUFFLDBDQUEwQyxtQkFBbUIsc0JBQXNCLEVBQUUsK0NBQStDLHFDQUFxQyx1QkFBdUIsd0JBQXdCLG9CQUFvQixvQkFBb0IscUJBQXFCLEVBQUUsc0RBQXNELG1CQUFtQixnQkFBZ0IsdUJBQXVCLGlCQUFpQixjQUFjLGdCQUFnQiwyQkFBMkIsZ0JBQWdCLHVCQUF1Qiw4REFBOEQsc0RBQXNELEVBQUUsb0NBQW9DLHVCQUF1QixpQkFBaUIsZ0JBQWdCLGVBQWUsaUJBQWlCLDhCQUE4QixxQkFBcUIsb0JBQW9CLHFCQUFxQixnQkFBZ0IsRUFBRSw0REFBNEQsaUJBQWlCLEVBQUUsK0JBQStCLDhEQUE4RCxvQkFBb0IsRUFBRSxFQUFFLCtCQUErQix3R0FBd0csdUJBQXVCLEVBQUUsRUFBRSwrRkFBK0YsaUJBQWlCLEVBQUUsK0JBQStCLGtHQUFrRyxzQkFBc0IsRUFBRSxFQUFFLDhHQUE4Ryx3QkFBd0IsZ0JBQWdCLEVBQUU7O0FBRTc4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNuQkE7QUFDQTs7O0FBR0E7QUFDQSwyRUFBNEUsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsOENBQThDLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLCtDQUErQyx1QkFBdUIsaUJBQWlCLDhCQUE4QixnQkFBZ0IsRUFBRSxpRkFBaUYscUZBQXFGLDZFQUE2RSxFQUFFOztBQUUxbUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ1pBO0FBQ0E7OztBQUdBO0FBQ0EsMENBQTJDLGdCQUFnQiwwQkFBMEIsMEJBQTBCLG1CQUFtQixFQUFFOztBQUVwSTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNWQTtBQUNBOzs7QUFHQTtBQUNBLHNFQUF1RSxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSx5Q0FBeUMsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsNkNBQTZDLHdCQUF3QixvQkFBb0Isb0JBQW9CLHlCQUF5Qix5QkFBeUIsa0JBQWtCLGlDQUFpQyxrQ0FBa0MsbUNBQW1DLG1DQUFtQyxFQUFFLGdDQUFnQyx3QkFBd0Isb0JBQW9CLG9CQUFvQixrQkFBa0IsRUFBRSw4REFBOEQsV0FBVyxZQUFZLEVBQUUsOEJBQThCLHVCQUF1Qix5Q0FBeUMseUNBQXlDLGtCQUFrQixFQUFFLDREQUE0RCxlQUFlLHFDQUFxQyxxQ0FBcUMsdUhBQXVILCtHQUErRyx1R0FBdUcsNEpBQTRKLEVBQUUsOEJBQThCLHFDQUFxQyxxQ0FBcUMsZUFBZSxFQUFFLDREQUE0RCx1QkFBdUIsY0FBYyxlQUFlLDBDQUEwQywwQ0FBMEMsZUFBZSx1SEFBdUgsK0dBQStHLHVHQUF1Ryw0SkFBNEosRUFBRSwrQkFBK0Isa0JBQWtCLEVBQUUsOERBQThELGVBQWUsa0VBQWtFLDBEQUEwRCxFQUFFOztBQUUzakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2xCQTtBQUNBOzs7QUFHQTtBQUNBLHFFQUFzRSxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSx3Q0FBd0MsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUseUNBQXlDLGdCQUFnQix3QkFBd0Isb0JBQW9CLG9CQUFvQix5QkFBeUIseUJBQXlCLGtCQUFrQiw4QkFBOEIsK0JBQStCLGdDQUFnQyw2QkFBNkIsOEJBQThCLG9DQUFvQyxFQUFFLHVDQUF1QyxxREFBcUQscURBQXFELEVBQUUsK0JBQStCLHFFQUFxRSxxRUFBcUUsRUFBRSxpREFBaUQsUUFBUSxzQ0FBc0Msc0NBQXNDLEVBQUUsVUFBVSx3Q0FBd0Msd0NBQXdDLEVBQUUsRUFBRSx5Q0FBeUMsUUFBUSxzQ0FBc0Msc0NBQXNDLEVBQUUsVUFBVSx3Q0FBd0Msd0NBQXdDLEVBQUUsRUFBRSw0QkFBNEIsMEJBQTBCLHlCQUF5QixxQ0FBcUMscUNBQXFDLDBIQUEwSCwwSEFBMEgsRUFBRSxnREFBZ0QsUUFBUSxzQkFBc0IsRUFBRSxTQUFTLHNCQUFzQixFQUFFLFVBQVUsc0JBQXNCLEVBQUUsRUFBRSx3Q0FBd0MsUUFBUSxzQkFBc0IsRUFBRSxTQUFTLHNCQUFzQixFQUFFLFVBQVUsc0JBQXNCLEVBQUUsRUFBRSw4Q0FBOEMsUUFBUSw2QkFBNkIsRUFBRSxTQUFTLCtCQUErQix3Q0FBd0Msd0NBQXdDLEVBQUUsVUFBVSw2QkFBNkIsd0NBQXdDLHdDQUF3QyxFQUFFLEVBQUUsc0NBQXNDLFFBQVEsNkJBQTZCLEVBQUUsU0FBUywrQkFBK0Isd0NBQXdDLHdDQUF3QyxFQUFFLFVBQVUsNkJBQTZCLHdDQUF3Qyx3Q0FBd0MsRUFBRSxFQUFFOztBQUUxcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNqQkE7QUFDQTs7O0FBR0E7QUFDQSwrREFBZ0UsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsa0NBQWtDLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLGtDQUFrQyx1QkFBdUIsZ0JBQWdCLGlCQUFpQixlQUFlLHFCQUFxQixFQUFFLCtCQUErQixvQ0FBb0Msd0JBQXdCLHFCQUFxQixnQkFBZ0IsZUFBZSxvQkFBb0Isd0JBQXdCLHFCQUFxQix5QkFBeUIsNkJBQTZCLEVBQUUsRUFBRSwrQkFBK0IseUNBQXlDLHFCQUFxQixrQkFBa0IseUJBQXlCLGtCQUFrQixhQUFhLGNBQWMsa0JBQWtCLG1CQUFtQiwwQ0FBMEMsaUJBQWlCLDJCQUEyQixvRUFBb0UsNERBQTRELEVBQUUsRUFBRSwrQkFBK0Isb0RBQW9ELG9CQUFvQixFQUFFLEVBQUUsK0JBQStCLG9EQUFvRCwyQkFBMkIsRUFBRSxFQUFFLCtCQUErQiwyREFBMkQsaUJBQWlCLEVBQUUsRUFBRSx3QkFBd0IseUJBQXlCLHlCQUF5QixrQkFBa0IsaUNBQWlDLGtDQUFrQyxtQ0FBbUMsbUNBQW1DLHVCQUF1QixpQkFBaUIsZ0JBQWdCLDRFQUE0RSxvRUFBb0UsNERBQTRELGlIQUFpSCxFQUFFLCtCQUErQiwwQkFBMEIseURBQXlELHlEQUF5RCxnQkFBZ0IsZUFBZSx5QkFBeUIsbUJBQW1CLDZDQUE2Qyw2Q0FBNkMsK0JBQStCLEVBQUUsRUFBRSw2Q0FBNkMsMkVBQTJFLG1FQUFtRSwyREFBMkQsK0dBQStHLEVBQUUsK0JBQStCLHVFQUF1RSx5Q0FBeUMseUNBQXlDLEVBQUUsRUFBRSxzQ0FBc0MsbUJBQW1CLHFDQUFxQyw4QkFBOEIsRUFBRSw2QkFBNkIsdUJBQXVCLHFCQUFxQixvQkFBb0IsaUJBQWlCLDBCQUEwQix5QkFBeUIseUJBQXlCLGtCQUFrQiw4QkFBOEIsK0JBQStCLGdDQUFnQyxFQUFFLGlDQUFpQyx5QkFBeUIsaUJBQWlCLEVBQUUsa0NBQWtDLGtCQUFrQixFQUFFLGlEQUFpRCxtQkFBbUIsRUFBRSxvREFBb0QscUJBQXFCLG1CQUFtQixFQUFFLDZCQUE2QixrQkFBa0IsOEJBQThCLEVBQUUsaUNBQWlDLGtCQUFrQixFQUFFLGdDQUFnQyw4QkFBOEIsd0JBQXdCLGNBQWMsRUFBRSxrQ0FBa0Msa0JBQWtCLDhCQUE4QixxQ0FBcUMsRUFBRSx3Q0FBd0MsOEJBQThCLEVBQUUsa0NBQWtDLDhCQUE4Qix3QkFBd0Isb0JBQW9CLG9CQUFvQix1QkFBdUIsdUJBQXVCLHNDQUFzQyx5QkFBeUIseUJBQXlCLGtCQUFrQixFQUFFLCtCQUErQixnQkFBZ0IsOEJBQThCLEVBQUU7O0FBRXR6STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUN0QkE7QUFDQTs7O0FBR0E7QUFDQSxvRUFBcUUsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsdUNBQXVDLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLDZCQUE2Qix1QkFBdUIsaUNBQWlDLGlCQUFpQixnQkFBZ0IsOEJBQThCLHlCQUF5Qix5QkFBeUIsa0JBQWtCLG1DQUFtQyxrQ0FBa0MsZ0NBQWdDLGdDQUFnQyw4QkFBOEIsK0JBQStCLGdDQUFnQyw4QkFBOEIsK0JBQStCLDJDQUEyQyxzREFBc0Qsc0RBQXNELEVBQUUsK0JBQStCLCtCQUErQixxQ0FBcUMsRUFBRSxFQUFFLHNDQUFzQyxxQkFBcUIsRUFBRSx1Q0FBdUMsdUJBQXVCLHlCQUF5Qix5QkFBeUIsa0JBQWtCLDhCQUE4QiwrQkFBK0IsZ0NBQWdDLDZCQUE2Qiw4QkFBOEIsb0NBQW9DLFdBQVcsWUFBWSxpQkFBaUIsZ0JBQWdCLEVBQUUsK0JBQStCLHlDQUF5QyxtQkFBbUIsRUFBRSxFQUFFLDRCQUE0QixtQkFBbUIsd0JBQXdCLG9CQUFvQixvQkFBb0IsdUJBQXVCLGdCQUFnQixvQkFBb0Isd0NBQXdDLGdDQUFnQyxxQkFBcUIsd0JBQXdCLDRCQUE0QixFQUFFLDBEQUEwRCxpQ0FBaUMsRUFBRSwrQkFBK0IsK0VBQStFLGlCQUFpQixpQkFBaUIsRUFBRSxFQUFFLCtCQUErQix5RkFBeUYsZUFBZSxFQUFFLEVBQUUsK0JBQStCLDBGQUEwRiwwQkFBMEIsc0JBQXNCLHNCQUFzQixFQUFFLEVBQUUsK0JBQStCLDJEQUEyRCwrQkFBK0IsK0JBQStCLEVBQUUsRUFBRTs7QUFFbmdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNsQkE7QUFDQTs7O0FBR0E7QUFDQSxzRUFBdUUsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUseUNBQXlDLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLHdDQUF3QyxvQkFBb0IsZ0JBQWdCLGlCQUFpQixjQUFjLFlBQVkseUJBQXlCLHlCQUF5QixrQkFBa0IsMEJBQTBCLDJCQUEyQixzQ0FBc0MsRUFBRSwrQkFBK0IsMENBQTBDLGlDQUFpQyxrQ0FBa0Msd0NBQXdDLEVBQUUsRUFBRSx5RUFBeUUsbUJBQW1CLHVDQUF1Qyx1Q0FBdUMsaUJBQWlCLHlIQUF5SCxpSEFBaUgseUdBQXlHLDhKQUE4SixFQUFFLGlDQUFpQyw2RUFBNkUscUJBQXFCLEVBQUUsRUFBRSxvR0FBb0csNkJBQTZCLDZCQUE2QixzQkFBc0IsdUNBQXVDLHNDQUFzQyxvQ0FBb0Msb0NBQW9DLDRCQUE0QixrQ0FBa0MsMkJBQTJCLDBEQUEwRCwwREFBMEQsRUFBRSxpSUFBaUksOEJBQThCLDBCQUEwQiwwQkFBMEIsc0JBQXNCLDBCQUEwQixnQ0FBZ0MsNEJBQTRCLDRCQUE0QixFQUFFLGdJQUFnSSw2QkFBNkIsMkJBQTJCLHVCQUF1QixxQkFBcUIsb0JBQW9CLDBCQUEwQiw0QkFBNEIsMEJBQTBCLG9DQUFvQyx5QkFBeUIsd0JBQXdCLDBCQUEwQixFQUFFLGtHQUFrRywyQ0FBMkMsMkNBQTJDLGlCQUFpQixFQUFFOztBQUVsK0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDaEJBO0FBQ0E7OztBQUdBO0FBQ0EsNkRBQThELFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLGdDQUFnQyxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSxnQkFBZ0IsaUJBQWlCLGdCQUFnQixxQkFBcUIsY0FBYyxlQUFlLHNDQUFzQyxvQkFBb0IsRUFBRSxPQUFPLG1DQUFtQyxtQ0FBbUMsd0RBQXdELEVBQUUsNkJBQTZCLHlCQUF5Qix5QkFBeUIsa0JBQWtCLGlDQUFpQyxrQ0FBa0MsbUNBQW1DLG1DQUFtQyxrQkFBa0IsaUJBQWlCLEVBQUUsOEJBQThCLGdCQUFnQixpQkFBaUIsd0JBQXdCLG9CQUFvQixvQkFBb0IseUJBQXlCLHlCQUF5QixrQkFBa0IsbUNBQW1DLGtDQUFrQyxnQ0FBZ0MsZ0NBQWdDLHFCQUFxQixFQUFFOztBQUV0bUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUNYQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEOzs7Ozs7O0FDNUJBLCtEOzs7Ozs7QUNBQSxpRTs7Ozs7O0FDQUEsZ0U7Ozs7OztBQ0FBLHVDOzs7Ozs7QUNBQSwrQjs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSwwQzs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUFkLE9BQU9DLE9BQVAsR0FBaUI7QUFDZm5DLFNBQU8sY0FEUTtBQUVmQyxlQUFhO0FBRkUsQ0FBakIsQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiMGE5OGVkOTg0MmIzMjlhMzc1ZCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5Jyk7XG5cbnZhciBfc3RyaW5naWZ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0cmluZ2lmeSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheScpO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2xpY2VkVG9BcnJheTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3InKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIElzb21vcnBoaWMgQ1NTIHN0eWxlIGxvYWRlciBmb3IgV2VicGFja1xuICpcbiAqIENvcHlyaWdodCDCqSAyMDE1LTIwMTYgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHByZWZpeCA9ICdzJztcbnZhciBpbnNlcnRlZCA9IHt9O1xuXG4vLyBCYXNlNjQgZW5jb2RpbmcgYW5kIGRlY29kaW5nIC0gVGhlIFwiVW5pY29kZSBQcm9ibGVtXCJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dCYXNlNjQvQmFzZTY0X2VuY29kaW5nX2FuZF9kZWNvZGluZyNUaGVfVW5pY29kZV9Qcm9ibGVtXG5mdW5jdGlvbiBiNjRFbmNvZGVVbmljb2RlKHN0cikge1xuICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9nLCBmdW5jdGlvbiAobWF0Y2gsIHAxKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoJzB4JyArIHAxKTtcbiAgfSkpO1xufVxuXG4vKipcbiAqIFJlbW92ZSBzdHlsZS9saW5rIGVsZW1lbnRzIGZvciBzcGVjaWZpZWQgbm9kZSBJRHNcbiAqIGlmIHRoZXkgYXJlIG5vIGxvbmdlciByZWZlcmVuY2VkIGJ5IFVJIGNvbXBvbmVudHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNzcyhpZHMpIHtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoaWRzKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGlkID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGlmICgtLWluc2VydGVkW2lkXSA8PSAwKSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgaWQpO1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBFeGFtcGxlOlxuICogICAvLyBJbnNlcnQgQ1NTIHN0eWxlcyBvYmplY3QgZ2VuZXJhdGVkIGJ5IGBjc3MtbG9hZGVyYCBpbnRvIERPTVxuICogICB2YXIgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKFtbMSwgJ2JvZHkgeyBjb2xvcjogcmVkOyB9J11dKTtcbiAqXG4gKiAgIC8vIFJlbW92ZSBpdCBmcm9tIHRoZSBET01cbiAqICAgcmVtb3ZlQ3NzKCk7XG4gKi9cbmZ1bmN0aW9uIGluc2VydENzcyhzdHlsZXMpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZiRyZXBsYWNlID0gX3JlZi5yZXBsYWNlLFxuICAgICAgcmVwbGFjZSA9IF9yZWYkcmVwbGFjZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHJlcGxhY2UsXG4gICAgICBfcmVmJHByZXBlbmQgPSBfcmVmLnByZXBlbmQsXG4gICAgICBwcmVwZW5kID0gX3JlZiRwcmVwZW5kID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkcHJlcGVuZDtcblxuICB2YXIgaWRzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9zdHlsZXMkaSA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkoc3R5bGVzW2ldLCA0KSxcbiAgICAgICAgbW9kdWxlSWQgPSBfc3R5bGVzJGlbMF0sXG4gICAgICAgIGNzcyA9IF9zdHlsZXMkaVsxXSxcbiAgICAgICAgbWVkaWEgPSBfc3R5bGVzJGlbMl0sXG4gICAgICAgIHNvdXJjZU1hcCA9IF9zdHlsZXMkaVszXTtcblxuICAgIHZhciBpZCA9IG1vZHVsZUlkICsgJy0nICsgaTtcblxuICAgIGlkcy5wdXNoKGlkKTtcblxuICAgIGlmIChpbnNlcnRlZFtpZF0pIHtcbiAgICAgIGlmICghcmVwbGFjZSkge1xuICAgICAgICBpbnNlcnRlZFtpZF0rKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0ZWRbaWRdID0gMTtcblxuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgaWQpO1xuICAgIHZhciBjcmVhdGUgPSBmYWxzZTtcblxuICAgIGlmICghZWxlbSkge1xuICAgICAgY3JlYXRlID0gdHJ1ZTtcblxuICAgICAgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgZWxlbS5pZCA9IHByZWZpeCArIGlkO1xuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjc3NUZXh0ID0gY3NzO1xuICAgIGlmIChzb3VyY2VNYXAgJiYgYnRvYSkge1xuICAgICAgLy8gc2tpcCBJRTkgYW5kIGJlbG93LCBzZWUgaHR0cDovL2Nhbml1c2UuY29tL2F0b2ItYnRvYVxuICAgICAgY3NzVGV4dCArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYjY0RW5jb2RlVW5pY29kZSgoMCwgX3N0cmluZ2lmeTIuZGVmYXVsdCkoc291cmNlTWFwKSkgKyAnKi8nO1xuICAgICAgY3NzVGV4dCArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLmZpbGUgKyAnPycgKyBpZCArICcqLyc7XG4gICAgfVxuXG4gICAgaWYgKCd0ZXh0Q29udGVudCcgaW4gZWxlbSkge1xuICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB9XG5cbiAgICBpZiAoY3JlYXRlKSB7XG4gICAgICBpZiAocHJlcGVuZCkge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShlbGVtLCBkb2N1bWVudC5oZWFkLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVtb3ZlQ3NzLmJpbmQobnVsbCwgaWRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRDc3M7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBBVVRPX0RPV05MT0FEX0VYUElSWSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVEcmF3ZXIgPSAoYm9vbCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdUT0dHTEVfRFJBV0VSJyxcbiAgICBwYXlsb2FkOiBib29sLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZVNlYXJjaCA9IChib29sKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1RPR0dMRV9TRUFSQ0gnLFxuICAgIHBheWxvYWQ6IGJvb2wsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlV2F0ZXJmYWxsSGVhZGVyID0gKGJvb2wpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnVE9HR0xFX1dBVEVSRkFMTF9IRUFERVInLFxuICAgIHBheWxvYWQ6IGJvb2wsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NVcGRhdGUgPSAocGVyY2VudGFnZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQUk9HUkVTU19VUERBVEUnLFxuICAgIHBheWxvYWQ6IHBlcmNlbnRhZ2UsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcHVzaFRvYXN0ID0gKG1lc3NhZ2VUZXh0LCBhY3Rpb25UZXh0LCB0aW1lb3V0LCBjYWxsYmFjaykgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQVVNIX1RPQVNUJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBtZXNzYWdlVGV4dCxcbiAgICAgIGFjdGlvblRleHQsXG4gICAgICB0aW1lb3V0LFxuICAgICAgY2FsbGJhY2ssXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBwb3BUb2FzdCA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnUE9QX1RPQVNUJyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRBdXRvRG93bmxvYWRSZXN1bHQgPSAoYm9vbCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdBVVRPX0RPV05MT0FEJyxcbiAgICBwYXlsb2FkOiBib29sLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEF1dG9Eb3dubG9hZCA9IChib29sKSA9PiB7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcblxuICAgIGRpc3BhdGNoKHNldEF1dG9Eb3dubG9hZFJlc3VsdChib29sKSk7XG4gIH07XG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvYWN0aW9ucy91dGlscy5qcyIsImltcG9ydCB7IHB1c2hUb2FzdCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3Qgc2VhcmNoID0gKHF1ZXJ5KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NFQVJDSF9RVUVSWScsXG4gICAgcGF5bG9hZDogcXVlcnksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWRkRmlsdGVyID0gKGZpbHRlcikgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdBRERfRklMVEVSJyxcbiAgICBwYXlsb2FkOiBmaWx0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmlsdGVyID0gKGZpbHRlcikgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdSRU1PVkVfRklMVEVSJyxcbiAgICBwYXlsb2FkOiBmaWx0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcGFnZUxpc3RMb2FkaW5nID0gKGJvb2wpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnUEFHRUxJU1RfTE9BRElORycsXG4gICAgcGF5bG9hZDogYm9vbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYWdlTGlzdEVycm9yID0gKGJvb2wpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnUEFHRUxJU1RfRVJST1InLFxuICAgIHBheWxvYWQ6IGJvb2wsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcGFnZUxpc3RGZXRjaFN1Y2Nlc3MgPSAoZW50cmllcykgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQQUdFTElTVF9GRVRDSF9TVUNDRVNTJyxcbiAgICBwYXlsb2FkOiBlbnRyaWVzLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoUGFnZUxpc3QgPSAoKSA9PiB7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcbiAgICBsZXQgbmV0d29ya0RhdGFSZWNpZXZlZCA9IGZhbHNlO1xuICAgIGxldCBjYWNoZURhdGFSZWNpZXZlZCA9IGZhbHNlO1xuXG4gICAgZGlzcGF0Y2gocGFnZUxpc3RMb2FkaW5nKHRydWUpKTtcbiAgICBkaXNwYXRjaChwYWdlTGlzdEVycm9yKGZhbHNlKSk7XG5cbiAgICBjb25zdCBuZXR3b3JrVXBkYXRlID0gZmV0Y2goJy9hcGkvcGFnZXMnKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4geyByZXR1cm4gcmVzcG9uc2UuanNvbigpOyB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgbmV0d29ya0RhdGFSZWNpZXZlZCA9IHRydWU7XG5cbiAgICAgIGlmICghY2FjaGVEYXRhUmVjaWV2ZWQpIHtcbiAgICAgICAgZGlzcGF0Y2gocGFnZUxpc3RMb2FkaW5nKGZhbHNlKSk7XG4gICAgICAgIGRpc3BhdGNoKHBhZ2VMaXN0RmV0Y2hTdWNjZXNzKHJlc3BvbnNlLmZpZWxkcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY29tcGFyZSB0aGUgY2FjaGVkIGFuZCByZXRyaWV2ZWQgcGFnZWxpc3RzXG4gICAgICAgIGlmIChjYWNoZURhdGFSZWNpZXZlZC5zeXMuaWQgIT09IHJlc3BvbnNlLnN5cy5pZCkge1xuICAgICAgICAgIC8vIHRoZSBuZXR3b3JrIHJlcXVlc3QgcmVzcG9uc2UgaGFzIG5ld2VyIGNvbnRlbnQgdGhhbiB0aGUgY2FjaGVkIHJlc3BvbnNlXG4gICAgICAgICAgZGlzcGF0Y2gocHVzaFRvYXN0KCdOZXdlciBjb250ZW50IGlzIGF2YWlsYWJsZSwgcmVsb2FkIHRvIHVwZGF0ZScsICdyZWxvYWQnLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7ICAgICAgICAgICAgXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNhY2hlZCBwYWdlbGlzdCBpcyB1cCB0byBkYXRlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGRpc3BhdGNoKHBhZ2VMaXN0RmV0Y2hTdWNjZXNzKHRydWUpKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcblxuICAgIC8vIGZldGNoIGNhY2hlZCBkYXRhXG4gICAgY2FjaGVzLm1hdGNoKCcvYXBpL3BhZ2VzJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmICghcmVzcG9uc2UpIHRocm93IEVycm9yKFwiTm8gZGF0YVwiKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY2FjaGVEYXRhUmVjaWV2ZWQgPSBkYXRhO1xuICAgICAgLy8gd2UgaGF2ZSB1c2VkIHRoZSBkYXRhIGZyb20gdGhlIGNhY2hlIGFzIHRoZSByZXNwb25zZSBoZXJlXG4gICAgICBpZiAoIW5ldHdvcmtEYXRhUmVjaWV2ZWQpIHtcbiAgICAgICAgZGlzcGF0Y2gocGFnZUxpc3RMb2FkaW5nKGZhbHNlKSk7XG4gICAgICAgIGRpc3BhdGNoKHBhZ2VMaXN0RmV0Y2hTdWNjZXNzKGRhdGEuZmllbGRzKSk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldHdvcmtVcGRhdGU7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2FjdGlvbnMvcGFnZS1saXN0LmpzIiwiLy8gbWV0YVxuZXhwb3J0IGNvbnN0IElEQl9WRVJTSU9OX05PID0gMTtcblxuLy8gY29udGVudCBtb2RlbFxuZXhwb3J0IGNvbnN0IFRBR0dFRF9JTiA9ICd0YWdnZWRpbic7XG5cbi8vIGRyYXdlclxuZXhwb3J0IGNvbnN0IElOSVRJQVRFX0RSQUdHSU5HX1RIUkVTSE9MRCA9IDMwO1xuZXhwb3J0IGNvbnN0IERSQVdFUl9DTE9TRV9USFJFU0hPTEQgPSAzMDtcblxuLy8gY2FjaGVzXG5leHBvcnQgY29uc3QgUlVOVElNRV9DQUNIRSA9ICdlY21hc3ludGF4LXJ1bnRpbWUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC91dGlscy9jb25zdGFudHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcblxuaW1wb3J0IHMgZnJvbSAnLi9yaXBwbGUuc2Nzcyc7XG5cbmNsYXNzIFJpcHBsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlUmlwcGxlOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBvblRvdWNoU3RhcnQgPSAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCByZWN0ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5wYXJlbnRIZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgICB0aGlzLnBhcmVudFdpZHRoID0gcmVjdC53aWR0aDtcbiAgICB0aGlzLnBhcmVudFggPSByZWN0LmxlZnQ7XG4gICAgdGhpcy5wYXJlbnRZID0gcmVjdC50b3A7XG5cbiAgICBjb25zdCBjbGlja1ggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgY29uc3QgY2xpY2tZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgY29uc3QgeCA9IGNsaWNrWCAtIHRoaXMucGFyZW50WDtcbiAgICBjb25zdCB5ID0gY2xpY2tZIC0gdGhpcy5wYXJlbnRZO1xuXG4gICAgdGhpcy5jcmVhdGVSaXBwbGUoeCwgeSk7XG4gIH1cblxuICBvbk1vdXNlRG93biA9IChlKSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMucGFyZW50SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgdGhpcy5wYXJlbnRXaWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgdGhpcy5wYXJlbnRYID0gcmVjdC5sZWZ0O1xuICAgIHRoaXMucGFyZW50WSA9IHJlY3QudG9wO1xuXG4gICAgY29uc3QgY2xpY2tYID0gZS5wYWdlWDtcbiAgICBjb25zdCBjbGlja1kgPSBlLnBhZ2VZO1xuXG4gICAgY29uc3QgeCA9IGNsaWNrWCAtIHRoaXMucGFyZW50WDtcbiAgICBjb25zdCB5ID0gY2xpY2tZIC0gdGhpcy5wYXJlbnRZO1xuXG4gICAgdGhpcy5jcmVhdGVSaXBwbGUoeCwgeSk7XG4gIH1cblxuICBvbk1vdXNlVXAgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlUmlwcGxlKSB7XG4gICAgICB0aGlzLmZhZGVPdXRSaXBwbGUodGhpcy5zdGF0ZS5hY3RpdmVSaXBwbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVSaXBwbGUpIHtcbiAgICAgIHRoaXMuZmFkZU91dFJpcHBsZSh0aGlzLnN0YXRlLmFjdGl2ZVJpcHBsZSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUmlwcGxlID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCByaXBwbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgcmlwcGxlLmNsYXNzTGlzdC5hZGQoc1sncmlwcGxlLW9yaWdpbiddKTtcblxuICAgIHJpcHBsZS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuXG5cbiAgICBjb25zdCBzaXplID0gTWF0aC5zcXJ0KCh0aGlzLnBhcmVudFdpZHRoICoqIDIpICsgKHRoaXMucGFyZW50SGVpZ2h0ICoqIDIpKTtcbiAgICByaXBwbGUuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICByaXBwbGUuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG4gICAgcmlwcGxlLnN0eWxlLmxlZnQgPSBgJHt4IC0gKHNpemUgLyAyKX1weGA7XG4gICAgcmlwcGxlLnN0eWxlLnRvcCA9IGAke3kgLSAoc2l6ZSAvIDIpfXB4YDtcblxuICAgIHJpcHBsZS5jbGFzc0xpc3QuYWRkKHMuYW5pbWF0YWJsZSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyaXBwbGUpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBhY3RpdmVSaXBwbGU6IHJpcHBsZSxcbiAgICB9KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICByaXBwbGUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDIpJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZmFkZU91dFJpcHBsZSA9IChyaXBwbGUpID0+IHtcbiAgICByaXBwbGUuY2xhc3NMaXN0LmFkZChzLm91dCk7XG5cbiAgICByaXBwbGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIChlKSA9PiB7XG4gICAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgICB0aGlzLnJlbW92ZVJpcHBsZShyaXBwbGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlUmlwcGxlID0gKHJpcHBsZSkgPT4ge1xuICAgIGlmIChyaXBwbGUgJiYgcmlwcGxlLnBhcmVudE5vZGUgPT09IHRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZChyaXBwbGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3NbJ3JpcHBsZS1jb250YWluZXInXX1cbiAgICAgICAgb25Nb3VzZURvd249e3RoaXMub25Nb3VzZURvd259IG9uTW91c2VVcD17dGhpcy5vbk1vdXNlVXB9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5vbk1vdXNlTGVhdmV9XG4gICAgICAgIHJlZj17KGRpdikgPT4geyB0aGlzLmNvbnRhaW5lciA9IGRpdjsgfX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJpcHBsZS5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudCxcbn07XG5cblJpcHBsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShSaXBwbGUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcblxuaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICd1cmwtc2VhcmNoLXBhcmFtcyc7XG5cbmltcG9ydCBzIGZyb20gJy4vbGluay5zY3NzJztcblxuY2xhc3MgUm91dGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNsaWNrSGFuZGxlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMucm91dGUuc3RhcnRzV2l0aCgnPycpKSB7XG4gICAgICAvLyBsb2NhdGlvbi5zZWFyY2ggPSB0aGlzLnByb3BzLnJvdXRlO1xuXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgdXJsLnNlYXJjaCA9IHRoaXMucHJvcHMucm91dGU7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgbnVsbCwgdXJsLmhyZWYpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCAodGhpcy5wcm9wcy5yb3V0ZSkpO1xuICAgIH1cblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncG9wc3RhdGUnKSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5oYW5kbGVDbGljaykgdGhpcy5wcm9wcy5oYW5kbGVDbGljayhlKTtcbiAgfVxuICAgIFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGFcbiAgICAgICAgaHJlZj17dGhpcy5wcm9wcy5yb3V0ZX1cbiAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XG4gICAgICAgIGNsYXNzTmFtZT17cy5yb3V0ZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2E+XG4gICAgKTtcbiAgfVxuXG59XG5cblJvdXRlLnByb3BUeXBlcyA9IHtcbiAgcm91dGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQsXG4gIGhhbmRsZUNsaWNrOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuUm91dGUuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogbnVsbCxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxufTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKCkge1xuICByZXR1cm4ge1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShSb3V0ZSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvbGluay9saW5rLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcblxuaW1wb3J0IHMgZnJvbSAnLi9yb3V0ZS1oYW5kbGVyLnNjc3MnO1xuXG5jbGFzcyBSb3V0ZUhhbmRsZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWxpZFJvdXRlczogW10sXG4gICAgICBub3RGb3VuZFJvdXRlOiA8ZGl2PjQwNDwvZGl2PixcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7ICBcbiAgICBcbiAgICBsZXQgdmFsaWRSb3V0ZXMgPSBbXTtcbiAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnByb3BzLmhhc093blByb3BlcnR5KCdub3Rmb3VuZCcpKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBub3RGb3VuZFJvdXRlOiBjaGlsZCB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRSb3V0ZXMucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnZhbGlkUm91dGVzID0gdmFsaWRSb3V0ZXM7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbi5ocmVmLFxuICAgIH0pXG5cbiAgICB0aGlzLm9uUG9wU3RhdGUoKTtcbiAgfVxuICBcblxuICBzdGF0aWMgVXBkYXRlUm91dGUocm91dGUpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcm91dGUpO1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncG9wc3RhdGUnKSk7XG4gIH1cblxuICBzdGF0aWMgUmVwbGFjZVJvdXRlKHJvdXRlKSB7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIG51bGwsIHJvdXRlKTtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3BvcHN0YXRlJykpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgfVxuXG4gIG9uUG9wU3RhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5wcm9ncmVzc1VwZGF0ZSgwKTtcbiAgICB0aGlzLmNob29zZUFjdGl2ZVJvdXRlKCk7XG4gIH1cblxuICBjaG9vc2VBY3RpdmVSb3V0ZSA9ICgpID0+IHsgIFxuICAgIGxldCBjb250ZW50OyAgXG5cbiAgICBpZiAobG9jYXRpb24uc2VhcmNoKSB7XG4gICAgICBmb3IgKGxldCB2YWxpZFJvdXRlIG9mIHRoaXMudmFsaWRSb3V0ZXMpIHtcbiAgICAgICAgaWYgKHZhbGlkUm91dGUucHJvcHMucXVlcnkpIHtcbiAgICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsaWRSb3V0ZS5wcm9wcy5wYXRoKVxuICAgICAgICAgIGlmIChyZWdleC50ZXN0KGxvY2F0aW9uLnNlYXJjaCkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSB2YWxpZFJvdXRlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBcblxuICAgIGlmICghY29udGVudCkge1xuICAgICAgZm9yIChsZXQgdmFsaWRSb3V0ZSBvZiB0aGlzLnZhbGlkUm91dGVzKSB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh2YWxpZFJvdXRlLnByb3BzLnBhdGgpXG4gICAgICAgIGlmIChyZWdleC50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSkge1xuICAgICAgICAgIGNvbnRlbnQgPSB2YWxpZFJvdXRlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoY29udGVudCkge1xuICAgICAgdGhpcy5wcm9wcy5wcm9ncmVzc1VwZGF0ZSg1MCk7XG4gICAgfVxuICAgIGNvbnRlbnQgPSBjb250ZW50IHx8IHRoaXMuc3RhdGUubm90Rm91bmRSb3V0ZTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29udGVudDogUmVhY3QuY2xvbmVFbGVtZW50KFxuICAgICAgICBjb250ZW50LFxuICAgICAgICB7IGxvY2F0aW9uOiBgJHtsb2NhdGlvbi5ocmVmfWAgfVxuICAgICAgKVxuICAgIH0pO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydwYWdlLXZpZXcnXX0+XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRlbnR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJvdXRlSGFuZGxlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGFjdGl2ZVBhZ2U6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFJvdXRlSGFuZGxlcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9yb3V0ZS1oYW5kbGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNyeXB0b1wiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCBhcGlSb3V0ZXIgZnJvbSAnLi9hcGknO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5cbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5wb3J0IHx8IDUwMDA7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZSgnL2FwaScsIGFwaVJvdXRlcilcblxuYXBwLnVzZSgnLycsIHJvdXRlcyk7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgc2VydmVyIGxpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH1gKVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIvc2VydmVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcIjQwNC5qc1wiOlwiL3N0YXRpYy9qcy80MDQuY2h1bmsuanNcIixcImFib3V0LmpzXCI6XCIvc3RhdGljL2pzL2Fib3V0LmNodW5rLmpzXCIsXCJhcHAuanNcIjpcIi9zdGF0aWMvanMvYXBwLmJ1bmRsZS5qc1wiLFwiYXJ0aWNsZS5qc1wiOlwiL3N0YXRpYy9qcy9hcnRpY2xlLmNodW5rLmpzXCIsXCJzZWFyY2guanNcIjpcIi9zdGF0aWMvanMvc2VhcmNoLmNodW5rLmpzXCIsXCJ2ZW5kb3IuanNcIjpcIi9zdGF0aWMvanMvdmVuZG9yLmJ1bmRsZS5qc1wifVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9jbGllbnQvc3RhdGljL2pzL21hbmlmZXN0Lmpzb25cbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHRvZ2dsZURyYXdlciwgdG9nZ2xlU2VhcmNoLCBwcm9ncmVzc1VwZGF0ZSwgcHVzaFRvYXN0IH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IHNlYXJjaCB9IGZyb20gJy4vcGFnZS1saXN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBwYWdlRmV0Y2hFcnJvciA9IChib29sKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6ICdQQUdFX0VSUk9SJyxcclxuICAgIHBheWxvYWQ6IGJvb2wsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwYWdlSXNMb2FkaW5nID0gKGJvb2wpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogJ1BBR0VfTE9BRElORycsXHJcbiAgICBwYXlsb2FkOiBib29sLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlUm91dGUgPSAocm91dGUpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogJ0FDVElWRV9ST1VURScsXHJcbiAgICBwYXlsb2FkOiByb3V0ZSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVBhZ2UgPSAocGFnZSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiAnQUNUSVZFX1BBR0UnLFxyXG4gICAgcGF5bG9hZDogcGFnZSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVBhZ2VUeXBlID0gKHR5cGUpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogJ0FDVElWRV9QQUdFX1RZUEUnLFxyXG4gICAgcGF5bG9hZDogdHlwZSxcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVQYWdlVGl0bGUgPSAodGl0bGUpID0+IHtcclxuICBkb2N1bWVudC50aXRsZSA9IGBFQ01BU3ludGF4IC0gJHt0aXRsZX1gO1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiAnQUNUSVZFX1BBR0VfVElUTEUnLFxyXG4gICAgcGF5bG9hZDogdGl0bGUsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwYWdlRmV0Y2hTdWNjZXNzID0gKHBhZ2UpID0+IHtcclxuICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChzZXRBY3RpdmVQYWdlKHBhZ2UpKTsgICAgXHJcbiAgICBkaXNwYXRjaChwYWdlSXNMb2FkaW5nKGZhbHNlKSk7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaFBhZ2UgPSAocm91dGUpID0+IHtcclxuICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICBsZXQgbmV0d29ya0RhdGFSZWNpZXZlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGNhY2hlRGF0YVJlY2lldmVkID0gZmFsc2U7XHJcblxyXG4gICAgZGlzcGF0Y2goc2V0QWN0aXZlUm91dGUocm91dGUpKTtcclxuICAgIGRpc3BhdGNoKHByb2dyZXNzVXBkYXRlKDApKTtcclxuICAgIGRpc3BhdGNoKHBhZ2VJc0xvYWRpbmcodHJ1ZSkpO1xyXG4gICAgZGlzcGF0Y2gocGFnZUZldGNoRXJyb3IoZmFsc2UpKTtcclxuXHJcbiAgICBkaXNwYXRjaCh0b2dnbGVEcmF3ZXIoZmFsc2UpKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgY2FzZSAvXlxcL3BhZ2VzXFwvKC4qKSQvLnRlc3Qocm91dGUpOlxyXG4gICAgICAgIC8vIGhlcmUgd2UgbWFrZSB0d28gcmVxdWVzdHMsIG9uZSB0byB0aGUgY2FjaGUsIG9uZSB0byB0aGUgbmV0d29yay4gXHJcbiAgICAgICAgLy8gVGhlIGlkZWEgaXMgdG8gc2hvdyB0aGUgY2FjaGVkIGRhdGEgZmlyc3QsIFxyXG4gICAgICAgIC8vIHRoZW4gaW5mb3JtIHRoZSB1c2VyIHdoZW4vaWYgdGhlIG5ldHdvcmsgZGF0YSBhcnJpdmVzIGFuZCB0aGVcclxuICAgICAgICAvLyBjb250ZW50IGlzIG5ld2VyIHRoYW4gdGhlIGNhY2hlZCByZXNwb25zZS5cclxuXHJcbiAgICAgICAgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUoNTApKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZmV0Y2ggZnJlc2ggZGF0YVxyXG4gICAgICAgIGNvbnN0IG5ldHdvcmtVcGRhdGUgPSBmZXRjaChgL2FwaSR7cm91dGV9YClcclxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgIGlmICghY2FjaGVEYXRhUmVjaWV2ZWQpIGRpc3BhdGNoKHByb2dyZXNzVXBkYXRlKDApKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4geyBcclxuICAgICAgICAgIGlmICghY2FjaGVEYXRhUmVjaWV2ZWQpIGRpc3BhdGNoKHByb2dyZXNzVXBkYXRlKDc1KSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOyBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgbmV0d29ya0RhdGFSZWNpZXZlZCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoIWNhY2hlRGF0YVJlY2lldmVkKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdXNlZCB0aGUgZGF0YSBmcm9tIHRoZSBuZXR3b3JrIHJlcXVlc3QgYXMgdGhlIHJlc3BvbnNlIGhlcmVcclxuICAgICAgICAgICAgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUoMTAwKSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldEFjdGl2ZVBhZ2VUeXBlKCdhcnRpY2xlJykpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChwYWdlRmV0Y2hTdWNjZXNzKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldEFjdGl2ZVBhZ2VUaXRsZShyZXNwb25zZS5maWVsZHMubmFtZSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNhY2hlRGF0YVJlY2lldmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWNoZURhdGFSZWNpZXZlZC5zeXMudXBkYXRlZEF0ICE9PSByZXNwb25zZS5zeXMudXBkYXRlZEF0KSB7XHJcbiAgICAgICAgICAgICAgLy8gdGhlIG5ldHdvcmsgcmVxdWVzdCByZXNwb25zZSBoYXMgbmV3ZXIgY29udGVudCB0aGFuIHRoZSBjYWNoZWQgcmVzcG9uc2VcclxuICAgICAgICAgICAgICBkaXNwYXRjaChwdXNoVG9hc3QoJ05ld2VyIGNvbnRlbnQgaXMgYXZhaWxhYmxlLCByZWxvYWQgdG8gdXBkYXRlJywgJ3JlbG9hZCcsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gdGhlIGNhY2hlZCBjb250ZW50IGlzIHVwIHRvIGRhdGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIGRpc3BhdGNoKHByb2dyZXNzVXBkYXRlKDApKTtcclxuICAgICAgICAgIGRpc3BhdGNoKHBhZ2VGZXRjaEVycm9yKHRydWUpKTtcclxuICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZmV0Y2ggY2FjaGVkIGRhdGFcclxuICAgICAgICBjYWNoZXMubWF0Y2goYC9hcGkke3JvdXRlfWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB0aHJvdyBFcnJvcihcIk5vIGRhdGFcIik7XHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIGNhY2hlRGF0YVJlY2lldmVkID0gZGF0YTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKCFuZXR3b3JrRGF0YVJlY2lldmVkKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdXNlZCB0aGUgZGF0YSBmcm9tIHRoZSBjYWNoZSBhcyB0aGUgcmVzcG9uc2UgaGVyZVxyXG4gICAgICAgICAgICBkaXNwYXRjaChwcm9ncmVzc1VwZGF0ZSgxMDApKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goc2V0QWN0aXZlUGFnZVR5cGUoJ2FydGljbGUnKSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHBhZ2VGZXRjaFN1Y2Nlc3MoZGF0YSkpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChzZXRBY3RpdmVQYWdlVGl0bGUoZGF0YS5maWVsZHMubmFtZSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBuZXR3b3JrVXBkYXRlO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGRpc3BhdGNoKHBhZ2VJc0xvYWRpbmcoZmFsc2UpKTtcclxuICAgICAgICBkaXNwYXRjaChwYWdlRmV0Y2hTdWNjZXNzKHsgZmllbGRzOiB7IG5hbWU6IHJvdXRlLnN1YnN0cmluZygxKSwgcm91dGUgfSB9KSk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvYWN0aW9ucy9hY3RpdmUtcGFnZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7IFxyXG5pbXBvcnQgQXBwU2hlbGwgZnJvbSAnLi9jb250YWluZXJzL2FwcC1zaGVsbC9hcHAtc2hlbGwnO1xyXG5cclxuY29uc3QgQ29udGV4dFR5cGUgPSB7XHJcbiAgLy8gRW5hYmxlcyBjcml0aWNhbCBwYXRoIENTUyByZW5kZXJpbmdcclxuICBpbnNlcnRDc3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgY29udGV4dDogUHJvcFR5cGVzLnNoYXBlKENvbnRleHRUeXBlKS5pc1JlcXVpcmVkLFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IENvbnRleHRUeXBlO1xyXG5cclxuICBnZXRDaGlsZENvbnRleHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZXh0O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEFwcFNoZWxsPlxyXG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XHJcbiAgICAgIDwvQXBwU2hlbGw+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2FwcC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3JpcHBsZS9yaXBwbGUnO1xuaW1wb3J0IExpbmsgZnJvbSAnLi4vLi4vLi4vcm91dGUtaGFuZGxlci9saW5rL2xpbmsnO1xuXG5pbXBvcnQgcyBmcm9tICcuL2NhdGVnb3J5LXNlY3Rpb24uc2Nzcyc7XG5cbmNsYXNzIENhdGVnb3J5U2VjdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgbWFwTGlua3MoKSB7XG4gICAgLy8gYWN0aXZlPXsodGhpcy5wcm9wcy5hY3RpdmVSb3V0ZSA/IHRoaXMucHJvcHMuYWN0aXZlUm91dGUgOiBudWxsKSA9PT0gcGFnZS5yb3V0ZX1cbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5wcm9wcy5jYXRlZ29yeS5lbnRyaWVzO1xuICAgIGVudHJpZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZmllbGRzLm5hbWUuY2hhckNvZGVBdCgwKSAtIGIuZmllbGRzLm5hbWUuY2hhckNvZGVBdCgwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IFxuICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAoKHRoaXMucHJvcHMuYWN0aXZlUm91dGUpICYmICh0aGlzLnByb3BzLmFjdGl2ZVJvdXRlID09PSBlbnRyeS5maWVsZHMucm91dGUpKVxuICAgICAgICAgICAgP1xuICAgICAgICAgICAgKGAke3NbJ3BhZ2VMaXN0LWl0ZW0nXX0gJHtzLmFjdGl2ZX1gKVxuICAgICAgICAgICAgOlxuICAgICAgICAgICAgc1sncGFnZUxpc3QtaXRlbSddXG4gICAgICAgICAgfVxuICAgICAgICAgIGtleT17ZW50cnkuc3lzLmlkfVxuICAgICAgICA+XG4gICAgICAgIDxMaW5rXG4gICAgICAgICAgcm91dGU9e2VudHJ5LmZpZWxkcy5yb3V0ZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8UmlwcGxlIC8+XG4gICAgICAgICAgICB7ZW50cnkuZmllbGRzLm5hbWV9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cy5jYXRlZ29yeVNlY3Rpb259IHJlZj17KGRpdikgPT4geyB0aGlzLmNvbnRhaW5lciA9IGRpdjsgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydjYXRlZ29yeVNlY3Rpb24taGVhZGVyJ119IGhyZWY9XCIjXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2F0ZWdvcnkuZmllbGRzLm5hbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snY2F0ZWdvcnlTZWN0aW9uLWJvZHknXX0gcmVmPXsoZGl2KSA9PiB7IHRoaXMubGlua3NDb250YWluZXIgPSBkaXY7IH19PlxuICAgICAgICAgIHsgdGhpcy5tYXBMaW5rcygpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNhdGVnb3J5U2VjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIGFjdGl2ZVJvdXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjYXRlZ29yeTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcnlTZWN0aW9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWN0aXZlUm91dGU6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKENhdGVnb3J5U2VjdGlvbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvZHJhd2VyL3BhZ2UtbGlzdC9jYXRlZ29yeS1zZWN0aW9uL2NhdGVnb3J5LXNlY3Rpb24uanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5cbmltcG9ydCBzIGZyb20gJy4vcGFnZS1saXN0LnNjc3MnO1xuXG5pbXBvcnQgTG9hZGluZ1ZpZXcgZnJvbSAnLi4vLi4vdmlld3MvbG9hZGluZy12aWV3L2xvYWRpbmctdmlldyc7XG5pbXBvcnQgQ2F0ZWdvcnlTZWN0aW9uIGZyb20gJy4vY2F0ZWdvcnktc2VjdGlvbi9jYXRlZ29yeS1zZWN0aW9uJztcblxuY2xhc3MgUGFnZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBnZXRDYXRlZ29yeUluZGV4KGNhdGVnb3J5LCBwYWdlcykge1xuICAgIGxldCBtYXRjaGVkQ2F0ID0gcGFnZXMuZmluZEluZGV4KChjYXQpID0+IHtcbiAgICAgIHJldHVybiAoY2F0LnN5cy5pZCA9PT0gY2F0ZWdvcnkuc3lzLmlkKTtcbiAgICB9KTtcbiAgICBpZiAobWF0Y2hlZENhdCA8IDApIHtcbiAgICAgIG1hdGNoZWRDYXQgPSBwYWdlcy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVkQ2F0O1xuICB9XG5cbiAgc3RhdGljIG9yZ2FuaXNlUGFnZXMoZW50cmllcykge1xuICAgIGxldCBwYWdlcyA9IFtdO1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGNhdGVnb3J5ID0gZW50cnkuZmllbGRzLmNhdGVnb3J5O1xuXG4gICAgICBjb25zdCBjYXRlZ29yeUluZGV4ID0gdGhpcy5nZXRDYXRlZ29yeUluZGV4KGNhdGVnb3J5LCBwYWdlcyk7XG5cbiAgICAgIHBhZ2VzID0gdGhpcy5hZGRFbnRyeVRvQ2F0ZWdvcnkoY2F0ZWdvcnksIGNhdGVnb3J5SW5kZXgsIGVudHJ5LCBwYWdlcyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG5cbiAgc3RhdGljIGFkZEVudHJ5VG9DYXRlZ29yeShjYXRlZ29yeSwgY2F0ZWdvcnlJbmRleCwgZW50cnksIHBhZ2VzKSB7XG4gICAgaWYgKCFwYWdlc1tjYXRlZ29yeUluZGV4XSkge1xuICAgICAgcGFnZXMucHVzaChPYmplY3QuYXNzaWduKHt9LCBjYXRlZ29yeSwgeyBlbnRyaWVzOiBbXSB9KSk7XG4gICAgfVxuXG4gICAgcGFnZXNbY2F0ZWdvcnlJbmRleF0uZW50cmllcy5wdXNoKGVudHJ5KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBtYXBQYWdlcyA9ICgpID0+IHtcbiAgICBjb25zdCBwYWdlcyA9IFBhZ2VMaXN0Lm9yZ2FuaXNlUGFnZXModGhpcy5wcm9wcy5wYWdlcyk7XG4gICAgY29uc3Qgb3V0cHV0ID0gcGFnZXMubWFwKChjYXRlZ29yeSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENhdGVnb3J5U2VjdGlvblxuICAgICAgICAgIGtleT17Y2F0ZWdvcnkuc3lzLmlkfVxuICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICBhY3RpdmVSb3V0ZT17dGhpcy5wcm9wcy5hY3RpdmVSb3V0ZX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5oYXNFcnJvcmVkKSB7XG4gICAgICByZXR1cm4gKDxwPlNvcnJ5ISBUaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyB0aGUgaXRlbXM8L3A+KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pc0xvYWRpbmcpIHtcbiAgICAgIHJldHVybiAoPExvYWRpbmdWaWV3IC8+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3BhZ2VsaXN0LXdyYXBwZXInXX0+XG4gICAgICAgIHsgdGhpcy5tYXBQYWdlcygpIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUGFnZUxpc3QucHJvcFR5cGVzID0ge1xuICBoYXNFcnJvcmVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGFjdGl2ZVJvdXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwYWdlczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG59O1xuXG5QYWdlTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFjdGl2ZVJvdXRlOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShQYWdlTGlzdCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvZHJhd2VyL3BhZ2UtbGlzdC9wYWdlLWxpc3QuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2NvbW1vbi9yaXBwbGUvcmlwcGxlJztcblxuaW1wb3J0IFJvdXRlSGFuZGxlciBmcm9tICcuLi8uLi9yb3V0ZS1oYW5kbGVyL3JvdXRlLWhhbmRsZXInO1xuXG5pbXBvcnQgcyBmcm9tICcuL2hlYWRlci1pY29uLnNjc3MnO1xuXG5jbGFzcyBIZWFkZXJJY29uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBvcGVuRHJhd2VyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlRHJhd2VyKCF0aGlzLnByb3BzLmRyYXdlck9wZW4pO1xuICB9O1xuXG4gIGNsb3NlU2VhcmNoID0gKCkgPT4ge1xuICAgIC8vIHRoaXMucHJvcHMuc2VhcmNoKCcnKTtcbiAgICBSb3V0ZUhhbmRsZXIuVXBkYXRlUm91dGUobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1snaGVhZGVyLWljb24nXX0+XG5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9wZW5EcmF3ZXJ9IGNsYXNzTmFtZT17YCR7c1snaWNvbi1jb250YWluZXInXX0gJHtzLm1lbnVJY29ufSAke3RoaXMucHJvcHMuc2VhcmNoT3BlbiA/IHMuc2VhcmNoT3BlbiA6ICcnfWB9PlxuICAgICAgICAgIDxzdmcgZmlsbD1cIiNmZmZcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTMgMThoMTh2LTJIM3Yyem0wLTVoMTh2LTJIM3Yyem0wLTd2MmgxOFY2SDN6XCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8UmlwcGxlIC8+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jbG9zZVNlYXJjaH0gY2xhc3NOYW1lPXtgJHtzWydpY29uLWNvbnRhaW5lciddfSAke3MuYmFja0ljb259ICR7dGhpcy5wcm9wcy5zZWFyY2hPcGVuID8gcy5zZWFyY2hPcGVuIDogJyd9YH0+XG4gICAgICAgICAgPHN2ZyBmaWxsPVwiI2ZmZlwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnpcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDxSaXBwbGUgLz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSGVhZGVySWNvbi5wcm9wVHlwZXMgPSB7XG4gIGRyYXdlck9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHNlYXJjaE9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHRvZ2dsZURyYXdlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoSGVhZGVySWNvbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1pY29uL2hlYWRlci1pY29uLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9zZWFyY2gtaW5wdXQuc2Nzcyc7XG5cbmltcG9ydCBSb3V0ZUhhbmRsZXIgZnJvbSAnLi4vLi4vcm91dGUtaGFuZGxlci9yb3V0ZS1oYW5kbGVyJztcblxuaW1wb3J0IExpbmsgZnJvbSAnLi4vLi4vcm91dGUtaGFuZGxlci9saW5rL2xpbmsnXG5cbmNsYXNzIFNlYXJjaElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICBub25FbXB0eTogZmFsc2UsXG4gICAgfTtcblxuICB9XG5cbiAgc2VhcmNoSWNvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuc2VhcmNoSW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIHNlYXJjaEZvY3VzZWQgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IHRydWUgfSk7XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2VhcmNoVW5mb2N1c2VkKTtcbiAgfVxuXG4gIHNlYXJjaFVuZm9jdXNlZCA9IChldnQpID0+IHtcbiAgICBpZiAodGhpcy5zZWFyY2hDb250YWluZXIuY29udGFpbnMoZXZ0LnRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2VhcmNoVW5mb2N1c2VkKTtcblxuICAgIGlmICh0aGlzLnByb3BzLmN1cnJRdWVyeS5sZW5ndGggPD0gMCkge1xuICAgICAgLy8gcmVtb3ZlcyB0aGUgaGFzaCwgZ2V0dGluZyByaWQgb2YgdGhlIHNlYXJjaCBwYWdlXG4gICAgICBSb3V0ZUhhbmRsZXIuVXBkYXRlUm91dGUobG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlSW5wdXQgPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbm9uRW1wdHk6IHRydWUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBub25FbXB0eTogZmFsc2UgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5zZWFyY2goZS50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgY2xlYXJJbnB1dCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnNlYXJjaCgnJyk7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICBcbiAgICAgICAgPGxhYmVsXG4gICAgICAgICAgaHRtbEZvcj1cInNlYXJjaFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtgJHtzWydzZWFyY2gtbGFiZWwnXX0gXG4gICAgICAgICAgICAke3RoaXMucHJvcHMuc2VhcmNoT3BlbiA/IHMub3BlbmVkIDogJyd9IFxuICAgICAgICAgICAgJHt0aGlzLnN0YXRlLmZvY3VzZWQgPyBzLmZvY3VzZWQgOiAnJ31cbiAgICAgICAgICAgICR7dGhpcy5wcm9wcy5jdXJyUXVlcnkubGVuZ3RoID4gMCA/IHMubm9uRW1wdHkgOiAnJ31cbiAgICAgICAgICBgfVxuICAgICAgICAgIHJlZj17KGxhYmVsKSA9PiB7IHRoaXMuc2VhcmNoQ29udGFpbmVyID0gbGFiZWw7IH19XG4gICAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3NbJ2ljb24tY29udGFpbmVyJ119ICR7c1snc2VhcmNoLXNlYXJjaEljb24nXX1gfSA+XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIHJvdXRlPXtgP3NlYXJjaD0ke3RoaXMucHJvcHMuY3VyclF1ZXJ5fWB9XG4gICAgICAgICAgICBoYW5kbGVDbGljaz17dGhpcy5zZWFyY2hJY29uQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXtzWydzZWFyY2gtaWNvbiddfSBmaWxsPVwiI2ZmZlwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xNS41IDE0aC0uNzlsLS4yOC0uMjdDMTUuNDEgMTIuNTkgMTYgMTEuMTEgMTYgOS41IDE2IDUuOTEgMTMuMDkgMyA5LjUgM1MzIDUuOTEgMyA5LjUgNS45MSAxNiA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0elwiIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3NlYXJjaC1pbnB1dC0tY29udGFpbmVyJ119PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIiBpZD1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBzeW50YXhcIlxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuY3VyclF1ZXJ5fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzWydzZWFyY2gtaW5wdXQnXX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5zZWFyY2hGb2N1c2VkfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5zZWFyY2hJbnB1dCA9IGlucHV0OyB9fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake3NbJ2ljb24tY29udGFpbmVyJ119ICR7c1snc2VhcmNoLWNsb3NlSWNvbiddfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsZWFySW5wdXR9XG4gICAgICAgICAgICByZWY9eyhidG4pID0+IHsgdGhpcy5jbG9zZUljb24gPSBidG47IH19XG4gICAgICAgICAgPlxuXG4gICAgICAgICAgICA8c3ZnIGZpbGw9XCIjZmZmXCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6XCIgLz5cbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xhYmVsPlxuICAgICk7XG4gIH1cbn1cblxuU2VhcmNoSW5wdXQucHJvcFR5cGVzID0ge1xuICBzZWFyY2hPcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjdXJyUXVlcnk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2VhcmNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShTZWFyY2hJbnB1dCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL3Byb2dyZXNzLWluZGljYXRvci5zY3NzJztcblxuY2xhc3MgUHJvZ3Jlc3NJbmRpY2F0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB3aWR0aDogJzAlJyxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBhbmltYXRhYmxlOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICB3aWR0aDogYCR7dGhpcy5wcm9wcy5wcm9ncmVzc30lYCxcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgcmVmPXsoZGl2KSA9PiB7IHRoaXMucHJvZ3Jlc3NJbmRpY2F0b3IgPSBkaXY7IH19XG4gICAgICAgIGNsYXNzTmFtZT17YCR7cy5wcm9ncmVzc0luZGljYXRvcn0gJHt0aGlzLnN0YXRlLmFuaW1hdGFibGUgPyBzLmFuaW1hdGFibGUgOiAnJ31gfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuUHJvZ3Jlc3NJbmRpY2F0b3IucHJvcFR5cGVzID0ge1xuICBwcm9ncmVzczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFByb2dyZXNzSW5kaWNhdG9yKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9tYWluL3Byb2dyZXNzLWluZGljYXRvci9wcm9ncmVzcy1pbmRpY2F0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL2xvYWRpbmctdmlldy5zY3NzJztcblxuY2xhc3MgTG9hZGluZ1ZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1snbG9hZGluZy1jb250YWluZXInXX0+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS52aXNpYmxlID9cbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT17cy5zcGlubmVyfSB3aWR0aD1cIjY1cHhcIiBoZWlnaHQ9XCI2NXB4XCIgdmlld0JveD1cIjAgMCA2NiA2NlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPXtzLnBhdGh9IGZpbGw9XCJub25lXCIgc3Ryb2tlV2lkdGg9XCI2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgY3g9XCIzM1wiIGN5PVwiMzNcIiByPVwiMzBcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDpcbiAgICAgICAgICAnJ1xuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvYWRpbmdWaWV3LnByb3BUeXBlcyA9IHtcbiAgY29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5Mb2FkaW5nVmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbG9yOiAnI2ZmZicsXG4gIHNpemU6ICc2MHB4Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoTG9hZGluZ1ZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2xvYWRpbmctdmlldy9sb2FkaW5nLXZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHMgZnJvbSAnLi4vLi4vc2Nzcy9iYXNlLnNjc3MnO1xuXG5pbXBvcnQgeyBmZXRjaFBhZ2UgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGl2ZS1wYWdlJztcbmltcG9ydCB7IHRvZ2dsZURyYXdlciwgdG9nZ2xlU2VhcmNoIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy91dGlscyc7XG5pbXBvcnQgeyBmZXRjaFBhZ2VMaXN0LCBzZWFyY2ggfSBmcm9tICcuLi8uLi9hY3Rpb25zL3BhZ2UtbGlzdCc7XG5cbmltcG9ydCBQcm9ncmVzc0luZGljYXRvciBmcm9tICcuLi8uLi9jb21wb25lbnRzL21haW4vcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvcic7XG5pbXBvcnQgTWFpbkhlYWRlciBmcm9tICcuLi9oZWFkZXIvbWFpbi1oZWFkZXInO1xuaW1wb3J0IERyYXdlciBmcm9tICcuLi9kcmF3ZXIvZHJhd2VyJztcbmltcG9ydCBUb2FzdE1hbmFnZXIgZnJvbSAnLi4vdG9hc3QtbWFuYWdlci90b2FzdC1tYW5hZ2VyJztcblxuY2xhc3MgQXBwU2hlbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmVSb3V0ZTogdGhpcy5wcm9wcy5hY3RpdmVSb3V0ZSxcbiAgICAgIHNjcm9sbGVkOiBmYWxzZSxcbiAgICAgIGNhY2hlU3RvcmFnZTogZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMuY2FjaGVzID0gZmFsc2U7XG4gIH1cblxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIGFzeW5jIGZldGNoIHBhZ2VsaXN0XG4gICAgdGhpcy5wcm9wcy5mZXRjaFBhZ2VMaXN0KCk7XG4gIH1cblxuICBzY3JvbGxlZCA9IChib29sKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzY3JvbGxlZDogYm9vbCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2FwcC1jb250YWluZXInXX0+XG4gICAgICAgIDxQcm9ncmVzc0luZGljYXRvciBwcm9ncmVzcz17dGhpcy5wcm9wcy5wcm9ncmVzc30gLz5cbiAgICAgICAgPE1haW5IZWFkZXIgc2Nyb2xsZWQ9e3RoaXMuc3RhdGUuc2Nyb2xsZWR9Lz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ21haW4tY29udGFpbmVyJ119PlxuICAgICAgICAgIDxEcmF3ZXIgLz5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgICAgIDxUb2FzdE1hbmFnZXIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHByb2dyZXNzOiBzdGF0ZS51dGlscy5wcm9ncmVzcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIHtcbiAgICBmZXRjaFBhZ2VMaXN0OiAoKSA9PiB7IGRpc3BhdGNoKGZldGNoUGFnZUxpc3QoKSk7IH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKShBcHBTaGVsbCkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb250YWluZXJzL2FwcC1zaGVsbC9hcHAtc2hlbGwuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9kcmF3ZXIuc2Nzcyc7XG5cbmltcG9ydCB7IElOSVRJQVRFX0RSQUdHSU5HX1RIUkVTSE9MRCwgRFJBV0VSX0NMT1NFX1RIUkVTSE9MRCB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB0b2dnbGVEcmF3ZXIgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3V0aWxzJztcbmltcG9ydCB7IGFkZEZpbHRlciwgcmVtb3ZlRmlsdGVyIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wYWdlLWxpc3QnO1xuXG5pbXBvcnQgUm91dGVIYW5kbGVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9yb3V0ZS1oYW5kbGVyJztcbmltcG9ydCBMaW5rIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9saW5rL2xpbmsnO1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlJztcbmltcG9ydCBQYWdlTGlzdCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RyYXdlci9wYWdlLWxpc3QvcGFnZS1saXN0JztcblxuY2xhc3MgRHJhd2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhcnRYOiAwLFxuICAgICAgY3VycmVudFg6IDAsXG4gICAgICB0b3VjaGluZ1NpZGVOYXY6IGZhbHNlLFxuICAgICAgaW5pdGlhbGlzZWREcmFnZ2luZzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAvLyBnb3QgcGFnZSBsaXN0XG4gICAgaWYgKHByZXZQcm9wcy5lbnRyaWVzLmxlbmd0aCA8IDEgJiYgdGhpcy5wcm9wcy5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT09ICcvJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygncmVwbGFjaW5nIHN0YXRlJyk7XG4gICAgICBSb3V0ZUhhbmRsZXIuUmVwbGFjZVJvdXRlKHRoaXMucHJvcHMuZW50cmllc1swXS5maWVsZHMucm91dGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hTdGFydCA9IChldnQpID0+IHtcbiAgICBpZiAoIXRoaXMuZHJhd2VyQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhzLmFjdGl2ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdlci5jbGFzc0xpc3QuYWRkKHMuZHJhZ2dhYmxlKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3RhcnRYOiBldnQudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgIGN1cnJlbnRYOiBldnQudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgIHRvdWNoaW5nU2lkZU5hdjogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XG4gIH1cblxuICBvblRvdWNoTW92ZSA9IChldnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUudG91Y2hpbmdTaWRlTmF2KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjdXJyZW50WDogZXZ0LnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgfSk7XG4gIH1cblxuICBvblRvdWNoRW5kID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS50b3VjaGluZ1NpZGVOYXYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRvdWNoaW5nU2lkZU5hdjogZmFsc2UsXG4gICAgICBpbml0aWFsaXNlZERyYWdnaW5nOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuZHJhd2VyLmNsYXNzTGlzdC5yZW1vdmUocy5kcmFnZ2FibGUpO1xuXG4gICAgY29uc3QgdHJhbnNsYXRlWCA9IE1hdGgubWluKDAsIHRoaXMuc3RhdGUuY3VycmVudFggLSB0aGlzLnN0YXRlLnN0YXJ0WCk7XG4gICAgdGhpcy5kcmF3ZXIuc3R5bGUudHJhbnNmb3JtID0gJyc7XG5cbiAgICBpZiAodHJhbnNsYXRlWCA8IC1EUkFXRVJfQ0xPU0VfVEhSRVNIT0xEKSB7XG4gICAgICB0aGlzLnByb3BzLnRvZ2dsZURyYXdlcihmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlQYXNzaXZlKCkge1xuICAgIGlmICh0aGlzLnN1cHBvcnRzUGFzc2l2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHsgZ2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH0gfSk7XG4gICAgfSBjYXRjaCAoZSkgeyByZXR1cm4gKCkgPT4ge307IH1cbiAgICB0aGlzLnN1cHBvcnRzUGFzc2l2ZSA9IGlzU3VwcG9ydGVkO1xuICAgIHJldHVybiB0aGlzLmFwcGx5UGFzc2l2ZSgpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5kcmF3ZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGVTaWRlTmF2KTtcblxuICAgIHRoaXMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcy5hcHBseVBhc3NpdmUoKSk7XG4gICAgdGhpcy5kcmF3ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgdGhpcy5hcHBseVBhc3NpdmUoKSk7XG4gICAgdGhpcy5kcmF3ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQpO1xuICB9XG5cbiAgdXBkYXRlID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS50b3VjaGluZ1NpZGVOYXYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpO1xuXG4gICAgY29uc3QgdHJhbnNsYXRlWCA9IE1hdGgubWluKDAsIHRoaXMuc3RhdGUuY3VycmVudFggLSB0aGlzLnN0YXRlLnN0YXJ0WCk7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUuaW5pdGlhbGlzZWREcmFnZ2luZyAmJiAodHJhbnNsYXRlWCA+IC1JTklUSUFURV9EUkFHR0lOR19USFJFU0hPTEQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN0YXRlLmluaXRpYWxpc2VkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpbml0aWFsaXNlZERyYWdnaW5nOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3ZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGVYfXB4KWA7XG4gIH1cblxuICBoaWRlU2lkZU5hdiA9IChldnQpID0+IHtcbiAgICBpZiAoZXZ0LnRhcmdldC5jb250YWlucyh0aGlzLmRyYXdlcikpIHtcbiAgICAgIHRoaXMucHJvcHMudG9nZ2xlRHJhd2VyKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtzWydkcmF3ZXItY29udGFpbmVyJ119ICR7dGhpcy5wcm9wcy5kcmF3ZXJPcGVuID8gcy5hY3RpdmUgOiAnJ31gfVxuICAgICAgICByZWY9eyhkaXYpID0+IHsgdGhpcy5kcmF3ZXJDb250YWluZXIgPSBkaXY7IH19XG4gICAgICA+XG4gICAgICAgIDxhc2lkZSBjbGFzc05hbWU9e3MuZHJhd2VyfSByZWY9eyhhc2lkZSkgPT4geyB0aGlzLmRyYXdlciA9IGFzaWRlOyB9fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snZHJhd2VyLWhvbWVDb250YWluZXInXX0+XG4gICAgICAgICAgICA8TGluayByb3V0ZT17Jy9hYm91dCd9PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzWydkcmF3ZXItaG9tZSddfSBcbiAgICAgICAgICAgICAgICAke3RoaXMucHJvcHMuYWN0aXZlUm91dGUgPT09ICcvYWJvdXQnID8gcy5hY3RpdmUgOiAnJ31gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTExIDE3aDJ2LTZoLTJ2NnptMS0xNUM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6TTExIDloMlY3aC0ydjJ6XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIEFib3V0XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxSaXBwbGUgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3BhZ2VMaXN0LXdyYXBwZXInXX0+XG4gICAgICAgICAgICA8UGFnZUxpc3RcbiAgICAgICAgICAgICAgaGFzRXJyb3JlZD17dGhpcy5wcm9wcy5oYXNFcnJvcmVkfVxuICAgICAgICAgICAgICBpc0xvYWRpbmc9e3RoaXMucHJvcHMuaXNMb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17dGhpcy5wcm9wcy5lbnRyaWVzfVxuICAgICAgICAgICAgICBhY3RpdmVQYWdlcz17dGhpcy5wcm9wcy5hY3RpdmVQYWdlc31cbiAgICAgICAgICAgICAgYWN0aXZlUm91dGU9e3RoaXMucHJvcHMuYWN0aXZlUm91dGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydkcmF3ZXItZm9vdGVyJ119PlxuICAgICAgICAgICAgey8qIDxBZCAvPiAqL31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hc2lkZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuXG5EcmF3ZXIucHJvcFR5cGVzID0ge1xuICBoYXNFcnJvcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgZHJhd2VyT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZW50cmllczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gIGFjdGl2ZVBhZ2VzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgYWN0aXZlUGFnZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgYWN0aXZlUm91dGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRvZ2dsZURyYXdlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkRyYXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGhhc0Vycm9yZWQ6IGZhbHNlLFxuICBpc0xvYWRpbmc6IGZhbHNlLFxuICBhY3RpdmVQYWdlOiBudWxsLFxuICBhY3RpdmVSb3V0ZTogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIGhhc0Vycm9yZWQ6IHN0YXRlLnBhZ2VMaXN0Lmhhc0Vycm9yZWQsXG4gICAgaXNMb2FkaW5nOiBzdGF0ZS5wYWdlTGlzdC5pc0xvYWRpbmcsXG4gICAgZW50cmllczogc3RhdGUucGFnZUxpc3QuZW50cmllcyxcbiAgICBhY3RpdmVQYWdlczogc3RhdGUucGFnZUxpc3QuYWN0aXZlUGFnZXMsXG4gICAgYWN0aXZlUGFnZTogc3RhdGUuYWN0aXZlUGFnZS5wYWdlLFxuICAgIGFjdGl2ZVJvdXRlOiBzdGF0ZS5hY3RpdmVQYWdlLnJvdXRlLFxuICAgIGN1cnJGaWx0ZXJzOiBzdGF0ZS5wYWdlTGlzdC5maWx0ZXJzLFxuICAgIGRyYXdlck9wZW46IHN0YXRlLnV0aWxzLmRyYXdlck9wZW4sXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgdG9nZ2xlRHJhd2VyOiAob3BlbikgPT4geyBkaXNwYXRjaCh0b2dnbGVEcmF3ZXIob3BlbikpOyB9LFxuICAgIGFkZEZpbHRlcjogKGZpbHRlcikgPT4geyBkaXNwYXRjaChhZGRGaWx0ZXIoZmlsdGVyKSk7IH0sXG4gICAgcmVtb3ZlRmlsdGVyOiAoZmlsdGVyKSA9PiB7IGRpc3BhdGNoKHJlbW92ZUZpbHRlcihmaWx0ZXIpKTsgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWF0Y2hEaXNwYXRjaFRvUHJvcHMpKERyYXdlcikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb250YWluZXJzL2RyYXdlci9kcmF3ZXIuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuXG5pbXBvcnQgeyB0b2dnbGVEcmF3ZXIsIHRvZ2dsZVNlYXJjaCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgc2VhcmNoIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wYWdlLWxpc3QnO1xuXG5pbXBvcnQgSGVhZGVySWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXItaWNvbi9oZWFkZXItaWNvbic7XG5pbXBvcnQgU2VhcmNoSW5wdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9oZWFkZXIvc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dCc7XG5cbmltcG9ydCBzIGZyb20gJy4vbWFpbi1oZWFkZXIuc2Nzcyc7XG5cbmNsYXNzIE1haW5IZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWFyY2hGb2N1c2VkOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgc2VhcmNoRm9jdXNlZCA9IChib29sKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWFyY2hGb2N1c2VkOiBib29sLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YCR7cy5oZWFkZXJ9IFxuICAgICAgICAke3RoaXMucHJvcHMuc2VhcmNoT3BlbiA/IHMuc2VhcmNoT3BlbiA6ICcnfVxuICAgICAgICAke3RoaXMucHJvcHMuc2hvd1dhdGVyZmFsbEhlYWRlciA/IHMud2F0ZXJmYWxsT3BlbiA6ICcnfVxuICAgICAgICBgfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1sndGl0bGUtY29udGFpbmVyJ119PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWyd0b2dnbGUtY29udGFpbmVyJ119PlxuICAgICAgICAgICAgPEhlYWRlckljb25cbiAgICAgICAgICAgICAgZHJhd2VyT3Blbj17dGhpcy5wcm9wcy5kcmF3ZXJPcGVufVxuICAgICAgICAgICAgICBzZWFyY2hPcGVuPXt0aGlzLnByb3BzLnNlYXJjaE9wZW59XG4gICAgICAgICAgICAgIHRvZ2dsZURyYXdlcj17dGhpcy5wcm9wcy50b2dnbGVEcmF3ZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cy50aXRsZX0+XG4gICAgICAgICAgICBFQ01BU3ludGF4XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3NbJ3RpdGxlLWRldGFpbCddfVxuICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICAgIF9faHRtbDogdGhpcy5wcm9wcy5hY3RpdmVQYWdlVGl0bGUgP1xuICAgICAgICAgICAgICAgIGAgJm5kYXNoOyAke3RoaXMucHJvcHMuYWN0aXZlUGFnZVRpdGxlfWBcbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgJycgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3NlYXJjaC1jb250YWluZXInXX0+XG4gICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT17c1snc2VhcmNoLWNvbnRhaW5lciddfT4gKi99XG4gICAgICAgIDxTZWFyY2hJbnB1dFxuICAgICAgICAgIGN1cnJRdWVyeT17dGhpcy5wcm9wcy5jdXJyUXVlcnl9XG4gICAgICAgICAgc2VhcmNoT3Blbj17dGhpcy5wcm9wcy5zZWFyY2hPcGVufVxuICAgICAgICAgIHNlYXJjaD17dGhpcy5wcm9wcy5zZWFyY2h9XG4gICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5NYWluSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgZHJhd2VyT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc2VhcmNoT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY3VyclF1ZXJ5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRvZ2dsZURyYXdlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgc2VhcmNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuTWFpbkhlYWRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNldEFjdGl2ZVBhZ2VUaXRsZTogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIGRyYXdlck9wZW46IHN0YXRlLnV0aWxzLmRyYXdlck9wZW4sXG4gICAgc2VhcmNoT3Blbjogc3RhdGUudXRpbHMuc2VhcmNoT3BlbixcbiAgICBjdXJyUXVlcnk6IHN0YXRlLnBhZ2VMaXN0LnF1ZXJ5LFxuICAgIGFjdGl2ZVBhZ2VUaXRsZTogc3RhdGUuYWN0aXZlUGFnZS50aXRsZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIHtcbiAgICB0b2dnbGVEcmF3ZXI6IChvcGVuKSA9PiB7IGRpc3BhdGNoKHRvZ2dsZURyYXdlcihvcGVuKSk7IH0sXG4gICAgc2VhcmNoOiAocXVlcnkpID0+IHsgZGlzcGF0Y2goc2VhcmNoKHF1ZXJ5KSk7IH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWF0Y2hEaXNwYXRjaFRvUHJvcHMpKE1haW5IZWFkZXIpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29udGFpbmVycy9oZWFkZXIvbWFpbi1oZWFkZXIuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuXG5pbXBvcnQgeyBwb3BUb2FzdCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdXRpbHMnO1xuXG5pbXBvcnQgcyBmcm9tICcuL3RvYXN0LW1hbmFnZXIuc2Nzcyc7XG5cbmNsYXNzIFRvYXN0TWFuYWdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIHRvYXN0OiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLnRvYXN0cy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdHJpZ2dlclRvYXN0KG5leHRQcm9wcy50b2FzdHNbbmV4dFByb3BzLnRvYXN0cy5sZW5ndGggLSAxXSk7XG4gIH1cblxuICBfdHJpZ2dlclRvYXN0KHRvYXN0KSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0b2FzdCxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGlmICh0b2FzdC50aW1lb3V0KSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fY2xvc2VUb2FzdCgpO1xuICAgICAgfSwgdG9hc3QudGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgX2Nsb3NlVG9hc3QgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBhY3RpdmU6IGZhbHNlLFxuICAgIH0pO1xuICAgIHRoaXMudG9hc3QuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuX3JlbW92ZVRvYXN0KTtcbiAgfVxuXG4gIF9yZW1vdmVUb2FzdCA9ICgpID0+IHtcbiAgICB0aGlzLnRvYXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLl9yZW1vdmVUb2FzdCk7XG4gICAgdGhpcy5wcm9wcy5wb3BUb2FzdCgpO1xuICB9XG5cbiAgX2hhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIHRoaXMuX2Nsb3NlVG9hc3QoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS50b2FzdC5jYWxsYmFjaykge1xuICAgICAgdGhpcy5zdGF0ZS50b2FzdC5jYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3RvYXN0LWNvbnRhaW5lciddfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7c1sndG9hc3Qtd3JhcHBlciddfSAke3RoaXMuc3RhdGUuYWN0aXZlID8gcy5hY3RpdmUgOiAnJ31gfVxuICAgICAgICAgIHJlZj17KGRpdikgPT4geyB0aGlzLnRvYXN0ID0gZGl2OyB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MudG9hc3R9PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzLm1lc3NhZ2V9PlxuICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS50b2FzdC5tZXNzYWdlVGV4dH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzLmFjdGlvbn0gb25DbGljaz17dGhpcy5faGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS50b2FzdC5hY3Rpb25UZXh0fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2FzdE1hbmFnZXIucHJvcFR5cGVzID0ge1xuICB0b2FzdHM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICBwb3BUb2FzdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHRvYXN0czogc3RhdGUudXRpbHMudG9hc3RzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXRjaERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIHBvcFRvYXN0OiAoKSA9PiB7IGRpc3BhdGNoKHBvcFRvYXN0KCkpOyB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXRjaERpc3BhdGNoVG9Qcm9wcykoVG9hc3RNYW5hZ2VyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvdG9hc3QtbWFuYWdlci90b2FzdC1tYW5hZ2VyLmpzeCIsImNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcGFnZTogbnVsbCxcbiAgcm91dGU6IG51bGwsXG4gIHRpdGxlOiAnTG9hZGluZycsXG4gIHR5cGU6IG51bGwsXG4gIGlzTG9hZGluZzogZmFsc2UsXG4gIGhhc0Vycm9yZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ1BBR0VfRVJST1InOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBoYXNFcnJvcmVkOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1BBR0VfTE9BRElORyc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGlzTG9hZGluZzogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdBQ1RJVkVfUEFHRSc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnQUNUSVZFX1JPVVRFJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgcm91dGU6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnQUNUSVZFX1BBR0VfVElUTEUnOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdBQ1RJVkVfUEFHRV9UWVBFJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L3JlZHVjZXJzL2FjdGl2ZS1wYWdlLmpzIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgVXRpbFJlZHVjZXIgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBQYWdlTGlzdFJlZHVjZXIgZnJvbSAnLi9wYWdlLWxpc3QnO1xyXG5pbXBvcnQgQWN0aXZlUGFnZVJlZHVjZXIgZnJvbSAnLi9hY3RpdmUtcGFnZSc7XHJcblxyXG5jb25zdCBhbGxSZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2VycyhcclxuICB7XHJcbiAgICB1dGlsczogVXRpbFJlZHVjZXIsXHJcbiAgICBwYWdlTGlzdDogUGFnZUxpc3RSZWR1Y2VyLFxyXG4gICAgYWN0aXZlUGFnZTogQWN0aXZlUGFnZVJlZHVjZXIsXHJcbiAgfSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFsbFJlZHVjZXJzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwiaW1wb3J0IHsgVEFHR0VEX0lOIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBlbnRyaWVzOiBbXSxcbiAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgaGFzRXJyb3JlZDogZmFsc2UsXG4gIGFjdGl2ZVBhZ2VzOiBbXSxcbiAgZmlsdGVyczogW10sXG4gIHF1ZXJ5OiAnJyxcbn07XG5cbmNvbnN0IGZpbHRlclBhZ2VzID0gKGZpbHRlcnMsIHBhZ2VzKSA9PiB7XG4gIGxldCBmaWx0ZXJlZFBhZ2VzID0gcGFnZXM7XG4gIGlmIChmaWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICBmaWx0ZXJlZFBhZ2VzID0gcGFnZXMuZmlsdGVyKChwYWdlKSA9PiB7XG4gICAgICByZXR1cm4gZmlsdGVycy5pbmNsdWRlcyhwYWdlLmZpZWxkcy5jYXRlZ29yeS5maWVsZHMuc3BlY2lmaWNhdGlvbi5maWVsZHMubmFtZSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkUGFnZXM7XG59O1xuXG5jb25zdCBxdWVyeVBhZ2VzID0gKHF1ZXJ5LCBwYWdlcykgPT4ge1xuICBjb25zdCBzeW50YXhFbnRyaWVzID0gcGFnZXM7XG4gIGxldCBtYXRjaGVkRW50cmllcyA9IHN5bnRheEVudHJpZXM7XG4gIGlmIChxdWVyeS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkUXVlcnkgPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHJlZ2V4ID0gYF4ke1RBR0dFRF9JTn06KFteIF0qKWA7XG4gICAgY29uc3QgcmVnZXhwID0gbmV3IFJlZ0V4cChyZWdleCwgJ2cnKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4cC5leGVjKGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0pIHtcbiAgICAgIG1hdGNoZWRFbnRyaWVzID0gc3ludGF4RW50cmllcy5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICAgIGlmICghZW50cnkuZmllbGRzLnRhZ3MpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChlbnRyeS5maWVsZHMudGFncy5maWx0ZXIoKHRhZykgPT4ge1xuICAgICAgICAgIHJldHVybiB0YWcuZmllbGRzLm5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkubWF0Y2gobWF0Y2hbMV0pO1xuICAgICAgICB9KS5sZW5ndGggPiAwKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoZWRFbnRyaWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaGVkRW50cmllcyA9IHN5bnRheEVudHJpZXMuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgICByZXR1cm4gKChlbnRyeS5maWVsZHMubmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5tYXRjaChmb3JtYXR0ZWRRdWVyeS50b0xvd2VyQ2FzZSgpKSkpOyAvLyB8fFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0Y2hlZEVudHJpZXM7XG4gICAgfVxuICB9XG4gIHJldHVybiBbXTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdQQUdFTElTVF9FUlJPUic6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGhhc0Vycm9yZWQ6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnUEFHRUxJU1RfTE9BRElORyc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGlzTG9hZGluZzogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdQQUdFTElTVF9GRVRDSF9TVUNDRVNTJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgZW50cmllczogT2JqZWN0LnZhbHVlcyhhY3Rpb24ucGF5bG9hZClcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1NFQVJDSF9RVUVSWSc6IHtcbiAgICAgIC8vIHdoaWxlIChzdGF0ZS5lbnRyaWVzLmxlbmd0aCA8IDEpIHsgfVxuICAgICAgY29uc3QgYWN0aXZlUGFnZXMgPSBmaWx0ZXJQYWdlcyhzdGF0ZS5maWx0ZXJzLCBzdGF0ZS5lbnRyaWVzKTtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHF1ZXJ5OiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBhY3RpdmVQYWdlczogcXVlcnlQYWdlcyhhY3Rpb24ucGF5bG9hZCwgYWN0aXZlUGFnZXMpLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnQUREX0ZJTFRFUic6IHtcbiAgICAgIGNvbnN0IGFjdGl2ZVBhZ2VzID0gcXVlcnlQYWdlcyhzdGF0ZS5xdWVyeSwgc3RhdGUuZW50cmllcyk7XG4gICAgICBjb25zdCBuZXdGaWx0ZXJzID0gc3RhdGUuZmlsdGVycztcbiAgICAgIG5ld0ZpbHRlcnMucHVzaChhY3Rpb24ucGF5bG9hZCk7XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGFjdGl2ZVBhZ2VzOiBmaWx0ZXJQYWdlcyhuZXdGaWx0ZXJzLCBhY3RpdmVQYWdlcyksXG4gICAgICAgICAgZmlsdGVyczogbmV3RmlsdGVycyxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1JFTU9WRV9GSUxURVInOiB7XG4gICAgICBjb25zdCBmaWx0ZXIgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIGNvbnN0IG5ld0ZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzO1xuICAgICAgY29uc3QgYWN0aXZlUGFnZXMgPSBxdWVyeVBhZ2VzKHN0YXRlLnF1ZXJ5LCBzdGF0ZS5lbnRyaWVzKTtcbiAgICAgIG5ld0ZpbHRlcnMuc3BsaWNlKG5ld0ZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpLCAxKTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aXZlUGFnZXM6IGZpbHRlclBhZ2VzKG5ld0ZpbHRlcnMsIGFjdGl2ZVBhZ2VzKSxcbiAgICAgICAgICBmaWx0ZXJzOiBuZXdGaWx0ZXJzLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9yZWR1Y2Vycy9wYWdlLWxpc3QuanMiLCJjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRyYXdlck9wZW46IGZhbHNlLFxuICBzZWFyY2hPcGVuOiBmYWxzZSxcbiAgd2F0ZXJmYWxsSGVhZGVyT3BlbjogZmFsc2UsXG4gIHRvYXN0czogW10sXG4gIHByb2dyZXNzOiAwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ1RPR0dMRV9EUkFXRVInOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBkcmF3ZXJPcGVuOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1RPR0dMRV9TRUFSQ0gnOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzZWFyY2hPcGVuOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1RPR0dMRV9XQVRFUkZBTExfSEVBREVSJzoge1xuICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkICYmIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyKSBhY3Rpb24ucGF5bG9hZCA9IHRydWU7ICBcbiAgICAgIFxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgd2F0ZXJmYWxsSGVhZGVyT3BlbjogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdQVVNIX1RPQVNUJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgdG9hc3RzOiBbLi4uc3RhdGUudG9hc3RzLCBhY3Rpb24ucGF5bG9hZF0sXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdQT1BfVE9BU1QnOiB7XG4gICAgICBjb25zdCBhcnIgPSBbLi4uc3RhdGUudG9hc3RzXTtcbiAgICAgIGFyci5zaGlmdCgpO1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgdG9hc3RzOiBhcnIsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdQUk9HUkVTU19VUERBVEUnOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIFxuICAgICAgICB7XG4gICAgICAgICAgcHJvZ3Jlc3M6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvcmVkdWNlcnMvdXRpbHMuanMiLCJpbXBvcnQgZXhwcmVzcyAgICAgICAgICAgICAgICBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGNvbnRlbnRmdWwgICAgICAgIGZyb20gJ2NvbnRlbnRmdWwnO1xuaW1wb3J0IGNyeXB0byAgICAgICAgICAgICAgICAgZnJvbSAnY3J5cHRvJztcbmltcG9ydCBtYXJrZWQgICAgICAgICAgICAgICAgIGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgeyBzcGFjZSwgYWNjZXNzVG9rZW4gfSBmcm9tICcuLi8uLi9jcmVkZW50aWFscyc7XG5cbmNvbnN0IGNvbnRlbnRmdWxDbGllbnQgPSBjb250ZW50ZnVsLmNyZWF0ZUNsaWVudCh7XG4gIHNwYWNlLFxuICBhY2Nlc3NUb2tlbixcbn0pO1xuXG5jb25zdCBsb2FkQXJ0aWNsZXMgPSBhc3luYyAoKSA9PiB7XG4gdHJ5IHtcbiAgIGNvbnN0IGVudHJpZXMgPSBhd2FpdCBjb250ZW50ZnVsQ2xpZW50LmdldEVudHJpZXMoe1xuICAgICAgIGNvbnRlbnRfdHlwZTogJ3N5bnRheEVudHJ5JyxcbiAgICAgICBzZWxlY3Q6IFwic3lzLmlkLHN5cy51cGRhdGVkQXQsZmllbGRzLm5hbWUsZmllbGRzLnRhZ3MsZmllbGRzLmNhdGVnb3J5XCIsXG4gICAgICAgaW5jbHVkZTogMixcbiAgICAgfSk7XG5cbiAgIGNvbnN0IGxpbmtlZEVudHJpZXMgPSBPYmplY3QuYXNzaWduKHt9LCBlbnRyaWVzLml0ZW1zKTtcbiAgIGNvbnN0IGluY2x1ZGVzID0gZW50cmllcy5pbmNsdWRlcy5FbnRyeTtcbiAgICBcbiAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1Jyk7XG4gICBPYmplY3Qua2V5cyhsaW5rZWRFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgY29uc3QgZW50cnkgPSBsaW5rZWRFbnRyaWVzW2tleV07XG4gICAgIGxpbmtFbnRyeShpbmNsdWRlcywgZW50cnksICdjYXRlZ29yeScpO1xuICAgICBsaW5rRW50cnkoaW5jbHVkZXMsIGVudHJ5LmZpZWxkcy5jYXRlZ29yeSwgJ3NwZWNpZmljYXRpb24nKTtcblxuICAgICBjb25zdCBjYXRlZ29yeSA9IGVudHJ5LmZpZWxkcy5jYXRlZ29yeTtcbiAgICAgY29uc3Qgc3BlY2lmaWNhdGlvbiA9IGNhdGVnb3J5LmZpZWxkcy5zcGVjaWZpY2F0aW9uXG4gICAgIGNvbnN0IHJvdXRlID0gYC9wYWdlcy8ke3NwZWNpZmljYXRpb24uZmllbGRzLm5hbWV9LyR7Y2F0ZWdvcnkuZmllbGRzLm5hbWV9LyR7ZW50cnkuZmllbGRzLm5hbWV9YDtcblxuICAgICBlbnRyeS5maWVsZHMucm91dGUgPSBlbmNvZGVVUkkocm91dGUpO1xuICAgICBoYXNoLnVwZGF0ZShlbnRyeS5zeXMuaWQpO1xuICAgfSlcblxuICAgY29uc3QgaWQgPSBoYXNoLmRpZ2VzdCgnaGV4Jyk7XG5cbiAgIHJldHVybiB7XG4gICAgc3lzOiB7XG4gICAgICBpZFxuICAgIH0sXG4gICAgZmllbGRzOiBsaW5rZWRFbnRyaWVzLFxuICAgfTtcbiB9XG4gY2F0Y2ggKGUpIHtcbiAgIGNvbnNvbGUubG9nKGUpO1xuIH1cbn1cblxuY29uc3QgZmV0Y2hQYWdlID0gYXN5bmMgKHJlcSkgPT4ge1xuIGNvbnN0IHBhZ2VOYW1lID0gZGVjb2RlVVJJKHJlcS5wYXJhbXMucGFnZUlkKTtcblxuIC8vIHRoZSBwYWdlIG5hbWUgYWN0cyBhcyBhIHByaW1hcnkga2V5IHNvIHdlIGNhbiBxdWVyeSB1c2luZyBpdCBhcyB0aGUgb25seSBwYXJhbWV0ZXJcbiBjb25zdCBlbnRyaWVzID0gYXdhaXQgY29udGVudGZ1bENsaWVudC5nZXRFbnRyaWVzKHtcbiAgIGNvbnRlbnRfdHlwZTogJ3N5bnRheEVudHJ5JyxcbiAgICdmaWVsZHMubmFtZSc6IHBhZ2VOYW1lLFxuIH0pXG5cbiBjb25zdCBlbnRyeSA9IGVudHJpZXMuaXRlbXNbMF07XG4gZW50cnkuZmllbGRzLmJsb2IgPSBtYXJrZWQoZW50cnkuZmllbGRzLmJsb2IpXG4gcmV0dXJuIGVudHJ5O1xufVxuXG5jb25zdCBsaW5rRW50cnkgPSAoaW5jbHVkZXMsIGVudHJ5LCBwYXJhbSkgPT4ge1xuICBlbnRyeS5maWVsZHNbcGFyYW1dID0gaW5jbHVkZXMuZmluZCgoaW5jbHVkZSkgPT4ge1xuICAgIHJldHVybiBpbmNsdWRlLnN5cy5pZCA9PT0gZW50cnkuZmllbGRzW3BhcmFtXS5zeXMuaWRcbiAgfSk7XG59XG5cbmNvbnN0IGFwaVJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbmFwaVJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLnNlbmQoJ2VjbWFzeW50YXguaW8gQVBJJyk7XG59KVxuXG5hcGlSb3V0ZXIuZ2V0KCcvcGFnZXMnLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgcGFnZXMgPSBhd2FpdCBsb2FkQXJ0aWNsZXMoKTtcbiAgcmVzLnNlbmQoSlNPTi5zdHJpbmdpZnkocGFnZXMpKTtcbn0pO1xuXG5hcGlSb3V0ZXIuZ2V0KCcvcGFnZXMvOnNwZWNJZC86Y2F0SWQvOnBhZ2VJZCcsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBhcnRpY2xlID0gYXdhaXQgZmV0Y2hQYWdlKHJlcSwgcmVzKVxuICByZXMuc3RhdHVzKDIwMCkuanNvbihhcnRpY2xlKTsgIFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpUm91dGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIvYXBpLmpzIiwiaW1wb3J0IGV4cHJlc3MgICAgICAgICAgICAgIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGZzICAgICAgICAgICAgICAgICAgIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoICAgICAgICAgICAgICAgICBmcm9tICdwYXRoJztcbmltcG9ydCBjcnlwdG8gICAgICAgICAgICAgICBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHN0YXRpY01vZHVsZSAgICAgICAgIGZyb20gJ3N0YXRpYy1tb2R1bGUnO1xuaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyAgICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnOyBcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gICAgICBmcm9tICdyZWR1eCdcbmltcG9ydCB7IFByb3ZpZGVyIH0gICAgICAgICBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gICBmcm9tICdyZWFjdC1kb20vc2VydmVyJ1xuXG5pbXBvcnQgeyBSVU5USU1FX0NBQ0hFIH0gIGZyb20gJy4uL2NsaWVudC91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0IG1hbmlmZXN0ICAgICAgICAgICBmcm9tICcuLi8uLi9kaXN0L2NsaWVudC9zdGF0aWMvanMvbWFuaWZlc3QuanNvbic7XG5pbXBvcnQgQXBwICAgICAgICAgICAgICAgIGZyb20gJy4uL2NsaWVudC9hcHAnO1xuaW1wb3J0IGFsbFJlZHVjZXJzICAgICAgICBmcm9tICcuLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuXG5jb25zdCBDb250ZXh0VHlwZSA9IHtcbiAgaW5zZXJ0Q3NzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZnVuY3Rpb24gcmVuZGVyU2VydmVyU2lkZShyZXEsIHJlcykge1xuICBcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShhbGxSZWR1Y2Vycyk7XG5cbiAgLy8gQ3JpdGljYWwgcGF0aCBDU1MgcmVuZGVyaW5nXG4gIGNvbnN0IGNzcyA9IG5ldyBTZXQoKTsgLy8gQ1NTIGZvciBhbGwgcmVuZGVyZWQgUmVhY3QgY29tcG9uZW50c1xuICBjb25zdCBjb250ZXh0ID0geyBpbnNlcnRDc3M6ICguLi5zdHlsZXMpID0+IHtcbiAgICBzdHlsZXMuZm9yRWFjaCgoc3R5bGUpID0+IHsgY3NzLmFkZChzdHlsZS5fZ2V0Q3NzKCkpOyB9KTtcbiAgfSB9O1xuXG4gIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxBcHAgY29udGV4dD17Y29udGV4dH0+PC9BcHA+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcblxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKClcbiAgXG4gIHJlbmRlckZ1bGxQYWdlKHJlcywgaHRtbCwgY3NzLCBwcmVsb2FkZWRTdGF0ZSk7IFxufVxuXG5mdW5jdGlvbiByZW5kZXJGdWxsUGFnZShyZXMsIGh0bWwgPSBmYWxzZSwgY3NzID0gZmFsc2UsIHByZWxvYWRlZFN0YXRlID0gZmFsc2UpIHtcbiAgcmVzLnNlbmQoYFxuICAgIDxodG1sPlxuICAgICAgPGhlYWQ+XG4gICAgICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwieC11YS1jb21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIj5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCI+XG5cbiAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwLDQwMCw1MDBcIiByZWw9XCJwcmVsb2FkXCIgYXM9XCJzdHlsZVwiIGNyb3Nzb3JpZ2luIG9ubG9hZD1cInRoaXMucmVsPSdzdHlsZXNoZWV0J1wiPlxuICAgICAgICA8bGluayByZWw9XCJzaG9ydGN1dCBpY29uXCIgaHJlZj1cIi9zdGF0aWMvaWNvbnMvZmF2aWNvbi5pY29cIj5cbiAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL21hbmlmZXN0Lmpzb25cIj5cbiAgICAgICAgJHtjc3MgPyBcbiAgICAgICAgYDxzdHlsZSBpZD1cImNyaXRpY2FsLWNzc1wiPlxuICAgICAgICAgICR7Wy4uLmNzc10uam9pbignJykucmVwbGFjZSgvKFxcclxcbnxcXG58XFxyKS9nbSxcIlwiKX1cbiAgICAgICAgPC9zdHlsZT5gXG4gICAgICAgIDpcbiAgICAgICAgJydcbiAgICAgICAgfVxuICAgICAgPC9oZWFkPlxuICAgICAgPGJvZHk+XG4gICAgICAgICR7aHRtbCA/XG4gICAgICAgIGA8ZGl2IGlkPVwicm9vdFwiPjxkaXY+JHtodG1sfTwvZGl2PjwvZGl2PmBcbiAgICAgICAgOlxuICAgICAgICAnPGRpdiBpZD1cInJvb3RcIj48L2Rpdj4nXG4gICAgICAgIH1cbiAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICBpZiAobmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIpIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnKTtcbiAgICAgICAgICB9XG4gICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAke3ByZWxvYWRlZFN0YXRlID8gXG4gICAgICAgIGA8c2NyaXB0PlxuICAgICAgICAgIC8vIGh0dHA6Ly9yZWR1eC5qcy5vcmcvZG9jcy9yZWNpcGVzL1NlcnZlclJlbmRlcmluZy5odG1sI3NlY3VyaXR5LWNvbnNpZGVyYXRpb25zXG4gICAgICAgICAgd2luZG93Ll9fUFJFTE9BREVEX1NUQVRFX18gPSAke0pTT04uc3RyaW5naWZ5KHByZWxvYWRlZFN0YXRlKS5yZXBsYWNlKC88L2csICdcXFxcdTAwM2MnKX1cbiAgICAgICAgPC9zY3JpcHQ+YFxuICAgICAgICA6XG4gICAgICAgICcnXG4gICAgICAgIH1cbiAgICAgICAgPHNjcmlwdCBzcmM9XCIke21hbmlmZXN0Wyd2ZW5kb3IuanMnXX1cIj48L3NjcmlwdD5cbiAgICAgICAgPHNjcmlwdCBzcmM9XCIke21hbmlmZXN0WydhcHAuanMnXX1cIj48L3NjcmlwdD5cbiAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gIGApO1xufVxuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb3V0ZXIuZ2V0KCcvc3cuanMnLCBhc3luYyAocmVxLCByZXMpID0+IHtcblxuICBjb25zdCBpbnB1dCA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0ocGF0aC5qb2luKCdkaXN0JywgJ2NsaWVudCcsICdzdy5qcycpKTtcblxuICBsZXQgcHJlY2FjaGVhc3NldHNUb0NhY2hlID0gT2JqZWN0LnZhbHVlcyhtYW5pZmVzdCk7XG5cbiAgY29uc3QgcHJlY2FjaGVIYXNoICA9IGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKTtcblxuICBmb3IgKGxldCBhc3NldCBvZiBwcmVjYWNoZWFzc2V0c1RvQ2FjaGUpIHtcbiAgICBwcmVjYWNoZUhhc2gudXBkYXRlKGFzc2V0KTtcbiAgfSAgICBcblxuICBjb25zdCBwcmVjYWNoZURpZ2VzdCAgPSBwcmVjYWNoZUhhc2guZGlnZXN0KCdoZXgnKTtcblxuICByZXMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcpOyAgXG4gIGlucHV0LnBpcGUoXG4gICAgc3RhdGljTW9kdWxlKHtcbiAgICAgICdzdGF0aWMtcHJlY2FjaGUtdmVyc2lvbic6ICgpID0+IEpTT04uc3RyaW5naWZ5KHByZWNhY2hlRGlnZXN0KSxcbiAgICAgICdzdGF0aWMtcHJlY2FjaGUnOiAoKSA9PiBKU09OLnN0cmluZ2lmeShwcmVjYWNoZWFzc2V0c1RvQ2FjaGUpLFxuICAgICAgJ3N0YXRpYy1ydW50aW1lJzogKCkgPT4gSlNPTi5zdHJpbmdpZnkoUlVOVElNRV9DQUNIRSksXG4gICAgfSlcbiAgKS5waXBlKHJlcyk7XG59KTtcblxucm91dGVyLnVzZSgnL3N0YXRpYy9qcycsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7ICBcbiAgICAvLyBnemlwIHRoZSBtYWluIGNodW5rc1xuICAgIGlmIChyZXEudXJsLnN0YXJ0c1dpdGgoJy9hcHAnKSB8fCByZXEudXJsLnN0YXJ0c1dpdGgoJy92ZW5kb3InKSkgeyAgXG4gICAgICByZXEudXJsICs9ICcuZ3onO1xuICAgICAgcmVzLnNldCgnQ29udGVudC1FbmNvZGluZycsICdnemlwJyk7XG4gICAgfVxuICAgIHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCAnbWF4LWFnZT0zMTUzNjAwMCcpOyAgICBcbiAgfVxuICBuZXh0KCk7XG59KTtcblxucm91dGVyLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oJ2Rpc3QnLCAnY2xpZW50JykpKTtcblxucm91dGVyLnVzZSgocmVxLCByZXMpID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHJlbmRlclNlcnZlclNpZGUocmVxLCByZXMpO1xuICB9IGVsc2Uge1xuICAgIC8vIGluIGRldmVsb3BtZW50LCBkb250IGRvIHNlcnZlciBzaWRlIHJlbmRlcmluZ1xuICAgIHJlbmRlckZ1bGxQYWdlKHJlcyk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL3JvdXRlcy5qcyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5yaXBwbGVfcmlwcGxlLWNvbnRhaW5lcl9tWk8ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG4ucmlwcGxlX3JpcHBsZS1jb250YWluZXJfbVpPOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTU1LCAxNTUsIDE1NSwgLjEzKTsgfVxcblxcbi5yaXBwbGVfcmlwcGxlLW9yaWdpbl8zRUgge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogOTk5OTk5OTtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMTU1LCAxNTUsIDE1NSwgLjMpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cXG5cXG4ucmlwcGxlX3JpcHBsZS1vcmlnaW5fM0VILnJpcHBsZV9hbmltYXRhYmxlXzNBMCB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC42cyBlYXNlLWluLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGVhc2UtaW47XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNnMgZWFzZS1pbiwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBlYXNlLWluO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbiwgb3BhY2l0eSAwLjZzIGVhc2UtaW47XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLCBvcGFjaXR5IDAuNnMgZWFzZS1pbiwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBlYXNlLWluOyB9XFxuXFxuLnJpcHBsZV9yaXBwbGUtb3JpZ2luXzNFSC5yaXBwbGVfb3V0XzNXMCB7XFxuICBvcGFjaXR5OiAwOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicmlwcGxlLWNvbnRhaW5lclwiOiBcInJpcHBsZV9yaXBwbGUtY29udGFpbmVyX21aT1wiLFxuXHRcInJpcHBsZS1vcmlnaW5cIjogXCJyaXBwbGVfcmlwcGxlLW9yaWdpbl8zRUhcIixcblx0XCJhbmltYXRhYmxlXCI6IFwicmlwcGxlX2FuaW1hdGFibGVfM0EwXCIsXG5cdFwib3V0XCI6IFwicmlwcGxlX291dF8zVzBcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBjYXRlZ29yeS1zZWN0aW9uX2ZhZGVJbl8yTFEge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyBjYXRlZ29yeS1zZWN0aW9uX2ZhZGVJbl8yTFEge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uXzEwbyB7XFxuICBwYWRkaW5nOiA4cHggMDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzI0MDQ3OyB9XFxuXFxuLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uLWhlYWRlcl8xTmMge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGNhdGVnb3J5LXNlY3Rpb25fZmFkZUluXzJMUSAwLjZzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogY2F0ZWdvcnktc2VjdGlvbl9mYWRlSW5fMkxRIDAuNnMgMTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgcGFkZGluZzogOHB4IDI0cHg7XFxuICBtYXJnaW46IDA7XFxuICBjb2xvcjogc2lsdmVyO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uLWhlYWRlcl8xTmMgLmNhdGVnb3J5LXNlY3Rpb25fY2hldnJvbl8yTHQge1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBsaW5lYXI7XFxuICAgIHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuMnMgbGluZWFyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBsaW5lYXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGxpbmVhciwgLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBsaW5lYXI7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG5cXG4uY2F0ZWdvcnktc2VjdGlvbl9jYXRlZ29yeVNlY3Rpb24tYm9keV8zU00ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGNhdGVnb3J5LXNlY3Rpb25fZmFkZUluXzJMUSAwLjRzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogY2F0ZWdvcnktc2VjdGlvbl9mYWRlSW5fMkxRIDAuNHMgMTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcblxcbi5jYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbl8xMG8uY2F0ZWdvcnktc2VjdGlvbl9oaWRkZW5fMnNmIHtcXG4gIHBhZGRpbmctYm90dG9tOiAwcHg7IH1cXG4gIC5jYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbl8xMG8uY2F0ZWdvcnktc2VjdGlvbl9oaWRkZW5fMnNmIC5jYXRlZ29yeS1zZWN0aW9uX2NoZXZyb25fMkx0IHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKTsgfVxcbiAgLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uXzEwby5jYXRlZ29yeS1zZWN0aW9uX2hpZGRlbl8yc2YgLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uLWJvZHlfM1NNIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5jYXRlZ29yeS1zZWN0aW9uX3BhZ2VMaXN0LWl0ZW1fM3Q0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAwcHggMzJweCAwcHggMzJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4xcyBsaW5lYXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgLjFzIGxpbmVhcjsgfVxcblxcbi5jYXRlZ29yeS1zZWN0aW9uX3BhZ2VMaXN0LWl0ZW1fM3Q0LmNhdGVnb3J5LXNlY3Rpb25fYWN0aXZlXzI1VSB7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgY29sb3I6ICMwMGI0YTI7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJjYXRlZ29yeVNlY3Rpb25cIjogXCJjYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbl8xMG9cIixcblx0XCJjYXRlZ29yeVNlY3Rpb24taGVhZGVyXCI6IFwiY2F0ZWdvcnktc2VjdGlvbl9jYXRlZ29yeVNlY3Rpb24taGVhZGVyXzFOY1wiLFxuXHRcImZhZGVJblwiOiBcImNhdGVnb3J5LXNlY3Rpb25fZmFkZUluXzJMUVwiLFxuXHRcImNoZXZyb25cIjogXCJjYXRlZ29yeS1zZWN0aW9uX2NoZXZyb25fMkx0XCIsXG5cdFwiY2F0ZWdvcnlTZWN0aW9uLWJvZHlcIjogXCJjYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbi1ib2R5XzNTTVwiLFxuXHRcImhpZGRlblwiOiBcImNhdGVnb3J5LXNlY3Rpb25faGlkZGVuXzJzZlwiLFxuXHRcInBhZ2VMaXN0LWl0ZW1cIjogXCJjYXRlZ29yeS1zZWN0aW9uX3BhZ2VMaXN0LWl0ZW1fM3Q0XCIsXG5cdFwiYWN0aXZlXCI6IFwiY2F0ZWdvcnktc2VjdGlvbl9hY3RpdmVfMjVVXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L2NhdGVnb3J5LXNlY3Rpb24vY2F0ZWdvcnktc2VjdGlvbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgcGFnZS1saXN0X2ZhZGVJbl8zV3Mge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyBwYWdlLWxpc3RfZmFkZUluXzNXcyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4ucGFnZS1saXN0X3BhZ2VsaXN0LXdyYXBwZXJfMUJDIHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnBhZ2UtbGlzdF9ub1Jlc3VsdHNfMVI5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBwYWdlLWxpc3RfZmFkZUluXzNXcyAwLjZzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogcGFnZS1saXN0X2ZhZGVJbl8zV3MgMC42cyAxOyB9XFxuXFxuLnBhZ2UtbGlzdF9ub1Jlc3VsdHMtY29weV8yQmcge1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgLjYpOyB9XFxuXFxuLnBhZ2UtbGlzdF9ub1Jlc3VsdHMtY29weV8yQmcgaSB7XFxuICBwYWRkaW5nLXJpZ2h0OiA0cHg7IH1cXG5cXG4ucGFnZS1saXN0X25vUmVzdWx0cy1jb3B5XzJCZyBzcGFuIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm90dG9tOiA1cHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJwYWdlbGlzdC13cmFwcGVyXCI6IFwicGFnZS1saXN0X3BhZ2VsaXN0LXdyYXBwZXJfMUJDXCIsXG5cdFwibm9SZXN1bHRzXCI6IFwicGFnZS1saXN0X25vUmVzdWx0c18xUjlcIixcblx0XCJmYWRlSW5cIjogXCJwYWdlLWxpc3RfZmFkZUluXzNXc1wiLFxuXHRcIm5vUmVzdWx0cy1jb3B5XCI6IFwicGFnZS1saXN0X25vUmVzdWx0cy1jb3B5XzJCZ1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvZHJhd2VyL3BhZ2UtbGlzdC9wYWdlLWxpc3Quc2Nzc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGhlYWRlci1pY29uX2ZhZGVJbl8zM3oge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyBoZWFkZXItaWNvbl9mYWRlSW5fMzN6IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBoZWFkZXItaWNvbl9ncm93XzJJQSB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgaGVhZGVyLWljb25fZ3Jvd18ySUEge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uaGVhZGVyLWljb25faGVhZGVyLWljb25fMVFzIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogOTg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiBub25lOyB9XFxuXFxuLmhlYWRlci1pY29uX2ljb24tY29udGFpbmVyXzNKZSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgLmhlYWRlci1pY29uX21lbnVJY29uXzFwYS5oZWFkZXItaWNvbl9zZWFyY2hPcGVuXzFCRiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblxcbi5oZWFkZXItaWNvbl9iYWNrSWNvbl8yRXQge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5oZWFkZXItaWNvbl9iYWNrSWNvbl8yRXQuaGVhZGVyLWljb25fc2VhcmNoT3Blbl8xQkYge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGhlYWRlci1pY29uX2dyb3dfMklBIDAuMnMgMTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBoZWFkZXItaWNvbl9ncm93XzJJQSAwLjJzIDE7XFxuICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuaGVhZGVyLWljb25fYmFja0ljb25fMkV0LmhlYWRlci1pY29uX3NlYXJjaE9wZW5fMUJGIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiaGVhZGVyLWljb25cIjogXCJoZWFkZXItaWNvbl9oZWFkZXItaWNvbl8xUXNcIixcblx0XCJpY29uLWNvbnRhaW5lclwiOiBcImhlYWRlci1pY29uX2ljb24tY29udGFpbmVyXzNKZVwiLFxuXHRcIm1lbnVJY29uXCI6IFwiaGVhZGVyLWljb25fbWVudUljb25fMXBhXCIsXG5cdFwic2VhcmNoT3BlblwiOiBcImhlYWRlci1pY29uX3NlYXJjaE9wZW5fMUJGXCIsXG5cdFwiYmFja0ljb25cIjogXCJoZWFkZXItaWNvbl9iYWNrSWNvbl8yRXRcIixcblx0XCJncm93XCI6IFwiaGVhZGVyLWljb25fZ3Jvd18ySUFcIixcblx0XCJmYWRlSW5cIjogXCJoZWFkZXItaWNvbl9mYWRlSW5fMzN6XCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9jbGllbnQvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWljb24vaGVhZGVyLWljb24uc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIHNlYXJjaC1pbnB1dF9mYWRlSW5fUXQtIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgc2VhcmNoLWlucHV0X2ZhZGVJbl9RdC0ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnNlYXJjaC1pbnB1dF9zZWFyY2gtbGFiZWxfMjVLIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICB3aWR0aDogMjRweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjFzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4xcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuXFxuLnNlYXJjaC1pbnB1dF9pY29uLWNvbnRhaW5lcl8yZFIge1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgY29sb3I6ICNmZmY7IH1cXG5cXG4uc2VhcmNoLWlucHV0X3NlYXJjaC1pY29uX1ZpUCB7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICB3aWR0aDogMjRweDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7IH1cXG5cXG4uc2VhcmNoLWlucHV0X3NlYXJjaC1jbG9zZUljb25fM05qIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3BhY2l0eTogMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLnNlYXJjaC1pbnB1dF9zZWFyY2gtY2xvc2VJY29uXzNOaiBpIHtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICBmb250LXNpemU6IDIwcHg7IH1cXG5cXG4uc2VhcmNoLWlucHV0X3NlYXJjaC1pbnB1dC0tY29udGFpbmVyXzFjTiB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMyNDA0NztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICAgIGZsZXg6IDE7XFxuICBtYXJnaW4tbGVmdDogOHB4OyB9XFxuXFxuLnNlYXJjaC1pbnB1dF9zZWFyY2gtaW5wdXQtLWNvbnRhaW5lcl8xY046OmFmdGVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgY29udGVudDogJyc7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IC0xcHg7XFxuICBsZWZ0OiAwcHg7XFxuICBoZWlnaHQ6IDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogMTBweDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7IH1cXG5cXG4uc2VhcmNoLWlucHV0X3NlYXJjaC1pbnB1dF8xTVAge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvdXRsaW5lOiAwO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogNHB4IDI4cHggNHB4IDRweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgY29sb3I6ICNmZmY7IH1cXG5cXG4uc2VhcmNoLWlucHV0X3NlYXJjaC1sYWJlbF8yNUsuc2VhcmNoLWlucHV0X29wZW5lZF9BX3Ege1xcbiAgd2lkdGg6IDM2MHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1pbnB1dF9zZWFyY2gtbGFiZWxfMjVLLnNlYXJjaC1pbnB1dF9vcGVuZWRfQV9xIHtcXG4gICAgICB3aWR0aDogMTAwJTsgfSB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1pbnB1dF9zZWFyY2gtbGFiZWxfMjVLLnNlYXJjaC1pbnB1dF9vcGVuZWRfQV9xIC5zZWFyY2gtaW5wdXRfc2VhcmNoLWlucHV0LS1jb250YWluZXJfMWNOIHtcXG4gICAgICBtYXJnaW4tbGVmdDogMDsgfSB9XFxuICAuc2VhcmNoLWlucHV0X3NlYXJjaC1sYWJlbF8yNUsuc2VhcmNoLWlucHV0X29wZW5lZF9BX3EgLnNlYXJjaC1pbnB1dF9zZWFyY2gtY2xvc2VJY29uXzNOaiB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuc2VhcmNoLWlucHV0X3NlYXJjaC1sYWJlbF8yNUsuc2VhcmNoLWlucHV0X29wZW5lZF9BX3EgLnNlYXJjaC1pbnB1dF9zZWFyY2gtc2VhcmNoSWNvbl8xdlEge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblxcbi5zZWFyY2gtaW5wdXRfc2VhcmNoLWxhYmVsXzI1Sy5zZWFyY2gtaW5wdXRfZm9jdXNlZF8xSFAgLnNlYXJjaC1pbnB1dF9zZWFyY2gtaW5wdXQtLWNvbnRhaW5lcl8xY046OmFmdGVyIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICB3aWR0aDogMTAwJTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInNlYXJjaC1sYWJlbFwiOiBcInNlYXJjaC1pbnB1dF9zZWFyY2gtbGFiZWxfMjVLXCIsXG5cdFwiaWNvbi1jb250YWluZXJcIjogXCJzZWFyY2gtaW5wdXRfaWNvbi1jb250YWluZXJfMmRSXCIsXG5cdFwic2VhcmNoLWljb25cIjogXCJzZWFyY2gtaW5wdXRfc2VhcmNoLWljb25fVmlQXCIsXG5cdFwic2VhcmNoLWNsb3NlSWNvblwiOiBcInNlYXJjaC1pbnB1dF9zZWFyY2gtY2xvc2VJY29uXzNOalwiLFxuXHRcInNlYXJjaC1pbnB1dC0tY29udGFpbmVyXCI6IFwic2VhcmNoLWlucHV0X3NlYXJjaC1pbnB1dC0tY29udGFpbmVyXzFjTlwiLFxuXHRcInNlYXJjaC1pbnB1dFwiOiBcInNlYXJjaC1pbnB1dF9zZWFyY2gtaW5wdXRfMU1QXCIsXG5cdFwib3BlbmVkXCI6IFwic2VhcmNoLWlucHV0X29wZW5lZF9BX3FcIixcblx0XCJzZWFyY2gtc2VhcmNoSWNvblwiOiBcInNlYXJjaC1pbnB1dF9zZWFyY2gtc2VhcmNoSWNvbl8xdlFcIixcblx0XCJmb2N1c2VkXCI6IFwic2VhcmNoLWlucHV0X2ZvY3VzZWRfMUhQXCIsXG5cdFwiZmFkZUluXCI6IFwic2VhcmNoLWlucHV0X2ZhZGVJbl9RdC1cIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL2hlYWRlci9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBwcm9ncmVzcy1pbmRpY2F0b3JfZmFkZUluXzNFVCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHByb2dyZXNzLWluZGljYXRvcl9mYWRlSW5fM0VUIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5wcm9ncmVzcy1pbmRpY2F0b3JfcHJvZ3Jlc3NJbmRpY2F0b3JfM3lBIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDEwMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGI0YTI7XFxuICBoZWlnaHQ6IDRweDsgfVxcblxcbi5wcm9ncmVzcy1pbmRpY2F0b3JfcHJvZ3Jlc3NJbmRpY2F0b3JfM3lBLnByb2dyZXNzLWluZGljYXRvcl9hbmltYXRhYmxlXzFsVSB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IHdpZHRoIDAuNHMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgb3BhY2l0eSAwLjFzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IHdpZHRoIDAuNHMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgb3BhY2l0eSAwLjFzIGxpbmVhcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInByb2dyZXNzSW5kaWNhdG9yXCI6IFwicHJvZ3Jlc3MtaW5kaWNhdG9yX3Byb2dyZXNzSW5kaWNhdG9yXzN5QVwiLFxuXHRcImFuaW1hdGFibGVcIjogXCJwcm9ncmVzcy1pbmRpY2F0b3JfYW5pbWF0YWJsZV8xbFVcIixcblx0XCJmYWRlSW5cIjogXCJwcm9ncmVzcy1pbmRpY2F0b3JfZmFkZUluXzNFVFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvbWFpbi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5saW5rX3JvdXRlXzJjaSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiBpbmhlcml0OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm91dGVcIjogXCJsaW5rX3JvdXRlXzJjaVwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9saW5rL2xpbmsuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIHJvdXRlLWhhbmRsZXJfZmFkZUluX1FIbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdXRlLWhhbmRsZXJfZmFkZUluX1FIbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4ucm91dGUtaGFuZGxlcl90cmFuc2l0aW9uLWNvbnRhaW5lcl8ybW4ge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgZmxleDogMTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XFxuXFxuLnJvdXRlLWhhbmRsZXJfbG9hZGluZ18xRk8ge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgZmxleDogMTtcXG4gIHBhZGRpbmc6IDE2cHg7IH1cXG5cXG4ucm91dGUtaGFuZGxlcl9sb2FkaW5nXzFGTy5yb3V0ZS1oYW5kbGVyX2VudGVyQWN0aXZlXzExYiB7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLnJvdXRlLWhhbmRsZXJfZW50ZXJfMk1QIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMHB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMHB4KTtcXG4gIG9wYWNpdHk6IDAuMDE7IH1cXG5cXG4ucm91dGUtaGFuZGxlcl9lbnRlcl8yTVAucm91dGUtaGFuZGxlcl9lbnRlckFjdGl2ZV8xMWIge1xcbiAgb3BhY2l0eTogMTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSksIHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuXFxuLnJvdXRlLWhhbmRsZXJfbGVhdmVfM0VUIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICBvcGFjaXR5OiAxOyB9XFxuXFxuLnJvdXRlLWhhbmRsZXJfbGVhdmVfM0VULnJvdXRlLWhhbmRsZXJfbGVhdmVBY3RpdmVfeTZMIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTZweDtcXG4gIGxlZnQ6IDQ4cHg7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwcHgpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMHB4KTtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuXFxuLnJvdXRlLWhhbmRsZXJfYXBwZWFyXzJUQSB7XFxuICBvcGFjaXR5OiAwLjAxOyB9XFxuXFxuLnJvdXRlLWhhbmRsZXJfYXBwZWFyXzJUQS5yb3V0ZS1oYW5kbGVyX2FwcGVhckFjdGl2ZV8ydEIge1xcbiAgb3BhY2l0eTogMTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInRyYW5zaXRpb24tY29udGFpbmVyXCI6IFwicm91dGUtaGFuZGxlcl90cmFuc2l0aW9uLWNvbnRhaW5lcl8ybW5cIixcblx0XCJsb2FkaW5nXCI6IFwicm91dGUtaGFuZGxlcl9sb2FkaW5nXzFGT1wiLFxuXHRcImVudGVyQWN0aXZlXCI6IFwicm91dGUtaGFuZGxlcl9lbnRlckFjdGl2ZV8xMWJcIixcblx0XCJlbnRlclwiOiBcInJvdXRlLWhhbmRsZXJfZW50ZXJfMk1QXCIsXG5cdFwibGVhdmVcIjogXCJyb3V0ZS1oYW5kbGVyX2xlYXZlXzNFVFwiLFxuXHRcImxlYXZlQWN0aXZlXCI6IFwicm91dGUtaGFuZGxlcl9sZWF2ZUFjdGl2ZV95NkxcIixcblx0XCJhcHBlYXJcIjogXCJyb3V0ZS1oYW5kbGVyX2FwcGVhcl8yVEFcIixcblx0XCJhcHBlYXJBY3RpdmVcIjogXCJyb3V0ZS1oYW5kbGVyX2FwcGVhckFjdGl2ZV8ydEJcIixcblx0XCJmYWRlSW5cIjogXCJyb3V0ZS1oYW5kbGVyX2ZhZGVJbl9RSG5cIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvcm91dGUtaGFuZGxlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X2ZhZGVJbl8xSGIge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyBsb2FkaW5nLXZpZXdfZmFkZUluXzFIYiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4ubG9hZGluZy12aWV3X2xvYWRpbmctY29udGFpbmVyX1gxWCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICAgIGZsZXg6IDE7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuLmxvYWRpbmctdmlld19sb2FkaW5nLXdyYXBwZXJfMVlDIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkaW5nLXZpZXdfZmFkZUluXzFIYiAuNnMgMTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBsb2FkaW5nLXZpZXdfZmFkZUluXzFIYiAuNnMgMTsgfVxcblxcbi5sb2FkaW5nLXZpZXdfc3Bpbm5lcl8yODMge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGxvYWRpbmctdmlld19yb3RhdG9yXzM0MyAxLjRzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBsb2FkaW5nLXZpZXdfcm90YXRvcl8zNDMgMS40cyBsaW5lYXIgaW5maW5pdGU7IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X3JvdGF0b3JfMzQzIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRpbmctdmlld19yb3RhdG9yXzM0MyB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTsgfSB9XFxuXFxuLmxvYWRpbmctdmlld19wYXRoXzNEbCB7XFxuICBzdHJva2UtZGFzaGFycmF5OiAxODc7XFxuICBzdHJva2UtZGFzaG9mZnNldDogMDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZGluZy12aWV3X2Rhc2hfMWplIDEuNHMgZWFzZS1pbi1vdXQgaW5maW5pdGUsIGxvYWRpbmctdmlld19jb2xvcnNfVVpLIDUuNnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XFxuICAgICAgICAgIGFuaW1hdGlvbjogbG9hZGluZy12aWV3X2Rhc2hfMWplIDEuNHMgZWFzZS1pbi1vdXQgaW5maW5pdGUsIGxvYWRpbmctdmlld19jb2xvcnNfVVpLIDUuNnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X2NvbG9yc19VWksge1xcbiAgMCUge1xcbiAgICBzdHJva2U6ICMyODM1M2U7IH1cXG4gIDUwJSB7XFxuICAgIHN0cm9rZTogIzAwYjRhMjsgfVxcbiAgMTAwJSB7XFxuICAgIHN0cm9rZTogIzI4MzUzZTsgfSB9XFxuXFxuQGtleWZyYW1lcyBsb2FkaW5nLXZpZXdfY29sb3JzX1VaSyB7XFxuICAwJSB7XFxuICAgIHN0cm9rZTogIzI4MzUzZTsgfVxcbiAgNTAlIHtcXG4gICAgc3Ryb2tlOiAjMDBiNGEyOyB9XFxuICAxMDAlIHtcXG4gICAgc3Ryb2tlOiAjMjgzNTNlOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X2Rhc2hfMWplIHtcXG4gIDAlIHtcXG4gICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDE4NzsgfVxcbiAgNTAlIHtcXG4gICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDQ2Ljc1O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAxODc7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDUwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NTBkZWcpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRpbmctdmlld19kYXNoXzFqZSB7XFxuICAwJSB7XFxuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAxODc7IH1cXG4gIDUwJSB7XFxuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA0Ni43NTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7IH1cXG4gIDEwMCUge1xcbiAgICBzdHJva2UtZGFzaG9mZnNldDogMTg3O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1MGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDUwZGVnKTsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwibG9hZGluZy1jb250YWluZXJcIjogXCJsb2FkaW5nLXZpZXdfbG9hZGluZy1jb250YWluZXJfWDFYXCIsXG5cdFwibG9hZGluZy13cmFwcGVyXCI6IFwibG9hZGluZy12aWV3X2xvYWRpbmctd3JhcHBlcl8xWUNcIixcblx0XCJmYWRlSW5cIjogXCJsb2FkaW5nLXZpZXdfZmFkZUluXzFIYlwiLFxuXHRcInNwaW5uZXJcIjogXCJsb2FkaW5nLXZpZXdfc3Bpbm5lcl8yODNcIixcblx0XCJyb3RhdG9yXCI6IFwibG9hZGluZy12aWV3X3JvdGF0b3JfMzQzXCIsXG5cdFwicGF0aFwiOiBcImxvYWRpbmctdmlld19wYXRoXzNEbFwiLFxuXHRcImRhc2hcIjogXCJsb2FkaW5nLXZpZXdfZGFzaF8xamVcIixcblx0XCJjb2xvcnNcIjogXCJsb2FkaW5nLXZpZXdfY29sb3JzX1VaS1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvbG9hZGluZy12aWV3L2xvYWRpbmctdmlldy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgZHJhd2VyX2ZhZGVJbl8zUkUge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyBkcmF3ZXJfZmFkZUluXzNSRSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDk5O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDQwJTtcXG4gIG1heC13aWR0aDogMzAwcHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6IHtcXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgei1pbmRleDogMTAyO1xcbiAgICAgIGxlZnQ6IDA7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIG1heC13aWR0aDogbm9uZTtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6OjphZnRlciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb250ZW50OiAnJztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAtMTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC40KTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgd2lsbC1jaGFuZ2U6IG9wYWNpdHk7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC40cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHtcXG4gIC5kcmF3ZXJfZHJhd2VyLWNvbnRhaW5lcl8yQnouZHJhd2VyX2FjdGl2ZV8zQmYge1xcbiAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gIC5kcmF3ZXJfZHJhd2VyLWNvbnRhaW5lcl8yQnouZHJhd2VyX2FjdGl2ZV8zQmYge1xcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bzsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6LmRyYXdlcl9hY3RpdmVfM0JmOjphZnRlciB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5kcmF3ZXJfZHJhd2VyXzN6dyB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC40cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNHMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC40cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLmRyYXdlcl9kcmF3ZXJfM3p3IHtcXG4gICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDJweCAwIDEycHggcmdiYSgwLCAwLCAwLCAuNCk7XFxuICAgICAgICAgICAgICBib3gtc2hhZG93OiAycHggMCAxMnB4IHJnYmEoMCwgMCwgMCwgLjQpO1xcbiAgICAgIGxlZnQ6IDA7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIG1heC13aWR0aDogNDAwcHg7XFxuICAgICAgd2lkdGg6IDgwJTtcXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTA3JSk7XFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwNyUpO1xcbiAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07IH0gfVxcblxcbi5kcmF3ZXJfZHJhd2VyXzN6dy5kcmF3ZXJfZHJhZ2dhYmxlXzJwYyB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuMTNzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpO1xcbiAgdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4xM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSksIC13ZWJraXQtdHJhbnNmb3JtIDAuMTNzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpOyB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6LmRyYXdlcl9hY3RpdmVfM0JmIC5kcmF3ZXJfZHJhd2VyXzN6dyB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7IH0gfVxcblxcbi5kcmF3ZXJfZHJhd2VyLWhvbWVDb250YWluZXJfM0hoIHtcXG4gIHBhZGRpbmc6IDhweCAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzMjQwNDc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyYjMyOyB9XFxuXFxuLmRyYXdlcl9kcmF3ZXItaG9tZV8xTE0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDAgMjRweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuZHJhd2VyX2RyYXdlci1ob21lXzFMTSBzdmcge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDI3cHg7XFxuICAgIGZpbGw6ICNmZmY7IH1cXG4gIC5kcmF3ZXJfZHJhd2VyLWhvbWVfMUxNIHNwYW4ge1xcbiAgICBjb2xvcjogI2ZmZjsgfVxcblxcbi5kcmF3ZXJfZHJhd2VyLWhvbWVfMUxNLmRyYXdlcl9hY3RpdmVfM0JmIGkge1xcbiAgY29sb3I6ICMwMGI0YTI7IH1cXG5cXG4uZHJhd2VyX2RyYXdlci1ob21lXzFMTS5kcmF3ZXJfYWN0aXZlXzNCZiBzcGFuIHtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBjb2xvcjogIzAwYjRhMjsgfVxcblxcbi5kcmF3ZXJfZHJhd2VyLWxvZ29fanpGIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyYjMyOyB9XFxuICAuZHJhd2VyX2RyYXdlci1sb2dvX2p6RiBpbWcge1xcbiAgICB3aWR0aDogMTAwJTsgfVxcblxcbi5kcmF3ZXJfZHJhd2VyLWRpdmlkZXJfWTFYIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMzMjQwNDc7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgbWFyZ2luOiAwOyB9XFxuXFxuLmRyYXdlcl9zZWFyY2gtY29udGFpbmVyXzJmdiB7XFxuICBwYWRkaW5nOiAxNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMyNDA0NztcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzI0MDQ3OyB9XFxuXFxuLmRyYXdlcl9hcnRpY2xlRmlsdGVycy13cmFwcGVyXzNHQSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyYjMyOyB9XFxuXFxuLmRyYXdlcl9wYWdlTGlzdC13cmFwcGVyXzFqRSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyYjMyO1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgZmxleDogMTtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuLmRyYXdlcl9kcmF3ZXItZm9vdGVyXzFhTSB7XFxuICBoZWlnaHQ6IDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZTJiMzI7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJkcmF3ZXItY29udGFpbmVyXCI6IFwiZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6XCIsXG5cdFwiYWN0aXZlXCI6IFwiZHJhd2VyX2FjdGl2ZV8zQmZcIixcblx0XCJkcmF3ZXJcIjogXCJkcmF3ZXJfZHJhd2VyXzN6d1wiLFxuXHRcImRyYWdnYWJsZVwiOiBcImRyYXdlcl9kcmFnZ2FibGVfMnBjXCIsXG5cdFwiZHJhd2VyLWhvbWVDb250YWluZXJcIjogXCJkcmF3ZXJfZHJhd2VyLWhvbWVDb250YWluZXJfM0hoXCIsXG5cdFwiZHJhd2VyLWhvbWVcIjogXCJkcmF3ZXJfZHJhd2VyLWhvbWVfMUxNXCIsXG5cdFwiZHJhd2VyLWxvZ29cIjogXCJkcmF3ZXJfZHJhd2VyLWxvZ29fanpGXCIsXG5cdFwiZHJhd2VyLWRpdmlkZXJcIjogXCJkcmF3ZXJfZHJhd2VyLWRpdmlkZXJfWTFYXCIsXG5cdFwic2VhcmNoLWNvbnRhaW5lclwiOiBcImRyYXdlcl9zZWFyY2gtY29udGFpbmVyXzJmdlwiLFxuXHRcImFydGljbGVGaWx0ZXJzLXdyYXBwZXJcIjogXCJkcmF3ZXJfYXJ0aWNsZUZpbHRlcnMtd3JhcHBlcl8zR0FcIixcblx0XCJwYWdlTGlzdC13cmFwcGVyXCI6IFwiZHJhd2VyX3BhZ2VMaXN0LXdyYXBwZXJfMWpFXCIsXG5cdFwiZHJhd2VyLWZvb3RlclwiOiBcImRyYXdlcl9kcmF3ZXItZm9vdGVyXzFhTVwiLFxuXHRcImZhZGVJblwiOiBcImRyYXdlcl9mYWRlSW5fM1JFXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9jbGllbnQvY29udGFpbmVycy9kcmF3ZXIvZHJhd2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBtYWluLWhlYWRlcl9mYWRlSW5fMXc4IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgbWFpbi1oZWFkZXJfZmFkZUluXzF3OCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4ubWFpbi1oZWFkZXJfaGVhZGVyXzJCdiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAxNnB4IDI0cHggMTZweCA3MnB4O1xcbiAgei1pbmRleDogMTAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgzNTNlO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIC4zKTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMHB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAuMyk7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAubWFpbi1oZWFkZXJfaGVhZGVyXzJCdiB7XFxuICAgICAgcGFkZGluZzogMTZweCAyNHB4IDE2cHggNDhweDsgfSB9XFxuXFxuLm1haW4taGVhZGVyX3RpdGxlLWNvbnRhaW5lcl8zTXQge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbi5tYWluLWhlYWRlcl90b2dnbGUtY29udGFpbmVyXzNvaSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiA0OHB4OyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHtcXG4gICAgLm1haW4taGVhZGVyX3RvZ2dsZS1jb250YWluZXJfM29pIHtcXG4gICAgICBsZWZ0OiAxNnB4OyB9IH1cXG5cXG4ubWFpbi1oZWFkZXJfdGl0bGVfMWdEIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgZmxleDogMTtcXG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBsaW5lYXI7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB9XFxuICAubWFpbi1oZWFkZXJfdGl0bGVfMWdEIC5tYWluLWhlYWRlcl90aXRsZS1kZXRhaWxfM05ZIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gIC5tYWluLWhlYWRlcl9oZWFkZXJfMkJ2Lm1haW4taGVhZGVyX3NlYXJjaE9wZW5fMWZVIC5tYWluLWhlYWRlcl90aXRsZV8xZ0Qge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBwYWRkaW5nOiAwOyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gIC5tYWluLWhlYWRlcl9oZWFkZXJfMkJ2Lm1haW4taGVhZGVyX3NlYXJjaE9wZW5fMWZVIC5tYWluLWhlYWRlcl90aXRsZS1jb250YWluZXJfM010IHtcXG4gICAgd2lkdGg6IDA7IH0gfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgLm1haW4taGVhZGVyX2hlYWRlcl8yQnYubWFpbi1oZWFkZXJfc2VhcmNoT3Blbl8xZlUgLm1haW4taGVhZGVyX3NlYXJjaC1jb250YWluZXJfaUhEIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICAgIGZsZXg6IDE7IH0gfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgLm1haW4taGVhZGVyX2hlYWRlcl8yQnYubWFpbi1oZWFkZXJfd2F0ZXJmYWxsT3Blbl8ydXEge1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiaGVhZGVyXCI6IFwibWFpbi1oZWFkZXJfaGVhZGVyXzJCdlwiLFxuXHRcInRpdGxlLWNvbnRhaW5lclwiOiBcIm1haW4taGVhZGVyX3RpdGxlLWNvbnRhaW5lcl8zTXRcIixcblx0XCJ0b2dnbGUtY29udGFpbmVyXCI6IFwibWFpbi1oZWFkZXJfdG9nZ2xlLWNvbnRhaW5lcl8zb2lcIixcblx0XCJ0aXRsZVwiOiBcIm1haW4taGVhZGVyX3RpdGxlXzFnRFwiLFxuXHRcInRpdGxlLWRldGFpbFwiOiBcIm1haW4taGVhZGVyX3RpdGxlLWRldGFpbF8zTllcIixcblx0XCJzZWFyY2hPcGVuXCI6IFwibWFpbi1oZWFkZXJfc2VhcmNoT3Blbl8xZlVcIixcblx0XCJzZWFyY2gtY29udGFpbmVyXCI6IFwibWFpbi1oZWFkZXJfc2VhcmNoLWNvbnRhaW5lcl9pSERcIixcblx0XCJ3YXRlcmZhbGxPcGVuXCI6IFwibWFpbi1oZWFkZXJfd2F0ZXJmYWxsT3Blbl8ydXFcIixcblx0XCJmYWRlSW5cIjogXCJtYWluLWhlYWRlcl9mYWRlSW5fMXc4XCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9jbGllbnQvY29udGFpbmVycy9oZWFkZXIvbWFpbi1oZWFkZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIHRvYXN0LW1hbmFnZXJfZmFkZUluXzN2YiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHRvYXN0LW1hbmFnZXJfZmFkZUluXzN2YiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4udG9hc3QtbWFuYWdlcl90b2FzdC1jb250YWluZXJfMVJpIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDk5O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgdG9wOiAxMDAlO1xcbiAgbGVmdDogMDtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtcGFjazogZW5kO1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGVuZDtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC50b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmkge1xcbiAgICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH0gfVxcbiAgLnRvYXN0LW1hbmFnZXJfdG9hc3QtY29udGFpbmVyXzFSaSAudG9hc3QtbWFuYWdlcl90b2FzdC13cmFwcGVyXzJQcSB7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSksIG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAgIC50b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmkgLnRvYXN0LW1hbmFnZXJfdG9hc3Qtd3JhcHBlcl8yUHEge1xcbiAgICAgICAgcGFkZGluZzogMDsgfSB9XFxuICAgIC50b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmkgLnRvYXN0LW1hbmFnZXJfdG9hc3Qtd3JhcHBlcl8yUHEgLnRvYXN0LW1hbmFnZXJfdG9hc3RfM0FTIHtcXG4gICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gICAgICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgIGJhY2tncm91bmQ6ICMxZTJiMzI7XFxuICAgICAgcGFkZGluZzogNHB4IDhweCA0cHggMjRweDtcXG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XFxuICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIC40KTtcXG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjQpOyB9XFxuICAgICAgLnRvYXN0LW1hbmFnZXJfdG9hc3QtY29udGFpbmVyXzFSaSAudG9hc3QtbWFuYWdlcl90b2FzdC13cmFwcGVyXzJQcSAudG9hc3QtbWFuYWdlcl90b2FzdF8zQVMgLnRvYXN0LW1hbmFnZXJfbWVzc2FnZV8zOUcge1xcbiAgICAgICAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAgICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgICAgICAgZmxleDogMTtcXG4gICAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7XFxuICAgICAgICBtYXJnaW46IDAgNHB4IDAgMDsgfVxcbiAgICAgIC50b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmkgLnRvYXN0LW1hbmFnZXJfdG9hc3Qtd3JhcHBlcl8yUHEgLnRvYXN0LW1hbmFnZXJfdG9hc3RfM0FTIC50b2FzdC1tYW5hZ2VyX2FjdGlvbl8xZ0wge1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgICBtYXJnaW46IDA7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcXG4gICAgICAgIHBhZGRpbmc6IDAgMTZweDtcXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgICAgICBjb2xvcjogIzAwYjRhMjtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gIC50b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmkgLnRvYXN0LW1hbmFnZXJfdG9hc3Qtd3JhcHBlcl8yUHEudG9hc3QtbWFuYWdlcl9hY3RpdmVfM0tEIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJ0b2FzdC1jb250YWluZXJcIjogXCJ0b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmlcIixcblx0XCJ0b2FzdC13cmFwcGVyXCI6IFwidG9hc3QtbWFuYWdlcl90b2FzdC13cmFwcGVyXzJQcVwiLFxuXHRcInRvYXN0XCI6IFwidG9hc3QtbWFuYWdlcl90b2FzdF8zQVNcIixcblx0XCJtZXNzYWdlXCI6IFwidG9hc3QtbWFuYWdlcl9tZXNzYWdlXzM5R1wiLFxuXHRcImFjdGlvblwiOiBcInRvYXN0LW1hbmFnZXJfYWN0aW9uXzFnTFwiLFxuXHRcImFjdGl2ZVwiOiBcInRvYXN0LW1hbmFnZXJfYWN0aXZlXzNLRFwiLFxuXHRcImZhZGVJblwiOiBcInRvYXN0LW1hbmFnZXJfZmFkZUluXzN2YlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvdG9hc3QtbWFuYWdlci90b2FzdC1tYW5hZ2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBiYXNlX2ZhZGVJbl8zT00ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyBiYXNlX2ZhZGVJbl8zT00ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuaHRtbCwgYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB4OyB9XFxuXFxuKiB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7IH1cXG5cXG4uYmFzZV9hcHAtY29udGFpbmVyX1d4MiB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7IH1cXG5cXG4uYmFzZV9tYWluLWNvbnRhaW5lcl9UWTgge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIG92ZXJmbG93LXk6IGF1dG87IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJhcHAtY29udGFpbmVyXCI6IFwiYmFzZV9hcHAtY29udGFpbmVyX1d4MlwiLFxuXHRcIm1haW4tY29udGFpbmVyXCI6IFwiYmFzZV9tYWluLWNvbnRhaW5lcl9UWThcIixcblx0XCJmYWRlSW5cIjogXCJiYXNlX2ZhZGVJbl8zT01cIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9zY3NzL2Jhc2Uuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9yaXBwbGUuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9yaXBwbGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JpcHBsZS5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY2F0ZWdvcnktc2VjdGlvbi5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2NhdGVnb3J5LXNlY3Rpb24uc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2NhdGVnb3J5LXNlY3Rpb24uc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L2NhdGVnb3J5LXNlY3Rpb24vY2F0ZWdvcnktc2VjdGlvbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3BhZ2UtbGlzdC5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3BhZ2UtbGlzdC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGFnZS1saXN0LnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvZHJhd2VyL3BhZ2UtbGlzdC9wYWdlLWxpc3Quc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9oZWFkZXItaWNvbi5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2hlYWRlci1pY29uLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9oZWFkZXItaWNvbi5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL2hlYWRlci9oZWFkZXItaWNvbi9oZWFkZXItaWNvbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NlYXJjaC1pbnB1dC5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NlYXJjaC1pbnB1dC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2VhcmNoLWlucHV0LnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wcm9ncmVzcy1pbmRpY2F0b3Iuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wcm9ncmVzcy1pbmRpY2F0b3Iuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Byb2dyZXNzLWluZGljYXRvci5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL21haW4vcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2xpbmsuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9saW5rLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9saW5rLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9saW5rL2xpbmsuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9yb3V0ZS1oYW5kbGVyLnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcm91dGUtaGFuZGxlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcm91dGUtaGFuZGxlci5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvcm91dGUtaGFuZGxlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2xvYWRpbmctdmlldy5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2xvYWRpbmctdmlldy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbG9hZGluZy12aWV3LnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvbG9hZGluZy12aWV3L2xvYWRpbmctdmlldy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2RyYXdlci5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2RyYXdlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZHJhd2VyLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvZHJhd2VyL2RyYXdlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL21haW4taGVhZGVyLnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi1oZWFkZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL21haW4taGVhZGVyLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvaGVhZGVyL21haW4taGVhZGVyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vdG9hc3QtbWFuYWdlci5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RvYXN0LW1hbmFnZXIuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RvYXN0LW1hbmFnZXIuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29udGFpbmVycy90b2FzdC1tYW5hZ2VyL3RvYXN0LW1hbmFnZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9iYXNlLnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYmFzZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vYmFzZS5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9zY3NzL2Jhc2Uuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIlxuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XCJcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXlcIlxuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29udGVudGZ1bFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbnRlbnRmdWxcIlxuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXJrZWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtYXJrZWRcIlxuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RhdGljLW1vZHVsZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInN0YXRpYy1tb2R1bGVcIlxuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsLXNlYXJjaC1wYXJhbXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1cmwtc2VhcmNoLXBhcmFtc1wiXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3BhY2U6ICd5Z3A0OWo5bmNvcW4nLFxuICBhY2Nlc3NUb2tlbjogJzNmZjU4MTZlY2I3NjgwN2M4OGE1NzBlMGU3YWI4OWI3N2RkZGU5Njk3ZDI5OTQ1Y2E4MmQ2MDM5OWQ2MTgyZTgnXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NyZWRlbnRpYWxzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==