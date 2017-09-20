exports.ids = [1];
exports.modules = {

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes search-result_fadeIn_1SK {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-result_fadeIn_1SK {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.search-result_result_1TT {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  padding: 4px 0 25px 0;\n  border-bottom: 1px solid #324047;\n  cursor: pointer;\n  text-decoration: none; }\n  @media (max-width: 500px) {\n    .search-result_result_1TT {\n      padding: 0px 8px 0px 48px;\n      border-bottom: none; } }\n\n.search-result_ripple_2Lj {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n  @media (min-width: 500px) {\n    .search-result_ripple_2Lj {\n      display: none; } }\n\n.search-result_result-title_2o5 {\n  color: #00b4a2;\n  font-size: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-title_2o5 {\n      color: #373737;\n      font-size: 16px;\n      margin: 16px 0; } }\n\n.search-result_result-url_39b {\n  font-size: 13px;\n  color: #007468;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  @media (max-width: 500px) {\n    .search-result_result-url_39b {\n      display: none; } }\n\n.search-result_result-route_2t2 {\n  color: #373737;\n  font-size: 13px;\n  line-height: 24px; }\n  @media (max-width: 500px) {\n    .search-result_result-route_2t2 {\n      display: none; } }\n", ""]);

// exports
exports.locals = {
	"result": "search-result_result_1TT",
	"ripple": "search-result_ripple_2Lj",
	"result-title": "search-result_result-title_2o5",
	"result-url": "search-result_result-url_39b",
	"result-route": "search-result_result-route_2t2",
	"fadeIn": "search-result_fadeIn_1SK"
};

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes search-results_fadeIn_pSZ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes search-results_fadeIn_pSZ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes search-results_flyIn_1xB {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n@keyframes search-results_flyIn_1xB {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px); }\n  50% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    opacity: 1; } }\n\n.search-results_search-container_-Li {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 75%;\n  padding: 80px 0;\n  margin: 0 auto; }\n  @media (max-width: 500px) {\n    .search-results_search-container_-Li {\n      width: 100%;\n      padding: 8px 0; } }\n\n.search-results_search-results_27x {\n  padding: 16px; }\n  @media (max-width: 500px) {\n    .search-results_search-results_27x {\n      padding: 0; } }\n\n.search-results_search-title_1sI {\n  font-weight: 400; }\n  @media (max-width: 500px) {\n    .search-results_search-title_1sI {\n      display: none; } }\n\n.search-results_search-query_2hs {\n  color: #00b4a2;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n", ""]);

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

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(103);
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

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(104);
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

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _withStyles = __webpack_require__(3);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _searchResult = __webpack_require__(97);

var _searchResult2 = _interopRequireDefault(_searchResult);

var _searchResults = __webpack_require__(111);

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

/***/ 97:
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

var _route = __webpack_require__(10);

var _route2 = _interopRequireDefault(_route);

var _ripple = __webpack_require__(7);

var _ripple2 = _interopRequireDefault(_ripple);

var _searchResult = __webpack_require__(110);

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

/***/ })

};;
//# sourceMappingURL=1.server.js.map