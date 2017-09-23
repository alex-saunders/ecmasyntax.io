webpackJsonp([1],{

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(32);

var _withStyles = __webpack_require__(18);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _urlSearchParams = __webpack_require__(284);

var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);

var _utils = __webpack_require__(49);

var _pageList = __webpack_require__(93);

var _searchResult = __webpack_require__(749);

var _searchResult2 = _interopRequireDefault(_searchResult);

var _searchView = __webpack_require__(763);

var _searchView2 = _interopRequireDefault(_searchView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).call(this, props));

    _this.state = {
      currQuery: _this._fetchSearchParam()
    };
    return _this;
  }

  _createClass(SearchResults, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.toggleWaterfallHeader(false);
      this.props.progressUpdate(100);
      this.props.toggleSearch(true);

      this.props.search(this._fetchSearchParam());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        currQuery: nextProps.currQuery
      });

      this._updateSearchParam(nextProps.currQuery);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.pageList.length < 1 && this.props.pageList.length >= 1) {
        this.props.search(this._fetchSearchParam());
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.toggleSearch(false);
      this.props.search('');
    }
  }, {
    key: '_fetchSearchParam',
    value: function _fetchSearchParam() {
      var url = new URL(this.props.location);
      var searchParams = new _urlSearchParams2.default(url.search);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = searchParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;

          if (p[0] === "search") return p[1];
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

      return "";
    }
  }, {
    key: '_updateSearchParam',
    value: function _updateSearchParam(query) {
      var url = new URL(this.props.location);
      var searchParams = new _urlSearchParams2.default(url.search);
      searchParams.set('search', query);
      url.search = searchParams.toString();
      window.history.replaceState(null, null, url.href);
    }
  }, {
    key: 'mapResults',
    value: function mapResults() {
      var _this2 = this;

      if (this.props.currQuery.length < 1) {
        return [];
      }
      var results = this.props.activePages.map(function (page) {
        return _react2.default.createElement(_searchResult2.default, {
          key: page.sys.id,
          currQuery: _this2.state.currQuery,
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
        { className: _searchView2.default['search-container'] },
        _react2.default.createElement(
          'div',
          { className: _searchView2.default['search-results'] },
          _react2.default.createElement(
            'h1',
            { className: _searchView2.default['search-title'] },
            'Results for ',
            _react2.default.createElement(
              'span',
              { className: _searchView2.default['search-query'] },
              this.state.currQuery
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
  currQuery: _propTypes2.default.string.isRequired,
  activePages: _propTypes2.default.array.isRequired
};

function mapStateToProps(state) {
  return {
    searchOpen: state.utils.activePages,
    currQuery: state.pageList.query,
    activePages: state.pageList.activePages,
    pageList: state.pageList.entries
  };
}

function matchDispatchToProps(dispatch) {
  return {
    search: function search(query) {
      dispatch((0, _pageList.search)(query));
    },
    toggleSearch: function toggleSearch(open) {
      dispatch((0, _utils.toggleSearch)(open));
    },
    toggleWaterfallHeader: function toggleWaterfallHeader(visible) {
      dispatch((0, _utils.toggleWaterfallHeader)(visible));
    },
    progressUpdate: function progressUpdate(percentage) {
      dispatch((0, _utils.progressUpdate)(percentage));
    }
  };
}

exports.default = (0, _withStyles2.default)(_searchView2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(SearchResults));

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = __webpack_require__(18);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _link = __webpack_require__(123);

var _link2 = _interopRequireDefault(_link);

var _ripple = __webpack_require__(94);

var _ripple2 = _interopRequireDefault(_ripple);

var _searchResult = __webpack_require__(762);

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
        'div',
        { className: _searchResult2.default['result-container'] },
        _react2.default.createElement(
          _link2.default,
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
        )
      );
    }
  }]);

  return SearchResult;
}(_react2.default.Component);

SearchResult.propTypes = {
  currQuery: _propTypes2.default.string.isRequired,
  page: _propTypes2.default.object.isRequired
};

exports.default = (0, _withStyles2.default)(_searchResult2.default)(SearchResult);

/***/ }),

