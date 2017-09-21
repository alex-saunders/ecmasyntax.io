webpackJsonp([0],{

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(26);

var _withStyles = __webpack_require__(18);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _articleView = __webpack_require__(755);

var _articleView2 = _interopRequireDefault(_articleView);

var _atelierEstuaryLight = __webpack_require__(752);

var _atelierEstuaryLight2 = _interopRequireDefault(_atelierEstuaryLight);

var _activePage = __webpack_require__(285);

var _utils = __webpack_require__(52);

var _loadingView = __webpack_require__(186);

var _loadingView2 = _interopRequireDefault(_loadingView);

var _tag = __webpack_require__(743);

var _tag2 = _interopRequireDefault(_tag);

var _panel = __webpack_require__(742);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleView = function (_React$Component) {
  _inherits(ArticleView, _React$Component);

  function ArticleView(props) {
    _classCallCheck(this, ArticleView);

    return _possibleConstructorReturn(this, (ArticleView.__proto__ || Object.getPrototypeOf(ArticleView)).call(this, props));
  }

  _createClass(ArticleView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchArticle();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.page) {
        this.props.triggerScrollHandler();
      }
    }
  }, {
    key: 'fetchArticle',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.props.fetchPage(window.location.pathname);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchArticle() {
        return _ref.apply(this, arguments);
      }

      return fetchArticle;
    }()
  }, {
    key: 'mapReferences',
    value: function mapReferences() {
      var references = this.props.page.fields.references.map(function (reference) {
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
      var _this2 = this;

      var tags = this.props.page.fields.tags.map(function (tag, index) {
        return _react2.default.createElement(_tag2.default, {
          key: tag.sys.id,
          tag: tag,
          index: index,
          search: _this2.props.search,
          toggleSearch: _this2.props.toggleSearch
        });
      });
      return tags;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isLoading) {
        return _react2.default.createElement(_loadingView2.default, null);
      }
      if (this.props.page) {
        return _react2.default.createElement(
          'div',
          { className: _articleView2.default['markdown-wrapper'] },
          _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.page.fields.blob } }),
          _react2.default.createElement(
            'div',
            { className: _articleView2.default['footer-container'] },
            _react2.default.createElement(_panel2.default, {
              title: 'Tags',
              body: this.mapTags()
            }),
            _react2.default.createElement(_panel2.default, {
              title: 'References',
              body: _react2.default.createElement(
                'ol',
                null,
                this.mapReferences()
              )
            })
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          this.props.location
        );
      }
    }
  }]);

  return ArticleView;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    page: state.activePage.page,
    waterfallHeaderOpen: state.utils.waterfallHeaderOpen
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: function fetchPage(route) {
      dispatch((0, _activePage.fetchPage)(route));
    },
    toggleWaterfallHeader: function toggleWaterfallHeader(visible) {
      dispatch((0, _utils.toggleWaterfallHeader)(visible));
    }
  };
}

exports.default = (0, _withStyles2.default)(_articleView2.default, _atelierEstuaryLight2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(ArticleView));

/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(18);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _panel = __webpack_require__(753);

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

    _this._calcHeight = function () {
      _this.setState({
        maxHeight: _this.bodyContent.getBoundingClientRect().height
      });
    };

    _this._handleClick = function () {
      _this.setState(function (prevState) {
        return {
          closed: !prevState.closed
        };
      });
    };

    _this.state = {
      closed: false,
      maxHeight: ''
    };

    _this.maxHeight = 'none';
    return _this;
  }

  _createClass(Panel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._calcHeight();

      // yep this is horrible. TODO: Make this better.
      window.addEventListener('resize', this._calcHeight);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._calcHeight);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        maxHeight: this.state.closed ? '0px' : this.state.maxHeight
      };
      return _react2.default.createElement(
        'div',
        { className: _panel2.default.panel },
        _react2.default.createElement(
          'button',
          { className: _panel2.default['panel-title'], onClick: this._handleClick },
          this.props.title,
          _react2.default.createElement('div', { className: _panel2.default.filler }),
          _react2.default.createElement(
            'svg',
            {
              viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg',
              className: _panel2.default.expand + ' ' + (this.state.closed ? _panel2.default.closed : '')
            },
            _react2.default.createElement('path', { d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' }),
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: _panel2.default['panel-body--wrapper'] + ' ' + (this.state.closed ? _panel2.default.closed : ''),
            ref: function ref(div) {
              _this2.body = div;
            },
            style: style
          },
          _react2.default.createElement(
            'div',
            {
              className: _panel2.default['panel-body--content'],
              ref: function ref(div) {
                _this2.bodyContent = div;
              }
            },
            this.props.body
          )
        )
      );
    }
  }]);

  return Panel;
}(_react2.default.Component);

