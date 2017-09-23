webpackJsonp([0],{

/***/ 745:
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

var _articleView = __webpack_require__(760);

var _articleView2 = _interopRequireDefault(_articleView);

var _atelierEstuaryLight = __webpack_require__(757);

var _atelierEstuaryLight2 = _interopRequireDefault(_atelierEstuaryLight);

var _activePage = __webpack_require__(282);

var _utils = __webpack_require__(49);

var _loadingView = __webpack_require__(186);

var _loadingView2 = _interopRequireDefault(_loadingView);

var _tag = __webpack_require__(748);

var _tag2 = _interopRequireDefault(_tag);

var _panel = __webpack_require__(747);

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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // page has been retrieved
      if (this.props.page && !this.props.isLoading && prevProps.isLoading) {
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

/***/ 747:
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

var _panel = __webpack_require__(758);

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
  title: _propTypes2.default.string.isRequired,
  body: _propTypes2.default.any.isRequired
};

exports.default = (0, _withStyles2.default)(_panel2.default)(Panel);

/***/ }),

/***/ 748:
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

var _tag = __webpack_require__(761);

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
        'div',
        { className: _tag2.default['tag-wrapper'] },
        _react2.default.createElement(
          _link2.default,
          { className: _tag2.default.tag, route: '?search=taggedin:' + this.props.tag.fields.name },
          _react2.default.createElement(
            'span',
            null,
            this.props.index > 0 ? ', ' : '',
            this.props.tag.fields.name
          )
        )
      );
    }
  }]);

  return Tag;
}(_react2.default.Component);

Tag.propTypes = {
  index: _propTypes2.default.number.isRequired,
  tag: _propTypes2.default.object.isRequired
};

exports.default = (0, _withStyles2.default)(_tag2.default)(Tag);

/***/ }),

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, ".hljs-comment,\n.hljs-quote {\n    color: #6c6b5a\n}\n.hljs-variable,\n.hljs-template-variable,\n.hljs-attribute,\n.hljs-tag,\n.hljs-name,\n.hljs-regexp,\n.hljs-link,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class {\n    color: #ba6236\n}\n.hljs-number,\n.hljs-meta,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-literal,\n.hljs-type,\n.hljs-params {\n    color: #ae7313\n}\n.hljs-string,\n.hljs-symbol,\n.hljs-bullet {\n    color: #7d9726\n}\n.hljs-title,\n.hljs-section {\n    color: #36a166\n}\n.hljs-keyword,\n.hljs-selector-tag {\n    color: #5f9182\n}\n.hljs-deletion,\n.hljs-addition {\n    color: #22221b;\n    display: inline-block;\n    width: 100%\n}\n.hljs-deletion {\n    background-color: #ba6236\n}\n.hljs-addition {\n    background-color: #7d9726\n}\n.hljs {\n    display: block;\n    overflow-x: auto;\n    background: #f4f3ec;\n    color: #5f5e4e;\n    padding: 0.5em\n}\n.hljs-emphasis {\n    font-style: italic\n}\n.hljs-strong {\n    font-weight: bold\n}\n", ""]);

// exports


