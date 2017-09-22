webpackJsonp([1],{

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(26);

var _withStyles = __webpack_require__(19);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _urlSearchParams = __webpack_require__(286);

var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);

var _utils = __webpack_require__(48);

var _pageList = __webpack_require__(83);

var _searchResult = __webpack_require__(739);

var _searchResult2 = _interopRequireDefault(_searchResult);

var _searchView = __webpack_require__(753);

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
  currQuery: _react.PropTypes.string.isRequired,
  activePages: _react.PropTypes.array.isRequired
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

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(19);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _link = __webpack_require__(184);

var _link2 = _interopRequireDefault(_link);

var _ripple = __webpack_require__(120);

var _ripple2 = _interopRequireDefault(_ripple);

var _searchResult = __webpack_require__(752);

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
  currQuery: _react.PropTypes.string.isRequired,
  page: _react.PropTypes.object.isRequired
};

exports.default = (0, _withStyles2.default)(_searchResult2.default)(SearchResult);

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes search-result_fadeIn_1SK {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-result_fadeIn_1SK {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.search-result_result-container_3AI {\n  width: 100%; }\n\n.search-result_result_1TT {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  padding: 4px 0 25px 0;\n  border-bottom: 1px solid #324047;\n  cursor: pointer;\n  text-decoration: none; }\n  @media (max-width: 500px) {\n    .search-result_result_1TT {\n      padding: 0px 8px 0px 48px;\n      border-bottom: none; } }\n\n.search-result_ripple_2Lj {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n  @media (min-width: 500px) {\n    .search-result_ripple_2Lj {\n      display: none; } }\n\n.search-result_result-title_2o5 {\n  color: #00b4a2;\n  font-size: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-title_2o5 {\n      color: #373737;\n      font-size: 16px;\n      margin: 16px 0; } }\n\n.search-result_result-url_39b {\n  font-size: 13px;\n  color: #007468;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  @media (max-width: 500px) {\n    .search-result_result-url_39b {\n      display: none; } }\n\n.search-result_result-route_2t2 {\n  color: #373737;\n  font-size: 13px;\n  line-height: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-route_2t2 {\n      display: none; } }\n", ""]);

// exports
exports.locals = {
	"result-container": "search-result_result-container_3AI",
	"result": "search-result_result_1TT",
	"ripple": "search-result_ripple_2Lj",
	"result-title": "search-result_result-title_2o5",
	"result-url": "search-result_result-url_39b",
	"result-route": "search-result_result-route_2t2",
	"fadeIn": "search-result_fadeIn_1SK"
};

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes search-view_fadeIn_2te {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-view_fadeIn_2te {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes search-view_flyIn_3G1 {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n@keyframes search-view_flyIn_3G1 {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n.search-view_search-container_2O3 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 75%;\n  padding: 80px 0;\n  margin: 0 auto; }\n  @media (max-width: 500px) {\n    .search-view_search-container_2O3 {\n      width: 100%;\n      padding: 8px 0; } }\n\n.search-view_search-results_2gn {\n  padding: 16px; }\n  @media (max-width: 500px) {\n    .search-view_search-results_2gn {\n      padding: 0; } }\n\n.search-view_search-title_3v_ {\n  font-weight: 400; }\n  @media (max-width: 500px) {\n    .search-view_search-title_3v_ {\n      display: none; } }\n\n.search-view_search-query_1To {\n  color: #00b4a2;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n", ""]);

// exports
exports.locals = {
	"search-container": "search-view_search-container_2O3",
	"search-results": "search-view_search-results_2gn",
	"search-title": "search-view_search-title_3v_",
	"search-query": "search-view_search-query_1To",
	"fadeIn": "search-view_fadeIn_2te",
	"flyIn": "search-view_flyIn_3G1"
};

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(745);
    var insertCss = __webpack_require__(18);

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

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(746);
    var insertCss = __webpack_require__(18);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./search-view.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./search-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ })

});
//# sourceMappingURL=search.chunk.js.map