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

var _urlSearchParams = __webpack_require__(285);

var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);

var _utils = __webpack_require__(49);

var _pageList = __webpack_require__(83);

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
exports.push([module.i, "@-webkit-keyframes search-result_fadeIn_3mX {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-result_fadeIn_3mX {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.search-result_result-container_38z {\n  width: 100%; }\n\n.search-result_result_2Oc {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  padding: 4px 0 25px 0;\n  border-bottom: 1px solid #324047;\n  cursor: pointer;\n  text-decoration: none; }\n  @media (max-width: 500px) {\n    .search-result_result_2Oc {\n      padding: 0px 8px 0px 48px;\n      border-bottom: none; } }\n\n.search-result_ripple_3iN {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n  @media (min-width: 500px) {\n    .search-result_ripple_3iN {\n      display: none; } }\n\n.search-result_result-title_1TE {\n  color: #00b4a2;\n  font-size: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-title_1TE {\n      color: #373737;\n      font-size: 16px;\n      margin: 16px 0; } }\n\n.search-result_result-url_1s9 {\n  font-size: 13px;\n  color: #007468;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  @media (max-width: 500px) {\n    .search-result_result-url_1s9 {\n      display: none; } }\n\n.search-result_result-route_NhW {\n  color: #373737;\n  font-size: 13px;\n  line-height: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-route_NhW {\n      display: none; } }\n", ""]);