/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes panel_fadeIn_2Jf {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes panel_fadeIn_2Jf {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.panel_panel_2lI {\n  border-radius: 3px;\n  margin: 16px 0;\n  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, .4);\n          box-shadow: 0px 1px 2px rgba(0, 0, 0, .4); }\n\n.panel_panel-title_BLg {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  border: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-weight: 500;\n  text-transform: uppercase;\n  font-size: 14px;\n  background: #fff;\n  color: #28353e;\n  padding: 16px;\n  margin: 0; }\n  .panel_panel-title_BLg .panel_filler_1ye {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  .panel_panel-title_BLg .panel_expand_12R {\n    fill: #28353e;\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg); }\n  .panel_panel-title_BLg .panel_expand_12R.panel_closed_2NV {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n\n.panel_panel-body--wrapper_oSG {\n  overflow: hidden;\n  opacity: 1;\n  -webkit-transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.panel_panel-body--wrapper_oSG.panel_closed_2NV {\n  opacity: 0; }\n\n.panel_panel-body--content_2M0 {\n  padding: 8px 16px 16px 16px; }\n  .panel_panel-body--content_2M0 p, .panel_panel-body--content_2M0 ol {\n    margin: 0; }\n", ""]);

// exports
exports.locals = {
	"panel": "panel_panel_2lI",
	"panel-title": "panel_panel-title_BLg",
	"filler": "panel_filler_1ye",
	"expand": "panel_expand_12R",
	"closed": "panel_closed_2NV",
	"panel-body--wrapper": "panel_panel-body--wrapper_oSG",
	"panel-body--content": "panel_panel-body--content_2M0",
	"fadeIn": "panel_fadeIn_2Jf"
};

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);", ""]);

// module
exports.push([module.i, "@-webkit-keyframes article-view_fadeIn_1DI {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n@keyframes article-view_fadeIn_1DI {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.article-view_footer-container_3Vi {\n  margin-top: 24px;\n  border-top: 1px solid #eaecef; }\n\n.article-view_references-container_1W0 li {\n  font-size: 16px; }\n\n.article-view_markdown-wrapper_aLA {\n  color: #212121;\n  line-height: 1.5;\n  -webkit-animation: article-view_fadeIn_1DI 0.6s 1;\n          animation: article-view_fadeIn_1DI 0.6s 1;\n  padding: 16px 32px 16px 32px; }\n  @media (max-width: 500px) {\n    .article-view_markdown-wrapper_aLA {\n      padding: 16px; } }\n  .article-view_markdown-wrapper_aLA h1,\n  .article-view_markdown-wrapper_aLA h2 {\n    font-weight: 300; }\n  .article-view_markdown-wrapper_aLA h3 {\n    font-weight: 400; }\n  .article-view_markdown-wrapper_aLA strong {\n    color: #333;\n    font-weight: 500; }\n  .article-view_markdown-wrapper_aLA h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em; }\n  .article-view_markdown-wrapper_aLA h2 {\n    font-size: 1.5em;\n    margin: 20px 0 20px;\n    border-bottom: 1px solid #eaecef; }\n  .article-view_markdown-wrapper_aLA h3 {\n    margin: 32px 0 16px; }\n  .article-view_markdown-wrapper_aLA p {\n    color: #373737; }\n  .article-view_markdown-wrapper_aLA pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 4px solid #00b4a2;\n    border-radius: 0px 3px 3px 0px;\n    white-space: pre-wrap; }\n    .article-view_markdown-wrapper_aLA pre code {\n      font-family: 'Roboto Mono', monospace;\n      font-size: 14px;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .article-view_markdown-wrapper_aLA table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .article-view_markdown-wrapper_aLA table tr {\n      background-color: #fff; }\n      .article-view_markdown-wrapper_aLA table tr th, .article-view_markdown-wrapper_aLA table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .article-view_markdown-wrapper_aLA table tr th {\n        font-weight: 500; }\n  .article-view_markdown-wrapper_aLA hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, .1); }\n  .article-view_markdown-wrapper_aLA a {\n    text-decoration: none;\n    color: #007468; }\n  .article-view_markdown-wrapper_aLA img {\n    max-width: 100%; }\n", ""]);

// exports
exports.locals = {
	"footer-container": "article-view_footer-container_3Vi",
	"references-container": "article-view_references-container_1W0",
	"markdown-wrapper": "article-view_markdown-wrapper_aLA",
	"fadeIn": "article-view_fadeIn_1DI"
};

/***/ }),

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, "@-webkit-keyframes tag_fadeIn_3cA {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes tag_fadeIn_3cA {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.tag_tag-wrapper_1sF {\n  display: inline-block; }\n\n.tag_tag_fLd {\n  color: #007468;\n  text-decoration: none; }\n", ""]);

// exports
exports.locals = {
	"tag-wrapper": "tag_tag-wrapper_1sF",
	"tag": "tag_tag_fLd",
	"fadeIn": "tag_fadeIn_3cA"
};

