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
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
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


var _stringify = __webpack_require__(65);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(66);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(64);

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

var _constants = __webpack_require__(7);

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
/* 8 */
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

var _ripple = __webpack_require__(51);

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

var _urlSearchParams = __webpack_require__(72);

var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);

var _link = __webpack_require__(57);

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

var _routeHandler = __webpack_require__(58);

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
          if (child.props.hasOwnProperty('path')) {
            validRoutes.push(child);
          }
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

var _api = __webpack_require__(36);

var _api2 = _interopRequireDefault(_api);

var _routes = __webpack_require__(37);

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


module.exports = {
  space: 'ygp49j9ncoqn',
  accessToken: '3ff5816ecb76807c88a570e0e7ab89b77ddde9697d29945ca82d60399d6182e8'
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPage = exports.pageFetchSuccess = exports.setActivePageTitle = exports.setActivePageType = exports.setActivePage = exports.setActiveRoute = exports.pageIsLoading = exports.pageFetchError = undefined;

var _utils = __webpack_require__(6);

var _pageList = __webpack_require__(8);

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

var _appShell = __webpack_require__(28);

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

var _ripple = __webpack_require__(9);

var _ripple2 = _interopRequireDefault(_ripple);

var _link = __webpack_require__(10);

var _link2 = _interopRequireDefault(_link);

var _categorySection = __webpack_require__(52);

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

var _pageList = __webpack_require__(53);

var _pageList2 = _interopRequireDefault(_pageList);

var _loadingView = __webpack_require__(27);

var _loadingView2 = _interopRequireDefault(_loadingView);

var _categorySection = __webpack_require__(22);

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

var _ripple = __webpack_require__(9);

var _ripple2 = _interopRequireDefault(_ripple);

var _routeHandler = __webpack_require__(11);

var _routeHandler2 = _interopRequireDefault(_routeHandler);

var _headerIcon = __webpack_require__(54);

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

var _searchInput = __webpack_require__(55);

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

var _progressIndicator = __webpack_require__(56);

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

var _loadingView = __webpack_require__(59);

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

var _withStyles = __webpack_require__(4);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _reactRedux = __webpack_require__(5);

var _base = __webpack_require__(63);

var _base2 = _interopRequireDefault(_base);

var _activePage = __webpack_require__(20);

var _utils = __webpack_require__(6);

var _pageList = __webpack_require__(8);

var _progressIndicator = __webpack_require__(26);

var _progressIndicator2 = _interopRequireDefault(_progressIndicator);

var _mainHeader = __webpack_require__(30);

var _mainHeader2 = _interopRequireDefault(_mainHeader);

var _drawer = __webpack_require__(29);

var _drawer2 = _interopRequireDefault(_drawer);

var _toastManager = __webpack_require__(31);

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

var _drawer = __webpack_require__(60);

var _drawer2 = _interopRequireDefault(_drawer);

var _constants = __webpack_require__(7);

var _utils = __webpack_require__(6);

var _routeHandler = __webpack_require__(11);

var _routeHandler2 = _interopRequireDefault(_routeHandler);

var _link = __webpack_require__(10);

var _link2 = _interopRequireDefault(_link);

var _ripple = __webpack_require__(9);

var _ripple2 = _interopRequireDefault(_ripple);

var _pageList = __webpack_require__(23);

var _pageList2 = _interopRequireDefault(_pageList);

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
            _react2.default.createElement(_pageList2.default, {
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
  drawerOpen: _propTypes2.default.bool.isRequired,
  entries: _propTypes2.default.array.isRequired,
  activePages: _propTypes2.default.array.isRequired,
  toggleDrawer: _propTypes2.default.func.isRequired,
  hasErrored: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  activePage: _propTypes2.default.object,
  activeRoute: _propTypes2.default.string
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
    }
  };
}

exports.default = (0, _withStyles2.default)(_drawer2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(Drawer));

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

var _pageList = __webpack_require__(8);

var _headerIcon = __webpack_require__(24);

var _headerIcon2 = _interopRequireDefault(_headerIcon);

var _searchInput = __webpack_require__(25);

var _searchInput2 = _interopRequireDefault(_searchInput);

var _mainHeader = __webpack_require__(61);

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
/* 31 */
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

var _toastManager = __webpack_require__(62);

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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(15);

var _utils = __webpack_require__(35);

var _utils2 = _interopRequireDefault(_utils);

var _pageList = __webpack_require__(34);

var _pageList2 = _interopRequireDefault(_pageList);

var _activePage = __webpack_require__(32);

var _activePage2 = _interopRequireDefault(_activePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  utils: _utils2.default,
  pageList: _pageList2.default,
  activePage: _activePage2.default
});

exports.default = allReducers;

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

var _constants = __webpack_require__(7);

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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _contentful = __webpack_require__(67);

var contentful = _interopRequireWildcard(_contentful);

var _crypto = __webpack_require__(13);

var _crypto2 = _interopRequireDefault(_crypto);

var _marked = __webpack_require__(69);

var _marked2 = _interopRequireDefault(_marked);

var _credentials = __webpack_require__(19);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _fs = __webpack_require__(68);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _crypto = __webpack_require__(13);

var _crypto2 = _interopRequireDefault(_crypto);

var _staticModule = __webpack_require__(71);

var _staticModule2 = _interopRequireDefault(_staticModule);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = __webpack_require__(15);

var _reactRedux = __webpack_require__(5);

var _server = __webpack_require__(70);

var _constants = __webpack_require__(7);

var _manifest = __webpack_require__(18);

var _manifest2 = _interopRequireDefault(_manifest);

var _app = __webpack_require__(21);

var _app2 = _interopRequireDefault(_app);