// exports
exports.locals = {
	"result-container": "search-result_result-container_38z",
	"result": "search-result_result_2Oc",
	"ripple": "search-result_ripple_3iN",
	"result-title": "search-result_result-title_1TE",
	"result-url": "search-result_result-url_1s9",
	"result-route": "search-result_result-route_NhW",
	"fadeIn": "search-result_fadeIn_3mX"
};

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes search-view_fadeIn_1Uu {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-view_fadeIn_1Uu {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes search-view_flyIn_fKp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n@keyframes search-view_flyIn_fKp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n.search-view_search-container_2gW {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 75%;\n  padding: 80px 0;\n  margin: 0 auto; }\n  @media (max-width: 500px) {\n    .search-view_search-container_2gW {\n      width: 100%;\n      padding: 8px 0; } }\n\n.search-view_search-results_1Ne {\n  padding: 16px; }\n  @media (max-width: 500px) {\n    .search-view_search-results_1Ne {\n      padding: 0; } }\n\n.search-view_search-title_b1s {\n  font-weight: 400; }\n  @media (max-width: 500px) {\n    .search-view_search-title_b1s {\n      display: none; } }\n\n.search-view_search-query_yq1 {\n  color: #00b4a2;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n", ""]);

// exports
exports.locals = {
	"search-container": "search-view_search-container_2gW",
	"search-results": "search-view_search-results_1Ne",
	"search-title": "search-view_search-title_b1s",
	"search-query": "search-view_search-query_yq1",
	"fadeIn": "search-view_fadeIn_1Uu",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXZpZXcuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtcmVzdWx0L3NlYXJjaC1yZXN1bHQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtcmVzdWx0L3NlYXJjaC1yZXN1bHQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXZpZXcuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0LnNjc3M/M2ZmOSIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXZpZXcuc2Nzcz81NzAzIl0sIm5hbWVzIjpbIlNlYXJjaFJlc3VsdHMiLCJwcm9wcyIsInN0YXRlIiwiY3VyclF1ZXJ5IiwiX2ZldGNoU2VhcmNoUGFyYW0iLCJ0b2dnbGVXYXRlcmZhbGxIZWFkZXIiLCJwcm9ncmVzc1VwZGF0ZSIsInRvZ2dsZVNlYXJjaCIsInNlYXJjaCIsIm5leHRQcm9wcyIsInNldFN0YXRlIiwiX3VwZGF0ZVNlYXJjaFBhcmFtIiwicHJldlByb3BzIiwicGFnZUxpc3QiLCJsZW5ndGgiLCJ1cmwiLCJVUkwiLCJsb2NhdGlvbiIsInNlYXJjaFBhcmFtcyIsInAiLCJxdWVyeSIsInNldCIsInRvU3RyaW5nIiwid2luZG93IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImhyZWYiLCJyZXN1bHRzIiwiYWN0aXZlUGFnZXMiLCJtYXAiLCJwYWdlIiwic3lzIiwiaWQiLCJtYXBSZXN1bHRzIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImFycmF5IiwibWFwU3RhdGVUb1Byb3BzIiwic2VhcmNoT3BlbiIsInV0aWxzIiwiZW50cmllcyIsIm1hdGNoRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJvcGVuIiwidmlzaWJsZSIsInBlcmNlbnRhZ2UiLCJTZWFyY2hSZXN1bHQiLCJjYXRlZ29yeSIsImZpZWxkcyIsInNwZWNpZmljYXRpb24iLCJyZWciLCJSZWdFeHAiLCJmb3JtYXR0ZWROYW1lIiwibmFtZSIsInJlcGxhY2UiLCJzdHIiLCJmb3JtYXR0ZWRDYXQiLCJmb3JtYXR0ZWRTcGVjIiwicm91dGUiLCJyZXN1bHQiLCJfX2h0bWwiLCJyaXBwbGUiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTUEsYTs7O0FBRUoseUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4SEFDWEEsS0FEVzs7QUFFakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXLE1BQUtDLGlCQUFMO0FBREEsS0FBYjtBQUZpQjtBQUtsQjs7Ozt5Q0FFb0I7QUFDbkIsV0FBS0gsS0FBTCxDQUFXSSxxQkFBWCxDQUFpQyxLQUFqQztBQUNBLFdBQUtKLEtBQUwsQ0FBV0ssY0FBWCxDQUEwQixHQUExQjtBQUNBLFdBQUtMLEtBQUwsQ0FBV00sWUFBWCxDQUF3QixJQUF4Qjs7QUFFQSxXQUFLTixLQUFMLENBQVdPLE1BQVgsQ0FBa0IsS0FBS0osaUJBQUwsRUFBbEI7QUFDRDs7OzhDQUV5QkssUyxFQUFXO0FBQ25DLFdBQUtDLFFBQUwsQ0FBYztBQUNaUCxtQkFBV00sVUFBVU47QUFEVCxPQUFkOztBQUlBLFdBQUtRLGtCQUFMLENBQXdCRixVQUFVTixTQUFsQztBQUNEOzs7dUNBRWtCUyxTLEVBQVc7QUFDNUIsVUFBSUEsVUFBVUMs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RSxFQUFFLG1DQUFtQyxxQkFBcUIsRUFBRSwrQkFBK0IscUNBQXFDLHNCQUFzQixFQUFFLEVBQUUsbUNBQW1DLG1CQUFtQixxQkFBcUIsd0JBQXdCLDRCQUE0QixFQUFFOztBQUUzOEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7O0FDZEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdELHlDQUF5QywyQkFBMkI7QUFDcEUsbURBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLGdCQUFnQjtBQUN4RCxPQUFPO0FBQ1AscUNBQXFDLGFBQWEsRUFBRTtBQUNwRDs7Ozs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQiLCJmaWxlIjoic2VhcmNoLmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICd1cmwtc2VhcmNoLXBhcmFtcyc7XG5cbmltcG9ydCB7IHRvZ2dsZVNlYXJjaCwgdG9nZ2xlV2F0ZXJmYWxsSGVhZGVyLCBwcm9ncmVzc1VwZGF0ZSB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgc2VhcmNoIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9wYWdlLWxpc3QnO1xuXG5pbXBvcnQgU2VhcmNoUmVzdWx0IGZyb20gJy4vc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0JztcblxuaW1wb3J0IHMgZnJvbSAnLi9zZWFyY2gtdmlldy5zY3NzJztcblxuY2xhc3MgU2VhcmNoUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJRdWVyeTogdGhpcy5fZmV0Y2hTZWFyY2hQYXJhbSgpXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHsgICAgXG4gICAgdGhpcy5wcm9wcy50b2dnbGVXYXRlcmZhbGxIZWFkZXIoZmFsc2UpO1xuICAgIHRoaXMucHJvcHMucHJvZ3Jlc3NVcGRhdGUoMTAwKTtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZVNlYXJjaCh0cnVlKTtcblxuICAgIHRoaXMucHJvcHMuc2VhcmNoKHRoaXMuX2ZldGNoU2VhcmNoUGFyYW0oKSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY3VyclF1ZXJ5OiBuZXh0UHJvcHMuY3VyclF1ZXJ5XG4gICAgfSlcblxuICAgIHRoaXMuX3VwZGF0ZVNlYXJjaFBhcmFtKG5leHRQcm9wcy5jdXJyUXVlcnkpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChwcmV2UHJvcHMucGFnZUxpc3QubGVuZ3RoIDwgMSAmJiB0aGlzLnByb3BzLnBhZ2VMaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICB0aGlzLnByb3BzLnNlYXJjaCh0aGlzLl9mZXRjaFNlYXJjaFBhcmFtKCkpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlU2VhcmNoKGZhbHNlKTtcbiAgICB0aGlzLnByb3BzLnNlYXJjaCgnJyk7XG4gIH1cblxuICBfZmV0Y2hTZWFyY2hQYXJhbSgpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMucHJvcHMubG9jYXRpb24pO1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLnNlYXJjaClcbiAgICBmb3IgKGxldCBwIG9mIHNlYXJjaFBhcmFtcykge1xuICAgICAgaWYgKHBbMF0gPT09IFwic2VhcmNoXCIpIHJldHVybiBwWzFdO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIF91cGRhdGVTZWFyY2hQYXJhbShxdWVyeSkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodGhpcy5wcm9wcy5sb2NhdGlvbik7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmwuc2VhcmNoKVxuICAgIHNlYXJjaFBhcmFtcy5zZXQoJ3NlYXJjaCcsIHF1ZXJ5KTtcbiAgICB1cmwuc2VhcmNoID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIG51bGwsIHVybC5ocmVmKVxuICB9XG5cbiAgbWFwUmVzdWx0cygpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jdXJyUXVlcnkubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHRzID0gdGhpcy5wcm9wcy5hY3RpdmVQYWdlcy5tYXAoKHBhZ2UpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTZWFyY2hSZXN1bHRcbiAgICAgICAgICBrZXk9e3BhZ2Uuc3lzLmlkfVxuICAgICAgICAgIGN1cnJRdWVyeT17dGhpcy5zdGF0ZS5jdXJyUXVlcnl9XG4gICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzWydzZWFyY2gtY29udGFpbmVyJ119PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snc2VhcmNoLXJlc3VsdHMnXX0+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT17c1snc2VhcmNoLXRpdGxlJ119PlxuICAgICAgICAgICAgUmVzdWx0cyBmb3IgPHNwYW4gY2xhc3NOYW1lPXtzWydzZWFyY2gtcXVlcnknXX0+e3RoaXMuc3RhdGUuY3VyclF1ZXJ5fTwvc3Bhbj5cbiAgICAgICAgICA8L2gxPlxuICAgICAgICAgIHt0aGlzLm1hcFJlc3VsdHMoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaFJlc3VsdHMucHJvcFR5cGVzID0ge1xuICBjdXJyUXVlcnk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgYWN0aXZlUGFnZXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxufTtcblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgc2VhcmNoT3Blbjogc3RhdGUudXRpbHMuYWN0aXZlUGFnZXMsXG4gICAgY3VyclF1ZXJ5OiBzdGF0ZS5wYWdlTGlzdC5xdWVyeSxcbiAgICBhY3RpdmVQYWdlczogc3RhdGUucGFnZUxpc3QuYWN0aXZlUGFnZXMsXG4gICAgcGFnZUxpc3Q6IHN0YXRlLnBhZ2VMaXN0LmVudHJpZXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgc2VhcmNoOiAocXVlcnkpID0+IHsgZGlzcGF0Y2goc2VhcmNoKHF1ZXJ5KSk7IH0sXG4gICAgdG9nZ2xlU2VhcmNoOiAob3BlbikgPT4geyBkaXNwYXRjaCh0b2dnbGVTZWFyY2gob3BlbikpOyB9LFxuICAgIHRvZ2dsZVdhdGVyZmFsbEhlYWRlcjogKHZpc2libGUpID0+IHsgZGlzcGF0Y2godG9nZ2xlV2F0ZXJmYWxsSGVhZGVyKHZpc2libGUpKTsgfSxcbiAgICBwcm9ncmVzc1VwZGF0ZTogKHBlcmNlbnRhZ2UpID0+IHsgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUocGVyY2VudGFnZSkpOyB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXRjaERpc3BhdGNoVG9Qcm9wcykoU2VhcmNoUmVzdWx0cykpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL3NlYXJjaC12aWV3L3NlYXJjaC12aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IExpbmsgZnJvbSAnLi4vLi4vLi4vcm91dGUtaGFuZGxlci9saW5rL2xpbmsnO1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi8uLi9jb21tb24vcmlwcGxlL3JpcHBsZSc7XG5pbXBvcnQgcyBmcm9tICcuL3NlYXJjaC1yZXN1bHQuc2Nzcyc7XG5cbmNsYXNzIFNlYXJjaFJlc3VsdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gcGFnZS5maWVsZHMuY2F0ZWdvcnk7XG4gICAgY29uc3Qgc3BlY2lmaWNhdGlvbiA9IGNhdGVnb3J5LmZpZWxkcy5zcGVjaWZpY2F0aW9uO1xuXG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCh0aGlzLnByb3BzLmN1cnJRdWVyeSwgJ2dpJyk7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWROYW1lID0gcGFnZS5maWVsZHMubmFtZS5yZXBsYWNlKHJlZywgKHN0cikgPT4geyByZXR1cm4gYDxiPiR7c3RyfTwvYj5gOyB9KTtcbiAgICBjb25zdCBmb3JtYXR0ZWRDYXQgPSBjYXRlZ29yeS5maWVsZHMubmFtZS5yZXBsYWNlKHJlZywgKHN0cikgPT4geyByZXR1cm4gYDxiPiR7c3RyfTwvYj5gOyB9KTtcbiAgICBjb25zdCBmb3JtYXR0ZWRTcGVjID0gc3BlY2lmaWNhdGlvbi5maWVsZHMubmFtZS5yZXBsYWNlKHJlZywgKHN0cikgPT4geyByZXR1cm4gYDxiPiR7c3RyfTwvYj5gOyB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1sncmVzdWx0LWNvbnRhaW5lciddfT5cbiAgICAgICAgPExpbmsgcm91dGU9e3RoaXMucHJvcHMucGFnZS5maWVsZHMucm91dGV9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnJlc3VsdH0+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e3NbJ3Jlc3VsdC10aXRsZSddfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGZvcm1hdHRlZE5hbWUgfX0gLz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c1sncmVzdWx0LXVybCddfT57IHBhZ2UuZmllbGRzLnJvdXRlIH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e3NbJ3Jlc3VsdC1yb3V0ZSddfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGAke2Zvcm1hdHRlZFNwZWN9ID4gJHtmb3JtYXR0ZWRDYXR9ID4gJHtmb3JtYXR0ZWROYW1lfWAgfX0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnJpcHBsZX0+XG4gICAgICAgICAgICAgIDxSaXBwbGUgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaFJlc3VsdC5wcm9wVHlwZXMgPSB7XG4gIGN1cnJRdWVyeTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBwYWdlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFNlYXJjaFJlc3VsdCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0LmpzeCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBzZWFyY2gtcmVzdWx0X2ZhZGVJbl8zbVgge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyBzZWFyY2gtcmVzdWx0X2ZhZGVJbl8zbVgge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnNlYXJjaC1yZXN1bHRfcmVzdWx0LWNvbnRhaW5lcl8zOHoge1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uc2VhcmNoLXJlc3VsdF9yZXN1bHRfMk9jIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDRweCAwIDI1cHggMDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzI0MDQ3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1yZXN1bHRfcmVzdWx0XzJPYyB7XFxuICAgICAgcGFkZGluZzogMHB4IDhweCAwcHggNDhweDtcXG4gICAgICBib3JkZXItYm90dG9tOiBub25lOyB9IH1cXG5cXG4uc2VhcmNoLXJlc3VsdF9yaXBwbGVfM2lOIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA1MDBweCkge1xcbiAgICAuc2VhcmNoLXJlc3VsdF9yaXBwbGVfM2lOIHtcXG4gICAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG4uc2VhcmNoLXJlc3VsdF9yZXN1bHQtdGl0bGVfMVRFIHtcXG4gIGNvbG9yOiAjMDBiNGEyO1xcbiAgZm9udC1zaXplOiAyNHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1yZXN1bHRfcmVzdWx0LXRpdGxlXzFURSB7XFxuICAgICAgY29sb3I6ICMzNzM3Mzc7XFxuICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgIG1hcmdpbjogMTZweCAwOyB9IH1cXG5cXG4uc2VhcmNoLXJlc3VsdF9yZXN1bHQtdXJsXzFzOSB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBjb2xvcjogIzAwNzQ2ODtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuc2VhcmNoLXJlc3VsdF9yZXN1bHQtdXJsXzFzOSB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfSB9XFxuXFxuLnNlYXJjaC1yZXN1bHRfcmVzdWx0LXJvdXRlX05oVyB7XFxuICBjb2xvcjogIzM3MzczNztcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4OyB9XFxuICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLnNlYXJjaC1yZXN1bHRfcmVzdWx0LXJvdXRlX05oVyB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfSB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicmVzdWx0LWNvbnRhaW5lclwiOiBcInNlYXJjaC1yZXN1bHRfcmVzdWx0LWNvbnRhaW5lcl8zOHpcIixcblx0XCJyZXN1bHRcIjogXCJzZWFyY2gtcmVzdWx0X3Jlc3VsdF8yT2NcIixcblx0XCJyaXBwbGVcIjogXCJzZWFyY2gtcmVzdWx0X3JpcHBsZV8zaU5cIixcblx0XCJyZXN1bHQtdGl0bGVcIjogXCJzZWFyY2gtcmVzdWx0X3Jlc3VsdC10aXRsZV8xVEVcIixcblx0XCJyZXN1bHQtdXJsXCI6IFwic2VhcmNoLXJlc3VsdF9yZXN1bHQtdXJsXzFzOVwiLFxuXHRcInJlc3VsdC1yb3V0ZVwiOiBcInNlYXJjaC1yZXN1bHRfcmVzdWx0LXJvdXRlX05oV1wiLFxuXHRcImZhZGVJblwiOiBcInNlYXJjaC1yZXN1bHRfZmFkZUluXzNtWFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgc2VhcmNoLXZpZXdfZmFkZUluXzFVdSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNlYXJjaC12aWV3X2ZhZGVJbl8xVXUge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNlYXJjaC12aWV3X2ZseUluX2ZLcCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpOyB9XFxuICA1MCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNlYXJjaC12aWV3X2ZseUluX2ZLcCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwcHgpOyB9XFxuICA1MCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uc2VhcmNoLXZpZXdfc2VhcmNoLWNvbnRhaW5lcl8yZ1cge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgZmxleDogMTtcXG4gIHdpZHRoOiA3NSU7XFxuICBwYWRkaW5nOiA4MHB4IDA7XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtdmlld19zZWFyY2gtY29udGFpbmVyXzJnVyB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgcGFkZGluZzogOHB4IDA7IH0gfVxcblxcbi5zZWFyY2gtdmlld19zZWFyY2gtcmVzdWx0c18xTmUge1xcbiAgcGFkZGluZzogMTZweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5zZWFyY2gtdmlld19zZWFyY2gtcmVzdWx0c18xTmUge1xcbiAgICAgIHBhZGRpbmc6IDA7IH0gfVxcblxcbi5zZWFyY2gtdmlld19zZWFyY2gtdGl0bGVfYjFzIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuc2VhcmNoLXZpZXdfc2VhcmNoLXRpdGxlX2IxcyB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfSB9XFxuXFxuLnNlYXJjaC12aWV3X3NlYXJjaC1xdWVyeV95cTEge1xcbiAgY29sb3I6ICMwMGI0YTI7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwic2VhcmNoLWNvbnRhaW5lclwiOiBcInNlYXJjaC12aWV3X3NlYXJjaC1jb250YWluZXJfMmdXXCIsXG5cdFwic2VhcmNoLXJlc3VsdHNcIjogXCJzZWFyY2gtdmlld19zZWFyY2gtcmVzdWx0c18xTmVcIixcblx0XCJzZWFyY2gtdGl0bGVcIjogXCJzZWFyY2gtdmlld19zZWFyY2gtdGl0bGVfYjFzXCIsXG5cdFwic2VhcmNoLXF1ZXJ5XCI6IFwic2VhcmNoLXZpZXdfc2VhcmNoLXF1ZXJ5X3lxMVwiLFxuXHRcImZhZGVJblwiOiBcInNlYXJjaC12aWV3X2ZhZGVJbl8xVXVcIixcblx0XCJmbHlJblwiOiBcInNlYXJjaC12aWV3X2ZseUluX2ZLcFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3Mvc2VhcmNoLXZpZXcvc2VhcmNoLXZpZXcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL3NlYXJjaC1yZXN1bHQuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vc2VhcmNoLXJlc3VsdC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL3NlYXJjaC1yZXN1bHQuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtcmVzdWx0L3NlYXJjaC1yZXN1bHQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL3NlYXJjaC12aWV3LnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL3NlYXJjaC12aWV3LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vc2VhcmNoLXZpZXcuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9zZWFyY2gtdmlldy9zZWFyY2gtdmlldy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==