/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(750);
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

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(751);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./panel.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./panel.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(753);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./article-view.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./article-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(754);
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
      module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./tag.scss", function() {
        content = require("!!../../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./tag.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYXJ0aWNsZS12aWV3L2FydGljbGUtdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9wYW5lbC9wYW5lbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2FydGljbGUtdmlldy90YWcvdGFnLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYXJ0aWNsZS12aWV3L2F0ZWxpZXItZXN0dWFyeS1saWdodC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9wYW5lbC9wYW5lbC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hcnRpY2xlLXZpZXcvYXJ0aWNsZS12aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2FydGljbGUtdmlldy90YWcvdGFnLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2FydGljbGUtdmlldy9hdGVsaWVyLWVzdHVhcnktbGlnaHQuY3NzP2VhYzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9wYW5lbC9wYW5lbC5zY3NzP2Q0NzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2FydGljbGUtdmlldy9hcnRpY2xlLXZpZXcuc2Nzcz85YjNkIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hcnRpY2xlLXZpZXcvdGFnL3RhZy5zY3NzPzAzYTIiXSwibmFtZXMiOlsiQXJ0aWNsZVZpZXciLCJwcm9wcyIsImZldGNoQXJ0aWNsZSIsInByZXZQcm9wcyIsInBhZ2UiLCJpc0xvYWRpbmciLCJ0cmlnZ2VyU2Nyb2xsSGFuZGxlciIsImZldGNoUGFnZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJyZWZlcmVuY2VzIiwiZmllbGRzIiwibWFwIiwicmVmZXJlbmNlIiwicmVmZXJlbmNlVGV4dCIsInR5cGUiLCJzeXMiLCJpZCIsImxpbmsiLCJuYW1lIiwidGFncyIsInRhZyIsImluZGV4Iiwic2VhcmNoIiwidG9nZ2xlU2VhcmNoIiwiX19odG1sIiwiYmxvYiIsIm1hcFRhZ3MiLCJtYXBSZWZlcmVuY2VzIiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJoYXNFcnJvcmVkIiwiYWN0aXZlUGFnZSIsIndhdGVyZmFsbEhlYWRlck9wZW4iLCJ1dGlscyIsIm1hdGNoRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJyb3V0ZSIsInRvZ2dsZVdhdGVyZmFsbEhlYWRlciIsInZpc2libGUiLCJQYW5lbCIsIl9jYWxjSGVpZ2h0Iiwic2V0U3RhdGUiLCJtYXhIZWlnaHQiLCJib2R5Q29udGVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsIl9oYW5kbGVDbGljayIsInByZXZTdGF0ZSIsImNsb3NlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3R5bGUiLCJwYW5lbCIsInRpdGxlIiwiZmlsbGVyIiwiZXhwYW5kIiwiZGl2IiwiYm9keSIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJhbnkiLCJUYWciLCJudW1iZXIiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVzs7O0FBRUosdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxSEFDWEEsS0FEVztBQUVsQjs7Ozt3Q0FFbUI7QUFDbEIsV0FBS0MsWUFB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QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQ7Ozs7Ozs7OztBQzNCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0QseUNBQXlDLDJCQUEyQjtBQUNwRSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELE9BQU87QUFDUCxxQ0FBcUMsYUFBYSxFQUFFO0FBQ3BEIiwiZmlsZSI6ImFydGljbGUuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL2FydGljbGUtdmlldy5zY3NzJztcbmltcG9ydCBoaWdobGlnaHQgZnJvbSAnLi9hdGVsaWVyLWVzdHVhcnktbGlnaHQuY3NzJztcblxuaW1wb3J0IHsgZmV0Y2hQYWdlIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9hY3RpdmUtcGFnZSc7XG5pbXBvcnQgeyB0b2dnbGVXYXRlcmZhbGxIZWFkZXIgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL3V0aWxzJztcbiBcbmltcG9ydCBMb2FkaW5nVmlldyBmcm9tICcuLi9sb2FkaW5nLXZpZXcvbG9hZGluZy12aWV3JztcbmltcG9ydCBUYWcgZnJvbSAnLi90YWcvdGFnJztcbmltcG9ydCBQYW5lbCBmcm9tICcuLi8uLi9jb21tb24vcGFuZWwvcGFuZWwnO1xuXG5jbGFzcyBBcnRpY2xlVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoQXJ0aWNsZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIC8vIHBhZ2UgaGFzIGJlZW4gcmV0cmlldmVkXG4gICAgaWYgKHRoaXMucHJvcHMucGFnZSAmJiAhdGhpcy5wcm9wcy5pc0xvYWRpbmcgJiYgcHJldlByb3BzLmlzTG9hZGluZykge1xuICAgICAgdGhpcy5wcm9wcy50cmlnZ2VyU2Nyb2xsSGFuZGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZldGNoQXJ0aWNsZSgpIHtcbiAgICB0aGlzLnByb3BzLmZldGNoUGFnZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgbWFwUmVmZXJlbmNlcygpIHtcbiAgICBjb25zdCByZWZlcmVuY2VzID0gdGhpcy5wcm9wcy5wYWdlLmZpZWxkcy5yZWZlcmVuY2VzLm1hcCgocmVmZXJlbmNlKSA9PiB7XG4gICAgICBsZXQgcmVmZXJlbmNlVGV4dDtcbiAgICAgIHN3aXRjaCAocmVmZXJlbmNlLmZpZWxkcy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ01ETic6XG4gICAgICAgICAgcmVmZXJlbmNlVGV4dCA9IChcbiAgICAgICAgICAgIDxsaSBrZXk9e3JlZmVyZW5jZS5zeXMuaWR9PlxuICAgICAgICAgICAgICA8YSBocmVmPXtyZWZlcmVuY2UuZmllbGRzLmxpbmt9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj57cmVmZXJlbmNlLmZpZWxkcy5uYW1lfTwvYT5cbiAgICAgICAgICAgICAgJm5ic3A7YnkgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTUROL0Fib3V0JGhpc3RvcnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+TW96aWxsYSBDb250cmlidXRvcnM8L2E+XG4gICAgICAgICAgICAgICwgbGljZW5zZWQgdW5kZXIgPGEgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8yLjUvXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPkNDLUJZLVNBIDIuNTwvYT4uXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VzNi1mZWF0dXJlcyc6XG4gICAgICAgICAgcmVmZXJlbmNlVGV4dCA9IChcbiAgICAgICAgICAgIDxsaSBrZXk9e3JlZmVyZW5jZS5zeXMuaWR9PlxuICAgICAgICAgICAgICA8YSBocmVmPXtyZWZlcmVuY2UuZmllbGRzLmxpbmt9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5lczYtZmVhdHVyZXMub3JnICZuZGFzaDsgPGk+e3JlZmVyZW5jZS5maWVsZHMubmFtZX08L2k+PC9hPlxuICAgICAgICAgICAgICAmbmJzcDtieSA8YSBocmVmPVwiXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlJhbGYgUy4gRW5nZWxzY2hhbGw8L2E+XG4gICAgICAgICAgICAgICwgbGljZW5zZWQgdW5kZXIgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9yc2UvZXM2LWZlYXR1cmVzL2Jsb2IvZ2gtcGFnZXMvTElDRU5TRS50eHRcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+TUlUPC9hPi5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZWZlcmVuY2VUZXh0ID0gKFxuICAgICAgICAgICAgPGxpIGtleT17cmVmZXJlbmNlLnN5cy5pZH0+XG4gICAgICAgICAgICAgIDxhIGhyZWY9e3JlZmVyZW5jZS5maWVsZHMubGlua30gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPntyZWZlcmVuY2UuZmllbGRzLm5hbWV9PC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlZmVyZW5jZVRleHQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlZmVyZW5jZXM7XG4gIH1cblxuICBtYXBUYWdzKCkge1xuICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnByb3BzLnBhZ2UuZmllbGRzLnRhZ3MubWFwKCh0YWcsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGFnXG4gICAgICAgICAga2V5PXt0YWcuc3lzLmlkfVxuICAgICAgICAgIHRhZz17dGFnfVxuICAgICAgICAgIGluZGV4PXtpbmRleH1cbiAgICAgICAgICBzZWFyY2g9e3RoaXMucHJvcHMuc2VhcmNofVxuICAgICAgICAgIHRvZ2dsZVNlYXJjaD17dGhpcy5wcm9wcy50b2dnbGVTZWFyY2h9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiB0YWdzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmlzTG9hZGluZykge1xuICAgICAgcmV0dXJuIDxMb2FkaW5nVmlldyAvPjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMucGFnZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ21hcmtkb3duLXdyYXBwZXInXX0+ICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRoaXMucHJvcHMucGFnZS5maWVsZHMuYmxvYiB9fSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2Zvb3Rlci1jb250YWluZXInXX0+XG4gICAgICAgICAgICAgIDxQYW5lbFxuICAgICAgICAgICAgICAgIHRpdGxlPVwiVGFnc1wiXG4gICAgICAgICAgICAgICAgYm9keT17dGhpcy5tYXBUYWdzKCl9XG4gICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgPFBhbmVsXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJSZWZlcmVuY2VzXCJcbiAgICAgICAgICAgICAgICBib2R5PXs8b2w+e3RoaXMubWFwUmVmZXJlbmNlcygpfTwvb2w+fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj57IHRoaXMucHJvcHMubG9jYXRpb24gfTwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBoYXNFcnJvcmVkOiBzdGF0ZS5hY3RpdmVQYWdlLmhhc0Vycm9yZWQsXG4gICAgaXNMb2FkaW5nOiBzdGF0ZS5hY3RpdmVQYWdlLmlzTG9hZGluZyxcbiAgICBwYWdlOiBzdGF0ZS5hY3RpdmVQYWdlLnBhZ2UsXG4gICAgd2F0ZXJmYWxsSGVhZGVyT3Blbjogc3RhdGUudXRpbHMud2F0ZXJmYWxsSGVhZGVyT3BlbixcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIHtcbiAgICBmZXRjaFBhZ2U6IChyb3V0ZSkgPT4geyBkaXNwYXRjaChmZXRjaFBhZ2Uocm91dGUpKTsgfSxcbiAgICB0b2dnbGVXYXRlcmZhbGxIZWFkZXI6ICh2aXNpYmxlKSA9PiB7IGRpc3BhdGNoKHRvZ2dsZVdhdGVyZmFsbEhlYWRlcih2aXNpYmxlKSk7IH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocywgaGlnaGxpZ2h0KShjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWF0Y2hEaXNwYXRjaFRvUHJvcHMpKEFydGljbGVWaWV3KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYXJ0aWNsZS12aWV3L2FydGljbGUtdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBzIGZyb20gJy4vcGFuZWwuc2Nzcyc7XG5cbmNsYXNzIFBhbmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjbG9zZWQ6IGZhbHNlLFxuICAgICAgbWF4SGVpZ2h0OiAnJyxcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhIZWlnaHQgPSAnbm9uZSc7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9jYWxjSGVpZ2h0KCk7XG5cbiAgICAvLyB5ZXAgdGhpcyBpcyBob3JyaWJsZS4gVE9ETzogTWFrZSB0aGlzIGJldHRlci5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fY2FsY0hlaWdodCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fY2FsY0hlaWdodCk7XG4gIH1cblxuICBfY2FsY0hlaWdodCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1heEhlaWdodDogdGhpcy5ib2R5Q29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBfaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZWQ6ICFwcmV2U3RhdGUuY2xvc2VkLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIG1heEhlaWdodDogdGhpcy5zdGF0ZS5jbG9zZWQgPyAnMHB4JyA6IHRoaXMuc3RhdGUubWF4SGVpZ2h0LFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnBhbmVsfT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3NbJ3BhbmVsLXRpdGxlJ119IG9uQ2xpY2s9e3RoaXMuX2hhbmRsZUNsaWNrfT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5maWxsZXJ9IC8+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7cy5leHBhbmR9ICR7dGhpcy5zdGF0ZS5jbG9zZWQgPyBzLmNsb3NlZCA6ICcnfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xNi41OSA4LjU5TDEyIDEzLjE3IDcuNDEgOC41OSA2IDEwbDYgNiA2LTZ6XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7c1sncGFuZWwtYm9keS0td3JhcHBlciddfSAke3RoaXMuc3RhdGUuY2xvc2VkID8gcy5jbG9zZWQgOiAnJ31gfVxuICAgICAgICAgIHJlZj17KGRpdikgPT4geyB0aGlzLmJvZHkgPSBkaXY7IH19XG4gICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzWydwYW5lbC1ib2R5LS1jb250ZW50J119XG4gICAgICAgICAgICByZWY9eyhkaXYpID0+IHsgdGhpcy5ib2R5Q29udGVudCA9IGRpdjsgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5ib2R5fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuUGFuZWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBib2R5OiBQcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFBhbmVsKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy9jb21tb24vcGFuZWwvcGFuZWwuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5cbmltcG9ydCBMaW5rIGZyb20gJy4uLy4uLy4uL3JvdXRlLWhhbmRsZXIvbGluay9saW5rJztcblxuaW1wb3J0IHMgZnJvbSAnLi90YWcuc2Nzcyc7XG5cbmNsYXNzIFRhZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1sndGFnLXdyYXBwZXInXX0+XG4gICAgICA8TGluayBjbGFzc05hbWU9e3MudGFnfSByb3V0ZT17YD9zZWFyY2g9dGFnZ2VkaW46JHt0aGlzLnByb3BzLnRhZy5maWVsZHMubmFtZX1gfT5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge3RoaXMucHJvcHMuaW5kZXggPiAwID8gJywgJyA6ICcnfVxuICAgICAgICAgIHt0aGlzLnByb3BzLnRhZy5maWVsZHMubmFtZX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYWcucHJvcFR5cGVzID0ge1xuICBpbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICB0YWc6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoVGFnKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hcnRpY2xlLXZpZXcvdGFnL3RhZy5qc3giLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuaGxqcy1jb21tZW50LFxcbi5obGpzLXF1b3RlIHtcXG4gICAgY29sb3I6ICM2YzZiNWFcXG59XFxuLmhsanMtdmFyaWFibGUsXFxuLmhsanMtdGVtcGxhdGUtdmFyaWFibGUsXFxuLmhsanMtYXR0cmlidXRlLFxcbi5obGpzLXRhZyxcXG4uaGxqcy1uYW1lLFxcbi5obGpzLXJlZ2V4cCxcXG4uaGxqcy1saW5rLFxcbi5obGpzLW5hbWUsXFxuLmhsanMtc2VsZWN0b3ItaWQsXFxuLmhsanMtc2VsZWN0b3ItY2xhc3Mge1xcbiAgICBjb2xvcjogI2JhNjIzNlxcbn1cXG4uaGxqcy1udW1iZXIsXFxuLmhsanMtbWV0YSxcXG4uaGxqcy1idWlsdF9pbixcXG4uaGxqcy1idWlsdGluLW5hbWUsXFxuLmhsanMtbGl0ZXJhbCxcXG4uaGxqcy10eXBlLFxcbi5obGpzLXBhcmFtcyB7XFxuICAgIGNvbG9yOiAjYWU3MzEzXFxufVxcbi5obGpzLXN0cmluZyxcXG4uaGxqcy1zeW1ib2wsXFxuLmhsanMtYnVsbGV0IHtcXG4gICAgY29sb3I6ICM3ZDk3MjZcXG59XFxuLmhsanMtdGl0bGUsXFxuLmhsanMtc2VjdGlvbiB7XFxuICAgIGNvbG9yOiAjMzZhMTY2XFxufVxcbi5obGpzLWtleXdvcmQsXFxuLmhsanMtc2VsZWN0b3ItdGFnIHtcXG4gICAgY29sb3I6ICM1ZjkxODJcXG59XFxuLmhsanMtZGVsZXRpb24sXFxuLmhsanMtYWRkaXRpb24ge1xcbiAgICBjb2xvcjogIzIyMjIxYjtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMTAwJVxcbn1cXG4uaGxqcy1kZWxldGlvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNiYTYyMzZcXG59XFxuLmhsanMtYWRkaXRpb24ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2Q5NzI2XFxufVxcbi5obGpzIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93LXg6IGF1dG87XFxuICAgIGJhY2tncm91bmQ6ICNmNGYzZWM7XFxuICAgIGNvbG9yOiAjNWY1ZTRlO1xcbiAgICBwYWRkaW5nOiAwLjVlbVxcbn1cXG4uaGxqcy1lbXBoYXNpcyB7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpY1xcbn1cXG4uaGxqcy1zdHJvbmcge1xcbiAgICBmb250LXdlaWdodDogYm9sZFxcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hcnRpY2xlLXZpZXcvYXRlbGllci1lc3R1YXJ5LWxpZ2h0LmNzc1xuLy8gbW9kdWxlIGlkID0gNzUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBwYW5lbF9mYWRlSW5fMkpmIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgcGFuZWxfZmFkZUluXzJKZiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4ucGFuZWxfcGFuZWxfMmxJIHtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIG1hcmdpbjogMTZweCAwO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMXB4IDJweCByZ2JhKDAsIDAsIDAsIC40KTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggcmdiYSgwLCAwLCAwLCAuNCk7IH1cXG5cXG4ucGFuZWxfcGFuZWwtdGl0bGVfQkxnIHtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgY29sb3I6ICMyODM1M2U7XFxuICBwYWRkaW5nOiAxNnB4O1xcbiAgbWFyZ2luOiAwOyB9XFxuICAucGFuZWxfcGFuZWwtdGl0bGVfQkxnIC5wYW5lbF9maWxsZXJfMXllIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICAgIGZsZXg6IDE7IH1cXG4gIC5wYW5lbF9wYW5lbC10aXRsZV9CTGcgLnBhbmVsX2V4cGFuZF8xMlIge1xcbiAgICBmaWxsOiAjMjgzNTNlO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxcbiAgLnBhbmVsX3BhbmVsLXRpdGxlX0JMZyAucGFuZWxfZXhwYW5kXzEyUi5wYW5lbF9jbG9zZWRfMk5WIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcblxcbi5wYW5lbF9wYW5lbC1ib2R5LS13cmFwcGVyX29TRyB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgb3BhY2l0eTogMTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSksIG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjRzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSksIG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuXFxuLnBhbmVsX3BhbmVsLWJvZHktLXdyYXBwZXJfb1NHLnBhbmVsX2Nsb3NlZF8yTlYge1xcbiAgb3BhY2l0eTogMDsgfVxcblxcbi5wYW5lbF9wYW5lbC1ib2R5LS1jb250ZW50XzJNMCB7XFxuICBwYWRkaW5nOiA4cHggMTZweCAxNnB4IDE2cHg7IH1cXG4gIC5wYW5lbF9wYW5lbC1ib2R5LS1jb250ZW50XzJNMCBwLCAucGFuZWxfcGFuZWwtYm9keS0tY29udGVudF8yTTAgb2wge1xcbiAgICBtYXJnaW46IDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJwYW5lbFwiOiBcInBhbmVsX3BhbmVsXzJsSVwiLFxuXHRcInBhbmVsLXRpdGxlXCI6IFwicGFuZWxfcGFuZWwtdGl0bGVfQkxnXCIsXG5cdFwiZmlsbGVyXCI6IFwicGFuZWxfZmlsbGVyXzF5ZVwiLFxuXHRcImV4cGFuZFwiOiBcInBhbmVsX2V4cGFuZF8xMlJcIixcblx0XCJjbG9zZWRcIjogXCJwYW5lbF9jbG9zZWRfMk5WXCIsXG5cdFwicGFuZWwtYm9keS0td3JhcHBlclwiOiBcInBhbmVsX3BhbmVsLWJvZHktLXdyYXBwZXJfb1NHXCIsXG5cdFwicGFuZWwtYm9keS0tY29udGVudFwiOiBcInBhbmVsX3BhbmVsLWJvZHktLWNvbnRlbnRfMk0wXCIsXG5cdFwiZmFkZUluXCI6IFwicGFuZWxfZmFkZUluXzJKZlwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4vfi9wb3N0Y3NzLWxvYWRlcj97XCJpZGVudFwiOlwicG9zdGNzc1wiLFwic291cmNlTWFwXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1wic291cmNlTWFwXCI6dHJ1ZX0hLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbW9uL3BhbmVsL3BhbmVsLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvK01vbm8pO1wiLCBcIlwiXSk7XG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGFydGljbGUtdmlld19mYWRlSW5fMURJIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcbkBrZXlmcmFtZXMgYXJ0aWNsZS12aWV3X2ZhZGVJbl8xREkge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLmFydGljbGUtdmlld19mb290ZXItY29udGFpbmVyXzNWaSB7XFxuICBtYXJnaW4tdG9wOiAyNHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlYWVjZWY7IH1cXG5cXG4uYXJ0aWNsZS12aWV3X3JlZmVyZW5jZXMtY29udGFpbmVyXzFXMCBsaSB7XFxuICBmb250LXNpemU6IDE2cHg7IH1cXG5cXG4uYXJ0aWNsZS12aWV3X21hcmtkb3duLXdyYXBwZXJfYUxBIHtcXG4gIGNvbG9yOiAjMjEyMTIxO1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBhcnRpY2xlLXZpZXdfZmFkZUluXzFESSAwLjZzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogYXJ0aWNsZS12aWV3X2ZhZGVJbl8xREkgMC42cyAxO1xcbiAgcGFkZGluZzogMTZweCAzMnB4IDE2cHggMzJweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5hcnRpY2xlLXZpZXdfbWFya2Rvd24td3JhcHBlcl9hTEEge1xcbiAgICAgIHBhZGRpbmc6IDE2cHg7IH0gfVxcbiAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSBoMSxcXG4gIC5hcnRpY2xlLXZpZXdfbWFya2Rvd24td3JhcHBlcl9hTEEgaDIge1xcbiAgICBmb250LXdlaWdodDogMzAwOyB9XFxuICAuYXJ0aWNsZS12aWV3X21hcmtkb3duLXdyYXBwZXJfYUxBIGgzIHtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDsgfVxcbiAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSBzdHJvbmcge1xcbiAgICBjb2xvcjogIzMzMztcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSBoMSB7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwLjNlbTtcXG4gICAgZm9udC1zaXplOiAyZW07IH1cXG4gIC5hcnRpY2xlLXZpZXdfbWFya2Rvd24td3JhcHBlcl9hTEEgaDIge1xcbiAgICBmb250LXNpemU6IDEuNWVtO1xcbiAgICBtYXJnaW46IDIwcHggMCAyMHB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWNlZjsgfVxcbiAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSBoMyB7XFxuICAgIG1hcmdpbjogMzJweCAwIDE2cHg7IH1cXG4gIC5hcnRpY2xlLXZpZXdfbWFya2Rvd24td3JhcHBlcl9hTEEgcCB7XFxuICAgIGNvbG9yOiAjMzczNzM3OyB9XFxuICAuYXJ0aWNsZS12aWV3X21hcmtkb3duLXdyYXBwZXJfYUxBIHByZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNmY4ZmE7XFxuICAgIHBhZGRpbmc6IDhweCA4cHggOHB4IDE2cHg7XFxuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzAwYjRhMjtcXG4gICAgYm9yZGVyLXJhZGl1czogMHB4IDNweCAzcHggMHB4O1xcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7IH1cXG4gICAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSBwcmUgY29kZSB7XFxuICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8gTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgLW1vei10YWItc2l6ZTogMjtcXG4gICAgICAgIC1vLXRhYi1zaXplOiAyO1xcbiAgICAgICAgICAgdGFiLXNpemU6IDI7IH1cXG4gIC5hcnRpY2xlLXZpZXdfbWFya2Rvd24td3JhcHBlcl9hTEEgdGFibGUge1xcbiAgICBib3JkZXItc3BhY2luZzogMDtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgfVxcbiAgICAuYXJ0aWNsZS12aWV3X21hcmtkb3duLXdyYXBwZXJfYUxBIHRhYmxlIHRyIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9XFxuICAgICAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSB0YWJsZSB0ciB0aCwgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSB0YWJsZSB0ciB0ZCB7XFxuICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZmUyZTU7IH1cXG4gICAgICAuYXJ0aWNsZS12aWV3X21hcmtkb3duLXdyYXBwZXJfYUxBIHRhYmxlIHRyIHRoIHtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC5hcnRpY2xlLXZpZXdfbWFya2Rvd24td3JhcHBlcl9hTEEgaHIge1xcbiAgICBib3JkZXItd2lkdGg6IDNweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC4xKTsgfVxcbiAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSBhIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogIzAwNzQ2ODsgfVxcbiAgLmFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQSBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJmb290ZXItY29udGFpbmVyXCI6IFwiYXJ0aWNsZS12aWV3X2Zvb3Rlci1jb250YWluZXJfM1ZpXCIsXG5cdFwicmVmZXJlbmNlcy1jb250YWluZXJcIjogXCJhcnRpY2xlLXZpZXdfcmVmZXJlbmNlcy1jb250YWluZXJfMVcwXCIsXG5cdFwibWFya2Rvd24td3JhcHBlclwiOiBcImFydGljbGUtdmlld19tYXJrZG93bi13cmFwcGVyX2FMQVwiLFxuXHRcImZhZGVJblwiOiBcImFydGljbGUtdmlld19mYWRlSW5fMURJXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz97XCJzb3VyY2VNYXBcIjp0cnVlfSEuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hcnRpY2xlLXZpZXcvYXJ0aWNsZS12aWV3LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgdGFnX2ZhZGVJbl8zY0Ege1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQGtleWZyYW1lcyB0YWdfZmFkZUluXzNjQSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4udGFnX3RhZy13cmFwcGVyXzFzRiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG4udGFnX3RhZ19mTGQge1xcbiAgY29sb3I6ICMwMDc0Njg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJ0YWctd3JhcHBlclwiOiBcInRhZ190YWctd3JhcHBlcl8xc0ZcIixcblx0XCJ0YWdcIjogXCJ0YWdfdGFnX2ZMZFwiLFxuXHRcImZhZGVJblwiOiBcInRhZ19mYWRlSW5fM2NBXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz97XCJzb3VyY2VNYXBcIjp0cnVlfSEuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hcnRpY2xlLXZpZXcvdGFnL3RhZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2F0ZWxpZXItZXN0dWFyeS1saWdodC5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9hdGVsaWVyLWVzdHVhcnktbGlnaHQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9hdGVsaWVyLWVzdHVhcnktbGlnaHQuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2FydGljbGUtdmlldy9hdGVsaWVyLWVzdHVhcnktbGlnaHQuY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vcGFuZWwuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vcGFuZWwuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0xLTMhLi9wYW5lbC5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL2NvbW1vbi9wYW5lbC9wYW5lbC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vYXJ0aWNsZS12aWV3LnNjc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL2FydGljbGUtdmlldy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL2FydGljbGUtdmlldy5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2FydGljbGUtdmlldy9hcnRpY2xlLXZpZXcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL3RhZy5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0xLTMhLi90YWcuc2Nzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0xLTMhLi90YWcuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hcnRpY2xlLXZpZXcvdGFnL3RhZy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==