Panel.propTypes = {
  title: _react.PropTypes.string.isRequired,
  body: _react.PropTypes.any.isRequired
};

exports.default = (0, _withStyles2.default)(_panel2.default)(Panel);

/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(18);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _link = __webpack_require__(122);

var _link2 = _interopRequireDefault(_link);

var _tag = __webpack_require__(756);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = function (_React$Component) {
  _inherits(Tag, _React$Component);

  function Tag() {
    _classCallCheck(this, Tag);

    return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));
  }

  _createClass(Tag, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _link2.default,
        { className: _tag2.default.tag, route: '?search=taggedin:' + this.props.tag.fields.name },
        _react2.default.createElement(
          'span',
          null,
          this.props.index > 0 ? ', ' : '',
          this.props.tag.fields.name
        )
      );
    }
  }]);

  return Tag;
}(_react2.default.Component);

Tag.propTypes = {
  index: _react.PropTypes.number.isRequired,
  tag: _react.PropTypes.object.isRequired
};

exports.default = (0, _withStyles2.default)(_tag2.default)(Tag);

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, ".hljs-comment,\n.hljs-quote {\n    color: #6c6b5a\n}\n.hljs-variable,\n.hljs-template-variable,\n.hljs-attribute,\n.hljs-tag,\n.hljs-name,\n.hljs-regexp,\n.hljs-link,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class {\n    color: #ba6236\n}\n.hljs-number,\n.hljs-meta,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-literal,\n.hljs-type,\n.hljs-params {\n    color: #ae7313\n}\n.hljs-string,\n.hljs-symbol,\n.hljs-bullet {\n    color: #7d9726\n}\n.hljs-title,\n.hljs-section {\n    color: #36a166\n}\n.hljs-keyword,\n.hljs-selector-tag {\n    color: #5f9182\n}\n.hljs-deletion,\n.hljs-addition {\n    color: #22221b;\n    display: inline-block;\n    width: 100%\n}\n.hljs-deletion {\n    background-color: #ba6236\n}\n.hljs-addition {\n    background-color: #7d9726\n}\n.hljs {\n    display: block;\n    overflow-x: auto;\n    background: #f4f3ec;\n    color: #5f5e4e;\n    padding: 0.5em\n}\n.hljs-emphasis {\n    font-style: italic\n}\n.hljs-strong {\n    font-weight: bold\n}\n", ""]);

// exports


/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes panel_fadeIn_7f_ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes panel_fadeIn_7f_ {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.panel_panel_zYq {\n  border-radius: 3px;\n  margin: 16px 0;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4); }\n\n.panel_panel-title_1-o {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  border: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-weight: 500;\n  text-transform: uppercase;\n  font-size: 14px;\n  background: #fff;\n  color: #28353e;\n  padding: 16px;\n  margin: 0; }\n  .panel_panel-title_1-o .panel_filler_2Md {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  .panel_panel-title_1-o .panel_expand_2Ol {\n    fill: #28353e;\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg); }\n  .panel_panel-title_1-o .panel_expand_2Ol.panel_closed_3ea {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n\n.panel_panel-body--wrapper_3jY {\n  overflow: hidden;\n  opacity: 1;\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.panel_panel-body--wrapper_3jY.panel_closed_3ea {\n  opacity: 0; }\n\n.panel_panel-body--content_2xb {\n  padding: 8px 16px 16px 16px; }\n  .panel_panel-body--content_2xb p, .panel_panel-body--content_2xb ol {\n    margin: 0; }\n", ""]);

// exports
exports.locals = {
	"panel": "panel_panel_zYq",
	"panel-title": "panel_panel-title_1-o",
	"filler": "panel_filler_2Md",
	"expand": "panel_expand_2Ol",
	"closed": "panel_closed_3ea",
	"panel-body--wrapper": "panel_panel-body--wrapper_3jY",
	"panel-body--content": "panel_panel-body--content_2xb",
	"fadeIn": "panel_fadeIn_7f_"
};

/***/ }),

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);", ""]);

// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes article-view_fadeIn_akX {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes article-view_fadeIn_akX {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.article-view_footer-container_1iK {\n  margin-top: 24px;\n  border-top: 1px solid #eaecef; }\n\n.article-view_references-container_2OD li {\n  font-size: 16px; }\n\n.article-view_markdown-wrapper_2aX {\n  color: #212121;\n  line-height: 1.5;\n  -webkit-animation: article-view_fadeIn_akX 0.6s 1;\n          animation: article-view_fadeIn_akX 0.6s 1;\n  padding: 16px 32px 16px 32px; }\n  @media (max-width: 500px) {\n    .article-view_markdown-wrapper_2aX {\n      padding: 16px; } }\n  .article-view_markdown-wrapper_2aX h1,\n  .article-view_markdown-wrapper_2aX h2 {\n    font-weight: 300; }\n  .article-view_markdown-wrapper_2aX h3 {\n    font-weight: 400; }\n  .article-view_markdown-wrapper_2aX strong {\n    color: #333;\n    font-weight: 500; }\n  .article-view_markdown-wrapper_2aX h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em; }\n  .article-view_markdown-wrapper_2aX h2 {\n    font-size: 1.5em;\n    margin: 20px 0 20px;\n    border-bottom: 1px solid #eaecef; }\n  .article-view_markdown-wrapper_2aX h3 {\n    margin: 32px 0 16px; }\n  .article-view_markdown-wrapper_2aX p {\n    color: #373737; }\n  .article-view_markdown-wrapper_2aX pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 4px solid #00b4a2;\n    border-radius: 0px 3px 3px 0px;\n    white-space: pre-wrap; }\n    .article-view_markdown-wrapper_2aX pre code {\n      font-family: 'Roboto Mono', monospace;\n      font-size: 14px;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .article-view_markdown-wrapper_2aX table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .article-view_markdown-wrapper_2aX table tr {\n      background-color: #fff; }\n      .article-view_markdown-wrapper_2aX table tr th, .article-view_markdown-wrapper_2aX table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .article-view_markdown-wrapper_2aX table tr th {\n        font-weight: 500; }\n  .article-view_markdown-wrapper_2aX hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, 0.1); }\n  .article-view_markdown-wrapper_2aX a {\n    text-decoration: none;\n    color: #007468; }\n  .article-view_markdown-wrapper_2aX img {\n    max-width: 100%; }\n", ""]);

// exports
exports.locals = {
	"footer-container": "article-view_footer-container_1iK",
	"references-container": "article-view_references-container_2OD",
	"markdown-wrapper": "article-view_markdown-wrapper_2aX",
	"fadeIn": "article-view_fadeIn_akX"
};

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)();
// imports


// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes tag_fadeIn_2Q7 {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes tag_fadeIn_2Q7 {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.tag_tag_o8_ {\n  color: #007468;\n  text-decoration: none; }\n", ""]);

// exports
exports.locals = {
	"tag": "tag_tag_o8_",
	"fadeIn": "tag_fadeIn_2Q7"
};

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(745);
    var insertCss = __webpack_require__(16);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js!./atelier-estuary-light.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js!./atelier-estuary-light.css");

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
    var insertCss = __webpack_require__(16);

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
  

/***/ }),

/***/ 755:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(748);
    var insertCss = __webpack_require__(16);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./article-view.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./article-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(749);
    var insertCss = __webpack_require__(16);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./tag.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../../node_modules/sass-loader/lib/loader.js!./tag.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ })

});
//# sourceMappingURL=article.chunk.js.map