/***/ 755:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes search-result_fadeIn_3mX {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes search-result_fadeIn_3mX {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes search-result_flyInFromLeft_2Aa {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes search-result_flyInFromLeft_2Aa {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.search-result_result-container_38z {\n  width: 100%; }\n\n.search-result_result_2Oc {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  padding: 4px 0 25px 0;\n  border-bottom: 1px solid #324047;\n  cursor: pointer;\n  text-decoration: none; }\n  @media (max-width: 500px) {\n    .search-result_result_2Oc {\n      padding: 0px 8px 0px 48px;\n      border-bottom: none; } }\n\n.search-result_ripple_3iN {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n  @media (min-width: 500px) {\n    .search-result_ripple_3iN {\n      display: none; } }\n\n.search-result_result-title_1TE {\n  color: #00b4a2;\n  font-size: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-title_1TE {\n      color: #373737;\n      font-size: 16px;\n      margin: 16px 0; } }\n\n.search-result_result-url_1s9 {\n  font-size: 13px;\n  color: #007468;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  @media (max-width: 500px) {\n    .search-result_result-url_1s9 {\n      display: none; } }\n\n.search-result_result-route_NhW {\n  color: #373737;\n  font-size: 13px;\n  line-height: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-route_NhW {\n      display: none; } }\n", ""]);

// exports
exports.locals = {
	"result-container": "search-result_result-container_38z",
	"result": "search-result_result_2Oc",
	"ripple": "search-result_ripple_3iN",
	"result-title": "search-result_result-title_1TE",
	"result-url": "search-result_result-url_1s9",
	"result-route": "search-result_result-route_NhW",
	"fadeIn": "search-result_fadeIn_3mX",
	"flyInFromLeft": "search-result_flyInFromLeft_2Aa"
};

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes search-view_fadeIn_1Uu {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes search-view_fadeIn_1Uu {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes search-view_flyInFromLeft_32F {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes search-view_flyInFromLeft_32F {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@-webkit-keyframes search-view_flyIn_fKp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n@keyframes search-view_flyIn_fKp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n.search-view_search-container_2gW {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 75%;\n  padding: 80px 0;\n  margin: 0 auto; }\n  @media (max-width: 500px) {\n    .search-view_search-container_2gW {\n      width: 100%;\n      padding: 8px 0; } }\n\n.search-view_search-results_1Ne {\n  padding: 16px; }\n  @media (max-width: 500px) {\n    .search-view_search-results_1Ne {\n      padding: 0; } }\n\n.search-view_search-title_b1s {\n  font-weight: 400; }\n  @media (max-width: 500px) {\n    .search-view_search-title_b1s {\n      display: none; } }\n\n.search-view_search-query_yq1 {\n  color: #00b4a2;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n", ""]);

// exports
exports.locals = {
	"search-container": "search-view_search-container_2gW",
	"search-results": "search-view_search-results_1Ne",
	"search-title": "search-view_search-title_b1s",
	"search-query": "search-view_search-query_yq1",
	"fadeIn": "search-view_fadeIn_1Uu",
	"flyInFromLeft": "search-view_flyInFromLeft_32F",
	"flyIn": "search-view_flyIn_fKp"
};

/***/ }),

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(755);
    var insertCss = __webpack_require__(17);

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
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./search-result.scss", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./search-result.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(756);
    var insertCss = __webpack_require__(17);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./search-view.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./search-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXZpZXcuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtcmVzdWx0L3NlYXJjaC1yZXN1bHQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtcmVzdWx0L3NlYXJjaC1yZXN1bHQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXZpZXcuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0LnNjc3M/M2ZmOSIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXZpZXcuc2Nzcz81NzAzIl0sIm5hbWVzIjpbIlNlYXJjaFJlc3VsdHMiLCJwcm9wcyIsInN0YXRlIiwiY3VyclF1ZXJ5IiwiX2ZldGNoU2VhcmNoUGFyYW0iLCJ0b2dnbGVXYXRlcmZhbGxIZWFkZXIiLCJwcm9ncmVzc1VwZGF0ZSIsInRvZ2dsZVNlYXJjaCIsInNlYXJjaCIsIm5leHRQcm9wcyIsInNldFN0YXRlIiwiX3VwZGF0ZVNlYXJjaFBhcmFtIiwicHJldlByb3BzIiwicGFnZUxpc3QiLCJsZW5ndGgiLCJ1cmwiLCJVUkwiLCJsb2NhdGlvbiIsInNlYXJjaFBhcmFtcyIsInAiLCJxdWVyeSIsInNldCIsInRvU3RyaW5nIiwid2luZG93IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImhyZWYiLCJyZXN1bHRzIiwiYWN0aXZlUGFnZXMiLCJtYXAiLCJwYWdlIiwic3lzIiwiaWQiLCJtYXBSZXN1bHRzIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImFycmF5IiwibWFwU3RhdGVUb1Byb3BzIiwic2VhcmNoT3BlbiIsInV0aWxzIiwiZW50cmllcyIsIm1hdGNoRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJvcGVuIiwidmlzaWJsZSIsInBlcmNlbnRhZ2UiLCJTZWFyY2hSZXN1bHQiLCJjYXRlZ29yeSIsImZpZWxkcyIsInNwZWNpZmljYXRpb24iLCJyZWciLCJSZWdFeHAiLCJmb3JtYXR0ZWROYW1lIiwibmFtZSIsInJlcGxhY2UiLCJzdHIiLCJmb3JtYXR0ZWRDYXQiLCJmb3JtYXR0ZWRTcGVjIiwicm91dGUiLCJyZXN1bHQiLCJfX2h0bWwiLCJyaXBwbGUiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTUEsYTs7O0FBRUoseUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4SEFDWEEsS0FEVzs7QUFFakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXLE1BQUtDLGlCQUFMO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7Ozt5Q0FFb0I7QUFDbkIsV0FBS0gsS0FBTCxDQUFXSSxxQkFBWCxDQUFpQyxLQUFqQztBQUNBLFdBQUtKLEtBQUwsQ0FBV0ssY0FBWCxDQUEwQixHQUExQjtBQUNBLFdBQUtMLEtBQUwsQ0FBV00sWUFBWCxDQUF3QixJQUF4Qjs7QUFFQSxXQUFLTixLQUFMLENBQVdPLE1BQVgsQ0FBa0IsS0FBS0osaUJBQUwsRUFBbEI7QUFDRDs7OzhDQUV5QkssUyxFQUFXO0FBQ25DLFdBQUtDLFFBQUwsQ0FBYztBQUNaUCxtQkFBV00sVUFBVU47QUFEVCxPQUFkOztBQUlBLFdBQUtRLGtCQUFMLENBQXdCRixVQUFVTixTQUFsQztBQUNEOzs7dUNBRWtCUyxTLEVBQVc7QUFDNUIsVUFBSUEsVUFBVUMs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QUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEIiwiZmlsZSI6InNlYXJjaC5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAndXJsLXNlYXJjaC1wYXJhbXMnO1xuXG5pbXBvcnQgeyB0b2dnbGVTZWFyY2gsIHRvZ2dsZVdhdGVyZmFsbEhlYWRlciwgcHJvZ3Jlc3NVcGRhdGUgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL3V0aWxzJztcbmltcG9ydCB7IHNlYXJjaCB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvcGFnZS1saXN0JztcblxuaW1wb3J0IFNlYXJjaFJlc3VsdCBmcm9tICcuL3NlYXJjaC1yZXN1bHQvc2VhcmNoLXJlc3VsdCc7XG5cbmltcG9ydCBzIGZyb20gJy4vc2VhcmNoLXZpZXcuc2Nzcyc7XG5cbmNsYXNzIFNlYXJjaFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyUXVlcnk6IHRoaXMuX2ZldGNoU2VhcmNoUGFyYW0oKVxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7ICAgIFxuICAgIHRoaXMucHJvcHMudG9nZ2xlV2F0ZXJmYWxsSGVhZGVyKGZhbHNlKTtcbiAgICB0aGlzLnByb3BzLnByb2dyZXNzVXBkYXRlKDEwMCk7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVTZWFyY2godHJ1ZSk7XG5cbiAgICB0aGlzLnByb3BzLnNlYXJjaCh0aGlzLl9mZXRjaFNlYXJjaFBhcmFtKCkpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGN1cnJRdWVyeTogbmV4dFByb3BzLmN1cnJRdWVyeVxuICAgIH0pXG5cbiAgICB0aGlzLl91cGRhdGVTZWFyY2hQYXJhbShuZXh0UHJvcHMuY3VyclF1ZXJ5KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAocHJldlByb3BzLnBhZ2VMaXN0Lmxlbmd0aCA8IDEgJiYgdGhpcy5wcm9wcy5wYWdlTGlzdC5sZW5ndGggPj0gMSkge1xuICAgICAgdGhpcy5wcm9wcy5zZWFyY2godGhpcy5fZmV0Y2hTZWFyY2hQYXJhbSgpKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZVNlYXJjaChmYWxzZSk7XG4gICAgdGhpcy5wcm9wcy5zZWFyY2goJycpO1xuICB9XG5cbiAgX2ZldGNoU2VhcmNoUGFyYW0oKSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh0aGlzLnByb3BzLmxvY2F0aW9uKTtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zZWFyY2gpXG4gICAgZm9yIChsZXQgcCBvZiBzZWFyY2hQYXJhbXMpIHtcbiAgICAgIGlmIChwWzBdID09PSBcInNlYXJjaFwiKSByZXR1cm4gcFsxXTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBfdXBkYXRlU2VhcmNoUGFyYW0ocXVlcnkpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMucHJvcHMubG9jYXRpb24pO1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLnNlYXJjaClcbiAgICBzZWFyY2hQYXJhbXMuc2V0KCdzZWFyY2gnLCBxdWVyeSk7XG4gICAgdXJsLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCB1cmwuaHJlZilcbiAgfVxuXG4gIG1hcFJlc3VsdHMoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuY3VyclF1ZXJ5Lmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMucHJvcHMuYWN0aXZlUGFnZXMubWFwKChwYWdlKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2VhcmNoUmVzdWx0XG4gICAgICAgICAga2V5PXtwYWdlLnN5cy5pZH1cbiAgICAgICAgICBjdXJyUXVlcnk9e3RoaXMuc3RhdGUuY3VyclF1ZXJ5fVxuICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1snc2VhcmNoLWNvbnRhaW5lciddfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3NlYXJjaC1yZXN1bHRzJ119PlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9e3NbJ3NlYXJjaC10aXRsZSddfT5cbiAgICAgICAgICAgIFJlc3VsdHMgZm9yIDxzcGFuIGNsYXNzTmFtZT17c1snc2VhcmNoLXF1ZXJ5J119Pnt0aGlzLnN0YXRlLmN1cnJRdWVyeX08L3NwYW4+XG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgICB7dGhpcy5tYXBSZXN1bHRzKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWFyY2hSZXN1bHRzLnByb3BUeXBlcyA9IHtcbiAgY3VyclF1ZXJ5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGFjdGl2ZVBhZ2VzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbn07XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIHNlYXJjaE9wZW46IHN0YXRlLnV0aWxzLmFjdGl2ZVBhZ2VzLFxuICAgIGN1cnJRdWVyeTogc3RhdGUucGFnZUxpc3QucXVlcnksXG4gICAgYWN0aXZlUGFnZXM6IHN0YXRlLnBhZ2VMaXN0LmFjdGl2ZVBhZ2VzLFxuICAgIHBhZ2VMaXN0OiBzdGF0ZS5wYWdlTGlzdC5lbnRyaWVzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXRjaERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIHNlYXJjaDogKHF1ZXJ5KSA9PiB7IGRpc3BhdGNoKHNlYXJjaChxdWVyeSkpOyB9LFxuICAgIHRvZ2dsZVNlYXJjaDogKG9wZW4pID0+IHsgZGlzcGF0Y2godG9nZ2xlU2VhcmNoKG9wZW4pKTsgfSxcbiAgICB0b2dnbGVXYXRlcmZhbGxIZWFkZXI6ICh2aXNpYmxlKSA9PiB7IGRpc3BhdGNoKHRvZ2dsZVdhdGVyZmFsbEhlYWRlcih2aXNpYmxlKSk7IH0sXG4gICAgcHJvZ3Jlc3NVcGRhdGU6IChwZXJjZW50YWdlKSA9PiB7IGRpc3BhdGNoKHByb2dyZXNzVXBkYXRlKHBlcmNlbnRhZ2UpKTsgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWF0Y2hEaXNwYXRjaFRvUHJvcHMpKFNlYXJjaFJlc3VsdHMpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBMaW5rIGZyb20gJy4uLy4uLy4uL3JvdXRlLWhhbmRsZXIvbGluay9saW5rJztcbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3JpcHBsZS9yaXBwbGUnO1xuaW1wb3J0IHMgZnJvbSAnLi9zZWFyY2gtcmVzdWx0LnNjc3MnO1xuXG5jbGFzcyBTZWFyY2hSZXN1bHQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IHBhZ2UuZmllbGRzLmNhdGVnb3J5O1xuICAgIGNvbnN0IHNwZWNpZmljYXRpb24gPSBjYXRlZ29yeS5maWVsZHMuc3BlY2lmaWNhdGlvbjtcblxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAodGhpcy5wcm9wcy5jdXJyUXVlcnksICdnaScpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkTmFtZSA9IHBhZ2UuZmllbGRzLm5hbWUucmVwbGFjZShyZWcsIChzdHIpID0+IHsgcmV0dXJuIGA8Yj4ke3N0cn08L2I+YDsgfSk7XG4gICAgY29uc3QgZm9ybWF0dGVkQ2F0ID0gY2F0ZWdvcnkuZmllbGRzLm5hbWUucmVwbGFjZShyZWcsIChzdHIpID0+IHsgcmV0dXJuIGA8Yj4ke3N0cn08L2I+YDsgfSk7XG4gICAgY29uc3QgZm9ybWF0dGVkU3BlYyA9IHNwZWNpZmljYXRpb24uZmllbGRzLm5hbWUucmVwbGFjZShyZWcsIChzdHIpID0+IHsgcmV0dXJuIGA8Yj4ke3N0cn08L2I+YDsgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3Jlc3VsdC1jb250YWluZXInXX0+XG4gICAgICAgIDxMaW5rIHJvdXRlPXt0aGlzLnByb3BzLnBhZ2UuZmllbGRzLnJvdXRlfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5yZXN1bHR9PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzWydyZXN1bHQtdGl0bGUnXX0gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBmb3JtYXR0ZWROYW1lIH19IC8+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e3NbJ3Jlc3VsdC11cmwnXX0+eyBwYWdlLmZpZWxkcy5yb3V0ZSB9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzWydyZXN1bHQtcm91dGUnXX0gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBgJHtmb3JtYXR0ZWRTcGVjfSA+ICR7Zm9ybWF0dGVkQ2F0fSA+ICR7Zm9ybWF0dGVkTmFtZX1gIH19IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5yaXBwbGV9PlxuICAgICAgICAgICAgICA8UmlwcGxlIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWFyY2hSZXN1bHQucHJvcFR5cGVzID0ge1xuICBjdXJyUXVlcnk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgcGFnZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShTZWFyY2hSZXN1bHQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL3NlYXJjaC12aWV3L3NlYXJjaC1yZXN1bHQvc2VhcmNoLXJlc3VsdC5qc3giLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgc2VhcmNoLXJlc3VsdF9mYWRlSW5fM21YIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNlYXJjaC1yZXN1bHRfZmFkZUluXzNtWCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNlYXJjaC1yZXN1bHRfZmx5SW5Gcm9tTGVmdF8yQWEge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBzZWFyY2gtcmVzdWx0X2ZseUluRnJvbUxlZnRfMkFhIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH0gfVxcblxcbi5zZWFyY2gtcmVzdWx0X3Jlc3VsdC1jb250YWluZXJfMzh6IHtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnNlYXJjaC1yZXN1bHRfcmVzdWx0XzJPYyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nOiA0cHggMCAyNXB4IDA7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMyNDA0NztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtcmVzdWx0X3Jlc3VsdF8yT2Mge1xcbiAgICAgIHBhZGRpbmc6IDBweCA4cHggMHB4IDQ4cHg7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTsgfSB9XFxuXFxuLnNlYXJjaC1yZXN1bHRfcmlwcGxlXzNpTiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1yZXN1bHRfcmlwcGxlXzNpTiB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfSB9XFxuXFxuLnNlYXJjaC1yZXN1bHRfcmVzdWx0LXRpdGxlXzFURSB7XFxuICBjb2xvcjogIzAwYjRhMjtcXG4gIGZvbnQtc2l6ZTogMjRweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtcmVzdWx0X3Jlc3VsdC10aXRsZV8xVEUge1xcbiAgICAgIGNvbG9yOiAjMzczNzM3O1xcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICBtYXJnaW46IDE2cHggMDsgfSB9XFxuXFxuLnNlYXJjaC1yZXN1bHRfcmVzdWx0LXVybF8xczkge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgY29sb3I6ICMwMDc0Njg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1yZXN1bHRfcmVzdWx0LXVybF8xczkge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblxcbi5zZWFyY2gtcmVzdWx0X3Jlc3VsdC1yb3V0ZV9OaFcge1xcbiAgY29sb3I6ICMzNzM3Mzc7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBsaW5lLWhlaWdodDogMjRweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtcmVzdWx0X3Jlc3VsdC1yb3V0ZV9OaFcge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJlc3VsdC1jb250YWluZXJcIjogXCJzZWFyY2gtcmVzdWx0X3Jlc3VsdC1jb250YWluZXJfMzh6XCIsXG5cdFwicmVzdWx0XCI6IFwic2VhcmNoLXJlc3VsdF9yZXN1bHRfMk9jXCIsXG5cdFwicmlwcGxlXCI6IFwic2VhcmNoLXJlc3VsdF9yaXBwbGVfM2lOXCIsXG5cdFwicmVzdWx0LXRpdGxlXCI6IFwic2VhcmNoLXJlc3VsdF9yZXN1bHQtdGl0bGVfMVRFXCIsXG5cdFwicmVzdWx0LXVybFwiOiBcInNlYXJjaC1yZXN1bHRfcmVzdWx0LXVybF8xczlcIixcblx0XCJyZXN1bHQtcm91dGVcIjogXCJzZWFyY2gtcmVzdWx0X3Jlc3VsdC1yb3V0ZV9OaFdcIixcblx0XCJmYWRlSW5cIjogXCJzZWFyY2gtcmVzdWx0X2ZhZGVJbl8zbVhcIixcblx0XCJmbHlJbkZyb21MZWZ0XCI6IFwic2VhcmNoLXJlc3VsdF9mbHlJbkZyb21MZWZ0XzJBYVwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgc2VhcmNoLXZpZXdfZmFkZUluXzFVdSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBzZWFyY2gtdmlld19mYWRlSW5fMVV1IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2VhcmNoLXZpZXdfZmx5SW5Gcm9tTGVmdF8zMkYge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBzZWFyY2gtdmlld19mbHlJbkZyb21MZWZ0XzMyRiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2VhcmNoLXZpZXdfZmx5SW5fZktwIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7IH1cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgc2VhcmNoLXZpZXdfZmx5SW5fZktwIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7IH1cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5zZWFyY2gtdmlld19zZWFyY2gtY29udGFpbmVyXzJnVyB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgd2lkdGg6IDc1JTtcXG4gIHBhZGRpbmc6IDgwcHggMDtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC12aWV3X3NlYXJjaC1jb250YWluZXJfMmdXIHtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBwYWRkaW5nOiA4cHggMDsgfSB9XFxuXFxuLnNlYXJjaC12aWV3X3NlYXJjaC1yZXN1bHRzXzFOZSB7XFxuICBwYWRkaW5nOiAxNnB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC12aWV3X3NlYXJjaC1yZXN1bHRzXzFOZSB7XFxuICAgICAgcGFkZGluZzogMDsgfSB9XFxuXFxuLnNlYXJjaC12aWV3X3NlYXJjaC10aXRsZV9iMXMge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtdmlld19zZWFyY2gtdGl0bGVfYjFzIHtcXG4gICAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG4uc2VhcmNoLXZpZXdfc2VhcmNoLXF1ZXJ5X3lxMSB7XFxuICBjb2xvcjogIzAwYjRhMjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJzZWFyY2gtY29udGFpbmVyXCI6IFwic2VhcmNoLXZpZXdfc2VhcmNoLWNvbnRhaW5lcl8yZ1dcIixcblx0XCJzZWFyY2gtcmVzdWx0c1wiOiBcInNlYXJjaC12aWV3X3NlYXJjaC1yZXN1bHRzXzFOZVwiLFxuXHRcInNlYXJjaC10aXRsZVwiOiBcInNlYXJjaC12aWV3X3NlYXJjaC10aXRsZV9iMXNcIixcblx0XCJzZWFyY2gtcXVlcnlcIjogXCJzZWFyY2gtdmlld19zZWFyY2gtcXVlcnlfeXExXCIsXG5cdFwiZmFkZUluXCI6IFwic2VhcmNoLXZpZXdfZmFkZUluXzFVdVwiLFxuXHRcImZseUluRnJvbUxlZnRcIjogXCJzZWFyY2gtdmlld19mbHlJbkZyb21MZWZ0XzMyRlwiLFxuXHRcImZseUluXCI6IFwic2VhcmNoLXZpZXdfZmx5SW5fZktwXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz97XCJzb3VyY2VNYXBcIjp0cnVlfSEuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtdmlldy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vc2VhcmNoLXJlc3VsdC5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0xLTMhLi9zZWFyY2gtcmVzdWx0LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vc2VhcmNoLXJlc3VsdC5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL3NlYXJjaC12aWV3L3NlYXJjaC1yZXN1bHQvc2VhcmNoLXJlc3VsdC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vc2VhcmNoLXZpZXcuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vc2VhcmNoLXZpZXcuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0xLTMhLi9zZWFyY2gtdmlldy5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL3NlYXJjaC12aWV3L3NlYXJjaC12aWV3LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9