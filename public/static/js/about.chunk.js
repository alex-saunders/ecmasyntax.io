webpackJsonp([2],{

/***/ 734:
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

var _mdcSwitch = __webpack_require__(285);

var _mdcSwitch2 = _interopRequireDefault(_mdcSwitch);

var _activePage = __webpack_require__(283);

var _utils = __webpack_require__(48);

var _offlineCache = __webpack_require__(284);

var _aboutView = __webpack_require__(749);

var _aboutView2 = _interopRequireDefault(_aboutView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AboutView = function (_React$Component) {
  _inherits(AboutView, _React$Component);

  function AboutView(props) {
    _classCallCheck(this, AboutView);

    var _this = _possibleConstructorReturn(this, (AboutView.__proto__ || Object.getPrototypeOf(AboutView)).call(this, props));

    _this._setAutoDownload = function () {
      (0, _offlineCache.setAutoDownload)(!_this.state.autoDownload).then(function () {
        _this.setState({
          autoDownload: !_this.state.autoDownload
        });
      });
    };

    _this.state = {
      autoDownload: false
    };
    return _this;
  }

  _createClass(AboutView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.setActivePageTitle('About');
      this.props.setActiveRoute('/about');
      this.props.toggleWaterfallHeader(false);

      this.props.progressUpdate(100);

      (0, _offlineCache.getAutoDownloadVal)().then(function (autoDownloadVal) {
        _this2.setState({
          autoDownload: autoDownloadVal
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _aboutView2.default['about-container'] },
        _react2.default.createElement(
          'div',
          { className: _aboutView2.default['markdown-wrapper'] },
          _react2.default.createElement(
            'h1',
            null,
            'ECMASyntax.io'
          ),
          _react2.default.createElement(
            'h2',
            null,
            'About'
          ),
          _react2.default.createElement(
            'p',
            null,
            'ECMASyntax is an offline-first PWA designed for developers. It aims to provide a reference for JavaScript syntax, detailing what pieces of syntax do, and how to use them. Currently, only the newest features of the JavaScript specification are given, but the content will hopefully be updated over time to include more legacy additions.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'This is an OPEN source project, created by',
            _react2.default.createElement(
              'a',
              { href: 'https://twitter.com/AlexJRsaunders', target: '_blank', rel: 'noopener noreferrer' },
              ' @alexjrsaunders'
            ),
            ', so please feel free to help out by',
            _react2.default.createElement(
              'a',
              { href: 'https://github.com/alex-saunders/ecmasyntax.io', target: '_blank', rel: 'noopener noreferrer' },
              ' reporting bugs, forking and opening pull requests when possible'
            ),
            '.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'To get started, select one of the items in the menu (and don\'t forget to add to your homescreen!)'
          ),
          _react2.default.createElement(
            'h2',
            null,
            'Credits'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The design for this site was inspired by',
            _react2.default.createElement(
              'a',
              { href: 'http://cssreference.io/', target: '_blank', rel: 'noopener noreferrer' },
              ' HTML/CSSReference.io '
            ),
            '(2 very awesome sites, go check em out!), created by',
            _react2.default.createElement(
              'a',
              { href: 'https://twitter.com/jgthms', target: '_blank', rel: 'noopener noreferrer' },
              ' @jgthms'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'Content heavily references the material available on the',
            _react2.default.createElement(
              'a',
              { href: 'https://developer.mozilla.org/en-US/docs/MDN/About$history', target: '_blank', rel: 'noopener noreferrer' },
              ' Mozilla Developer Network'
            ),
            '. As well as the awesome ',
            _react2.default.createElement(
              'a',
              { href: 'http://es6-features.org/#Constants', target: '_blank', rel: 'noopener noreferrer' },
              ' es6-features.org'
            )
          ),
          _react2.default.createElement(
            'h2',
            null,
            'Settings'
          ),
          _react2.default.createElement(
            'div',
            { className: _aboutView2.default.settings },
            _react2.default.createElement(
              'label',
              {
                htmlFor: 'auto-download-switch',
                className: _aboutView2.default['settings-row'] + ' ' + _aboutView2.default['row-label']
              },
              _react2.default.createElement(
                'div',
                { className: _aboutView2.default['row-descriptor'] },
                _react2.default.createElement(
                  'p',
                  { className: _aboutView2.default['descriptor-title'] },
                  'Auto Download Content'
                ),
                _react2.default.createElement(
                  'p',
                  { className: _aboutView2.default['descriptor-detail'] },
                  'Automatically download all content you visit for offline use'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: _aboutView2.default['row-action'] },
                _react2.default.createElement(
                  'button',
                  { className: 'mdc-switch ' + _aboutView2.default['switch-button'] },
                  _react2.default.createElement('input', {
                    type: 'checkbox', id: 'auto-download-switch',
                    className: 'mdc-switch__native-control ' + _aboutView2.default.input,
                    checked: this.state.autoDownload,
                    onChange: this._setAutoDownload
                  }),
                  _react2.default.createElement(
                    'div',
                    { className: 'mdc-switch__background' },
                    _react2.default.createElement('div', { className: 'mdc-switch__knob' })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AboutView;
}(_react2.default.Component);

AboutView.propTypes = {
  autoDownload: _react.PropTypes.bool,
  setAutoDownload: _react.PropTypes.func.isRequired
};

AboutView.defaultProps = {
  autoDownload: null
};

function mapStateToProps(state) {
  return {};
}

function matchDispatchToProps(dispatch) {
  return {
    setActivePageTitle: function setActivePageTitle(title) {
      dispatch((0, _activePage.setActivePageTitle)(title));
    },
    setActiveRoute: function setActiveRoute(route) {
      dispatch((0, _activePage.setActiveRoute)(route));
    },
    progressUpdate: function progressUpdate(percentage) {
      dispatch((0, _utils.progressUpdate)(percentage));
    },
    toggleWaterfallHeader: function toggleWaterfallHeader(visible) {
      dispatch((0, _utils.toggleWaterfallHeader)(visible));
    }
  };
}

exports.default = (0, _withStyles2.default)(_aboutView2.default, _mdcSwitch2.default)((0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)(AboutView));

/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);", ""]);

// module
exports.push([module.i, ":root {\n  --mdc-theme-primary: #00b4a2; }\n\n@-webkit-keyframes about-view_fadeIn_1Uk {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes about-view_fadeIn_1Uk {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n:root {\n  --mdc-theme-primary: #00b4a2; }\n\n@keyframes about-view_fadeIn_1Uk {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.about-view_footer-container_gHc {\n  margin-top: 24px;\n  border-top: 1px solid #eaecef; }\n\n.about-view_references-container_3t2 li {\n  font-size: 16px; }\n\n.about-view_markdown-wrapper_2bk {\n  color: #212121;\n  line-height: 1.5;\n  -webkit-animation: about-view_fadeIn_1Uk 0.6s 1;\n          animation: about-view_fadeIn_1Uk 0.6s 1;\n  padding: 16px 32px 16px 32px; }\n  @media (max-width: 500px) {\n    .about-view_markdown-wrapper_2bk {\n      padding: 16px; } }\n  .about-view_markdown-wrapper_2bk h1,\n  .about-view_markdown-wrapper_2bk h2 {\n    font-weight: 300; }\n  .about-view_markdown-wrapper_2bk h3 {\n    font-weight: 400; }\n  .about-view_markdown-wrapper_2bk strong {\n    color: #333;\n    font-weight: 500; }\n  .about-view_markdown-wrapper_2bk h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em; }\n  .about-view_markdown-wrapper_2bk h2 {\n    font-size: 1.5em;\n    margin: 20px 0 20px;\n    border-bottom: 1px solid #eaecef; }\n  .about-view_markdown-wrapper_2bk h3 {\n    margin: 32px 0 16px; }\n  .about-view_markdown-wrapper_2bk p {\n    color: #373737; }\n  .about-view_markdown-wrapper_2bk pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 4px solid #00b4a2;\n    border-radius: 0px 3px 3px 0px;\n    white-space: pre-wrap; }\n    .about-view_markdown-wrapper_2bk pre code {\n      font-family: 'Roboto Mono', monospace;\n      font-size: 14px;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .about-view_markdown-wrapper_2bk table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .about-view_markdown-wrapper_2bk table tr {\n      background-color: #fff; }\n      .about-view_markdown-wrapper_2bk table tr th, .about-view_markdown-wrapper_2bk table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .about-view_markdown-wrapper_2bk table tr th {\n        font-weight: 500; }\n  .about-view_markdown-wrapper_2bk hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, 0.1); }\n  .about-view_markdown-wrapper_2bk a {\n    text-decoration: none;\n    color: #007468; }\n  .about-view_markdown-wrapper_2bk img {\n    max-width: 100%; }\n\n.about-view_about-container_2Pn {\n  -webkit-animation: about-view_fadeIn_1Uk .6s 1;\n          animation: about-view_fadeIn_1Uk .6s 1; }\n  .about-view_about-container_2Pn .about-view_share_2W0 {\n    display: inline-block;\n    height: 28px;\n    width: 28px; }\n    .about-view_about-container_2Pn .about-view_share_2W0 i {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      font-size: 28px; }\n    .about-view_about-container_2Pn .about-view_share_2W0 .about-view_facebook_3YI {\n      color: #3B5998; }\n    .about-view_about-container_2Pn .about-view_share_2W0 .about-view_twitter_14x {\n      color: #4099FF; }\n\n.about-view_settings__9O .about-view_settings-row_3y6 {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  .about-view_settings__9O .about-view_settings-row_3y6 .about-view_row-descriptor_1pJ {\n    padding: 0; }\n    .about-view_settings__9O .about-view_settings-row_3y6 .about-view_row-descriptor_1pJ .about-view_descriptor-title_34s {\n      padding: 0;\n      margin: 0;\n      font-size: 16px; }\n    .about-view_settings__9O .about-view_settings-row_3y6 .about-view_row-descriptor_1pJ .about-view_descriptor-detail_1B0 {\n      padding: 0;\n      margin: 0;\n      font-size: 14px;\n      color: grey; }\n  .about-view_settings__9O .about-view_settings-row_3y6 .about-view_row-action_nmd {\n    margin-left: 8px; }\n\n.about-view_settings__9O .about-view_row-label_Non {\n  cursor: pointer; }\n\n.about-view_switch-button_1Zn {\n  background: none;\n  border: none; }\n", ""]);

// exports
exports.locals = {
	"footer-container": "about-view_footer-container_gHc",
	"references-container": "about-view_references-container_3t2",
	"markdown-wrapper": "about-view_markdown-wrapper_2bk",
	"fadeIn": "about-view_fadeIn_1Uk",
	"about-container": "about-view_about-container_2Pn",
	"share": "about-view_share_2W0",
	"facebook": "about-view_facebook_3YI",
	"twitter": "about-view_twitter_14x",
	"settings": "about-view_settings__9O",
	"settings-row": "about-view_settings-row_3y6",
	"row-descriptor": "about-view_row-descriptor_1pJ",
	"descriptor-title": "about-view_descriptor-title_34s",
	"descriptor-detail": "about-view_descriptor-detail_1B0",
	"row-action": "about-view_row-action_nmd",
	"row-label": "about-view_row-label_Non",
	"switch-button": "about-view_switch-button_1Zn"
};

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(742);
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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./about-view.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js??ref--1-2!../../../../node_modules/sass-loader/lib/loader.js!./about-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ })

});
//# sourceMappingURL=about.chunk.js.map