var _index = __webpack_require__(33);

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
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes category-section_fadeIn_2LQ {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes category-section_fadeIn_2LQ {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes category-section_flyInFromLeft_1a- {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes category-section_flyInFromLeft_1a- {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.category-section_categorySection_10o {\n  padding: 8px 0;\n  border-bottom: 1px solid #324047; }\n\n.category-section_categorySection-header_1Nc {\n  -webkit-animation: category-section_flyInFromLeft_1a- 0.6s 1;\n          animation: category-section_flyInFromLeft_1a- 0.6s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n  display: block;\n  text-decoration: none;\n  padding: 8px 24px;\n  margin: 0;\n  color: silver;\n  font-size: 14px;\n  text-transform: uppercase;\n  line-height: 16px;\n  font-weight: 500; }\n  .category-section_categorySection-header_1Nc .category-section_chevron_2Lt {\n    float: right;\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear;\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n\n.category-section_categorySection-body_3SM {\n  -webkit-animation: category-section_flyInFromLeft_1a- 0.4s 1;\n          animation: category-section_flyInFromLeft_1a- 0.4s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n\n.category-section_categorySection_10o.category-section_hidden_2sf {\n  padding-bottom: 0px; }\n  .category-section_categorySection_10o.category-section_hidden_2sf .category-section_chevron_2Lt {\n    -webkit-transform: rotateX(180deg);\n            transform: rotateX(180deg); }\n  .category-section_categorySection_10o.category-section_hidden_2sf .category-section_categorySection-body_3SM {\n    display: none; }\n\n.category-section_pageList-item_3t4 {\n  display: block;\n  position: relative;\n  text-decoration: none;\n  color: #fff;\n  padding: 0px 32px 0px 32px;\n  cursor: pointer;\n  line-height: 48px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  -webkit-transition: all .1s linear;\n  transition: all .1s linear; }\n\n.category-section_pageList-item_3t4.category-section_active_25U {\n  font-weight: 500;\n  color: #00b4a2; }\n", ""]);

// exports
exports.locals = {
	"categorySection": "category-section_categorySection_10o",
	"categorySection-header": "category-section_categorySection-header_1Nc",
	"flyInFromLeft": "category-section_flyInFromLeft_1a-",
	"chevron": "category-section_chevron_2Lt",
	"categorySection-body": "category-section_categorySection-body_3SM",
	"hidden": "category-section_hidden_2sf",
	"pageList-item": "category-section_pageList-item_3t4",
	"active": "category-section_active_25U",
	"fadeIn": "category-section_fadeIn_2LQ"
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes page-list_fadeIn_3Ws {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes page-list_fadeIn_3Ws {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes page-list_flyInFromLeft_1OT {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes page-list_flyInFromLeft_1OT {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.page-list_pagelist-wrapper_1BC {\n  width: 100%; }\n\n.page-list_noResults_1R9 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-animation: page-list_fadeIn_3Ws 0.6s 1;\n          animation: page-list_fadeIn_3Ws 0.6s 1; }\n\n.page-list_noResults-copy_2Bg {\n  color: rgba(255, 255, 255, .6); }\n\n.page-list_noResults-copy_2Bg i {\n  padding-right: 4px; }\n\n.page-list_noResults-copy_2Bg span {\n  display: inline-block;\n  line-height: 24px;\n  position: relative;\n  bottom: 5px; }\n", ""]);

// exports
exports.locals = {
	"pagelist-wrapper": "page-list_pagelist-wrapper_1BC",
	"noResults": "page-list_noResults_1R9",
	"fadeIn": "page-list_fadeIn_3Ws",
	"noResults-copy": "page-list_noResults-copy_2Bg",
	"flyInFromLeft": "page-list_flyInFromLeft_1OT"
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes header-icon_fadeIn_33z {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes header-icon_fadeIn_33z {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes header-icon_flyInFromLeft_1le {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes header-icon_flyInFromLeft_1le {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@-webkit-keyframes header-icon_grow_2IA {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes header-icon_grow_2IA {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n.header-icon_header-icon_1Qs {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  z-index: 98;\n  text-decoration: none;\n  cursor: pointer;\n  border-radius: 50%;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  background: none;\n  border: none; }\n\n.header-icon_icon-container_3Je {\n  -webkit-appearance: none;\n  background: none;\n  border: none;\n  outline: none;\n  padding: 8px;\n  cursor: pointer; }\n\n@media (max-width: 500px) {\n  .header-icon_menuIcon_1pa.header-icon_searchOpen_1BF {\n    display: none; } }\n\n.header-icon_backIcon_2Et {\n  display: none; }\n\n.header-icon_backIcon_2Et.header-icon_searchOpen_1BF {\n  -webkit-animation: header-icon_grow_2IA 0.2s 1;\n          animation: header-icon_grow_2IA 0.2s 1;\n  -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  @media (max-width: 500px) {\n    .header-icon_backIcon_2Et.header-icon_searchOpen_1BF {\n      display: block; } }\n", ""]);

// exports
exports.locals = {
	"header-icon": "header-icon_header-icon_1Qs",
	"icon-container": "header-icon_icon-container_3Je",
	"menuIcon": "header-icon_menuIcon_1pa",
	"searchOpen": "header-icon_searchOpen_1BF",
	"backIcon": "header-icon_backIcon_2Et",
	"grow": "header-icon_grow_2IA",
	"fadeIn": "header-icon_fadeIn_33z",
	"flyInFromLeft": "header-icon_flyInFromLeft_1le"
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes search-input_fadeIn_Qt- {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes search-input_fadeIn_Qt- {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes search-input_flyInFromLeft_26Q {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes search-input_flyInFromLeft_26Q {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.search-input_search-label_25K {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  width: 24px;\n  overflow: hidden;\n  -webkit-transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_icon-container_2dR {\n  background: none;\n  border: none;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n  color: #fff; }\n\n.search-input_search-icon_ViP {\n  height: 24px;\n  width: 24px;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_search-closeIcon_3Nj {\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  opacity: 0;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .search-input_search-closeIcon_3Nj i {\n    padding: 0px;\n    font-size: 20px; }\n\n.search-input_search-input--container_1cN {\n  border-bottom: 1px solid #324047;\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-left: 8px; }\n\n.search-input_search-input--container_1cN::after {\n  display: block;\n  content: '';\n  position: absolute;\n  bottom: -1px;\n  left: 0px;\n  height: 2px;\n  background-color: #fff;\n  width: 10px;\n  visibility: hidden;\n  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.search-input_search-input_1MP {\n  position: relative;\n  height: 30px;\n  width: 100%;\n  outline: 0;\n  border: none;\n  padding: 4px 28px 4px 4px;\n  overflow: hidden;\n  font-size: 16px;\n  background: none;\n  color: #fff; }\n\n.search-input_search-label_25K.search-input_opened_A_q {\n  width: 360px; }\n  @media (max-width: 500px) {\n    .search-input_search-label_25K.search-input_opened_A_q {\n      width: 100%; } }\n  @media (max-width: 500px) {\n    .search-input_search-label_25K.search-input_opened_A_q .search-input_search-input--container_1cN {\n      margin-left: 0; } }\n  .search-input_search-label_25K.search-input_opened_A_q .search-input_search-closeIcon_3Nj {\n    opacity: 1; }\n  @media (max-width: 500px) {\n    .search-input_search-label_25K.search-input_opened_A_q .search-input_search-searchIcon_1vQ {\n      display: none; } }\n\n.search-input_search-label_25K.search-input_focused_1HP .search-input_search-input--container_1cN::after {\n  visibility: visible;\n  width: 100%; }\n", ""]);

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
	"fadeIn": "search-input_fadeIn_Qt-",
	"flyInFromLeft": "search-input_flyInFromLeft_26Q"
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes progress-indicator_fadeIn_3ET {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes progress-indicator_fadeIn_3ET {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes progress-indicator_flyInFromLeft_26V {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes progress-indicator_flyInFromLeft_26V {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.progress-indicator_progressIndicator_3yA {\n  position: relative;\n  z-index: 101;\n  background-color: #00b4a2;\n  height: 4px; }\n\n.progress-indicator_progressIndicator_3yA.progress-indicator_animatable_1lU {\n  -webkit-transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s linear;\n  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s linear; }\n", ""]);

// exports
exports.locals = {
	"progressIndicator": "progress-indicator_progressIndicator_3yA",
	"animatable": "progress-indicator_animatable_1lU",
	"fadeIn": "progress-indicator_fadeIn_3ET",
	"flyInFromLeft": "progress-indicator_flyInFromLeft_26V"
};

/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes route-handler_fadeIn_QHn {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes route-handler_fadeIn_QHn {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes route-handler_flyInFromLeft_25w {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes route-handler_flyInFromLeft_25w {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.route-handler_transition-container_2mn {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n.route-handler_loading_1FO {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 16px; }\n", ""]);

// exports
exports.locals = {
	"transition-container": "route-handler_transition-container_2mn",
	"loading": "route-handler_loading_1FO",
	"fadeIn": "route-handler_fadeIn_QHn",
	"flyInFromLeft": "route-handler_flyInFromLeft_25w"
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes loading-view_fadeIn_1Hb {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes loading-view_fadeIn_1Hb {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes loading-view_flyInFromLeft_H8S {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes loading-view_flyInFromLeft_H8S {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.loading-view_loading-container_X1X {\n  width: 100%;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.loading-view_spinner_283 {\n  -webkit-animation: loading-view_rotator_343 1.4s linear infinite;\n          animation: loading-view_rotator_343 1.4s linear infinite; }\n\n@-webkit-keyframes loading-view_rotator_343 {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n@keyframes loading-view_rotator_343 {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n.loading-view_path_3Dl {\n  stroke-dasharray: 187;\n  stroke-dashoffset: 0;\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  -webkit-animation: loading-view_dash_1je 1.4s ease-in-out infinite, loading-view_colors_UZK 5.6s ease-in-out infinite;\n          animation: loading-view_dash_1je 1.4s ease-in-out infinite, loading-view_colors_UZK 5.6s ease-in-out infinite; }\n\n@-webkit-keyframes loading-view_colors_UZK {\n  0% {\n    stroke: #28353e; }\n  50% {\n    stroke: #00b4a2; }\n  100% {\n    stroke: #28353e; } }\n\n@keyframes loading-view_colors_UZK {\n  0% {\n    stroke: #28353e; }\n  50% {\n    stroke: #00b4a2; }\n  100% {\n    stroke: #28353e; } }\n\n@-webkit-keyframes loading-view_dash_1je {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n\n@keyframes loading-view_dash_1je {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n", ""]);

// exports
exports.locals = {
	"loading-container": "loading-view_loading-container_X1X",
	"spinner": "loading-view_spinner_283",
	"rotator": "loading-view_rotator_343",
	"path": "loading-view_path_3Dl",
	"dash": "loading-view_dash_1je",
	"colors": "loading-view_colors_UZK",
	"fadeIn": "loading-view_fadeIn_1Hb",
	"flyInFromLeft": "loading-view_flyInFromLeft_H8S"
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes drawer_fadeIn_3RE {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes drawer_fadeIn_3RE {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes drawer_flyInFromLeft_3iN {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes drawer_flyInFromLeft_3iN {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.drawer_drawer-container_2Bz {\n  position: relative;\n  z-index: 99;\n  height: 100%;\n  width: 40%;\n  max-width: 300px; }\n  @media (max-width: 500px) {\n    .drawer_drawer-container_2Bz {\n      position: fixed;\n      z-index: 102;\n      left: 0;\n      top: 0;\n      width: 100%;\n      max-width: none;\n      height: 100%;\n      overflow: hidden;\n      pointer-events: none; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz::after {\n    display: block;\n    content: '';\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, .4);\n    opacity: 0;\n    will-change: opacity;\n    -webkit-transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); } }\n\n@media (min-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf {\n    display: none; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf {\n    pointer-events: auto; } }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf::after {\n    opacity: 1; } }\n\n.drawer_drawer_3zw {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }\n  @media (max-width: 500px) {\n    .drawer_drawer_3zw {\n      -webkit-box-shadow: 2px 0 12px rgba(0, 0, 0, .4);\n              box-shadow: 2px 0 12px rgba(0, 0, 0, .4);\n      left: 0;\n      top: 0;\n      max-width: 400px;\n      width: 80%;\n      -webkit-transform: translateX(-107%);\n              transform: translateX(-107%);\n      will-change: transform; } }\n\n.drawer_drawer_3zw.drawer_draggable_2pc {\n  -webkit-transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1);\n  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1), -webkit-transform 0.13s cubic-bezier(0, 0, 0.3, 1); }\n\n@media (max-width: 500px) {\n  .drawer_drawer-container_2Bz.drawer_active_3Bf .drawer_drawer_3zw {\n    -webkit-transform: translateX(0px);\n            transform: translateX(0px); } }\n\n.drawer_drawer-homeContainer_3Hh {\n  padding: 8px 0;\n  border-bottom: 1px solid #324047;\n  background-color: #1e2b32; }\n\n.drawer_drawer-home_1LM {\n  -webkit-animation: drawer_flyInFromLeft_3iN 0.6s 1;\n          animation: drawer_flyInFromLeft_3iN 0.6s 1;\n  position: relative;\n  overflow: hidden;\n  padding: 0 24px;\n  height: 40px;\n  text-decoration: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .drawer_drawer-home_1LM svg {\n    margin-right: 27px;\n    fill: #fff; }\n  .drawer_drawer-home_1LM span {\n    color: #fff; }\n\n.drawer_drawer-home_1LM.drawer_active_3Bf i {\n  color: #00b4a2; }\n\n.drawer_drawer-home_1LM.drawer_active_3Bf span {\n  font-weight: 500;\n  color: #00b4a2; }\n\n.drawer_drawer-logo_jzF {\n  display: none;\n  background-color: #1e2b32; }\n  .drawer_drawer-logo_jzF img {\n    width: 100%; }\n\n.drawer_drawer-divider_Y1X {\n  border: 1px solid #324047;\n  border-bottom: none;\n  margin: 0; }\n\n.drawer_search-container_2fv {\n  padding: 16px;\n  background-color: #324047;\n  border-bottom: 1px solid #324047; }\n\n.drawer_articleFilters-wrapper_3GA {\n  background-color: #1e2b32; }\n\n.drawer_pageList-wrapper_1jE {\n  background-color: #1e2b32;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.drawer_drawer-footer_1aM {\n  height: 0px;\n  background-color: #1e2b32; }\n", ""]);

// exports
exports.locals = {
	"drawer-container": "drawer_drawer-container_2Bz",
	"active": "drawer_active_3Bf",
	"drawer": "drawer_drawer_3zw",
	"draggable": "drawer_draggable_2pc",
	"drawer-homeContainer": "drawer_drawer-homeContainer_3Hh",
	"drawer-home": "drawer_drawer-home_1LM",
	"flyInFromLeft": "drawer_flyInFromLeft_3iN",
	"drawer-logo": "drawer_drawer-logo_jzF",
	"drawer-divider": "drawer_drawer-divider_Y1X",
	"search-container": "drawer_search-container_2fv",
	"articleFilters-wrapper": "drawer_articleFilters-wrapper_3GA",
	"pageList-wrapper": "drawer_pageList-wrapper_1jE",
	"drawer-footer": "drawer_drawer-footer_1aM",
	"fadeIn": "drawer_fadeIn_3RE"
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes main-header_fadeIn_1w8 {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes main-header_fadeIn_1w8 {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes main-header_flyInFromLeft_2h2 {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes main-header_flyInFromLeft_2h2 {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.main-header_header_2Bv {\n  position: relative;\n  padding: 16px 24px 16px 72px;\n  z-index: 100;\n  width: 100%;\n  background-color: #28353e;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, .3);\n          box-shadow: 0px 2px 4px rgba(0, 0, 0, .3); }\n  @media (max-width: 500px) {\n    .main-header_header_2Bv {\n      padding: 16px 24px 16px 48px; } }\n\n.main-header_title-container_3Mt {\n  overflow: hidden; }\n\n.main-header_toggle-container_3oi {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 48px; }\n  @media (min-width: 500px) {\n    .main-header_toggle-container_3oi {\n      left: 16px; } }\n\n.main-header_title_1gD {\n  display: block;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding-right: 8px;\n  color: #fff;\n  font-size: 18px;\n  -webkit-transition: all 0.2s linear;\n  transition: all 0.2s linear;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  .main-header_title_1gD .main-header_title-detail_3NY {\n    text-transform: capitalize; }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_searchOpen_1fU .main-header_title_1gD {\n    opacity: 0;\n    padding: 0; } }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_searchOpen_1fU .main-header_title-container_3Mt {\n    width: 0; } }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_searchOpen_1fU .main-header_search-container_iHD {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; } }\n\n@media (max-width: 500px) {\n  .main-header_header_2Bv.main-header_waterfallOpen_2uq {\n    -webkit-box-shadow: none;\n            box-shadow: none; } }\n", ""]);

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
	"fadeIn": "main-header_fadeIn_1w8",
	"flyInFromLeft": "main-header_flyInFromLeft_2h2"
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes toast-manager_fadeIn_3vb {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes toast-manager_fadeIn_3vb {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes toast-manager_flyInFromLeft_XxJ {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes toast-manager_flyInFromLeft_XxJ {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.toast-manager_toast-container_1Ri {\n  position: fixed;\n  z-index: 99;\n  width: 100vw;\n  top: 100%;\n  left: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n  @media (max-width: 500px) {\n    .toast-manager_toast-container_1Ri {\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; } }\n  .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq {\n    padding: 8px;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 0;\n    -webkit-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n    @media (max-width: 500px) {\n      .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq {\n        padding: 0; } }\n    .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq .toast-manager_toast_3AS {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      background: #1e2b32;\n      padding: 4px 8px 4px 24px;\n      border-radius: 2px;\n      -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, .4);\n              box-shadow: 0px 2px 4px rgba(0, 0, 0, .4); }\n      .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq .toast-manager_toast_3AS .toast-manager_message_39G {\n        -webkit-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n        color: #fff;\n        font-size: 14px;\n        letter-spacing: 0.5px;\n        line-height: 40px;\n        margin: 0 4px 0 0; }\n      .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq .toast-manager_toast_3AS .toast-manager_action_1gL {\n        position: relative;\n        background: none;\n        border: none;\n        padding: 0;\n        margin: 0;\n        font-size: 14px;\n        line-height: 40px;\n        padding: 0 16px;\n        text-transform: uppercase;\n        color: #00b4a2;\n        outline: none;\n        cursor: pointer; }\n  .toast-manager_toast-container_1Ri .toast-manager_toast-wrapper_2Pq.toast-manager_active_3KD {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%);\n    opacity: 1; }\n", ""]);

// exports
exports.locals = {
	"toast-container": "toast-manager_toast-container_1Ri",
	"toast-wrapper": "toast-manager_toast-wrapper_2Pq",
	"toast": "toast-manager_toast_3AS",
	"message": "toast-manager_message_39G",
	"action": "toast-manager_action_1gL",
	"active": "toast-manager_active_3KD",
	"fadeIn": "toast-manager_fadeIn_3vb",
	"flyInFromLeft": "toast-manager_flyInFromLeft_XxJ"
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes base_fadeIn_3OM {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes base_fadeIn_3OM {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes base_flyInFromLeft_epJ {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes base_flyInFromLeft_epJ {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\nhtml, body {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px; }\n\n* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); }\n\n.base_app-container_Wx2 {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  width: 100vw; }\n\n.base_main-container_TY8 {\n  width: 100%;\n  height: 100%;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  overflow-y: auto; }\n", ""]);

// exports
exports.locals = {
	"app-container": "base_app-container_Wx2",
	"main-container": "base_main-container_TY8",
	"fadeIn": "base_fadeIn_3OM",
	"flyInFromLeft": "base_flyInFromLeft_epJ"
};

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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(50);
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
/* 64 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("contentful");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("static-module");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("url-search-params");

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(16);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDEwNjYwZjM5NWExNDhiMmUzZTUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvYWN0aW9ucy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2FjdGlvbnMvcGFnZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9jb21tb24vcmlwcGxlL3JpcHBsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvbGluay9saW5rLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9yb3V0ZS1oYW5kbGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9kaXN0L2NsaWVudC9zdGF0aWMvanMvbWFuaWZlc3QuanNvbiIsIndlYnBhY2s6Ly8vLi9jcmVkZW50aWFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2FjdGlvbnMvYWN0aXZlLXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9hcHAuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L2NhdGVnb3J5LXNlY3Rpb24vY2F0ZWdvcnktc2VjdGlvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2RyYXdlci9wYWdlLWxpc3QvcGFnZS1saXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1pY29uL2hlYWRlci1pY29uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9tYWluL3Byb2dyZXNzLWluZGljYXRvci9wcm9ncmVzcy1pbmRpY2F0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvYXBwLXNoZWxsL2FwcC1zaGVsbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL2RyYXdlci9kcmF3ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29udGFpbmVycy9oZWFkZXIvbWFpbi1oZWFkZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29udGFpbmVycy90b2FzdC1tYW5hZ2VyL3RvYXN0LW1hbmFnZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvcmVkdWNlcnMvYWN0aXZlLXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3JlZHVjZXJzL3BhZ2UtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3JlZHVjZXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9jb21tb24vcmlwcGxlL3JpcHBsZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L2NhdGVnb3J5LXNlY3Rpb24vY2F0ZWdvcnktc2VjdGlvbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L3BhZ2UtbGlzdC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWljb24vaGVhZGVyLWljb24uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvbWFpbi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvbGluay9saW5rLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvcm91dGUtaGFuZGxlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL2RyYXdlci9kcmF3ZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvaGVhZGVyL21haW4taGVhZGVyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL3RvYXN0LW1hbmFnZXIvdG9hc3QtbWFuYWdlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvc2Nzcy9iYXNlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlLnNjc3M/MGRjYSIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvZHJhd2VyL3BhZ2UtbGlzdC9jYXRlZ29yeS1zZWN0aW9uL2NhdGVnb3J5LXNlY3Rpb24uc2Nzcz9hOTcwIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L3BhZ2UtbGlzdC5zY3NzP2RiNjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2hlYWRlci9oZWFkZXItaWNvbi9oZWFkZXItaWNvbi5zY3NzPzM4M2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2hlYWRlci9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0LnNjc3M/MjgzZiIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvbWFpbi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3M/NmM0NyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9saW5rL2xpbmsuc2Nzcz85MjVhIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9yb3V0ZS1oYW5kbGVyL3JvdXRlLWhhbmRsZXIuc2Nzcz8yOTczIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LnNjc3M/NDY1MCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvZHJhd2VyL2RyYXdlci5zY3NzPzEwODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL2hlYWRlci9tYWluLWhlYWRlci5zY3NzP2VmZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb250YWluZXJzL3RvYXN0LW1hbmFnZXIvdG9hc3QtbWFuYWdlci5zY3NzPzk5ZTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9zY3NzL2Jhc2Uuc2Nzcz8zYmJmIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnRlbnRmdWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hcmtlZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdGF0aWMtbW9kdWxlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsLXNlYXJjaC1wYXJhbXNcIiJdLCJuYW1lcyI6WyJ0b2dnbGVEcmF3ZXIiLCJib29sIiwidHlwZSIsInBheWxvYWQiLCJ0b2dnbGVTZWFyY2giLCJ0b2dnbGVXYXRlcmZhbGxIZWFkZXIiLCJwcm9ncmVzc1VwZGF0ZSIsInBlcmNlbnRhZ2UiLCJwdXNoVG9hc3QiLCJtZXNzYWdlVGV4dCIsImFjdGlvblRleHQiLCJ0aW1lb3V0IiwiY2FsbGJhY2siLCJwb3BUb2FzdCIsInNldEF1dG9Eb3dubG9hZFJlc3VsdCIsInNldEF1dG9Eb3dubG9hZCIsImRpc3BhdGNoIiwiSURCX1ZFUlNJT05fTk8iLCJUQUdHRURfSU4iLCJJTklUSUFURV9EUkFHR0lOR19USFJFU0hPTEQiLCJEUkFXRVJfQ0xPU0VfVEhSRVNIT0xEIiwiUlVOVElNRV9DQUNIRSIsInNlYXJjaCIsInF1ZXJ5IiwiYWRkRmlsdGVyIiwiZmlsdGVyIiwicmVtb3ZlRmlsdGVyIiwicGFnZUxpc3RMb2FkaW5nIiwicGFnZUxpc3RFcnJvciIsInBhZ2VMaXN0RmV0Y2hTdWNjZXNzIiwiZW50cmllcyIsImZldGNoUGFnZUxpc3QiLCJuZXR3b3JrRGF0YVJlY2lldmVkIiwiY2FjaGVEYXRhUmVjaWV2ZWQiLCJuZXR3b3JrVXBkYXRlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsIkVycm9yIiwic3RhdHVzVGV4dCIsImpzb24iLCJmaWVsZHMiLCJzeXMiLCJpZCIsImxvY2F0aW9uIiwicmVsb2FkIiwiY2F0Y2giLCJlcnIiLCJjYWNoZXMiLCJtYXRjaCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiUmlwcGxlIiwicHJvcHMiLCJvblRvdWNoU3RhcnQiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVjdCIsImNvbnRhaW5lciIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhcmVudEhlaWdodCIsImhlaWdodCIsInBhcmVudFdpZHRoIiwid2lkdGgiLCJwYXJlbnRYIiwibGVmdCIsInBhcmVudFkiLCJ0b3AiLCJjbGlja1giLCJ0b3VjaGVzIiwicGFnZVgiLCJjbGlja1kiLCJwYWdlWSIsIngiLCJ5IiwiY3JlYXRlUmlwcGxlIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJzdGF0ZSIsImFjdGl2ZVJpcHBsZSIsImZhZGVPdXRSaXBwbGUiLCJvbk1vdXNlTGVhdmUiLCJyaXBwbGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsInRyYW5zZm9ybSIsInNpemUiLCJNYXRoIiwic3FydCIsImFuaW1hdGFibGUiLCJhcHBlbmRDaGlsZCIsInNldFN0YXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByb3BlcnR5TmFtZSIsInJlbW92ZVJpcHBsZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRpdiIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiZWxlbWVudCIsImRlZmF1bHRQcm9wcyIsIlJvdXRlIiwiY2xpY2tIYW5kbGVyIiwicHJldmVudERlZmF1bHQiLCJyb3V0ZSIsInN0YXJ0c1dpdGgiLCJ1cmwiLCJVUkwiLCJocmVmIiwid2luZG93IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInB1c2hTdGF0ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImhhbmRsZUNsaWNrIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImRpc2FibGVkIiwiZnVuYyIsIm1hcFN0YXRlVG9Qcm9wcyIsIlJvdXRlSGFuZGxlciIsIm9uUG9wU3RhdGUiLCJjaG9vc2VBY3RpdmVSb3V0ZSIsImNvbnRlbnQiLCJ2YWxpZFJvdXRlcyIsInZhbGlkUm91dGUiLCJyZWdleCIsIlJlZ0V4cCIsInBhdGgiLCJ0ZXN0IiwicGF0aG5hbWUiLCJub3RGb3VuZFJvdXRlIiwiY2xvbmVFbGVtZW50IiwiQ2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGQiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWN0aXZlUGFnZSIsInBvcnQiLCJhcHAiLCJ1c2UiLCJsaXN0ZW4iLCJtb2R1bGUiLCJleHBvcnRzIiwic3BhY2UiLCJhY2Nlc3NUb2tlbiIsInBhZ2VGZXRjaEVycm9yIiwicGFnZUlzTG9hZGluZyIsInNldEFjdGl2ZVJvdXRlIiwic2V0QWN0aXZlUGFnZSIsInBhZ2UiLCJzZXRBY3RpdmVQYWdlVHlwZSIsInNldEFjdGl2ZVBhZ2VUaXRsZSIsInRpdGxlIiwicGFnZUZldGNoU3VjY2VzcyIsImZldGNoUGFnZSIsIm5hbWUiLCJ1cGRhdGVkQXQiLCJzdWJzdHJpbmciLCJDb250ZXh0VHlwZSIsImluc2VydENzcyIsIkFwcCIsImNvbnRleHQiLCJzaGFwZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiQ2F0ZWdvcnlTZWN0aW9uIiwiY2F0ZWdvcnkiLCJzb3J0IiwiYSIsImIiLCJjaGFyQ29kZUF0IiwibWFwIiwiZW50cnkiLCJhY3RpdmVSb3V0ZSIsImFjdGl2ZSIsImNhdGVnb3J5U2VjdGlvbiIsImxpbmtzQ29udGFpbmVyIiwibWFwTGlua3MiLCJvYmplY3QiLCJQYWdlTGlzdCIsIm1hcFBhZ2VzIiwicGFnZXMiLCJvcmdhbmlzZVBhZ2VzIiwib3V0cHV0IiwiaGFzRXJyb3JlZCIsImlzTG9hZGluZyIsIm1hdGNoZWRDYXQiLCJmaW5kSW5kZXgiLCJjYXQiLCJsZW5ndGgiLCJjYXRlZ29yeUluZGV4IiwiZ2V0Q2F0ZWdvcnlJbmRleCIsImFkZEVudHJ5VG9DYXRlZ29yeSIsIk9iamVjdCIsImFzc2lnbiIsImFycmF5IiwiSGVhZGVySWNvbiIsIm9wZW5EcmF3ZXIiLCJkcmF3ZXJPcGVuIiwiY2xvc2VTZWFyY2giLCJVcGRhdGVSb3V0ZSIsIm1lbnVJY29uIiwic2VhcmNoT3BlbiIsImJhY2tJY29uIiwiU2VhcmNoSW5wdXQiLCJzZWFyY2hJY29uQ2xpY2siLCJzZWFyY2hJbnB1dCIsImZvY3VzIiwic2VhcmNoRm9jdXNlZCIsImZvY3VzZWQiLCJib2R5Iiwic2VhcmNoVW5mb2N1c2VkIiwiZXZ0Iiwic2VhcmNoQ29udGFpbmVyIiwiY29udGFpbnMiLCJ0YXJnZXQiLCJjdXJyUXVlcnkiLCJoYW5kbGVJbnB1dCIsInZhbHVlIiwibm9uRW1wdHkiLCJjbGVhcklucHV0Iiwib3BlbmVkIiwibGFiZWwiLCJpbnB1dCIsImJ0biIsImNsb3NlSWNvbiIsIlByb2dyZXNzSW5kaWNhdG9yIiwib3BhY2l0eSIsInByb2dyZXNzIiwicHJvZ3Jlc3NJbmRpY2F0b3IiLCJudW1iZXIiLCJMb2FkaW5nVmlldyIsInZpc2libGUiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic3Bpbm5lciIsImNvbG9yIiwiQXBwU2hlbGwiLCJzY3JvbGxlZCIsImNhY2hlU3RvcmFnZSIsInV0aWxzIiwibWF0Y2hEaXNwYXRjaFRvUHJvcHMiLCJEcmF3ZXIiLCJkcmF3ZXJDb250YWluZXIiLCJkcmF3ZXIiLCJkcmFnZ2FibGUiLCJzdGFydFgiLCJjdXJyZW50WCIsInRvdWNoaW5nU2lkZU5hdiIsInVwZGF0ZSIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsImluaXRpYWxpc2VkRHJhZ2dpbmciLCJyZW1vdmUiLCJ0cmFuc2xhdGVYIiwibWluIiwiaGlkZVNpZGVOYXYiLCJhZGRFdmVudExpc3RlbmVycyIsInByZXZQcm9wcyIsIlJlcGxhY2VSb3V0ZSIsInN1cHBvcnRzUGFzc2l2ZSIsInVuZGVmaW5lZCIsInBhc3NpdmUiLCJpc1N1cHBvcnRlZCIsImFwcGx5UGFzc2l2ZSIsImFzaWRlIiwiYWN0aXZlUGFnZXMiLCJwYWdlTGlzdCIsImN1cnJGaWx0ZXJzIiwiZmlsdGVycyIsIm9wZW4iLCJNYWluSGVhZGVyIiwiaGVhZGVyIiwic2hvd1dhdGVyZmFsbEhlYWRlciIsIndhdGVyZmFsbE9wZW4iLCJfX2h0bWwiLCJhY3RpdmVQYWdlVGl0bGUiLCJUb2FzdE1hbmFnZXIiLCJfY2xvc2VUb2FzdCIsInRvYXN0IiwiX3JlbW92ZVRvYXN0IiwiX2hhbmRsZUNsaWNrIiwibmV4dFByb3BzIiwidG9hc3RzIiwiX3RyaWdnZXJUb2FzdCIsIm1lc3NhZ2UiLCJhY3Rpb24iLCJpbml0aWFsU3RhdGUiLCJhbGxSZWR1Y2VycyIsInZhbHVlcyIsImZpbHRlclBhZ2VzIiwicXVlcnlQYWdlcyIsIm5ld0ZpbHRlcnMiLCJzcGxpY2UiLCJpbmRleE9mIiwiZmlsdGVyZWRQYWdlcyIsImluY2x1ZGVzIiwic3BlY2lmaWNhdGlvbiIsInN5bnRheEVudHJpZXMiLCJtYXRjaGVkRW50cmllcyIsImZvcm1hdHRlZFF1ZXJ5IiwidG9Mb3dlckNhc2UiLCJyZWdleHAiLCJleGVjIiwidGFncyIsInRhZyIsInRyaW0iLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwid2F0ZXJmYWxsSGVhZGVyT3BlbiIsImFyciIsInNoaWZ0IiwiY29udGVudGZ1bCIsImNvbnRlbnRmdWxDbGllbnQiLCJjcmVhdGVDbGllbnQiLCJsb2FkQXJ0aWNsZXMiLCJnZXRFbnRyaWVzIiwiY29udGVudF90eXBlIiwic2VsZWN0IiwiaW5jbHVkZSIsImxpbmtlZEVudHJpZXMiLCJpdGVtcyIsIkVudHJ5IiwiaGFzaCIsImNyZWF0ZUhhc2giLCJrZXlzIiwia2V5IiwibGlua0VudHJ5IiwiZW5jb2RlVVJJIiwiZGlnZXN0IiwicmVxIiwicGFnZU5hbWUiLCJkZWNvZGVVUkkiLCJwYXJhbXMiLCJwYWdlSWQiLCJibG9iIiwicGFyYW0iLCJmaW5kIiwiYXBpUm91dGVyIiwiUm91dGVyIiwiZ2V0IiwicmVzIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcnRpY2xlIiwic3RhdHVzIiwicmVuZGVyU2VydmVyU2lkZSIsInN0b3JlIiwiY3NzIiwiU2V0Iiwic3R5bGVzIiwiX2dldENzcyIsImh0bWwiLCJwcmVsb2FkZWRTdGF0ZSIsImdldFN0YXRlIiwicmVuZGVyRnVsbFBhZ2UiLCJqb2luIiwicmVwbGFjZSIsInJvdXRlciIsImNyZWF0ZVJlYWRTdHJlYW0iLCJwcmVjYWNoZWFzc2V0c1RvQ2FjaGUiLCJwcmVjYWNoZUhhc2giLCJhc3NldCIsInByZWNhY2hlRGlnZXN0Iiwic2V0IiwicGlwZSIsIm5leHQiLCJzZXRIZWFkZXIiLCJzdGF0aWMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7QUM1QkEsK0Q7Ozs7OztBQ0FBLGlFOzs7Ozs7QUNBQSxnRTs7Ozs7O0FDQUEsdUM7Ozs7OztBQ0FBLCtCOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsNkM7Ozs7OztBQ0FBLDBDOzs7Ozs7QUNBQSw4QyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDczKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MTA2NjBmMzk1YTE0OGIyZTNlNSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5Jyk7XG5cbnZhciBfc3RyaW5naWZ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0cmluZ2lmeSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheScpO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2xpY2VkVG9BcnJheTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3InKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIElzb21vcnBoaWMgQ1NTIHN0eWxlIGxvYWRlciBmb3IgV2VicGFja1xuICpcbiAqIENvcHlyaWdodCDCqSAyMDE1LTIwMTYgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHByZWZpeCA9ICdzJztcbnZhciBpbnNlcnRlZCA9IHt9O1xuXG4vLyBCYXNlNjQgZW5jb2RpbmcgYW5kIGRlY29kaW5nIC0gVGhlIFwiVW5pY29kZSBQcm9ibGVtXCJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dCYXNlNjQvQmFzZTY0X2VuY29kaW5nX2FuZF9kZWNvZGluZyNUaGVfVW5pY29kZV9Qcm9ibGVtXG5mdW5jdGlvbiBiNjRFbmNvZGVVbmljb2RlKHN0cikge1xuICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9nLCBmdW5jdGlvbiAobWF0Y2gsIHAxKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoJzB4JyArIHAxKTtcbiAgfSkpO1xufVxuXG4vKipcbiAqIFJlbW92ZSBzdHlsZS9saW5rIGVsZW1lbnRzIGZvciBzcGVjaWZpZWQgbm9kZSBJRHNcbiAqIGlmIHRoZXkgYXJlIG5vIGxvbmdlciByZWZlcmVuY2VkIGJ5IFVJIGNvbXBvbmVudHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNzcyhpZHMpIHtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoaWRzKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGlkID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGlmICgtLWluc2VydGVkW2lkXSA8PSAwKSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgaWQpO1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBFeGFtcGxlOlxuICogICAvLyBJbnNlcnQgQ1NTIHN0eWxlcyBvYmplY3QgZ2VuZXJhdGVkIGJ5IGBjc3MtbG9hZGVyYCBpbnRvIERPTVxuICogICB2YXIgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKFtbMSwgJ2JvZHkgeyBjb2xvcjogcmVkOyB9J11dKTtcbiAqXG4gKiAgIC8vIFJlbW92ZSBpdCBmcm9tIHRoZSBET01cbiAqICAgcmVtb3ZlQ3NzKCk7XG4gKi9cbmZ1bmN0aW9uIGluc2VydENzcyhzdHlsZXMpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZiRyZXBsYWNlID0gX3JlZi5yZXBsYWNlLFxuICAgICAgcmVwbGFjZSA9IF9yZWYkcmVwbGFjZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHJlcGxhY2UsXG4gICAgICBfcmVmJHByZXBlbmQgPSBfcmVmLnByZXBlbmQsXG4gICAgICBwcmVwZW5kID0gX3JlZiRwcmVwZW5kID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkcHJlcGVuZDtcblxuICB2YXIgaWRzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9zdHlsZXMkaSA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkoc3R5bGVzW2ldLCA0KSxcbiAgICAgICAgbW9kdWxlSWQgPSBfc3R5bGVzJGlbMF0sXG4gICAgICAgIGNzcyA9IF9zdHlsZXMkaVsxXSxcbiAgICAgICAgbWVkaWEgPSBfc3R5bGVzJGlbMl0sXG4gICAgICAgIHNvdXJjZU1hcCA9IF9zdHlsZXMkaVszXTtcblxuICAgIHZhciBpZCA9IG1vZHVsZUlkICsgJy0nICsgaTtcblxuICAgIGlkcy5wdXNoKGlkKTtcblxuICAgIGlmIChpbnNlcnRlZFtpZF0pIHtcbiAgICAgIGlmICghcmVwbGFjZSkge1xuICAgICAgICBpbnNlcnRlZFtpZF0rKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0ZWRbaWRdID0gMTtcblxuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgaWQpO1xuICAgIHZhciBjcmVhdGUgPSBmYWxzZTtcblxuICAgIGlmICghZWxlbSkge1xuICAgICAgY3JlYXRlID0gdHJ1ZTtcblxuICAgICAgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgZWxlbS5pZCA9IHByZWZpeCArIGlkO1xuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjc3NUZXh0ID0gY3NzO1xuICAgIGlmIChzb3VyY2VNYXAgJiYgYnRvYSkge1xuICAgICAgLy8gc2tpcCBJRTkgYW5kIGJlbG93LCBzZWUgaHR0cDovL2Nhbml1c2UuY29tL2F0b2ItYnRvYVxuICAgICAgY3NzVGV4dCArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYjY0RW5jb2RlVW5pY29kZSgoMCwgX3N0cmluZ2lmeTIuZGVmYXVsdCkoc291cmNlTWFwKSkgKyAnKi8nO1xuICAgICAgY3NzVGV4dCArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLmZpbGUgKyAnPycgKyBpZCArICcqLyc7XG4gICAgfVxuXG4gICAgaWYgKCd0ZXh0Q29udGVudCcgaW4gZWxlbSkge1xuICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB9XG5cbiAgICBpZiAoY3JlYXRlKSB7XG4gICAgICBpZiAocHJlcGVuZCkge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShlbGVtLCBkb2N1bWVudC5oZWFkLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVtb3ZlQ3NzLmJpbmQobnVsbCwgaWRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRDc3M7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBBVVRPX0RPV05MT0FEX0VYUElSWSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVEcmF3ZXIgPSAoYm9vbCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdUT0dHTEVfRFJBV0VSJyxcbiAgICBwYXlsb2FkOiBib29sLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZVNlYXJjaCA9IChib29sKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1RPR0dMRV9TRUFSQ0gnLFxuICAgIHBheWxvYWQ6IGJvb2wsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlV2F0ZXJmYWxsSGVhZGVyID0gKGJvb2wpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnVE9HR0xFX1dBVEVSRkFMTF9IRUFERVInLFxuICAgIHBheWxvYWQ6IGJvb2wsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NVcGRhdGUgPSAocGVyY2VudGFnZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQUk9HUkVTU19VUERBVEUnLFxuICAgIHBheWxvYWQ6IHBlcmNlbnRhZ2UsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcHVzaFRvYXN0ID0gKG1lc3NhZ2VUZXh0LCBhY3Rpb25UZXh0LCB0aW1lb3V0LCBjYWxsYmFjaykgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQVVNIX1RPQVNUJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBtZXNzYWdlVGV4dCxcbiAgICAgIGFjdGlvblRleHQsXG4gICAgICB0aW1lb3V0LFxuICAgICAgY2FsbGJhY2ssXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBwb3BUb2FzdCA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnUE9QX1RPQVNUJyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRBdXRvRG93bmxvYWRSZXN1bHQgPSAoYm9vbCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdBVVRPX0RPV05MT0FEJyxcbiAgICBwYXlsb2FkOiBib29sLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEF1dG9Eb3dubG9hZCA9IChib29sKSA9PiB7XG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcblxuICAgIGRpc3BhdGNoKHNldEF1dG9Eb3dubG9hZFJlc3VsdChib29sKSk7XG4gIH07XG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvYWN0aW9ucy91dGlscy5qcyIsIi8vIG1ldGFcbmV4cG9ydCBjb25zdCBJREJfVkVSU0lPTl9OTyA9IDE7XG5cbi8vIGNvbnRlbnQgbW9kZWxcbmV4cG9ydCBjb25zdCBUQUdHRURfSU4gPSAndGFnZ2VkaW4nO1xuXG4vLyBkcmF3ZXJcbmV4cG9ydCBjb25zdCBJTklUSUFURV9EUkFHR0lOR19USFJFU0hPTEQgPSAzMDtcbmV4cG9ydCBjb25zdCBEUkFXRVJfQ0xPU0VfVEhSRVNIT0xEID0gMzA7XG5cbi8vIGNhY2hlc1xuZXhwb3J0IGNvbnN0IFJVTlRJTUVfQ0FDSEUgPSAnZWNtYXN5bnRheC1ydW50aW1lJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvdXRpbHMvY29uc3RhbnRzLmpzIiwiaW1wb3J0IHsgcHVzaFRvYXN0IH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzZWFyY2ggPSAocXVlcnkpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0VBUkNIX1FVRVJZJyxcbiAgICBwYXlsb2FkOiBxdWVyeSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRGaWx0ZXIgPSAoZmlsdGVyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0FERF9GSUxURVInLFxuICAgIHBheWxvYWQ6IGZpbHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGaWx0ZXIgPSAoZmlsdGVyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1JFTU9WRV9GSUxURVInLFxuICAgIHBheWxvYWQ6IGZpbHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYWdlTGlzdExvYWRpbmcgPSAoYm9vbCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQQUdFTElTVF9MT0FESU5HJyxcbiAgICBwYXlsb2FkOiBib29sLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHBhZ2VMaXN0RXJyb3IgPSAoYm9vbCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQQUdFTElTVF9FUlJPUicsXG4gICAgcGF5bG9hZDogYm9vbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYWdlTGlzdEZldGNoU3VjY2VzcyA9IChlbnRyaWVzKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1BBR0VMSVNUX0ZFVENIX1NVQ0NFU1MnLFxuICAgIHBheWxvYWQ6IGVudHJpZXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hQYWdlTGlzdCA9ICgpID0+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xuICAgIGxldCBuZXR3b3JrRGF0YVJlY2lldmVkID0gZmFsc2U7XG4gICAgbGV0IGNhY2hlRGF0YVJlY2lldmVkID0gZmFsc2U7XG5cbiAgICBkaXNwYXRjaChwYWdlTGlzdExvYWRpbmcodHJ1ZSkpO1xuICAgIGRpc3BhdGNoKHBhZ2VMaXN0RXJyb3IoZmFsc2UpKTtcblxuICAgIGNvbnN0IG5ldHdvcmtVcGRhdGUgPSBmZXRjaCgnL2FwaS9wYWdlcycpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7IHJldHVybiByZXNwb25zZS5qc29uKCk7IH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBuZXR3b3JrRGF0YVJlY2lldmVkID0gdHJ1ZTtcblxuICAgICAgaWYgKCFjYWNoZURhdGFSZWNpZXZlZCkge1xuICAgICAgICBkaXNwYXRjaChwYWdlTGlzdExvYWRpbmcoZmFsc2UpKTtcbiAgICAgICAgZGlzcGF0Y2gocGFnZUxpc3RGZXRjaFN1Y2Nlc3MocmVzcG9uc2UuZmllbGRzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb21wYXJlIHRoZSBjYWNoZWQgYW5kIHJldHJpZXZlZCBwYWdlbGlzdHNcbiAgICAgICAgaWYgKGNhY2hlRGF0YVJlY2lldmVkLnN5cy5pZCAhPT0gcmVzcG9uc2Uuc3lzLmlkKSB7XG4gICAgICAgICAgLy8gdGhlIG5ldHdvcmsgcmVxdWVzdCByZXNwb25zZSBoYXMgbmV3ZXIgY29udGVudCB0aGFuIHRoZSBjYWNoZWQgcmVzcG9uc2VcbiAgICAgICAgICBkaXNwYXRjaChwdXNoVG9hc3QoJ05ld2VyIGNvbnRlbnQgaXMgYXZhaWxhYmxlLCByZWxvYWQgdG8gdXBkYXRlJywgJ3JlbG9hZCcsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICAgICAgICAgICBcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2FjaGVkIHBhZ2VsaXN0IGlzIHVwIHRvIGRhdGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgZGlzcGF0Y2gocGFnZUxpc3RGZXRjaFN1Y2Nlc3ModHJ1ZSkpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xuXG4gICAgLy8gZmV0Y2ggY2FjaGVkIGRhdGFcbiAgICBjYWNoZXMubWF0Y2goJy9hcGkvcGFnZXMnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZSkgdGhyb3cgRXJyb3IoXCJObyBkYXRhXCIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjYWNoZURhdGFSZWNpZXZlZCA9IGRhdGE7XG4gICAgICAvLyB3ZSBoYXZlIHVzZWQgdGhlIGRhdGEgZnJvbSB0aGUgY2FjaGUgYXMgdGhlIHJlc3BvbnNlIGhlcmVcbiAgICAgIGlmICghbmV0d29ya0RhdGFSZWNpZXZlZCkge1xuICAgICAgICBkaXNwYXRjaChwYWdlTGlzdExvYWRpbmcoZmFsc2UpKTtcbiAgICAgICAgZGlzcGF0Y2gocGFnZUxpc3RGZXRjaFN1Y2Nlc3MoZGF0YS5maWVsZHMpKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICByZXR1cm4gbmV0d29ya1VwZGF0ZTtcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvYWN0aW9ucy9wYWdlLWxpc3QuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcblxuaW1wb3J0IHMgZnJvbSAnLi9yaXBwbGUuc2Nzcyc7XG5cbmNsYXNzIFJpcHBsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlUmlwcGxlOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBvblRvdWNoU3RhcnQgPSAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCByZWN0ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5wYXJlbnRIZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgICB0aGlzLnBhcmVudFdpZHRoID0gcmVjdC53aWR0aDtcbiAgICB0aGlzLnBhcmVudFggPSByZWN0LmxlZnQ7XG4gICAgdGhpcy5wYXJlbnRZID0gcmVjdC50b3A7XG5cbiAgICBjb25zdCBjbGlja1ggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgY29uc3QgY2xpY2tZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgY29uc3QgeCA9IGNsaWNrWCAtIHRoaXMucGFyZW50WDtcbiAgICBjb25zdCB5ID0gY2xpY2tZIC0gdGhpcy5wYXJlbnRZO1xuXG4gICAgdGhpcy5jcmVhdGVSaXBwbGUoeCwgeSk7XG4gIH1cblxuICBvbk1vdXNlRG93biA9IChlKSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMucGFyZW50SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgdGhpcy5wYXJlbnRXaWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgdGhpcy5wYXJlbnRYID0gcmVjdC5sZWZ0O1xuICAgIHRoaXMucGFyZW50WSA9IHJlY3QudG9wO1xuXG4gICAgY29uc3QgY2xpY2tYID0gZS5wYWdlWDtcbiAgICBjb25zdCBjbGlja1kgPSBlLnBhZ2VZO1xuXG4gICAgY29uc3QgeCA9IGNsaWNrWCAtIHRoaXMucGFyZW50WDtcbiAgICBjb25zdCB5ID0gY2xpY2tZIC0gdGhpcy5wYXJlbnRZO1xuXG4gICAgdGhpcy5jcmVhdGVSaXBwbGUoeCwgeSk7XG4gIH1cblxuICBvbk1vdXNlVXAgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlUmlwcGxlKSB7XG4gICAgICB0aGlzLmZhZGVPdXRSaXBwbGUodGhpcy5zdGF0ZS5hY3RpdmVSaXBwbGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVSaXBwbGUpIHtcbiAgICAgIHRoaXMuZmFkZU91dFJpcHBsZSh0aGlzLnN0YXRlLmFjdGl2ZVJpcHBsZSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUmlwcGxlID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCByaXBwbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgcmlwcGxlLmNsYXNzTGlzdC5hZGQoc1sncmlwcGxlLW9yaWdpbiddKTtcblxuICAgIHJpcHBsZS5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuXG5cbiAgICBjb25zdCBzaXplID0gTWF0aC5zcXJ0KCh0aGlzLnBhcmVudFdpZHRoICoqIDIpICsgKHRoaXMucGFyZW50SGVpZ2h0ICoqIDIpKTtcbiAgICByaXBwbGUuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICByaXBwbGUuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG4gICAgcmlwcGxlLnN0eWxlLmxlZnQgPSBgJHt4IC0gKHNpemUgLyAyKX1weGA7XG4gICAgcmlwcGxlLnN0eWxlLnRvcCA9IGAke3kgLSAoc2l6ZSAvIDIpfXB4YDtcblxuICAgIHJpcHBsZS5jbGFzc0xpc3QuYWRkKHMuYW5pbWF0YWJsZSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyaXBwbGUpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBhY3RpdmVSaXBwbGU6IHJpcHBsZSxcbiAgICB9KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICByaXBwbGUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDIpJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZmFkZU91dFJpcHBsZSA9IChyaXBwbGUpID0+IHtcbiAgICByaXBwbGUuY2xhc3NMaXN0LmFkZChzLm91dCk7XG5cbiAgICByaXBwbGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIChlKSA9PiB7XG4gICAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgICB0aGlzLnJlbW92ZVJpcHBsZShyaXBwbGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlUmlwcGxlID0gKHJpcHBsZSkgPT4ge1xuICAgIGlmIChyaXBwbGUgJiYgcmlwcGxlLnBhcmVudE5vZGUgPT09IHRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZChyaXBwbGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3NbJ3JpcHBsZS1jb250YWluZXInXX1cbiAgICAgICAgb25Nb3VzZURvd249e3RoaXMub25Nb3VzZURvd259IG9uTW91c2VVcD17dGhpcy5vbk1vdXNlVXB9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5vbk1vdXNlTGVhdmV9XG4gICAgICAgIHJlZj17KGRpdikgPT4geyB0aGlzLmNvbnRhaW5lciA9IGRpdjsgfX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJpcHBsZS5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudCxcbn07XG5cblJpcHBsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShSaXBwbGUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcblxuaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICd1cmwtc2VhcmNoLXBhcmFtcyc7XG5cbmltcG9ydCBzIGZyb20gJy4vbGluay5zY3NzJztcblxuY2xhc3MgUm91dGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNsaWNrSGFuZGxlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMucm91dGUuc3RhcnRzV2l0aCgnPycpKSB7XG4gICAgICAvLyBsb2NhdGlvbi5zZWFyY2ggPSB0aGlzLnByb3BzLnJvdXRlO1xuXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgdXJsLnNlYXJjaCA9IHRoaXMucHJvcHMucm91dGU7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgbnVsbCwgdXJsLmhyZWYpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCAodGhpcy5wcm9wcy5yb3V0ZSkpO1xuICAgIH1cblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncG9wc3RhdGUnKSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5oYW5kbGVDbGljaykgdGhpcy5wcm9wcy5oYW5kbGVDbGljayhlKTtcbiAgfVxuICAgIFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGFcbiAgICAgICAgaHJlZj17dGhpcy5wcm9wcy5yb3V0ZX1cbiAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XG4gICAgICAgIGNsYXNzTmFtZT17cy5yb3V0ZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2E+XG4gICAgKTtcbiAgfVxuXG59XG5cblJvdXRlLnByb3BUeXBlcyA9IHtcbiAgcm91dGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQsXG4gIGhhbmRsZUNsaWNrOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuUm91dGUuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogbnVsbCxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxufTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKCkge1xuICByZXR1cm4ge1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShSb3V0ZSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvbGluay9saW5rLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcblxuaW1wb3J0IHMgZnJvbSAnLi9yb3V0ZS1oYW5kbGVyLnNjc3MnO1xuXG5jbGFzcyBSb3V0ZUhhbmRsZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWxpZFJvdXRlczogW10sXG4gICAgICBub3RGb3VuZFJvdXRlOiA8ZGl2PjQwNDwvZGl2PixcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7ICBcbiAgICBcbiAgICBsZXQgdmFsaWRSb3V0ZXMgPSBbXTtcbiAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnByb3BzLmhhc093blByb3BlcnR5KCdub3Rmb3VuZCcpKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBub3RGb3VuZFJvdXRlOiBjaGlsZCB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNoaWxkLnByb3BzLmhhc093blByb3BlcnR5KCdwYXRoJykpIHtcbiAgICAgICAgICB2YWxpZFJvdXRlcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy52YWxpZFJvdXRlcyA9IHZhbGlkUm91dGVzO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsb2NhdGlvbjogbG9jYXRpb24uaHJlZixcbiAgICB9KVxuXG4gICAgdGhpcy5vblBvcFN0YXRlKCk7XG4gIH1cbiAgXG5cbiAgc3RhdGljIFVwZGF0ZVJvdXRlKHJvdXRlKSB7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJvdXRlKTtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3BvcHN0YXRlJykpO1xuICB9XG5cbiAgc3RhdGljIFJlcGxhY2VSb3V0ZShyb3V0ZSkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCByb3V0ZSk7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdwb3BzdGF0ZScpKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7XG4gIH1cblxuICBvblBvcFN0YXRlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMucHJvZ3Jlc3NVcGRhdGUoMCk7XG4gICAgdGhpcy5jaG9vc2VBY3RpdmVSb3V0ZSgpO1xuICB9XG5cbiAgY2hvb3NlQWN0aXZlUm91dGUgPSAoKSA9PiB7ICBcbiAgICBsZXQgY29udGVudDsgIFxuXG4gICAgaWYgKGxvY2F0aW9uLnNlYXJjaCkge1xuICAgICAgZm9yIChsZXQgdmFsaWRSb3V0ZSBvZiB0aGlzLnZhbGlkUm91dGVzKSB7XG4gICAgICAgIGlmICh2YWxpZFJvdXRlLnByb3BzLnF1ZXJ5KSB7XG4gICAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbGlkUm91dGUucHJvcHMucGF0aClcbiAgICAgICAgICBpZiAocmVnZXgudGVzdChsb2NhdGlvbi5zZWFyY2gpKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gdmFsaWRSb3V0ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gXG5cbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIGZvciAobGV0IHZhbGlkUm91dGUgb2YgdGhpcy52YWxpZFJvdXRlcykge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsaWRSb3V0ZS5wcm9wcy5wYXRoKVxuICAgICAgICBpZiAocmVnZXgudGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHtcbiAgICAgICAgICBjb250ZW50ID0gdmFsaWRSb3V0ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgIHRoaXMucHJvcHMucHJvZ3Jlc3NVcGRhdGUoNTApO1xuICAgIH1cbiAgICBjb250ZW50ID0gY29udGVudCB8fCB0aGlzLnN0YXRlLm5vdEZvdW5kUm91dGU7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbnRlbnQ6IFJlYWN0LmNsb25lRWxlbWVudChcbiAgICAgICAgY29udGVudCxcbiAgICAgICAgeyBsb2NhdGlvbjogYCR7bG9jYXRpb24uaHJlZn1gIH1cbiAgICAgIClcbiAgICB9KTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1sncGFnZS12aWV3J119PlxuICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZW50fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Sb3V0ZUhhbmRsZXIuZGVmYXVsdFByb3BzID0ge1xuICBhY3RpdmVQYWdlOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShSb3V0ZUhhbmRsZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvcm91dGUtaGFuZGxlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjcnlwdG9cIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgYXBpUm91dGVyIGZyb20gJy4vYXBpJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYucG9ydCB8fCA1MDAwO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoJy9hcGknLCBhcGlSb3V0ZXIpXG5cbmFwcC51c2UoJy8nLCByb3V0ZXMpO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYHNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9YClcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCI0MDQuanNcIjpcIi9zdGF0aWMvanMvNDA0LmNodW5rLmpzXCIsXCJhYm91dC5qc1wiOlwiL3N0YXRpYy9qcy9hYm91dC5jaHVuay5qc1wiLFwiYXBwLmpzXCI6XCIvc3RhdGljL2pzL2FwcC5idW5kbGUuanNcIixcImFydGljbGUuanNcIjpcIi9zdGF0aWMvanMvYXJ0aWNsZS5jaHVuay5qc1wiLFwic2VhcmNoLmpzXCI6XCIvc3RhdGljL2pzL3NlYXJjaC5jaHVuay5qc1wiLFwidmVuZG9yLmpzXCI6XCIvc3RhdGljL2pzL3ZlbmRvci5idW5kbGUuanNcIn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvY2xpZW50L3N0YXRpYy9qcy9tYW5pZmVzdC5qc29uXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3BhY2U6ICd5Z3A0OWo5bmNvcW4nLFxuICBhY2Nlc3NUb2tlbjogJzNmZjU4MTZlY2I3NjgwN2M4OGE1NzBlMGU3YWI4OWI3N2RkZGU5Njk3ZDI5OTQ1Y2E4MmQ2MDM5OWQ2MTgyZTgnXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NyZWRlbnRpYWxzLmpzIiwiaW1wb3J0IHsgdG9nZ2xlRHJhd2VyLCB0b2dnbGVTZWFyY2gsIHByb2dyZXNzVXBkYXRlLCBwdXNoVG9hc3QgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgc2VhcmNoIH0gZnJvbSAnLi9wYWdlLWxpc3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBhZ2VGZXRjaEVycm9yID0gKGJvb2wpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogJ1BBR0VfRVJST1InLFxyXG4gICAgcGF5bG9hZDogYm9vbCxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBhZ2VJc0xvYWRpbmcgPSAoYm9vbCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiAnUEFHRV9MT0FESU5HJyxcclxuICAgIHBheWxvYWQ6IGJvb2wsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVSb3V0ZSA9IChyb3V0ZSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiAnQUNUSVZFX1JPVVRFJyxcclxuICAgIHBheWxvYWQ6IHJvdXRlLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlUGFnZSA9IChwYWdlKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6ICdBQ1RJVkVfUEFHRScsXHJcbiAgICBwYXlsb2FkOiBwYWdlLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlUGFnZVR5cGUgPSAodHlwZSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiAnQUNUSVZFX1BBR0VfVFlQRScsXHJcbiAgICBwYXlsb2FkOiB0eXBlLFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVBhZ2VUaXRsZSA9ICh0aXRsZSkgPT4ge1xyXG4gIGRvY3VtZW50LnRpdGxlID0gYEVDTUFTeW50YXggLSAke3RpdGxlfWA7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6ICdBQ1RJVkVfUEFHRV9USVRMRScsXHJcbiAgICBwYXlsb2FkOiB0aXRsZSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBhZ2VGZXRjaFN1Y2Nlc3MgPSAocGFnZSkgPT4ge1xyXG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcclxuICAgIGRpc3BhdGNoKHNldEFjdGl2ZVBhZ2UocGFnZSkpOyAgICBcclxuICAgIGRpc3BhdGNoKHBhZ2VJc0xvYWRpbmcoZmFsc2UpKTtcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoUGFnZSA9IChyb3V0ZSkgPT4ge1xyXG4gIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcclxuICAgIGxldCBuZXR3b3JrRGF0YVJlY2lldmVkID0gZmFsc2U7XHJcbiAgICBsZXQgY2FjaGVEYXRhUmVjaWV2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkaXNwYXRjaChzZXRBY3RpdmVSb3V0ZShyb3V0ZSkpO1xyXG4gICAgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUoMCkpO1xyXG4gICAgZGlzcGF0Y2gocGFnZUlzTG9hZGluZyh0cnVlKSk7XHJcbiAgICBkaXNwYXRjaChwYWdlRmV0Y2hFcnJvcihmYWxzZSkpO1xyXG5cclxuICAgIGRpc3BhdGNoKHRvZ2dsZURyYXdlcihmYWxzZSkpO1xyXG5cclxuICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICBjYXNlIC9eXFwvcGFnZXNcXC8oLiopJC8udGVzdChyb3V0ZSk6XHJcbiAgICAgICAgLy8gaGVyZSB3ZSBtYWtlIHR3byByZXF1ZXN0cywgb25lIHRvIHRoZSBjYWNoZSwgb25lIHRvIHRoZSBuZXR3b3JrLiBcclxuICAgICAgICAvLyBUaGUgaWRlYSBpcyB0byBzaG93IHRoZSBjYWNoZWQgZGF0YSBmaXJzdCwgXHJcbiAgICAgICAgLy8gdGhlbiBpbmZvcm0gdGhlIHVzZXIgd2hlbi9pZiB0aGUgbmV0d29yayBkYXRhIGFycml2ZXMgYW5kIHRoZVxyXG4gICAgICAgIC8vIGNvbnRlbnQgaXMgbmV3ZXIgdGhhbiB0aGUgY2FjaGVkIHJlc3BvbnNlLlxyXG5cclxuICAgICAgICBkaXNwYXRjaChwcm9ncmVzc1VwZGF0ZSg1MCkpOyBcclxuICAgICAgICBcclxuICAgICAgICAvLyBmZXRjaCBmcmVzaCBkYXRhXHJcbiAgICAgICAgY29uc3QgbmV0d29ya1VwZGF0ZSA9IGZldGNoKGAvYXBpJHtyb3V0ZX1gKVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgaWYgKCFjYWNoZURhdGFSZWNpZXZlZCkgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUoMCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7IFxyXG4gICAgICAgICAgaWYgKCFjYWNoZURhdGFSZWNpZXZlZCkgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUoNzUpKTtcclxuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBuZXR3b3JrRGF0YVJlY2lldmVkID0gdHJ1ZTtcclxuICAgICAgICAgIGlmICghY2FjaGVEYXRhUmVjaWV2ZWQpIHtcclxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB1c2VkIHRoZSBkYXRhIGZyb20gdGhlIG5ldHdvcmsgcmVxdWVzdCBhcyB0aGUgcmVzcG9uc2UgaGVyZVxyXG4gICAgICAgICAgICBkaXNwYXRjaChwcm9ncmVzc1VwZGF0ZSgxMDApKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goc2V0QWN0aXZlUGFnZVR5cGUoJ2FydGljbGUnKSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHBhZ2VGZXRjaFN1Y2Nlc3MocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goc2V0QWN0aXZlUGFnZVRpdGxlKHJlc3BvbnNlLmZpZWxkcy5uYW1lKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2FjaGVEYXRhUmVjaWV2ZWQpIHtcclxuICAgICAgICAgICAgaWYgKGNhY2hlRGF0YVJlY2lldmVkLnN5cy51cGRhdGVkQXQgIT09IHJlc3BvbnNlLnN5cy51cGRhdGVkQXQpIHtcclxuICAgICAgICAgICAgICAvLyB0aGUgbmV0d29yayByZXF1ZXN0IHJlc3BvbnNlIGhhcyBuZXdlciBjb250ZW50IHRoYW4gdGhlIGNhY2hlZCByZXNwb25zZVxyXG4gICAgICAgICAgICAgIGRpc3BhdGNoKHB1c2hUb2FzdCgnTmV3ZXIgY29udGVudCBpcyBhdmFpbGFibGUsIHJlbG9hZCB0byB1cGRhdGUnLCAncmVsb2FkJywgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyB0aGUgY2FjaGVkIGNvbnRlbnQgaXMgdXAgdG8gZGF0ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUoMCkpO1xyXG4gICAgICAgICAgZGlzcGF0Y2gocGFnZUZldGNoRXJyb3IodHJ1ZSkpO1xyXG4gICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBmZXRjaCBjYWNoZWQgZGF0YVxyXG4gICAgICAgIGNhY2hlcy5tYXRjaChgL2FwaSR7cm91dGV9YCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGlmICghcmVzcG9uc2UpIHRocm93IEVycm9yKFwiTm8gZGF0YVwiKTtcclxuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgY2FjaGVEYXRhUmVjaWV2ZWQgPSBkYXRhO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAoIW5ldHdvcmtEYXRhUmVjaWV2ZWQpIHtcclxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB1c2VkIHRoZSBkYXRhIGZyb20gdGhlIGNhY2hlIGFzIHRoZSByZXNwb25zZSBoZXJlXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHByb2dyZXNzVXBkYXRlKDEwMCkpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaChzZXRBY3RpdmVQYWdlVHlwZSgnYXJ0aWNsZScpKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2gocGFnZUZldGNoU3VjY2VzcyhkYXRhKSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldEFjdGl2ZVBhZ2VUaXRsZShkYXRhLmZpZWxkcy5uYW1lKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldHdvcmtVcGRhdGU7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgZGlzcGF0Y2gocGFnZUlzTG9hZGluZyhmYWxzZSkpO1xyXG4gICAgICAgIGRpc3BhdGNoKHBhZ2VGZXRjaFN1Y2Nlc3MoeyBmaWVsZHM6IHsgbmFtZTogcm91dGUuc3Vic3RyaW5nKDEpLCByb3V0ZSB9IH0pKTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9hY3Rpb25zL2FjdGl2ZS1wYWdlLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJzsgXHJcbmltcG9ydCBBcHBTaGVsbCBmcm9tICcuL2NvbnRhaW5lcnMvYXBwLXNoZWxsL2FwcC1zaGVsbCc7XHJcblxyXG5jb25zdCBDb250ZXh0VHlwZSA9IHtcclxuICAvLyBFbmFibGVzIGNyaXRpY2FsIHBhdGggQ1NTIHJlbmRlcmluZ1xyXG4gIGluc2VydENzczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBjb250ZXh0OiBQcm9wVHlwZXMuc2hhcGUoQ29udGV4dFR5cGUpLmlzUmVxdWlyZWQsXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0gQ29udGV4dFR5cGU7XHJcblxyXG4gIGdldENoaWxkQ29udGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNvbnRleHQ7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8QXBwU2hlbGw+XHJcbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cclxuICAgICAgPC9BcHBTaGVsbD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvYXBwLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi8uLi9jb21tb24vcmlwcGxlL3JpcHBsZSc7XG5pbXBvcnQgTGluayBmcm9tICcuLi8uLi8uLi9yb3V0ZS1oYW5kbGVyL2xpbmsvbGluayc7XG5cbmltcG9ydCBzIGZyb20gJy4vY2F0ZWdvcnktc2VjdGlvbi5zY3NzJztcblxuY2xhc3MgQ2F0ZWdvcnlTZWN0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBtYXBMaW5rcygpIHtcbiAgICAvLyBhY3RpdmU9eyh0aGlzLnByb3BzLmFjdGl2ZVJvdXRlID8gdGhpcy5wcm9wcy5hY3RpdmVSb3V0ZSA6IG51bGwpID09PSBwYWdlLnJvdXRlfVxuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLnByb3BzLmNhdGVnb3J5LmVudHJpZXM7XG4gICAgZW50cmllcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYS5maWVsZHMubmFtZS5jaGFyQ29kZUF0KDApIC0gYi5maWVsZHMubmFtZS5jaGFyQ29kZUF0KDApO1xuICAgIH0pO1xuICAgIHJldHVybiBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICgodGhpcy5wcm9wcy5hY3RpdmVSb3V0ZSkgJiYgKHRoaXMucHJvcHMuYWN0aXZlUm91dGUgPT09IGVudHJ5LmZpZWxkcy5yb3V0ZSkpXG4gICAgICAgICAgICA/XG4gICAgICAgICAgICAoYCR7c1sncGFnZUxpc3QtaXRlbSddfSAke3MuYWN0aXZlfWApXG4gICAgICAgICAgICA6XG4gICAgICAgICAgICBzWydwYWdlTGlzdC1pdGVtJ11cbiAgICAgICAgICB9XG4gICAgICAgICAga2V5PXtlbnRyeS5zeXMuaWR9XG4gICAgICAgID5cbiAgICAgICAgPExpbmtcbiAgICAgICAgICByb3V0ZT17ZW50cnkuZmllbGRzLnJvdXRlfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxSaXBwbGUgLz5cbiAgICAgICAgICAgIHtlbnRyeS5maWVsZHMubmFtZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmNhdGVnb3J5U2VjdGlvbn0gcmVmPXsoZGl2KSA9PiB7IHRoaXMuY29udGFpbmVyID0gZGl2OyB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2NhdGVnb3J5U2VjdGlvbi1oZWFkZXInXX0gaHJlZj1cIiNcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jYXRlZ29yeS5maWVsZHMubmFtZX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydjYXRlZ29yeVNlY3Rpb24tYm9keSddfSByZWY9eyhkaXYpID0+IHsgdGhpcy5saW5rc0NvbnRhaW5lciA9IGRpdjsgfX0+XG4gICAgICAgICAgeyB0aGlzLm1hcExpbmtzKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ2F0ZWdvcnlTZWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgYWN0aXZlUm91dGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNhdGVnb3J5OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yeVNlY3Rpb24uZGVmYXVsdFByb3BzID0ge1xuICBhY3RpdmVSb3V0ZTogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQ2F0ZWdvcnlTZWN0aW9uKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L2NhdGVnb3J5LXNlY3Rpb24vY2F0ZWdvcnktc2VjdGlvbi5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcblxuaW1wb3J0IHMgZnJvbSAnLi9wYWdlLWxpc3Quc2Nzcyc7XG5cbmltcG9ydCBMb2FkaW5nVmlldyBmcm9tICcuLi8uLi92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3JztcbmltcG9ydCBDYXRlZ29yeVNlY3Rpb24gZnJvbSAnLi9jYXRlZ29yeS1zZWN0aW9uL2NhdGVnb3J5LXNlY3Rpb24nO1xuXG5jbGFzcyBQYWdlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldENhdGVnb3J5SW5kZXgoY2F0ZWdvcnksIHBhZ2VzKSB7XG4gICAgbGV0IG1hdGNoZWRDYXQgPSBwYWdlcy5maW5kSW5kZXgoKGNhdCkgPT4ge1xuICAgICAgcmV0dXJuIChjYXQuc3lzLmlkID09PSBjYXRlZ29yeS5zeXMuaWQpO1xuICAgIH0pO1xuICAgIGlmIChtYXRjaGVkQ2F0IDwgMCkge1xuICAgICAgbWF0Y2hlZENhdCA9IHBhZ2VzLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZWRDYXQ7XG4gIH1cblxuICBzdGF0aWMgb3JnYW5pc2VQYWdlcyhlbnRyaWVzKSB7XG4gICAgbGV0IHBhZ2VzID0gW107XG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY2F0ZWdvcnkgPSBlbnRyeS5maWVsZHMuY2F0ZWdvcnk7XG5cbiAgICAgIGNvbnN0IGNhdGVnb3J5SW5kZXggPSB0aGlzLmdldENhdGVnb3J5SW5kZXgoY2F0ZWdvcnksIHBhZ2VzKTtcblxuICAgICAgcGFnZXMgPSB0aGlzLmFkZEVudHJ5VG9DYXRlZ29yeShjYXRlZ29yeSwgY2F0ZWdvcnlJbmRleCwgZW50cnksIHBhZ2VzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBzdGF0aWMgYWRkRW50cnlUb0NhdGVnb3J5KGNhdGVnb3J5LCBjYXRlZ29yeUluZGV4LCBlbnRyeSwgcGFnZXMpIHtcbiAgICBpZiAoIXBhZ2VzW2NhdGVnb3J5SW5kZXhdKSB7XG4gICAgICBwYWdlcy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGNhdGVnb3J5LCB7IGVudHJpZXM6IFtdIH0pKTtcbiAgICB9XG5cbiAgICBwYWdlc1tjYXRlZ29yeUluZGV4XS5lbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIHJldHVybiBwYWdlcztcbiAgfVxuXG4gIG1hcFBhZ2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhZ2VzID0gUGFnZUxpc3Qub3JnYW5pc2VQYWdlcyh0aGlzLnByb3BzLnBhZ2VzKTtcbiAgICBjb25zdCBvdXRwdXQgPSBwYWdlcy5tYXAoKGNhdGVnb3J5KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2F0ZWdvcnlTZWN0aW9uXG4gICAgICAgICAga2V5PXtjYXRlZ29yeS5zeXMuaWR9XG4gICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgIGFjdGl2ZVJvdXRlPXt0aGlzLnByb3BzLmFjdGl2ZVJvdXRlfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmhhc0Vycm9yZWQpIHtcbiAgICAgIHJldHVybiAoPHA+U29ycnkhIFRoZXJlIHdhcyBhbiBlcnJvciBsb2FkaW5nIHRoZSBpdGVtczwvcD4pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmlzTG9hZGluZykge1xuICAgICAgcmV0dXJuICg8TG9hZGluZ1ZpZXcgLz4pO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1sncGFnZWxpc3Qtd3JhcHBlciddfT5cbiAgICAgICAgeyB0aGlzLm1hcFBhZ2VzKCkgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5QYWdlTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGhhc0Vycm9yZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGlzTG9hZGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgYWN0aXZlUm91dGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBhZ2VzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbn07XG5cblBhZ2VMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgYWN0aXZlUm91dGU6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFBhZ2VMaXN0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L3BhZ2UtbGlzdC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vY29tbW9uL3JpcHBsZS9yaXBwbGUnO1xuXG5pbXBvcnQgUm91dGVIYW5kbGVyIGZyb20gJy4uLy4uL3JvdXRlLWhhbmRsZXIvcm91dGUtaGFuZGxlcic7XG5cbmltcG9ydCBzIGZyb20gJy4vaGVhZGVyLWljb24uc2Nzcyc7XG5cbmNsYXNzIEhlYWRlckljb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIG9wZW5EcmF3ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVEcmF3ZXIoIXRoaXMucHJvcHMuZHJhd2VyT3Blbik7XG4gIH07XG5cbiAgY2xvc2VTZWFyY2ggPSAoKSA9PiB7XG4gICAgLy8gdGhpcy5wcm9wcy5zZWFyY2goJycpO1xuICAgIFJvdXRlSGFuZGxlci5VcGRhdGVSb3V0ZShsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydoZWFkZXItaWNvbiddfT5cblxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub3BlbkRyYXdlcn0gY2xhc3NOYW1lPXtgJHtzWydpY29uLWNvbnRhaW5lciddfSAke3MubWVudUljb259ICR7dGhpcy5wcm9wcy5zZWFyY2hPcGVuID8gcy5zZWFyY2hPcGVuIDogJyd9YH0+XG4gICAgICAgICAgPHN2ZyBmaWxsPVwiI2ZmZlwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMyAxOGgxOHYtMkgzdjJ6bTAtNWgxOHYtMkgzdjJ6bTAtN3YyaDE4VjZIM3pcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDxSaXBwbGUgLz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlU2VhcmNofSBjbGFzc05hbWU9e2Ake3NbJ2ljb24tY29udGFpbmVyJ119ICR7cy5iYWNrSWNvbn0gJHt0aGlzLnByb3BzLnNlYXJjaE9wZW4gPyBzLnNlYXJjaE9wZW4gOiAnJ31gfT5cbiAgICAgICAgICA8c3ZnIGZpbGw9XCIjZmZmXCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0yMCAxMUg3LjgzbDUuNTktNS41OUwxMiA0bC04IDggOCA4IDEuNDEtMS40MUw3LjgzIDEzSDIwdi0yelwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPFJpcHBsZSAvPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IZWFkZXJJY29uLnByb3BUeXBlcyA9IHtcbiAgZHJhd2VyT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc2VhcmNoT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgdG9nZ2xlRHJhd2VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShIZWFkZXJJY29uKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWljb24vaGVhZGVyLWljb24uanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL3NlYXJjaC1pbnB1dC5zY3NzJztcblxuaW1wb3J0IFJvdXRlSGFuZGxlciBmcm9tICcuLi8uLi9yb3V0ZS1oYW5kbGVyL3JvdXRlLWhhbmRsZXInO1xuXG5pbXBvcnQgTGluayBmcm9tICcuLi8uLi9yb3V0ZS1oYW5kbGVyL2xpbmsvbGluaydcblxuY2xhc3MgU2VhcmNoSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmb2N1c2VkOiBmYWxzZSxcbiAgICAgIG5vbkVtcHR5OiBmYWxzZSxcbiAgICB9O1xuXG4gIH1cblxuICBzZWFyY2hJY29uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpO1xuICB9XG5cbiAgc2VhcmNoRm9jdXNlZCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogdHJ1ZSB9KTtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZWFyY2hVbmZvY3VzZWQpO1xuICB9XG5cbiAgc2VhcmNoVW5mb2N1c2VkID0gKGV2dCkgPT4ge1xuICAgIGlmICh0aGlzLnNlYXJjaENvbnRhaW5lci5jb250YWlucyhldnQudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZWFyY2hVbmZvY3VzZWQpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuY3VyclF1ZXJ5Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAvLyByZW1vdmVzIHRoZSBoYXNoLCBnZXR0aW5nIHJpZCBvZiB0aGUgc2VhcmNoIHBhZ2VcbiAgICAgIFJvdXRlSGFuZGxlci5VcGRhdGVSb3V0ZShsb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVJbnB1dCA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBub25FbXB0eTogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5vbkVtcHR5OiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnNlYXJjaChlLnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBjbGVhcklucHV0ID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VhcmNoKCcnKTtcbiAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICBodG1sRm9yPVwic2VhcmNoXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2Ake3NbJ3NlYXJjaC1sYWJlbCddfSBcbiAgICAgICAgICAgICR7dGhpcy5wcm9wcy5zZWFyY2hPcGVuID8gcy5vcGVuZWQgOiAnJ30gXG4gICAgICAgICAgICAke3RoaXMuc3RhdGUuZm9jdXNlZCA/IHMuZm9jdXNlZCA6ICcnfVxuICAgICAgICAgICAgJHt0aGlzLnByb3BzLmN1cnJRdWVyeS5sZW5ndGggPiAwID8gcy5ub25FbXB0eSA6ICcnfVxuICAgICAgICAgIGB9XG4gICAgICAgICAgcmVmPXsobGFiZWwpID0+IHsgdGhpcy5zZWFyY2hDb250YWluZXIgPSBsYWJlbDsgfX1cbiAgICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7c1snaWNvbi1jb250YWluZXInXX0gJHtzWydzZWFyY2gtc2VhcmNoSWNvbiddfWB9ID5cbiAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgcm91dGU9e2A/c2VhcmNoPSR7dGhpcy5wcm9wcy5jdXJyUXVlcnl9YH1cbiAgICAgICAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLnNlYXJjaEljb25DbGlja31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9e3NbJ3NlYXJjaC1pY29uJ119IGZpbGw9XCIjZmZmXCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6XCIgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snc2VhcmNoLWlucHV0LS1jb250YWluZXInXX0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiIGlkPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIHN5bnRheFwiXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jdXJyUXVlcnl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3NbJ3NlYXJjaC1pbnB1dCddfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgICBvbkZvY3VzPXt0aGlzLnNlYXJjaEZvY3VzZWR9XG4gICAgICAgICAgICByZWY9eyhpbnB1dCkgPT4geyB0aGlzLnNlYXJjaElucHV0ID0gaW5wdXQ7IH19XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c1snaWNvbi1jb250YWluZXInXX0gJHtzWydzZWFyY2gtY2xvc2VJY29uJ119YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2xlYXJJbnB1dH1cbiAgICAgICAgICAgIHJlZj17KGJ0bikgPT4geyB0aGlzLmNsb3NlSWNvbiA9IGJ0bjsgfX1cbiAgICAgICAgICA+XG5cbiAgICAgICAgICAgIDxzdmcgZmlsbD1cIiNmZmZcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnpcIiAvPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbGFiZWw+XG4gICAgKTtcbiAgfVxufVxuXG5TZWFyY2hJbnB1dC5wcm9wVHlwZXMgPSB7XG4gIHNlYXJjaE9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGN1cnJRdWVyeTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzZWFyY2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFNlYXJjaElucHV0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9oZWFkZXIvc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBzIGZyb20gJy4vcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3MnO1xuXG5jbGFzcyBQcm9ncmVzc0luZGljYXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHdpZHRoOiAnMCUnLFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGFuaW1hdGFibGU6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHdpZHRoOiBgJHt0aGlzLnByb3BzLnByb2dyZXNzfSVgLFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9eyhkaXYpID0+IHsgdGhpcy5wcm9ncmVzc0luZGljYXRvciA9IGRpdjsgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtgJHtzLnByb2dyZXNzSW5kaWNhdG9yfSAke3RoaXMuc3RhdGUuYW5pbWF0YWJsZSA/IHMuYW5pbWF0YWJsZSA6ICcnfWB9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5Qcm9ncmVzc0luZGljYXRvci5wcm9wVHlwZXMgPSB7XG4gIHByb2dyZXNzOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoUHJvZ3Jlc3NJbmRpY2F0b3IpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL21haW4vcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBzIGZyb20gJy4vbG9hZGluZy12aWV3LnNjc3MnO1xuXG5jbGFzcyBMb2FkaW5nVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgIH07XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydsb2FkaW5nLWNvbnRhaW5lciddfT5cbiAgICAgICAgeyB0aGlzLnN0YXRlLnZpc2libGUgP1xuICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXtzLnNwaW5uZXJ9IHdpZHRoPVwiNjVweFwiIGhlaWdodD1cIjY1cHhcIiB2aWV3Qm94PVwiMCAwIDY2IDY2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9e3MucGF0aH0gZmlsbD1cIm5vbmVcIiBzdHJva2VXaWR0aD1cIjZcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBjeD1cIjMzXCIgY3k9XCIzM1wiIHI9XCIzMFwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgOlxuICAgICAgICAgICcnXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTG9hZGluZ1ZpZXcucHJvcFR5cGVzID0ge1xuICBjb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbkxvYWRpbmdWaWV3LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29sb3I6ICcjZmZmJyxcbiAgc2l6ZTogJzYwcHgnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShMb2FkaW5nVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvbG9hZGluZy12aWV3L2xvYWRpbmctdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgcyBmcm9tICcuLi8uLi9zY3NzL2Jhc2Uuc2Nzcyc7XG5cbmltcG9ydCB7IGZldGNoUGFnZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvYWN0aXZlLXBhZ2UnO1xuaW1wb3J0IHsgdG9nZ2xlRHJhd2VyLCB0b2dnbGVTZWFyY2ggfSBmcm9tICcuLi8uLi9hY3Rpb25zL3V0aWxzJztcbmltcG9ydCB7IGZldGNoUGFnZUxpc3QsIHNlYXJjaCB9IGZyb20gJy4uLy4uL2FjdGlvbnMvcGFnZS1saXN0JztcblxuaW1wb3J0IFByb2dyZXNzSW5kaWNhdG9yIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFpbi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yJztcbmltcG9ydCBNYWluSGVhZGVyIGZyb20gJy4uL2hlYWRlci9tYWluLWhlYWRlcic7XG5pbXBvcnQgRHJhd2VyIGZyb20gJy4uL2RyYXdlci9kcmF3ZXInO1xuaW1wb3J0IFRvYXN0TWFuYWdlciBmcm9tICcuLi90b2FzdC1tYW5hZ2VyL3RvYXN0LW1hbmFnZXInO1xuXG5jbGFzcyBBcHBTaGVsbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZVJvdXRlOiB0aGlzLnByb3BzLmFjdGl2ZVJvdXRlLFxuICAgICAgc2Nyb2xsZWQ6IGZhbHNlLFxuICAgICAgY2FjaGVTdG9yYWdlOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgdGhpcy5jYWNoZXMgPSBmYWxzZTtcbiAgfVxuXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gYXN5bmMgZmV0Y2ggcGFnZWxpc3RcbiAgICB0aGlzLnByb3BzLmZldGNoUGFnZUxpc3QoKTtcbiAgfVxuXG4gIHNjcm9sbGVkID0gKGJvb2wpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNjcm9sbGVkOiBib29sLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1snYXBwLWNvbnRhaW5lciddfT5cbiAgICAgICAgPFByb2dyZXNzSW5kaWNhdG9yIHByb2dyZXNzPXt0aGlzLnByb3BzLnByb2dyZXNzfSAvPlxuICAgICAgICA8TWFpbkhlYWRlciBzY3JvbGxlZD17dGhpcy5zdGF0ZS5zY3JvbGxlZH0vPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snbWFpbi1jb250YWluZXInXX0+XG4gICAgICAgICAgPERyYXdlciAvPlxuICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICAgICAgPFRvYXN0TWFuYWdlciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgcHJvZ3Jlc3M6IHN0YXRlLnV0aWxzLnByb2dyZXNzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXRjaERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIGZldGNoUGFnZUxpc3Q6ICgpID0+IHsgZGlzcGF0Y2goZmV0Y2hQYWdlTGlzdCgpKTsgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWF0Y2hEaXNwYXRjaFRvUHJvcHMpKEFwcFNoZWxsKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvYXBwLXNoZWxsL2FwcC1zaGVsbC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL2RyYXdlci5zY3NzJztcblxuaW1wb3J0IHsgSU5JVElBVEVfRFJBR0dJTkdfVEhSRVNIT0xELCBEUkFXRVJfQ0xPU0VfVEhSRVNIT0xEIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IHRvZ2dsZURyYXdlciB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdXRpbHMnO1xuXG5pbXBvcnQgUm91dGVIYW5kbGVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9yb3V0ZS1oYW5kbGVyJztcbmltcG9ydCBMaW5rIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9saW5rL2xpbmsnO1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9yaXBwbGUvcmlwcGxlJztcbmltcG9ydCBQYWdlTGlzdCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2RyYXdlci9wYWdlLWxpc3QvcGFnZS1saXN0JztcblxuY2xhc3MgRHJhd2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhcnRYOiAwLFxuICAgICAgY3VycmVudFg6IDAsXG4gICAgICB0b3VjaGluZ1NpZGVOYXY6IGZhbHNlLFxuICAgICAgaW5pdGlhbGlzZWREcmFnZ2luZzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAvLyBnb3QgcGFnZSBsaXN0XG4gICAgaWYgKHByZXZQcm9wcy5lbnRyaWVzLmxlbmd0aCA8IDEgJiYgdGhpcy5wcm9wcy5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT09ICcvJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygncmVwbGFjaW5nIHN0YXRlJyk7XG4gICAgICBSb3V0ZUhhbmRsZXIuUmVwbGFjZVJvdXRlKHRoaXMucHJvcHMuZW50cmllc1swXS5maWVsZHMucm91dGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hTdGFydCA9IChldnQpID0+IHtcbiAgICBpZiAoIXRoaXMuZHJhd2VyQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhzLmFjdGl2ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdlci5jbGFzc0xpc3QuYWRkKHMuZHJhZ2dhYmxlKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3RhcnRYOiBldnQudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgIGN1cnJlbnRYOiBldnQudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgIHRvdWNoaW5nU2lkZU5hdjogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XG4gIH1cblxuICBvblRvdWNoTW92ZSA9IChldnQpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUudG91Y2hpbmdTaWRlTmF2KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjdXJyZW50WDogZXZ0LnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgfSk7XG4gIH1cblxuICBvblRvdWNoRW5kID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS50b3VjaGluZ1NpZGVOYXYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRvdWNoaW5nU2lkZU5hdjogZmFsc2UsXG4gICAgICBpbml0aWFsaXNlZERyYWdnaW5nOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuZHJhd2VyLmNsYXNzTGlzdC5yZW1vdmUocy5kcmFnZ2FibGUpO1xuXG4gICAgY29uc3QgdHJhbnNsYXRlWCA9IE1hdGgubWluKDAsIHRoaXMuc3RhdGUuY3VycmVudFggLSB0aGlzLnN0YXRlLnN0YXJ0WCk7XG4gICAgdGhpcy5kcmF3ZXIuc3R5bGUudHJhbnNmb3JtID0gJyc7XG5cbiAgICBpZiAodHJhbnNsYXRlWCA8IC1EUkFXRVJfQ0xPU0VfVEhSRVNIT0xEKSB7XG4gICAgICB0aGlzLnByb3BzLnRvZ2dsZURyYXdlcihmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlQYXNzaXZlKCkge1xuICAgIGlmICh0aGlzLnN1cHBvcnRzUGFzc2l2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHsgZ2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH0gfSk7XG4gICAgfSBjYXRjaCAoZSkgeyByZXR1cm4gKCkgPT4ge307IH1cbiAgICB0aGlzLnN1cHBvcnRzUGFzc2l2ZSA9IGlzU3VwcG9ydGVkO1xuICAgIHJldHVybiB0aGlzLmFwcGx5UGFzc2l2ZSgpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5kcmF3ZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGVTaWRlTmF2KTtcblxuICAgIHRoaXMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcy5hcHBseVBhc3NpdmUoKSk7XG4gICAgdGhpcy5kcmF3ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgdGhpcy5hcHBseVBhc3NpdmUoKSk7XG4gICAgdGhpcy5kcmF3ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQpO1xuICB9XG5cbiAgdXBkYXRlID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS50b3VjaGluZ1NpZGVOYXYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpO1xuXG4gICAgY29uc3QgdHJhbnNsYXRlWCA9IE1hdGgubWluKDAsIHRoaXMuc3RhdGUuY3VycmVudFggLSB0aGlzLnN0YXRlLnN0YXJ0WCk7XG5cbiAgICBpZiAoIXRoaXMuc3RhdGUuaW5pdGlhbGlzZWREcmFnZ2luZyAmJiAodHJhbnNsYXRlWCA+IC1JTklUSUFURV9EUkFHR0lOR19USFJFU0hPTEQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN0YXRlLmluaXRpYWxpc2VkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpbml0aWFsaXNlZERyYWdnaW5nOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3ZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGVYfXB4KWA7XG4gIH1cblxuICBoaWRlU2lkZU5hdiA9IChldnQpID0+IHtcbiAgICBpZiAoZXZ0LnRhcmdldC5jb250YWlucyh0aGlzLmRyYXdlcikpIHtcbiAgICAgIHRoaXMucHJvcHMudG9nZ2xlRHJhd2VyKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtzWydkcmF3ZXItY29udGFpbmVyJ119ICR7dGhpcy5wcm9wcy5kcmF3ZXJPcGVuID8gcy5hY3RpdmUgOiAnJ31gfVxuICAgICAgICByZWY9eyhkaXYpID0+IHsgdGhpcy5kcmF3ZXJDb250YWluZXIgPSBkaXY7IH19XG4gICAgICA+XG4gICAgICAgIDxhc2lkZSBjbGFzc05hbWU9e3MuZHJhd2VyfSByZWY9eyhhc2lkZSkgPT4geyB0aGlzLmRyYXdlciA9IGFzaWRlOyB9fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snZHJhd2VyLWhvbWVDb250YWluZXInXX0+XG4gICAgICAgICAgICA8TGluayByb3V0ZT17Jy9hYm91dCd9PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzWydkcmF3ZXItaG9tZSddfSBcbiAgICAgICAgICAgICAgICAke3RoaXMucHJvcHMuYWN0aXZlUm91dGUgPT09ICcvYWJvdXQnID8gcy5hY3RpdmUgOiAnJ31gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTExIDE3aDJ2LTZoLTJ2NnptMS0xNUM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6TTExIDloMlY3aC0ydjJ6XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIEFib3V0XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxSaXBwbGUgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3BhZ2VMaXN0LXdyYXBwZXInXX0+XG4gICAgICAgICAgICA8UGFnZUxpc3RcbiAgICAgICAgICAgICAgaGFzRXJyb3JlZD17dGhpcy5wcm9wcy5oYXNFcnJvcmVkfVxuICAgICAgICAgICAgICBpc0xvYWRpbmc9e3RoaXMucHJvcHMuaXNMb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17dGhpcy5wcm9wcy5lbnRyaWVzfVxuICAgICAgICAgICAgICBhY3RpdmVQYWdlcz17dGhpcy5wcm9wcy5hY3RpdmVQYWdlc31cbiAgICAgICAgICAgICAgYWN0aXZlUm91dGU9e3RoaXMucHJvcHMuYWN0aXZlUm91dGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydkcmF3ZXItZm9vdGVyJ119PlxuICAgICAgICAgICAgey8qIDxBZCAvPiAqL31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hc2lkZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuXG5EcmF3ZXIucHJvcFR5cGVzID0ge1xuICBkcmF3ZXJPcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBlbnRyaWVzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgYWN0aXZlUGFnZXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICB0b2dnbGVEcmF3ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGhhc0Vycm9yZWQ6IFByb3BUeXBlcy5ib29sLFxuICBpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxuICBhY3RpdmVQYWdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBhY3RpdmVSb3V0ZTogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbkRyYXdlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGhhc0Vycm9yZWQ6IGZhbHNlLFxuICBpc0xvYWRpbmc6IGZhbHNlLFxuICBhY3RpdmVQYWdlOiBudWxsLFxuICBhY3RpdmVSb3V0ZTogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIGhhc0Vycm9yZWQ6IHN0YXRlLnBhZ2VMaXN0Lmhhc0Vycm9yZWQsXG4gICAgaXNMb2FkaW5nOiBzdGF0ZS5wYWdlTGlzdC5pc0xvYWRpbmcsXG4gICAgZW50cmllczogc3RhdGUucGFnZUxpc3QuZW50cmllcyxcbiAgICBhY3RpdmVQYWdlczogc3RhdGUucGFnZUxpc3QuYWN0aXZlUGFnZXMsXG4gICAgYWN0aXZlUGFnZTogc3RhdGUuYWN0aXZlUGFnZS5wYWdlLFxuICAgIGFjdGl2ZVJvdXRlOiBzdGF0ZS5hY3RpdmVQYWdlLnJvdXRlLFxuICAgIGN1cnJGaWx0ZXJzOiBzdGF0ZS5wYWdlTGlzdC5maWx0ZXJzLFxuICAgIGRyYXdlck9wZW46IHN0YXRlLnV0aWxzLmRyYXdlck9wZW4sXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgdG9nZ2xlRHJhd2VyOiAob3BlbikgPT4geyBkaXNwYXRjaCh0b2dnbGVEcmF3ZXIob3BlbikpOyB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXRjaERpc3BhdGNoVG9Qcm9wcykoRHJhd2VyKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvZHJhd2VyL2RyYXdlci5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5cbmltcG9ydCB7IHRvZ2dsZURyYXdlciwgdG9nZ2xlU2VhcmNoIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy91dGlscyc7XG5pbXBvcnQgeyBzZWFyY2ggfSBmcm9tICcuLi8uLi9hY3Rpb25zL3BhZ2UtbGlzdCc7XG5cbmltcG9ydCBIZWFkZXJJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1pY29uL2hlYWRlci1pY29uJztcbmltcG9ydCBTZWFyY2hJbnB1dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2hlYWRlci9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0JztcblxuaW1wb3J0IHMgZnJvbSAnLi9tYWluLWhlYWRlci5zY3NzJztcblxuY2xhc3MgTWFpbkhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZvY3VzZWQ6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBzZWFyY2hGb2N1c2VkID0gKGJvb2wpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlYXJjaEZvY3VzZWQ6IGJvb2wsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtzLmhlYWRlcn0gXG4gICAgICAgICR7dGhpcy5wcm9wcy5zZWFyY2hPcGVuID8gcy5zZWFyY2hPcGVuIDogJyd9XG4gICAgICAgICR7dGhpcy5wcm9wcy5zaG93V2F0ZXJmYWxsSGVhZGVyID8gcy53YXRlcmZhbGxPcGVuIDogJyd9XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWyd0aXRsZS1jb250YWluZXInXX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3RvZ2dsZS1jb250YWluZXInXX0+XG4gICAgICAgICAgICA8SGVhZGVySWNvblxuICAgICAgICAgICAgICBkcmF3ZXJPcGVuPXt0aGlzLnByb3BzLmRyYXdlck9wZW59XG4gICAgICAgICAgICAgIHNlYXJjaE9wZW49e3RoaXMucHJvcHMuc2VhcmNoT3Blbn1cbiAgICAgICAgICAgICAgdG9nZ2xlRHJhd2VyPXt0aGlzLnByb3BzLnRvZ2dsZURyYXdlcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLnRpdGxlfT5cbiAgICAgICAgICAgIEVDTUFTeW50YXhcbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17c1sndGl0bGUtZGV0YWlsJ119XG4gICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICAgICAgX19odG1sOiB0aGlzLnByb3BzLmFjdGl2ZVBhZ2VUaXRsZSA/XG4gICAgICAgICAgICAgICAgYCAmbmRhc2g7ICR7dGhpcy5wcm9wcy5hY3RpdmVQYWdlVGl0bGV9YFxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAnJyB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snc2VhcmNoLWNvbnRhaW5lciddfT5cbiAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPXtzWydzZWFyY2gtY29udGFpbmVyJ119PiAqL31cbiAgICAgICAgPFNlYXJjaElucHV0XG4gICAgICAgICAgY3VyclF1ZXJ5PXt0aGlzLnByb3BzLmN1cnJRdWVyeX1cbiAgICAgICAgICBzZWFyY2hPcGVuPXt0aGlzLnByb3BzLnNlYXJjaE9wZW59XG4gICAgICAgICAgc2VhcmNoPXt0aGlzLnByb3BzLnNlYXJjaH1cbiAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbk1haW5IZWFkZXIucHJvcFR5cGVzID0ge1xuICBkcmF3ZXJPcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBzZWFyY2hPcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjdXJyUXVlcnk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdG9nZ2xlRHJhd2VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBzZWFyY2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5NYWluSGVhZGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2V0QWN0aXZlUGFnZVRpdGxlOiBudWxsLFxufTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgZHJhd2VyT3Blbjogc3RhdGUudXRpbHMuZHJhd2VyT3BlbixcbiAgICBzZWFyY2hPcGVuOiBzdGF0ZS51dGlscy5zZWFyY2hPcGVuLFxuICAgIGN1cnJRdWVyeTogc3RhdGUucGFnZUxpc3QucXVlcnksXG4gICAgYWN0aXZlUGFnZVRpdGxlOiBzdGF0ZS5hY3RpdmVQYWdlLnRpdGxlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXRjaERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIHRvZ2dsZURyYXdlcjogKG9wZW4pID0+IHsgZGlzcGF0Y2godG9nZ2xlRHJhd2VyKG9wZW4pKTsgfSxcbiAgICBzZWFyY2g6IChxdWVyeSkgPT4geyBkaXNwYXRjaChzZWFyY2gocXVlcnkpKTsgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXRjaERpc3BhdGNoVG9Qcm9wcykoTWFpbkhlYWRlcikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb250YWluZXJzL2hlYWRlci9tYWluLWhlYWRlci5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5cbmltcG9ydCB7IHBvcFRvYXN0IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy91dGlscyc7XG5cbmltcG9ydCBzIGZyb20gJy4vdG9hc3QtbWFuYWdlci5zY3NzJztcblxuY2xhc3MgVG9hc3RNYW5hZ2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgdG9hc3Q6IHt9LFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMudG9hc3RzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl90cmlnZ2VyVG9hc3QobmV4dFByb3BzLnRvYXN0c1tuZXh0UHJvcHMudG9hc3RzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIF90cmlnZ2VyVG9hc3QodG9hc3QpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRvYXN0LFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgaWYgKHRvYXN0LnRpbWVvdXQpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jbG9zZVRvYXN0KCk7XG4gICAgICB9LCB0b2FzdC50aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBfY2xvc2VUb2FzdCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgfSk7XG4gICAgdGhpcy50b2FzdC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5fcmVtb3ZlVG9hc3QpO1xuICB9XG5cbiAgX3JlbW92ZVRvYXN0ID0gKCkgPT4ge1xuICAgIHRoaXMudG9hc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuX3JlbW92ZVRvYXN0KTtcbiAgICB0aGlzLnByb3BzLnBvcFRvYXN0KCk7XG4gIH1cblxuICBfaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5fY2xvc2VUb2FzdCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLnRvYXN0LmNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnN0YXRlLnRvYXN0LmNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1sndG9hc3QtY29udGFpbmVyJ119PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgJHtzWyd0b2FzdC13cmFwcGVyJ119ICR7dGhpcy5zdGF0ZS5hY3RpdmUgPyBzLmFjdGl2ZSA6ICcnfWB9XG4gICAgICAgICAgcmVmPXsoZGl2KSA9PiB7IHRoaXMudG9hc3QgPSBkaXY7IH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy50b2FzdH0+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e3MubWVzc2FnZX0+XG4gICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnRvYXN0Lm1lc3NhZ2VUZXh0fVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3MuYWN0aW9ufSBvbkNsaWNrPXt0aGlzLl9oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnRvYXN0LmFjdGlvblRleHR9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRvYXN0TWFuYWdlci5wcm9wVHlwZXMgPSB7XG4gIHRvYXN0czogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gIHBvcFRvYXN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgdG9hc3RzOiBzdGF0ZS51dGlscy50b2FzdHMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgcG9wVG9hc3Q6ICgpID0+IHsgZGlzcGF0Y2gocG9wVG9hc3QoKSk7IH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKShUb2FzdE1hbmFnZXIpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29udGFpbmVycy90b2FzdC1tYW5hZ2VyL3RvYXN0LW1hbmFnZXIuanN4IiwiY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBwYWdlOiBudWxsLFxuICByb3V0ZTogbnVsbCxcbiAgdGl0bGU6ICdMb2FkaW5nJyxcbiAgdHlwZTogbnVsbCxcbiAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgaGFzRXJyb3JlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnUEFHRV9FUlJPUic6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGhhc0Vycm9yZWQ6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnUEFHRV9MT0FESU5HJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ0FDVElWRV9QQUdFJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdBQ1RJVkVfUk9VVEUnOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICByb3V0ZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdBQ1RJVkVfUEFHRV9USVRMRSc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ0FDVElWRV9QQUdFX1RZUEUnOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvcmVkdWNlcnMvYWN0aXZlLXBhZ2UuanMiLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCBVdGlsUmVkdWNlciBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IFBhZ2VMaXN0UmVkdWNlciBmcm9tICcuL3BhZ2UtbGlzdCc7XHJcbmltcG9ydCBBY3RpdmVQYWdlUmVkdWNlciBmcm9tICcuL2FjdGl2ZS1wYWdlJztcclxuXHJcbmNvbnN0IGFsbFJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKFxyXG4gIHtcclxuICAgIHV0aWxzOiBVdGlsUmVkdWNlcixcclxuICAgIHBhZ2VMaXN0OiBQYWdlTGlzdFJlZHVjZXIsXHJcbiAgICBhY3RpdmVQYWdlOiBBY3RpdmVQYWdlUmVkdWNlcixcclxuICB9LFxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJpbXBvcnQgeyBUQUdHRURfSU4gfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGVudHJpZXM6IFtdLFxuICBpc0xvYWRpbmc6IGZhbHNlLFxuICBoYXNFcnJvcmVkOiBmYWxzZSxcbiAgYWN0aXZlUGFnZXM6IFtdLFxuICBmaWx0ZXJzOiBbXSxcbiAgcXVlcnk6ICcnLFxufTtcblxuY29uc3QgZmlsdGVyUGFnZXMgPSAoZmlsdGVycywgcGFnZXMpID0+IHtcbiAgbGV0IGZpbHRlcmVkUGFnZXMgPSBwYWdlcztcbiAgaWYgKGZpbHRlcnMubGVuZ3RoID4gMCkge1xuICAgIGZpbHRlcmVkUGFnZXMgPSBwYWdlcy5maWx0ZXIoKHBhZ2UpID0+IHtcbiAgICAgIHJldHVybiBmaWx0ZXJzLmluY2x1ZGVzKHBhZ2UuZmllbGRzLmNhdGVnb3J5LmZpZWxkcy5zcGVjaWZpY2F0aW9uLmZpZWxkcy5uYW1lKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZmlsdGVyZWRQYWdlcztcbn07XG5cbmNvbnN0IHF1ZXJ5UGFnZXMgPSAocXVlcnksIHBhZ2VzKSA9PiB7XG4gIGNvbnN0IHN5bnRheEVudHJpZXMgPSBwYWdlcztcbiAgbGV0IG1hdGNoZWRFbnRyaWVzID0gc3ludGF4RW50cmllcztcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRRdWVyeSA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgcmVnZXggPSBgXiR7VEFHR0VEX0lOfTooW14gXSopYDtcbiAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKHJlZ2V4LCAnZycpO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXhwLmV4ZWMoZm9ybWF0dGVkUXVlcnkpO1xuICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgbWF0Y2hlZEVudHJpZXMgPSBzeW50YXhFbnRyaWVzLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgICAgaWYgKCFlbnRyeS5maWVsZHMudGFncykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGVudHJ5LmZpZWxkcy50YWdzLmZpbHRlcigodGFnKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRhZy5maWVsZHMubmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5tYXRjaChtYXRjaFsxXSk7XG4gICAgICAgIH0pLmxlbmd0aCA+IDApO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0Y2hlZEVudHJpZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZWRFbnRyaWVzID0gc3ludGF4RW50cmllcy5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICAgIHJldHVybiAoKGVudHJ5LmZpZWxkcy5uYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLm1hdGNoKGZvcm1hdHRlZFF1ZXJ5LnRvTG93ZXJDYXNlKCkpKSk7IC8vIHx8XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaGVkRW50cmllcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtdO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ1BBR0VMSVNUX0VSUk9SJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgaGFzRXJyb3JlZDogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdQQUdFTElTVF9MT0FESU5HJzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1BBR0VMSVNUX0ZFVENIX1NVQ0NFU1MnOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBlbnRyaWVzOiBPYmplY3QudmFsdWVzKGFjdGlvbi5wYXlsb2FkKVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnU0VBUkNIX1FVRVJZJzoge1xuICAgICAgLy8gd2hpbGUgKHN0YXRlLmVudHJpZXMubGVuZ3RoIDwgMSkgeyB9XG4gICAgICBjb25zdCBhY3RpdmVQYWdlcyA9IGZpbHRlclBhZ2VzKHN0YXRlLmZpbHRlcnMsIHN0YXRlLmVudHJpZXMpO1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgcXVlcnk6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgIGFjdGl2ZVBhZ2VzOiBxdWVyeVBhZ2VzKGFjdGlvbi5wYXlsb2FkLCBhY3RpdmVQYWdlcyksXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdBRERfRklMVEVSJzoge1xuICAgICAgY29uc3QgYWN0aXZlUGFnZXMgPSBxdWVyeVBhZ2VzKHN0YXRlLnF1ZXJ5LCBzdGF0ZS5lbnRyaWVzKTtcbiAgICAgIGNvbnN0IG5ld0ZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzO1xuICAgICAgbmV3RmlsdGVycy5wdXNoKGFjdGlvbi5wYXlsb2FkKTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aXZlUGFnZXM6IGZpbHRlclBhZ2VzKG5ld0ZpbHRlcnMsIGFjdGl2ZVBhZ2VzKSxcbiAgICAgICAgICBmaWx0ZXJzOiBuZXdGaWx0ZXJzLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnUkVNT1ZFX0ZJTFRFUic6IHtcbiAgICAgIGNvbnN0IGZpbHRlciA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgY29uc3QgbmV3RmlsdGVycyA9IHN0YXRlLmZpbHRlcnM7XG4gICAgICBjb25zdCBhY3RpdmVQYWdlcyA9IHF1ZXJ5UGFnZXMoc3RhdGUucXVlcnksIHN0YXRlLmVudHJpZXMpO1xuICAgICAgbmV3RmlsdGVycy5zcGxpY2UobmV3RmlsdGVycy5pbmRleE9mKGZpbHRlciksIDEpO1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBhY3RpdmVQYWdlczogZmlsdGVyUGFnZXMobmV3RmlsdGVycywgYWN0aXZlUGFnZXMpLFxuICAgICAgICAgIGZpbHRlcnM6IG5ld0ZpbHRlcnMsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L3JlZHVjZXJzL3BhZ2UtbGlzdC5qcyIsImNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZHJhd2VyT3BlbjogZmFsc2UsXG4gIHNlYXJjaE9wZW46IGZhbHNlLFxuICB3YXRlcmZhbGxIZWFkZXJPcGVuOiBmYWxzZSxcbiAgdG9hc3RzOiBbXSxcbiAgcHJvZ3Jlc3M6IDAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnVE9HR0xFX0RSQVdFUic6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIGRyYXdlck9wZW46IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnVE9HR0xFX1NFQVJDSCc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHNlYXJjaE9wZW46IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSAnVE9HR0xFX1dBVEVSRkFMTF9IRUFERVInOiB7XG4gICAgICBpZiAoYWN0aW9uLnBheWxvYWQgJiYgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIpIGFjdGlvbi5wYXlsb2FkID0gdHJ1ZTsgIFxuICAgICAgXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICB3YXRlcmZhbGxIZWFkZXJPcGVuOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1BVU0hfVE9BU1QnOiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICB0b2FzdHM6IFsuLi5zdGF0ZS50b2FzdHMsIGFjdGlvbi5wYXlsb2FkXSxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1BPUF9UT0FTVCc6IHtcbiAgICAgIGNvbnN0IGFyciA9IFsuLi5zdGF0ZS50b2FzdHNdO1xuICAgICAgYXJyLnNoaWZ0KCk7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICB0b2FzdHM6IGFycixcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ1BST0dSRVNTX1VQREFURSc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmVzczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9yZWR1Y2Vycy91dGlscy5qcyIsImltcG9ydCBleHByZXNzICAgICAgICAgICAgICAgIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgY29udGVudGZ1bCAgICAgICAgZnJvbSAnY29udGVudGZ1bCc7XG5pbXBvcnQgY3J5cHRvICAgICAgICAgICAgICAgICBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IG1hcmtlZCAgICAgICAgICAgICAgICAgZnJvbSAnbWFya2VkJztcbmltcG9ydCB7IHNwYWNlLCBhY2Nlc3NUb2tlbiB9IGZyb20gJy4uLy4uL2NyZWRlbnRpYWxzJztcblxuY29uc3QgY29udGVudGZ1bENsaWVudCA9IGNvbnRlbnRmdWwuY3JlYXRlQ2xpZW50KHtcbiAgc3BhY2UsXG4gIGFjY2Vzc1Rva2VuLFxufSk7XG5cbmNvbnN0IGxvYWRBcnRpY2xlcyA9IGFzeW5jICgpID0+IHtcbiB0cnkge1xuICAgY29uc3QgZW50cmllcyA9IGF3YWl0IGNvbnRlbnRmdWxDbGllbnQuZ2V0RW50cmllcyh7XG4gICAgICAgY29udGVudF90eXBlOiAnc3ludGF4RW50cnknLFxuICAgICAgIHNlbGVjdDogXCJzeXMuaWQsc3lzLnVwZGF0ZWRBdCxmaWVsZHMubmFtZSxmaWVsZHMudGFncyxmaWVsZHMuY2F0ZWdvcnlcIixcbiAgICAgICBpbmNsdWRlOiAyLFxuICAgICB9KTtcblxuICAgY29uc3QgbGlua2VkRW50cmllcyA9IE9iamVjdC5hc3NpZ24oe30sIGVudHJpZXMuaXRlbXMpO1xuICAgY29uc3QgaW5jbHVkZXMgPSBlbnRyaWVzLmluY2x1ZGVzLkVudHJ5O1xuICAgIFxuICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKTtcbiAgIE9iamVjdC5rZXlzKGxpbmtlZEVudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICBjb25zdCBlbnRyeSA9IGxpbmtlZEVudHJpZXNba2V5XTtcbiAgICAgbGlua0VudHJ5KGluY2x1ZGVzLCBlbnRyeSwgJ2NhdGVnb3J5Jyk7XG4gICAgIGxpbmtFbnRyeShpbmNsdWRlcywgZW50cnkuZmllbGRzLmNhdGVnb3J5LCAnc3BlY2lmaWNhdGlvbicpO1xuXG4gICAgIGNvbnN0IGNhdGVnb3J5ID0gZW50cnkuZmllbGRzLmNhdGVnb3J5O1xuICAgICBjb25zdCBzcGVjaWZpY2F0aW9uID0gY2F0ZWdvcnkuZmllbGRzLnNwZWNpZmljYXRpb25cbiAgICAgY29uc3Qgcm91dGUgPSBgL3BhZ2VzLyR7c3BlY2lmaWNhdGlvbi5maWVsZHMubmFtZX0vJHtjYXRlZ29yeS5maWVsZHMubmFtZX0vJHtlbnRyeS5maWVsZHMubmFtZX1gO1xuXG4gICAgIGVudHJ5LmZpZWxkcy5yb3V0ZSA9IGVuY29kZVVSSShyb3V0ZSk7XG4gICAgIGhhc2gudXBkYXRlKGVudHJ5LnN5cy5pZCk7XG4gICB9KVxuXG4gICBjb25zdCBpZCA9IGhhc2guZGlnZXN0KCdoZXgnKTtcblxuICAgcmV0dXJuIHtcbiAgICBzeXM6IHtcbiAgICAgIGlkXG4gICAgfSxcbiAgICBmaWVsZHM6IGxpbmtlZEVudHJpZXMsXG4gICB9O1xuIH1cbiBjYXRjaCAoZSkge1xuICAgY29uc29sZS5sb2coZSk7XG4gfVxufVxuXG5jb25zdCBmZXRjaFBhZ2UgPSBhc3luYyAocmVxKSA9PiB7XG4gY29uc3QgcGFnZU5hbWUgPSBkZWNvZGVVUkkocmVxLnBhcmFtcy5wYWdlSWQpO1xuXG4gLy8gdGhlIHBhZ2UgbmFtZSBhY3RzIGFzIGEgcHJpbWFyeSBrZXkgc28gd2UgY2FuIHF1ZXJ5IHVzaW5nIGl0IGFzIHRoZSBvbmx5IHBhcmFtZXRlclxuIGNvbnN0IGVudHJpZXMgPSBhd2FpdCBjb250ZW50ZnVsQ2xpZW50LmdldEVudHJpZXMoe1xuICAgY29udGVudF90eXBlOiAnc3ludGF4RW50cnknLFxuICAgJ2ZpZWxkcy5uYW1lJzogcGFnZU5hbWUsXG4gfSlcblxuIGNvbnN0IGVudHJ5ID0gZW50cmllcy5pdGVtc1swXTtcbiBlbnRyeS5maWVsZHMuYmxvYiA9IG1hcmtlZChlbnRyeS5maWVsZHMuYmxvYilcbiByZXR1cm4gZW50cnk7XG59XG5cbmNvbnN0IGxpbmtFbnRyeSA9IChpbmNsdWRlcywgZW50cnksIHBhcmFtKSA9PiB7XG4gIGVudHJ5LmZpZWxkc1twYXJhbV0gPSBpbmNsdWRlcy5maW5kKChpbmNsdWRlKSA9PiB7XG4gICAgcmV0dXJuIGluY2x1ZGUuc3lzLmlkID09PSBlbnRyeS5maWVsZHNbcGFyYW1dLnN5cy5pZFxuICB9KTtcbn1cblxuY29uc3QgYXBpUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuYXBpUm91dGVyLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICByZXMuc2VuZCgnZWNtYXN5bnRheC5pbyBBUEknKTtcbn0pXG5cbmFwaVJvdXRlci5nZXQoJy9wYWdlcycsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBwYWdlcyA9IGF3YWl0IGxvYWRBcnRpY2xlcygpO1xuICByZXMuc2VuZChKU09OLnN0cmluZ2lmeShwYWdlcykpO1xufSk7XG5cbmFwaVJvdXRlci5nZXQoJy9wYWdlcy86c3BlY0lkLzpjYXRJZC86cGFnZUlkJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IGFydGljbGUgPSBhd2FpdCBmZXRjaFBhZ2UocmVxLCByZXMpXG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKGFydGljbGUpOyAgXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcGlSb3V0ZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci9hcGkuanMiLCJpbXBvcnQgZXhwcmVzcyAgICAgICAgICAgICAgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZnMgICAgICAgICAgICAgICAgICAgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggICAgICAgICAgICAgICAgIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNyeXB0byAgICAgICAgICAgICAgIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgc3RhdGljTW9kdWxlICAgICAgICAgZnJvbSAnc3RhdGljLW1vZHVsZSc7XG5pbXBvcnQgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzICAgICAgICAgICAgZnJvbSAncHJvcC10eXBlcyc7IFxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSAgICAgIGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgUHJvdmlkZXIgfSAgICAgICAgIGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSAgIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInXG5cbmltcG9ydCB7IFJVTlRJTUVfQ0FDSEUgfSAgZnJvbSAnLi4vY2xpZW50L3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgbWFuaWZlc3QgICAgICAgICAgIGZyb20gJy4uLy4uL2Rpc3QvY2xpZW50L3N0YXRpYy9qcy9tYW5pZmVzdC5qc29uJztcbmltcG9ydCBBcHAgICAgICAgICAgICAgICAgZnJvbSAnLi4vY2xpZW50L2FwcCc7XG5pbXBvcnQgYWxsUmVkdWNlcnMgICAgICAgIGZyb20gJy4uL2NsaWVudC9yZWR1Y2Vycy9pbmRleCc7XG5cbmNvbnN0IENvbnRleHRUeXBlID0ge1xuICBpbnNlcnRDc3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5mdW5jdGlvbiByZW5kZXJTZXJ2ZXJTaWRlKHJlcSwgcmVzKSB7XG4gIFxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKGFsbFJlZHVjZXJzKTtcblxuICAvLyBDcml0aWNhbCBwYXRoIENTUyByZW5kZXJpbmdcbiAgY29uc3QgY3NzID0gbmV3IFNldCgpOyAvLyBDU1MgZm9yIGFsbCByZW5kZXJlZCBSZWFjdCBjb21wb25lbnRzXG4gIGNvbnN0IGNvbnRleHQgPSB7IGluc2VydENzczogKC4uLnN0eWxlcykgPT4ge1xuICAgIHN0eWxlcy5mb3JFYWNoKChzdHlsZSkgPT4geyBjc3MuYWRkKHN0eWxlLl9nZXRDc3MoKSk7IH0pO1xuICB9IH07XG5cbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPEFwcCBjb250ZXh0PXtjb250ZXh0fT48L0FwcD5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuXG4gIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKVxuICBcbiAgcmVuZGVyRnVsbFBhZ2UocmVzLCBodG1sLCBjc3MsIHByZWxvYWRlZFN0YXRlKTsgXG59XG5cbmZ1bmN0aW9uIHJlbmRlckZ1bGxQYWdlKHJlcywgaHRtbCA9IGZhbHNlLCBjc3MgPSBmYWxzZSwgcHJlbG9hZGVkU3RhdGUgPSBmYWxzZSkge1xuICByZXMuc2VuZChgXG4gICAgPGh0bWw+XG4gICAgICA8aGVhZD5cbiAgICAgICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XG4gICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJ4LXVhLWNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIj5cblxuICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzozMDAsNDAwLDUwMFwiIHJlbD1cInByZWxvYWRcIiBhcz1cInN0eWxlXCIgY3Jvc3NvcmlnaW4gb25sb2FkPVwidGhpcy5yZWw9J3N0eWxlc2hlZXQnXCI+XG4gICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPVwiL3N0YXRpYy9pY29ucy9mYXZpY29uLmljb1wiPlxuICAgICAgICA8bGluayByZWw9XCJtYW5pZmVzdFwiIGhyZWY9XCIvbWFuaWZlc3QuanNvblwiPlxuICAgICAgICAke2NzcyA/IFxuICAgICAgICBgPHN0eWxlIGlkPVwiY3JpdGljYWwtY3NzXCI+XG4gICAgICAgICAgJHtbLi4uY3NzXS5qb2luKCcnKS5yZXBsYWNlKC8oXFxyXFxufFxcbnxcXHIpL2dtLFwiXCIpfVxuICAgICAgICA8L3N0eWxlPmBcbiAgICAgICAgOlxuICAgICAgICAnJ1xuICAgICAgICB9XG4gICAgICA8L2hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgICAgJHtodG1sID9cbiAgICAgICAgYDxkaXYgaWQ9XCJyb290XCI+PGRpdj4ke2h0bWx9PC9kaXY+PC9kaXY+YFxuICAgICAgICA6XG4gICAgICAgICc8ZGl2IGlkPVwicm9vdFwiPjwvZGl2PidcbiAgICAgICAgfVxuICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgIGlmIChuYXZpZ2F0b3Iuc2VydmljZVdvcmtlcikge1xuICAgICAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpO1xuICAgICAgICAgIH1cbiAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgICR7cHJlbG9hZGVkU3RhdGUgPyBcbiAgICAgICAgYDxzY3JpcHQ+XG4gICAgICAgICAgLy8gaHR0cDovL3JlZHV4LmpzLm9yZy9kb2NzL3JlY2lwZXMvU2VydmVyUmVuZGVyaW5nLmh0bWwjc2VjdXJpdHktY29uc2lkZXJhdGlvbnNcbiAgICAgICAgICB3aW5kb3cuX19QUkVMT0FERURfU1RBVEVfXyA9ICR7SlNPTi5zdHJpbmdpZnkocHJlbG9hZGVkU3RhdGUpLnJlcGxhY2UoLzwvZywgJ1xcXFx1MDAzYycpfVxuICAgICAgICA8L3NjcmlwdD5gXG4gICAgICAgIDpcbiAgICAgICAgJydcbiAgICAgICAgfVxuICAgICAgICA8c2NyaXB0IHNyYz1cIiR7bWFuaWZlc3RbJ3ZlbmRvci5qcyddfVwiPjwvc2NyaXB0PlxuICAgICAgICA8c2NyaXB0IHNyYz1cIiR7bWFuaWZlc3RbJ2FwcC5qcyddfVwiPjwvc2NyaXB0PlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYCk7XG59XG5cbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnJvdXRlci5nZXQoJy9zdy5qcycsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuXG4gIGNvbnN0IGlucHV0ID0gZnMuY3JlYXRlUmVhZFN0cmVhbShwYXRoLmpvaW4oJ2Rpc3QnLCAnY2xpZW50JywgJ3N3LmpzJykpO1xuXG4gIGxldCBwcmVjYWNoZWFzc2V0c1RvQ2FjaGUgPSBPYmplY3QudmFsdWVzKG1hbmlmZXN0KTtcblxuICBjb25zdCBwcmVjYWNoZUhhc2ggID0gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpO1xuXG4gIGZvciAobGV0IGFzc2V0IG9mIHByZWNhY2hlYXNzZXRzVG9DYWNoZSkge1xuICAgIHByZWNhY2hlSGFzaC51cGRhdGUoYXNzZXQpO1xuICB9ICAgIFxuXG4gIGNvbnN0IHByZWNhY2hlRGlnZXN0ICA9IHByZWNhY2hlSGFzaC5kaWdlc3QoJ2hleCcpO1xuXG4gIHJlcy5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0Jyk7ICBcbiAgaW5wdXQucGlwZShcbiAgICBzdGF0aWNNb2R1bGUoe1xuICAgICAgJ3N0YXRpYy1wcmVjYWNoZS12ZXJzaW9uJzogKCkgPT4gSlNPTi5zdHJpbmdpZnkocHJlY2FjaGVEaWdlc3QpLFxuICAgICAgJ3N0YXRpYy1wcmVjYWNoZSc6ICgpID0+IEpTT04uc3RyaW5naWZ5KHByZWNhY2hlYXNzZXRzVG9DYWNoZSksXG4gICAgICAnc3RhdGljLXJ1bnRpbWUnOiAoKSA9PiBKU09OLnN0cmluZ2lmeShSVU5USU1FX0NBQ0hFKSxcbiAgICB9KVxuICApLnBpcGUocmVzKTtcbn0pO1xuXG5yb3V0ZXIudXNlKCcvc3RhdGljL2pzJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHsgIFxuICAgIC8vIGd6aXAgdGhlIG1haW4gY2h1bmtzXG4gICAgaWYgKHJlcS51cmwuc3RhcnRzV2l0aCgnL2FwcCcpIHx8IHJlcS51cmwuc3RhcnRzV2l0aCgnL3ZlbmRvcicpKSB7ICBcbiAgICAgIHJlcS51cmwgKz0gJy5neic7XG4gICAgICByZXMuc2V0KCdDb250ZW50LUVuY29kaW5nJywgJ2d6aXAnKTtcbiAgICB9XG4gICAgcmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICdtYXgtYWdlPTMxNTM2MDAwJyk7ICAgIFxuICB9XG4gIG5leHQoKTtcbn0pO1xuXG5yb3V0ZXIudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbignZGlzdCcsICdjbGllbnQnKSkpO1xuXG5yb3V0ZXIudXNlKChyZXEsIHJlcykgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgcmVuZGVyU2VydmVyU2lkZShyZXEsIHJlcyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaW4gZGV2ZWxvcG1lbnQsIGRvbnQgZG8gc2VydmVyIHNpZGUgcmVuZGVyaW5nXG4gICAgcmVuZGVyRnVsbFBhZ2UocmVzKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIvcm91dGVzLmpzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnJpcHBsZV9yaXBwbGUtY29udGFpbmVyX21aTyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcblxcbi5yaXBwbGVfcmlwcGxlLWNvbnRhaW5lcl9tWk86aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNTUsIDE1NSwgMTU1LCAuMTMpOyB9XFxuXFxuLnJpcHBsZV9yaXBwbGUtb3JpZ2luXzNFSCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiA5OTk5OTk5O1xcbiAgYmFja2dyb3VuZDogcmdiYSgxNTUsIDE1NSwgMTU1LCAuMyk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTsgfVxcblxcbi5yaXBwbGVfcmlwcGxlLW9yaWdpbl8zRUgucmlwcGxlX2FuaW1hdGFibGVfM0EwIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjZzIGVhc2UtaW4sIC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC42cyBlYXNlLWluLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGVhc2UtaW47XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLCBvcGFjaXR5IDAuNnMgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4sIG9wYWNpdHkgMC42cyBlYXNlLWluLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGVhc2UtaW47IH1cXG5cXG4ucmlwcGxlX3JpcHBsZS1vcmlnaW5fM0VILnJpcHBsZV9vdXRfM1cwIHtcXG4gIG9wYWNpdHk6IDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyaXBwbGUtY29udGFpbmVyXCI6IFwicmlwcGxlX3JpcHBsZS1jb250YWluZXJfbVpPXCIsXG5cdFwicmlwcGxlLW9yaWdpblwiOiBcInJpcHBsZV9yaXBwbGUtb3JpZ2luXzNFSFwiLFxuXHRcImFuaW1hdGFibGVcIjogXCJyaXBwbGVfYW5pbWF0YWJsZV8zQTBcIixcblx0XCJvdXRcIjogXCJyaXBwbGVfb3V0XzNXMFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbW9uL3JpcHBsZS9yaXBwbGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGNhdGVnb3J5LXNlY3Rpb25fZmFkZUluXzJMUSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBjYXRlZ29yeS1zZWN0aW9uX2ZhZGVJbl8yTFEge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBjYXRlZ29yeS1zZWN0aW9uX2ZseUluRnJvbUxlZnRfMWEtIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgY2F0ZWdvcnktc2VjdGlvbl9mbHlJbkZyb21MZWZ0XzFhLSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG4uY2F0ZWdvcnktc2VjdGlvbl9jYXRlZ29yeVNlY3Rpb25fMTBvIHtcXG4gIHBhZGRpbmc6IDhweCAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzMjQwNDc7IH1cXG5cXG4uY2F0ZWdvcnktc2VjdGlvbl9jYXRlZ29yeVNlY3Rpb24taGVhZGVyXzFOYyB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogY2F0ZWdvcnktc2VjdGlvbl9mbHlJbkZyb21MZWZ0XzFhLSAwLjZzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogY2F0ZWdvcnktc2VjdGlvbl9mbHlJbkZyb21MZWZ0XzFhLSAwLjZzIDE7XFxuICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICAgICAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHBhZGRpbmc6IDhweCAyNHB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgY29sb3I6IHNpbHZlcjtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC5jYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbi1oZWFkZXJfMU5jIC5jYXRlZ29yeS1zZWN0aW9uX2NoZXZyb25fMkx0IHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuMnMgbGluZWFyO1xcbiAgICB0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjJzIGxpbmVhcjtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgbGluZWFyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBsaW5lYXIsIC13ZWJraXQtdHJhbnNmb3JtIDAuMnMgbGluZWFyO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XFxuXFxuLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uLWJvZHlfM1NNIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBjYXRlZ29yeS1zZWN0aW9uX2ZseUluRnJvbUxlZnRfMWEtIDAuNHMgMTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBjYXRlZ29yeS1zZWN0aW9uX2ZseUluRnJvbUxlZnRfMWEtIDAuNHMgMTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcblxcbi5jYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbl8xMG8uY2F0ZWdvcnktc2VjdGlvbl9oaWRkZW5fMnNmIHtcXG4gIHBhZGRpbmctYm90dG9tOiAwcHg7IH1cXG4gIC5jYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbl8xMG8uY2F0ZWdvcnktc2VjdGlvbl9oaWRkZW5fMnNmIC5jYXRlZ29yeS1zZWN0aW9uX2NoZXZyb25fMkx0IHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKTsgfVxcbiAgLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uXzEwby5jYXRlZ29yeS1zZWN0aW9uX2hpZGRlbl8yc2YgLmNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uLWJvZHlfM1NNIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5jYXRlZ29yeS1zZWN0aW9uX3BhZ2VMaXN0LWl0ZW1fM3Q0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAwcHggMzJweCAwcHggMzJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4xcyBsaW5lYXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgLjFzIGxpbmVhcjsgfVxcblxcbi5jYXRlZ29yeS1zZWN0aW9uX3BhZ2VMaXN0LWl0ZW1fM3Q0LmNhdGVnb3J5LXNlY3Rpb25fYWN0aXZlXzI1VSB7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgY29sb3I6ICMwMGI0YTI7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJjYXRlZ29yeVNlY3Rpb25cIjogXCJjYXRlZ29yeS1zZWN0aW9uX2NhdGVnb3J5U2VjdGlvbl8xMG9cIixcblx0XCJjYXRlZ29yeVNlY3Rpb24taGVhZGVyXCI6IFwiY2F0ZWdvcnktc2VjdGlvbl9jYXRlZ29yeVNlY3Rpb24taGVhZGVyXzFOY1wiLFxuXHRcImZseUluRnJvbUxlZnRcIjogXCJjYXRlZ29yeS1zZWN0aW9uX2ZseUluRnJvbUxlZnRfMWEtXCIsXG5cdFwiY2hldnJvblwiOiBcImNhdGVnb3J5LXNlY3Rpb25fY2hldnJvbl8yTHRcIixcblx0XCJjYXRlZ29yeVNlY3Rpb24tYm9keVwiOiBcImNhdGVnb3J5LXNlY3Rpb25fY2F0ZWdvcnlTZWN0aW9uLWJvZHlfM1NNXCIsXG5cdFwiaGlkZGVuXCI6IFwiY2F0ZWdvcnktc2VjdGlvbl9oaWRkZW5fMnNmXCIsXG5cdFwicGFnZUxpc3QtaXRlbVwiOiBcImNhdGVnb3J5LXNlY3Rpb25fcGFnZUxpc3QtaXRlbV8zdDRcIixcblx0XCJhY3RpdmVcIjogXCJjYXRlZ29yeS1zZWN0aW9uX2FjdGl2ZV8yNVVcIixcblx0XCJmYWRlSW5cIjogXCJjYXRlZ29yeS1zZWN0aW9uX2ZhZGVJbl8yTFFcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL2RyYXdlci9wYWdlLWxpc3QvY2F0ZWdvcnktc2VjdGlvbi9jYXRlZ29yeS1zZWN0aW9uLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBwYWdlLWxpc3RfZmFkZUluXzNXcyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBwYWdlLWxpc3RfZmFkZUluXzNXcyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHBhZ2UtbGlzdF9mbHlJbkZyb21MZWZ0XzFPVCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHBhZ2UtbGlzdF9mbHlJbkZyb21MZWZ0XzFPVCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG4ucGFnZS1saXN0X3BhZ2VsaXN0LXdyYXBwZXJfMUJDIHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnBhZ2UtbGlzdF9ub1Jlc3VsdHNfMVI5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBwYWdlLWxpc3RfZmFkZUluXzNXcyAwLjZzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogcGFnZS1saXN0X2ZhZGVJbl8zV3MgMC42cyAxOyB9XFxuXFxuLnBhZ2UtbGlzdF9ub1Jlc3VsdHMtY29weV8yQmcge1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgLjYpOyB9XFxuXFxuLnBhZ2UtbGlzdF9ub1Jlc3VsdHMtY29weV8yQmcgaSB7XFxuICBwYWRkaW5nLXJpZ2h0OiA0cHg7IH1cXG5cXG4ucGFnZS1saXN0X25vUmVzdWx0cy1jb3B5XzJCZyBzcGFuIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm90dG9tOiA1cHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJwYWdlbGlzdC13cmFwcGVyXCI6IFwicGFnZS1saXN0X3BhZ2VsaXN0LXdyYXBwZXJfMUJDXCIsXG5cdFwibm9SZXN1bHRzXCI6IFwicGFnZS1saXN0X25vUmVzdWx0c18xUjlcIixcblx0XCJmYWRlSW5cIjogXCJwYWdlLWxpc3RfZmFkZUluXzNXc1wiLFxuXHRcIm5vUmVzdWx0cy1jb3B5XCI6IFwicGFnZS1saXN0X25vUmVzdWx0cy1jb3B5XzJCZ1wiLFxuXHRcImZseUluRnJvbUxlZnRcIjogXCJwYWdlLWxpc3RfZmx5SW5Gcm9tTGVmdF8xT1RcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL2RyYXdlci9wYWdlLWxpc3QvcGFnZS1saXN0LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBoZWFkZXItaWNvbl9mYWRlSW5fMzN6IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGhlYWRlci1pY29uX2ZhZGVJbl8zM3oge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBoZWFkZXItaWNvbl9mbHlJbkZyb21MZWZ0XzFsZSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGhlYWRlci1pY29uX2ZseUluRnJvbUxlZnRfMWxlIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBoZWFkZXItaWNvbl9ncm93XzJJQSB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgaGVhZGVyLWljb25fZ3Jvd18ySUEge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uaGVhZGVyLWljb25faGVhZGVyLWljb25fMVFzIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogOTg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiBub25lOyB9XFxuXFxuLmhlYWRlci1pY29uX2ljb24tY29udGFpbmVyXzNKZSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgLmhlYWRlci1pY29uX21lbnVJY29uXzFwYS5oZWFkZXItaWNvbl9zZWFyY2hPcGVuXzFCRiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblxcbi5oZWFkZXItaWNvbl9iYWNrSWNvbl8yRXQge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5oZWFkZXItaWNvbl9iYWNrSWNvbl8yRXQuaGVhZGVyLWljb25fc2VhcmNoT3Blbl8xQkYge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGhlYWRlci1pY29uX2dyb3dfMklBIDAuMnMgMTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBoZWFkZXItaWNvbl9ncm93XzJJQSAwLjJzIDE7XFxuICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuaGVhZGVyLWljb25fYmFja0ljb25fMkV0LmhlYWRlci1pY29uX3NlYXJjaE9wZW5fMUJGIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiaGVhZGVyLWljb25cIjogXCJoZWFkZXItaWNvbl9oZWFkZXItaWNvbl8xUXNcIixcblx0XCJpY29uLWNvbnRhaW5lclwiOiBcImhlYWRlci1pY29uX2ljb24tY29udGFpbmVyXzNKZVwiLFxuXHRcIm1lbnVJY29uXCI6IFwiaGVhZGVyLWljb25fbWVudUljb25fMXBhXCIsXG5cdFwic2VhcmNoT3BlblwiOiBcImhlYWRlci1pY29uX3NlYXJjaE9wZW5fMUJGXCIsXG5cdFwiYmFja0ljb25cIjogXCJoZWFkZXItaWNvbl9iYWNrSWNvbl8yRXRcIixcblx0XCJncm93XCI6IFwiaGVhZGVyLWljb25fZ3Jvd18ySUFcIixcblx0XCJmYWRlSW5cIjogXCJoZWFkZXItaWNvbl9mYWRlSW5fMzN6XCIsXG5cdFwiZmx5SW5Gcm9tTGVmdFwiOiBcImhlYWRlci1pY29uX2ZseUluRnJvbUxlZnRfMWxlXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9jbGllbnQvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWljb24vaGVhZGVyLWljb24uc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIHNlYXJjaC1pbnB1dF9mYWRlSW5fUXQtIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNlYXJjaC1pbnB1dF9mYWRlSW5fUXQtIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2VhcmNoLWlucHV0X2ZseUluRnJvbUxlZnRfMjZRIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgc2VhcmNoLWlucHV0X2ZseUluRnJvbUxlZnRfMjZRIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbi5zZWFyY2gtaW5wdXRfc2VhcmNoLWxhYmVsXzI1SyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgd2lkdGg6IDI0cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4xcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcblxcbi5zZWFyY2gtaW5wdXRfaWNvbi1jb250YWluZXJfMmRSIHtcXG4gIGJhY2tncm91bmQ6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGNvbG9yOiAjZmZmOyB9XFxuXFxuLnNlYXJjaC1pbnB1dF9zZWFyY2gtaWNvbl9WaVAge1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgd2lkdGg6IDI0cHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuXFxuLnNlYXJjaC1pbnB1dF9zZWFyY2gtY2xvc2VJY29uXzNOaiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5zZWFyY2gtaW5wdXRfc2VhcmNoLWNsb3NlSWNvbl8zTmogaSB7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gICAgZm9udC1zaXplOiAyMHB4OyB9XFxuXFxuLnNlYXJjaC1pbnB1dF9zZWFyY2gtaW5wdXQtLWNvbnRhaW5lcl8xY04ge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzMjQwNDc7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgbWFyZ2luLWxlZnQ6IDhweDsgfVxcblxcbi5zZWFyY2gtaW5wdXRfc2VhcmNoLWlucHV0LS1jb250YWluZXJfMWNOOjphZnRlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAtMXB4O1xcbiAgbGVmdDogMHB4O1xcbiAgaGVpZ2h0OiAycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgd2lkdGg6IDEwcHg7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuXFxuLnNlYXJjaC1pbnB1dF9zZWFyY2gtaW5wdXRfMU1QIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMzBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDRweCAyOHB4IDRweCA0cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG4gIGNvbG9yOiAjZmZmOyB9XFxuXFxuLnNlYXJjaC1pbnB1dF9zZWFyY2gtbGFiZWxfMjVLLnNlYXJjaC1pbnB1dF9vcGVuZWRfQV9xIHtcXG4gIHdpZHRoOiAzNjBweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtaW5wdXRfc2VhcmNoLWxhYmVsXzI1Sy5zZWFyY2gtaW5wdXRfb3BlbmVkX0FfcSB7XFxuICAgICAgd2lkdGg6IDEwMCU7IH0gfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtaW5wdXRfc2VhcmNoLWxhYmVsXzI1Sy5zZWFyY2gtaW5wdXRfb3BlbmVkX0FfcSAuc2VhcmNoLWlucHV0X3NlYXJjaC1pbnB1dC0tY29udGFpbmVyXzFjTiB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IDA7IH0gfVxcbiAgLnNlYXJjaC1pbnB1dF9zZWFyY2gtbGFiZWxfMjVLLnNlYXJjaC1pbnB1dF9vcGVuZWRfQV9xIC5zZWFyY2gtaW5wdXRfc2VhcmNoLWNsb3NlSWNvbl8zTmoge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1pbnB1dF9zZWFyY2gtbGFiZWxfMjVLLnNlYXJjaC1pbnB1dF9vcGVuZWRfQV9xIC5zZWFyY2gtaW5wdXRfc2VhcmNoLXNlYXJjaEljb25fMXZRIHtcXG4gICAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG4uc2VhcmNoLWlucHV0X3NlYXJjaC1sYWJlbF8yNUsuc2VhcmNoLWlucHV0X2ZvY3VzZWRfMUhQIC5zZWFyY2gtaW5wdXRfc2VhcmNoLWlucHV0LS1jb250YWluZXJfMWNOOjphZnRlciB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJzZWFyY2gtbGFiZWxcIjogXCJzZWFyY2gtaW5wdXRfc2VhcmNoLWxhYmVsXzI1S1wiLFxuXHRcImljb24tY29udGFpbmVyXCI6IFwic2VhcmNoLWlucHV0X2ljb24tY29udGFpbmVyXzJkUlwiLFxuXHRcInNlYXJjaC1pY29uXCI6IFwic2VhcmNoLWlucHV0X3NlYXJjaC1pY29uX1ZpUFwiLFxuXHRcInNlYXJjaC1jbG9zZUljb25cIjogXCJzZWFyY2gtaW5wdXRfc2VhcmNoLWNsb3NlSWNvbl8zTmpcIixcblx0XCJzZWFyY2gtaW5wdXQtLWNvbnRhaW5lclwiOiBcInNlYXJjaC1pbnB1dF9zZWFyY2gtaW5wdXQtLWNvbnRhaW5lcl8xY05cIixcblx0XCJzZWFyY2gtaW5wdXRcIjogXCJzZWFyY2gtaW5wdXRfc2VhcmNoLWlucHV0XzFNUFwiLFxuXHRcIm9wZW5lZFwiOiBcInNlYXJjaC1pbnB1dF9vcGVuZWRfQV9xXCIsXG5cdFwic2VhcmNoLXNlYXJjaEljb25cIjogXCJzZWFyY2gtaW5wdXRfc2VhcmNoLXNlYXJjaEljb25fMXZRXCIsXG5cdFwiZm9jdXNlZFwiOiBcInNlYXJjaC1pbnB1dF9mb2N1c2VkXzFIUFwiLFxuXHRcImZhZGVJblwiOiBcInNlYXJjaC1pbnB1dF9mYWRlSW5fUXQtXCIsXG5cdFwiZmx5SW5Gcm9tTGVmdFwiOiBcInNlYXJjaC1pbnB1dF9mbHlJbkZyb21MZWZ0XzI2UVwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIHByb2dyZXNzLWluZGljYXRvcl9mYWRlSW5fM0VUIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHByb2dyZXNzLWluZGljYXRvcl9mYWRlSW5fM0VUIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcHJvZ3Jlc3MtaW5kaWNhdG9yX2ZseUluRnJvbUxlZnRfMjZWIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgcHJvZ3Jlc3MtaW5kaWNhdG9yX2ZseUluRnJvbUxlZnRfMjZWIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbi5wcm9ncmVzcy1pbmRpY2F0b3JfcHJvZ3Jlc3NJbmRpY2F0b3JfM3lBIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDEwMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGI0YTI7XFxuICBoZWlnaHQ6IDRweDsgfVxcblxcbi5wcm9ncmVzcy1pbmRpY2F0b3JfcHJvZ3Jlc3NJbmRpY2F0b3JfM3lBLnByb2dyZXNzLWluZGljYXRvcl9hbmltYXRhYmxlXzFsVSB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IHdpZHRoIDAuNHMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgb3BhY2l0eSAwLjFzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IHdpZHRoIDAuNHMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgb3BhY2l0eSAwLjFzIGxpbmVhcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInByb2dyZXNzSW5kaWNhdG9yXCI6IFwicHJvZ3Jlc3MtaW5kaWNhdG9yX3Byb2dyZXNzSW5kaWNhdG9yXzN5QVwiLFxuXHRcImFuaW1hdGFibGVcIjogXCJwcm9ncmVzcy1pbmRpY2F0b3JfYW5pbWF0YWJsZV8xbFVcIixcblx0XCJmYWRlSW5cIjogXCJwcm9ncmVzcy1pbmRpY2F0b3JfZmFkZUluXzNFVFwiLFxuXHRcImZseUluRnJvbUxlZnRcIjogXCJwcm9ncmVzcy1pbmRpY2F0b3JfZmx5SW5Gcm9tTGVmdF8yNlZcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL21haW4vcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubGlua19yb3V0ZV8yY2kge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogaW5oZXJpdDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvdXRlXCI6IFwibGlua19yb3V0ZV8yY2lcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvbGluay9saW5rLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyByb3V0ZS1oYW5kbGVyX2ZhZGVJbl9RSG4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgcm91dGUtaGFuZGxlcl9mYWRlSW5fUUhuIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcm91dGUtaGFuZGxlcl9mbHlJbkZyb21MZWZ0XzI1dyB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdXRlLWhhbmRsZXJfZmx5SW5Gcm9tTGVmdF8yNXcge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuLnJvdXRlLWhhbmRsZXJfdHJhbnNpdGlvbi1jb250YWluZXJfMm1uIHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICAgIGZsZXg6IDE7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxcblxcbi5yb3V0ZS1oYW5kbGVyX2xvYWRpbmdfMUZPIHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICAgIGZsZXg6IDE7XFxuICBwYWRkaW5nOiAxNnB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwidHJhbnNpdGlvbi1jb250YWluZXJcIjogXCJyb3V0ZS1oYW5kbGVyX3RyYW5zaXRpb24tY29udGFpbmVyXzJtblwiLFxuXHRcImxvYWRpbmdcIjogXCJyb3V0ZS1oYW5kbGVyX2xvYWRpbmdfMUZPXCIsXG5cdFwiZmFkZUluXCI6IFwicm91dGUtaGFuZGxlcl9mYWRlSW5fUUhuXCIsXG5cdFwiZmx5SW5Gcm9tTGVmdFwiOiBcInJvdXRlLWhhbmRsZXJfZmx5SW5Gcm9tTGVmdF8yNXdcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb21wb25lbnRzL3JvdXRlLWhhbmRsZXIvcm91dGUtaGFuZGxlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X2ZhZGVJbl8xSGIge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgbG9hZGluZy12aWV3X2ZhZGVJbl8xSGIge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBsb2FkaW5nLXZpZXdfZmx5SW5Gcm9tTGVmdF9IOFMge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBsb2FkaW5nLXZpZXdfZmx5SW5Gcm9tTGVmdF9IOFMge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuLmxvYWRpbmctdmlld19sb2FkaW5nLWNvbnRhaW5lcl9YMVgge1xcbiAgd2lkdGg6IDEwMCU7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5sb2FkaW5nLXZpZXdfc3Bpbm5lcl8yODMge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGxvYWRpbmctdmlld19yb3RhdG9yXzM0MyAxLjRzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBsb2FkaW5nLXZpZXdfcm90YXRvcl8zNDMgMS40cyBsaW5lYXIgaW5maW5pdGU7IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X3JvdGF0b3JfMzQzIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRpbmctdmlld19yb3RhdG9yXzM0MyB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTsgfSB9XFxuXFxuLmxvYWRpbmctdmlld19wYXRoXzNEbCB7XFxuICBzdHJva2UtZGFzaGFycmF5OiAxODc7XFxuICBzdHJva2UtZGFzaG9mZnNldDogMDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZGluZy12aWV3X2Rhc2hfMWplIDEuNHMgZWFzZS1pbi1vdXQgaW5maW5pdGUsIGxvYWRpbmctdmlld19jb2xvcnNfVVpLIDUuNnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XFxuICAgICAgICAgIGFuaW1hdGlvbjogbG9hZGluZy12aWV3X2Rhc2hfMWplIDEuNHMgZWFzZS1pbi1vdXQgaW5maW5pdGUsIGxvYWRpbmctdmlld19jb2xvcnNfVVpLIDUuNnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X2NvbG9yc19VWksge1xcbiAgMCUge1xcbiAgICBzdHJva2U6ICMyODM1M2U7IH1cXG4gIDUwJSB7XFxuICAgIHN0cm9rZTogIzAwYjRhMjsgfVxcbiAgMTAwJSB7XFxuICAgIHN0cm9rZTogIzI4MzUzZTsgfSB9XFxuXFxuQGtleWZyYW1lcyBsb2FkaW5nLXZpZXdfY29sb3JzX1VaSyB7XFxuICAwJSB7XFxuICAgIHN0cm9rZTogIzI4MzUzZTsgfVxcbiAgNTAlIHtcXG4gICAgc3Ryb2tlOiAjMDBiNGEyOyB9XFxuICAxMDAlIHtcXG4gICAgc3Ryb2tlOiAjMjgzNTNlOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZy12aWV3X2Rhc2hfMWplIHtcXG4gIDAlIHtcXG4gICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDE4NzsgfVxcbiAgNTAlIHtcXG4gICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDQ2Ljc1O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAxODc7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDUwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NTBkZWcpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRpbmctdmlld19kYXNoXzFqZSB7XFxuICAwJSB7XFxuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAxODc7IH1cXG4gIDUwJSB7XFxuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiA0Ni43NTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7IH1cXG4gIDEwMCUge1xcbiAgICBzdHJva2UtZGFzaG9mZnNldDogMTg3O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1MGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDUwZGVnKTsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwibG9hZGluZy1jb250YWluZXJcIjogXCJsb2FkaW5nLXZpZXdfbG9hZGluZy1jb250YWluZXJfWDFYXCIsXG5cdFwic3Bpbm5lclwiOiBcImxvYWRpbmctdmlld19zcGlubmVyXzI4M1wiLFxuXHRcInJvdGF0b3JcIjogXCJsb2FkaW5nLXZpZXdfcm90YXRvcl8zNDNcIixcblx0XCJwYXRoXCI6IFwibG9hZGluZy12aWV3X3BhdGhfM0RsXCIsXG5cdFwiZGFzaFwiOiBcImxvYWRpbmctdmlld19kYXNoXzFqZVwiLFxuXHRcImNvbG9yc1wiOiBcImxvYWRpbmctdmlld19jb2xvcnNfVVpLXCIsXG5cdFwiZmFkZUluXCI6IFwibG9hZGluZy12aWV3X2ZhZGVJbl8xSGJcIixcblx0XCJmbHlJbkZyb21MZWZ0XCI6IFwibG9hZGluZy12aWV3X2ZseUluRnJvbUxlZnRfSDhTXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBkcmF3ZXJfZmFkZUluXzNSRSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBkcmF3ZXJfZmFkZUluXzNSRSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGRyYXdlcl9mbHlJbkZyb21MZWZ0XzNpTiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGRyYXdlcl9mbHlJbkZyb21MZWZ0XzNpTiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG4uZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDk5O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDQwJTtcXG4gIG1heC13aWR0aDogMzAwcHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6IHtcXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgei1pbmRleDogMTAyO1xcbiAgICAgIGxlZnQ6IDA7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIG1heC13aWR0aDogbm9uZTtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6OjphZnRlciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb250ZW50OiAnJztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAtMTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC40KTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgd2lsbC1jaGFuZ2U6IG9wYWNpdHk7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC40cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHtcXG4gIC5kcmF3ZXJfZHJhd2VyLWNvbnRhaW5lcl8yQnouZHJhd2VyX2FjdGl2ZV8zQmYge1xcbiAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gIC5kcmF3ZXJfZHJhd2VyLWNvbnRhaW5lcl8yQnouZHJhd2VyX2FjdGl2ZV8zQmYge1xcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bzsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6LmRyYXdlcl9hY3RpdmVfM0JmOjphZnRlciB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5kcmF3ZXJfZHJhd2VyXzN6dyB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC40cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNHMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC40cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLmRyYXdlcl9kcmF3ZXJfM3p3IHtcXG4gICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDJweCAwIDEycHggcmdiYSgwLCAwLCAwLCAuNCk7XFxuICAgICAgICAgICAgICBib3gtc2hhZG93OiAycHggMCAxMnB4IHJnYmEoMCwgMCwgMCwgLjQpO1xcbiAgICAgIGxlZnQ6IDA7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIG1heC13aWR0aDogNDAwcHg7XFxuICAgICAgd2lkdGg6IDgwJTtcXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTA3JSk7XFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwNyUpO1xcbiAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07IH0gfVxcblxcbi5kcmF3ZXJfZHJhd2VyXzN6dy5kcmF3ZXJfZHJhZ2dhYmxlXzJwYyB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuMTNzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpO1xcbiAgdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4xM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSksIC13ZWJraXQtdHJhbnNmb3JtIDAuMTNzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpOyB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAuZHJhd2VyX2RyYXdlci1jb250YWluZXJfMkJ6LmRyYXdlcl9hY3RpdmVfM0JmIC5kcmF3ZXJfZHJhd2VyXzN6dyB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7IH0gfVxcblxcbi5kcmF3ZXJfZHJhd2VyLWhvbWVDb250YWluZXJfM0hoIHtcXG4gIHBhZGRpbmc6IDhweCAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzMjQwNDc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyYjMyOyB9XFxuXFxuLmRyYXdlcl9kcmF3ZXItaG9tZV8xTE0ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGRyYXdlcl9mbHlJbkZyb21MZWZ0XzNpTiAwLjZzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogZHJhd2VyX2ZseUluRnJvbUxlZnRfM2lOIDAuNnMgMTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nOiAwIDI0cHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmRyYXdlcl9kcmF3ZXItaG9tZV8xTE0gc3ZnIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyN3B4O1xcbiAgICBmaWxsOiAjZmZmOyB9XFxuICAuZHJhd2VyX2RyYXdlci1ob21lXzFMTSBzcGFuIHtcXG4gICAgY29sb3I6ICNmZmY7IH1cXG5cXG4uZHJhd2VyX2RyYXdlci1ob21lXzFMTS5kcmF3ZXJfYWN0aXZlXzNCZiBpIHtcXG4gIGNvbG9yOiAjMDBiNGEyOyB9XFxuXFxuLmRyYXdlcl9kcmF3ZXItaG9tZV8xTE0uZHJhd2VyX2FjdGl2ZV8zQmYgc3BhbiB7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgY29sb3I6ICMwMGI0YTI7IH1cXG5cXG4uZHJhd2VyX2RyYXdlci1sb2dvX2p6RiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlMmIzMjsgfVxcbiAgLmRyYXdlcl9kcmF3ZXItbG9nb19qekYgaW1nIHtcXG4gICAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uZHJhd2VyX2RyYXdlci1kaXZpZGVyX1kxWCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMzI0MDQ3O1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5kcmF3ZXJfc2VhcmNoLWNvbnRhaW5lcl8yZnYge1xcbiAgcGFkZGluZzogMTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMjQwNDc7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMyNDA0NzsgfVxcblxcbi5kcmF3ZXJfYXJ0aWNsZUZpbHRlcnMtd3JhcHBlcl8zR0Ege1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlMmIzMjsgfVxcblxcbi5kcmF3ZXJfcGFnZUxpc3Qtd3JhcHBlcl8xakUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFlMmIzMjtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICAgIGZsZXg6IDE7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDsgfVxcblxcbi5kcmF3ZXJfZHJhd2VyLWZvb3Rlcl8xYU0ge1xcbiAgaGVpZ2h0OiAwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUyYjMyOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiZHJhd2VyLWNvbnRhaW5lclwiOiBcImRyYXdlcl9kcmF3ZXItY29udGFpbmVyXzJCelwiLFxuXHRcImFjdGl2ZVwiOiBcImRyYXdlcl9hY3RpdmVfM0JmXCIsXG5cdFwiZHJhd2VyXCI6IFwiZHJhd2VyX2RyYXdlcl8zendcIixcblx0XCJkcmFnZ2FibGVcIjogXCJkcmF3ZXJfZHJhZ2dhYmxlXzJwY1wiLFxuXHRcImRyYXdlci1ob21lQ29udGFpbmVyXCI6IFwiZHJhd2VyX2RyYXdlci1ob21lQ29udGFpbmVyXzNIaFwiLFxuXHRcImRyYXdlci1ob21lXCI6IFwiZHJhd2VyX2RyYXdlci1ob21lXzFMTVwiLFxuXHRcImZseUluRnJvbUxlZnRcIjogXCJkcmF3ZXJfZmx5SW5Gcm9tTGVmdF8zaU5cIixcblx0XCJkcmF3ZXItbG9nb1wiOiBcImRyYXdlcl9kcmF3ZXItbG9nb19qekZcIixcblx0XCJkcmF3ZXItZGl2aWRlclwiOiBcImRyYXdlcl9kcmF3ZXItZGl2aWRlcl9ZMVhcIixcblx0XCJzZWFyY2gtY29udGFpbmVyXCI6IFwiZHJhd2VyX3NlYXJjaC1jb250YWluZXJfMmZ2XCIsXG5cdFwiYXJ0aWNsZUZpbHRlcnMtd3JhcHBlclwiOiBcImRyYXdlcl9hcnRpY2xlRmlsdGVycy13cmFwcGVyXzNHQVwiLFxuXHRcInBhZ2VMaXN0LXdyYXBwZXJcIjogXCJkcmF3ZXJfcGFnZUxpc3Qtd3JhcHBlcl8xakVcIixcblx0XCJkcmF3ZXItZm9vdGVyXCI6IFwiZHJhd2VyX2RyYXdlci1mb290ZXJfMWFNXCIsXG5cdFwiZmFkZUluXCI6IFwiZHJhd2VyX2ZhZGVJbl8zUkVcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL2NsaWVudC9jb250YWluZXJzL2RyYXdlci9kcmF3ZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIG1haW4taGVhZGVyX2ZhZGVJbl8xdzgge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgbWFpbi1oZWFkZXJfZmFkZUluXzF3OCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIG1haW4taGVhZGVyX2ZseUluRnJvbUxlZnRfMmgyIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgbWFpbi1oZWFkZXJfZmx5SW5Gcm9tTGVmdF8yaDIge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuLm1haW4taGVhZGVyX2hlYWRlcl8yQnYge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZzogMTZweCAyNHB4IDE2cHggNzJweDtcXG4gIHotaW5kZXg6IDEwMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MzUzZTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAuMyk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjMpOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLm1haW4taGVhZGVyX2hlYWRlcl8yQnYge1xcbiAgICAgIHBhZGRpbmc6IDE2cHggMjRweCAxNnB4IDQ4cHg7IH0gfVxcblxcbi5tYWluLWhlYWRlcl90aXRsZS1jb250YWluZXJfM010IHtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4ubWFpbi1oZWFkZXJfdG9nZ2xlLWNvbnRhaW5lcl8zb2kge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogNDhweDsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDUwMHB4KSB7XFxuICAgIC5tYWluLWhlYWRlcl90b2dnbGUtY29udGFpbmVyXzNvaSB7XFxuICAgICAgbGVmdDogMTZweDsgfSB9XFxuXFxuLm1haW4taGVhZGVyX3RpdGxlXzFnRCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICAgIGZsZXg6IDE7XFxuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgbGluZWFyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgbGluZWFyO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxcbiAgLm1haW4taGVhZGVyX3RpdGxlXzFnRCAubWFpbi1oZWFkZXJfdGl0bGUtZGV0YWlsXzNOWSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplOyB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAubWFpbi1oZWFkZXJfaGVhZGVyXzJCdi5tYWluLWhlYWRlcl9zZWFyY2hPcGVuXzFmVSAubWFpbi1oZWFkZXJfdGl0bGVfMWdEIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgcGFkZGluZzogMDsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAubWFpbi1oZWFkZXJfaGVhZGVyXzJCdi5tYWluLWhlYWRlcl9zZWFyY2hPcGVuXzFmVSAubWFpbi1oZWFkZXJfdGl0bGUtY29udGFpbmVyXzNNdCB7XFxuICAgIHdpZHRoOiAwOyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gIC5tYWluLWhlYWRlcl9oZWFkZXJfMkJ2Lm1haW4taGVhZGVyX3NlYXJjaE9wZW5fMWZVIC5tYWluLWhlYWRlcl9zZWFyY2gtY29udGFpbmVyX2lIRCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgICBmbGV4OiAxOyB9IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gIC5tYWluLWhlYWRlcl9oZWFkZXJfMkJ2Lm1haW4taGVhZGVyX3dhdGVyZmFsbE9wZW5fMnVxIHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7IH0gfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImhlYWRlclwiOiBcIm1haW4taGVhZGVyX2hlYWRlcl8yQnZcIixcblx0XCJ0aXRsZS1jb250YWluZXJcIjogXCJtYWluLWhlYWRlcl90aXRsZS1jb250YWluZXJfM010XCIsXG5cdFwidG9nZ2xlLWNvbnRhaW5lclwiOiBcIm1haW4taGVhZGVyX3RvZ2dsZS1jb250YWluZXJfM29pXCIsXG5cdFwidGl0bGVcIjogXCJtYWluLWhlYWRlcl90aXRsZV8xZ0RcIixcblx0XCJ0aXRsZS1kZXRhaWxcIjogXCJtYWluLWhlYWRlcl90aXRsZS1kZXRhaWxfM05ZXCIsXG5cdFwic2VhcmNoT3BlblwiOiBcIm1haW4taGVhZGVyX3NlYXJjaE9wZW5fMWZVXCIsXG5cdFwic2VhcmNoLWNvbnRhaW5lclwiOiBcIm1haW4taGVhZGVyX3NlYXJjaC1jb250YWluZXJfaUhEXCIsXG5cdFwid2F0ZXJmYWxsT3BlblwiOiBcIm1haW4taGVhZGVyX3dhdGVyZmFsbE9wZW5fMnVxXCIsXG5cdFwiZmFkZUluXCI6IFwibWFpbi1oZWFkZXJfZmFkZUluXzF3OFwiLFxuXHRcImZseUluRnJvbUxlZnRcIjogXCJtYWluLWhlYWRlcl9mbHlJbkZyb21MZWZ0XzJoMlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvaGVhZGVyL21haW4taGVhZGVyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyB0b2FzdC1tYW5hZ2VyX2ZhZGVJbl8zdmIge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgdG9hc3QtbWFuYWdlcl9mYWRlSW5fM3ZiIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgdG9hc3QtbWFuYWdlcl9mbHlJbkZyb21MZWZ0X1h4SiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHRvYXN0LW1hbmFnZXJfZmx5SW5Gcm9tTGVmdF9YeEoge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuLnRvYXN0LW1hbmFnZXJfdG9hc3QtY29udGFpbmVyXzFSaSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiA5OTtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIHRvcDogMTAwJTtcXG4gIGxlZnQ6IDA7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGVuZDtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAudG9hc3QtbWFuYWdlcl90b2FzdC1jb250YWluZXJfMVJpIHtcXG4gICAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9IH1cXG4gIC50b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmkgLnRvYXN0LW1hbmFnZXJfdG9hc3Qtd3JhcHBlcl8yUHEge1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpLCBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSwgb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSksIC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgICAudG9hc3QtbWFuYWdlcl90b2FzdC1jb250YWluZXJfMVJpIC50b2FzdC1tYW5hZ2VyX3RvYXN0LXdyYXBwZXJfMlBxIHtcXG4gICAgICAgIHBhZGRpbmc6IDA7IH0gfVxcbiAgICAudG9hc3QtbWFuYWdlcl90b2FzdC1jb250YWluZXJfMVJpIC50b2FzdC1tYW5hZ2VyX3RvYXN0LXdyYXBwZXJfMlBxIC50b2FzdC1tYW5hZ2VyX3RvYXN0XzNBUyB7XFxuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAgICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICBiYWNrZ3JvdW5kOiAjMWUyYjMyO1xcbiAgICAgIHBhZGRpbmc6IDRweCA4cHggNHB4IDI0cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAuNCk7XFxuICAgICAgICAgICAgICBib3gtc2hhZG93OiAwcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIC40KTsgfVxcbiAgICAgIC50b2FzdC1tYW5hZ2VyX3RvYXN0LWNvbnRhaW5lcl8xUmkgLnRvYXN0LW1hbmFnZXJfdG9hc3Qtd3JhcHBlcl8yUHEgLnRvYXN0LW1hbmFnZXJfdG9hc3RfM0FTIC50b2FzdC1tYW5hZ2VyX21lc3NhZ2VfMzlHIHtcXG4gICAgICAgIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgICAgICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICAgICAgICAgIGZsZXg6IDE7XFxuICAgICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xcbiAgICAgICAgbWFyZ2luOiAwIDRweCAwIDA7IH1cXG4gICAgICAudG9hc3QtbWFuYWdlcl90b2FzdC1jb250YWluZXJfMVJpIC50b2FzdC1tYW5hZ2VyX3RvYXN0LXdyYXBwZXJfMlBxIC50b2FzdC1tYW5hZ2VyX3RvYXN0XzNBUyAudG9hc3QtbWFuYWdlcl9hY3Rpb25fMWdMIHtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7XFxuICAgICAgICBwYWRkaW5nOiAwIDE2cHg7XFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICAgICAgY29sb3I6ICMwMGI0YTI7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAudG9hc3QtbWFuYWdlcl90b2FzdC1jb250YWluZXJfMVJpIC50b2FzdC1tYW5hZ2VyX3RvYXN0LXdyYXBwZXJfMlBxLnRvYXN0LW1hbmFnZXJfYWN0aXZlXzNLRCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwidG9hc3QtY29udGFpbmVyXCI6IFwidG9hc3QtbWFuYWdlcl90b2FzdC1jb250YWluZXJfMVJpXCIsXG5cdFwidG9hc3Qtd3JhcHBlclwiOiBcInRvYXN0LW1hbmFnZXJfdG9hc3Qtd3JhcHBlcl8yUHFcIixcblx0XCJ0b2FzdFwiOiBcInRvYXN0LW1hbmFnZXJfdG9hc3RfM0FTXCIsXG5cdFwibWVzc2FnZVwiOiBcInRvYXN0LW1hbmFnZXJfbWVzc2FnZV8zOUdcIixcblx0XCJhY3Rpb25cIjogXCJ0b2FzdC1tYW5hZ2VyX2FjdGlvbl8xZ0xcIixcblx0XCJhY3RpdmVcIjogXCJ0b2FzdC1tYW5hZ2VyX2FjdGl2ZV8zS0RcIixcblx0XCJmYWRlSW5cIjogXCJ0b2FzdC1tYW5hZ2VyX2ZhZGVJbl8zdmJcIixcblx0XCJmbHlJbkZyb21MZWZ0XCI6IFwidG9hc3QtbWFuYWdlcl9mbHlJbkZyb21MZWZ0X1h4SlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvdG9hc3QtbWFuYWdlci90b2FzdC1tYW5hZ2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBiYXNlX2ZhZGVJbl8zT00ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgYmFzZV9mYWRlSW5fM09NIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYmFzZV9mbHlJbkZyb21MZWZ0X2VwSiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGJhc2VfZmx5SW5Gcm9tTGVmdF9lcEoge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuaHRtbCwgYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNnB4OyB9XFxuXFxuKiB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7IH1cXG5cXG4uYmFzZV9hcHAtY29udGFpbmVyX1d4MiB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7IH1cXG5cXG4uYmFzZV9tYWluLWNvbnRhaW5lcl9UWTgge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIG92ZXJmbG93LXk6IGF1dG87IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJhcHAtY29udGFpbmVyXCI6IFwiYmFzZV9hcHAtY29udGFpbmVyX1d4MlwiLFxuXHRcIm1haW4tY29udGFpbmVyXCI6IFwiYmFzZV9tYWluLWNvbnRhaW5lcl9UWThcIixcblx0XCJmYWRlSW5cIjogXCJiYXNlX2ZhZGVJbl8zT01cIixcblx0XCJmbHlJbkZyb21MZWZ0XCI6IFwiYmFzZV9mbHlJbkZyb21MZWZ0X2VwSlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvY2xpZW50L3Njc3MvYmFzZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JpcHBsZS5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JpcHBsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcmlwcGxlLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbW9uL3JpcHBsZS9yaXBwbGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jYXRlZ29yeS1zZWN0aW9uLnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY2F0ZWdvcnktc2VjdGlvbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY2F0ZWdvcnktc2VjdGlvbi5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL2RyYXdlci9wYWdlLWxpc3QvY2F0ZWdvcnktc2VjdGlvbi9jYXRlZ29yeS1zZWN0aW9uLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGFnZS1saXN0LnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcGFnZS1saXN0LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9wYWdlLWxpc3Quc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9kcmF3ZXIvcGFnZS1saXN0L3BhZ2UtbGlzdC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2hlYWRlci1pY29uLnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaGVhZGVyLWljb24uc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2hlYWRlci1pY29uLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1pY29uL2hlYWRlci1pY29uLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2VhcmNoLWlucHV0LnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2VhcmNoLWlucHV0LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zZWFyY2gtaW5wdXQuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9oZWFkZXIvc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Byb2dyZXNzLWluZGljYXRvci5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Byb2dyZXNzLWluZGljYXRvci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvbWFpbi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbGluay5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2xpbmsuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2xpbmsuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9yb3V0ZS1oYW5kbGVyL2xpbmsvbGluay5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3JvdXRlLWhhbmRsZXIuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9yb3V0ZS1oYW5kbGVyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9yb3V0ZS1oYW5kbGVyLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvcm91dGUtaGFuZGxlci9yb3V0ZS1oYW5kbGVyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbG9hZGluZy12aWV3LnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbG9hZGluZy12aWV3LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9sb2FkaW5nLXZpZXcuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZHJhd2VyLnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZHJhd2VyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kcmF3ZXIuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29udGFpbmVycy9kcmF3ZXIvZHJhd2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi1oZWFkZXIuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9tYWluLWhlYWRlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbWFpbi1oZWFkZXIuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29udGFpbmVycy9oZWFkZXIvbWFpbi1oZWFkZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90b2FzdC1tYW5hZ2VyLnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vdG9hc3QtbWFuYWdlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vdG9hc3QtbWFuYWdlci5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb250YWluZXJzL3RvYXN0LW1hbmFnZXIvdG9hc3QtbWFuYWdlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Jhc2Uuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9iYXNlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9iYXNlLnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xpZW50L3Njc3MvYmFzZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnlcIlxuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb250ZW50ZnVsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29udGVudGZ1bFwiXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hcmtlZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1hcmtlZFwiXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdGF0aWMtbW9kdWxlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic3RhdGljLW1vZHVsZVwiXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmwtc2VhcmNoLXBhcmFtc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVybC1zZWFyY2gtcGFyYW1zXCJcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=