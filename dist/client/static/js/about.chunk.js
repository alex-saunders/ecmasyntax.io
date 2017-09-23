webpackJsonp([2],{

/***/ 744:
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

var _mdcSwitch = __webpack_require__(283);

var _mdcSwitch2 = _interopRequireDefault(_mdcSwitch);

var _activePage = __webpack_require__(281);

var _utils = __webpack_require__(49);

var _offlineCache = __webpack_require__(282);

var _aboutView = __webpack_require__(759);

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
  autoDownload: _propTypes2.default.bool,
  setAutoDownload: _propTypes2.default.func.isRequired
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

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);", ""]);

// module
exports.push([module.i, "@-webkit-keyframes about-view_fadeIn_2Ns {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n@keyframes about-view_fadeIn_2Ns {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@-webkit-keyframes about-view_flyInFromLeft_3Kq {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes about-view_flyInFromLeft_3Kq {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n@keyframes about-view_fadeIn_2Ns {\n  from {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n            transform: translateY(20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes about-view_flyInFromLeft_3Kq {\n  from {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  to {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0); } }\n\n.about-view_footer-container_DCr {\n  margin-top: 24px;\n  border-top: 1px solid #eaecef; }\n\n.about-view_references-container_1wJ li {\n  font-size: 16px; }\n\n.about-view_markdown-wrapper_2-m {\n  -webkit-animation: about-view_fadeIn_2Ns 0.4s 1;\n          animation: about-view_fadeIn_2Ns 0.4s 1;\n  color: #212121;\n  line-height: 1.5;\n  padding: 16px 32px 16px 32px; }\n  @media (max-width: 500px) {\n    .about-view_markdown-wrapper_2-m {\n      padding: 16px; } }\n  .about-view_markdown-wrapper_2-m h1,\n  .about-view_markdown-wrapper_2-m h2 {\n    font-weight: 300; }\n  .about-view_markdown-wrapper_2-m h3 {\n    font-weight: 400; }\n  .about-view_markdown-wrapper_2-m strong {\n    color: #333;\n    font-weight: 500; }\n  .about-view_markdown-wrapper_2-m h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em; }\n  .about-view_markdown-wrapper_2-m h2 {\n    font-size: 1.5em;\n    margin: 20px 0 20px;\n    border-bottom: 1px solid #eaecef; }\n  .about-view_markdown-wrapper_2-m h3 {\n    margin: 32px 0 16px; }\n  .about-view_markdown-wrapper_2-m p {\n    color: #373737; }\n  .about-view_markdown-wrapper_2-m pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 4px solid #00b4a2;\n    border-radius: 0px 3px 3px 0px;\n    white-space: pre-wrap; }\n    .about-view_markdown-wrapper_2-m pre code {\n      font-family: 'Roboto Mono', monospace;\n      font-size: 14px;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .about-view_markdown-wrapper_2-m table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .about-view_markdown-wrapper_2-m table tr {\n      background-color: #fff; }\n      .about-view_markdown-wrapper_2-m table tr th, .about-view_markdown-wrapper_2-m table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .about-view_markdown-wrapper_2-m table tr th {\n        font-weight: 500; }\n  .about-view_markdown-wrapper_2-m hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, .1); }\n  .about-view_markdown-wrapper_2-m a {\n    text-decoration: none;\n    color: #007468; }\n  .about-view_markdown-wrapper_2-m img {\n    max-width: 100%; }\n\n.about-view_about-container_2fu {\n  -webkit-animation: about-view_fadeIn_2Ns 0.4s 1;\n          animation: about-view_fadeIn_2Ns 0.4s 1; }\n  .about-view_about-container_2fu .about-view_share_1sT {\n    display: inline-block;\n    height: 28px;\n    width: 28px; }\n    .about-view_about-container_2fu .about-view_share_1sT i {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      font-size: 28px; }\n    .about-view_about-container_2fu .about-view_share_1sT .about-view_facebook_1VF {\n      color: #3B5998; }\n    .about-view_about-container_2fu .about-view_share_1sT .about-view_twitter_2Pz {\n      color: #4099FF; }\n\n.about-view_settings_162 .about-view_settings-row_JDq {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-descriptor_1k9 {\n    padding: 0; }\n    .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-descriptor_1k9 .about-view_descriptor-title_1Rd {\n      padding: 0;\n      margin: 0;\n      font-size: 16px; }\n    .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-descriptor_1k9 .about-view_descriptor-detail_1r3 {\n      padding: 0;\n      margin: 0;\n      font-size: 14px;\n      color: grey; }\n  .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-action_nbl {\n    margin-left: 8px; }\n\n.about-view_settings_162 .about-view_row-label_Tax {\n  cursor: pointer; }\n\n.about-view_switch-button_3er {\n  background: none;\n  border: none; }\n", ""]);

// exports
exports.locals = {
	"footer-container": "about-view_footer-container_DCr",
	"references-container": "about-view_references-container_1wJ",
	"markdown-wrapper": "about-view_markdown-wrapper_2-m",
	"fadeIn": "about-view_fadeIn_2Ns",
	"about-container": "about-view_about-container_2fu",
	"share": "about-view_share_1sT",
	"facebook": "about-view_facebook_1VF",
	"twitter": "about-view_twitter_2Pz",
	"settings": "about-view_settings_162",
	"settings-row": "about-view_settings-row_JDq",
	"row-descriptor": "about-view_row-descriptor_1k9",
	"descriptor-title": "about-view_descriptor-title_1Rd",
	"descriptor-detail": "about-view_descriptor-detail_1r3",
	"row-action": "about-view_row-action_nbl",
	"row-label": "about-view_row-label_Tax",
	"switch-button": "about-view_switch-button_3er",
	"flyInFromLeft": "about-view_flyInFromLeft_3Kq"
};

/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(752);
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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./about-view.scss", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../../../node_modules/postcss-loader/index.js??postcss!../../../../../node_modules/sass-loader/lib/loader.js??ref--1-3!./about-view.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYWJvdXQtdmlldy9hYm91dC12aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYWJvdXQtdmlldy9hYm91dC12aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2Fib3V0LXZpZXcvYWJvdXQtdmlldy5zY3NzP2FlNjIiXSwibmFtZXMiOlsiQWJvdXRWaWV3IiwicHJvcHMiLCJfc2V0QXV0b0Rvd25sb2FkIiwic3RhdGUiLCJhdXRvRG93bmxvYWQiLCJ0aGVuIiwic2V0U3RhdGUiLCJzZXRBY3RpdmVQYWdlVGl0bGUiLCJzZXRBY3RpdmVSb3V0ZSIsInRvZ2dsZVdhdGVyZmFsbEhlYWRlciIsInByb2dyZXNzVXBkYXRlIiwiYXV0b0Rvd25sb2FkVmFsIiwic2V0dGluZ3MiLCJpbnB1dCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImJvb2wiLCJzZXRBdXRvRG93bmxvYWQiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImRlZmF1bHRQcm9wcyIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hdGNoRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJ0aXRsZSIsInJvdXRlIiwicGVyY2VudGFnZSIsInZpc2libGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU1BLFM7OztBQUVKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1hBLEtBRFc7O0FBQUEsVUF3Qm5CQyxnQkF4Qm1CLEdBd0JBLFlBQU07QUFDdkIseUNBQWdCLENBQUMsTUFBS0MsS0FBTCxDQUFXQyxZQUE1QixFQUEwQ0MsSUFBMUMsQ0FBK0MsWUFBTTtBQUNuRCxjQUFLQyxRQUFMLENBQWM7QUFDWkYs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NEIsbUJBQW1CLGtCQUFrQixFQUFFLCtEQUErRCwyQkFBMkIsb0JBQW9CLHFCQUFxQix3QkFBd0IsRUFBRSxzRkFBc0YsdUJBQXVCLEVBQUUscUZBQXFGLHVCQUF1QixFQUFFLDJEQUEyRCx5QkFBeUIseUJBQXlCLGtCQUFrQixtQ0FBbUMsa0NBQWtDLGdDQUFnQyxnQ0FBZ0MsOEJBQThCLCtCQUErQiwyQ0FBMkMsRUFBRSwwRkFBMEYsaUJBQWlCLEVBQUUsNkhBQTZILG1CQUFtQixrQkFBa0Isd0JBQXdCLEVBQUUsOEhBQThILG1CQUFtQixrQkFBa0Isd0JBQXdCLG9CQUFvQixFQUFFLHNGQUFzRix1QkFBdUIsRUFBRSx3REFBd0Qsb0JBQW9CLEVBQUUsbUNBQW1DLHFCQUFxQixpQkFBaUIsRUFBRTs7QUFFN2hMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7QUN6QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdELHlDQUF5QywyQkFBMkI7QUFDcEUsbURBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLGdCQUFnQjtBQUN4RCxPQUFPO0FBQ1AscUNBQXFDLGFBQWEsRUFBRTtBQUNwRCIsImZpbGUiOiJhYm91dC5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBzd2l0Y2hTdHlsZXMgZnJvbSAnQG1hdGVyaWFsL3N3aXRjaC9kaXN0L21kYy5zd2l0Y2guY3NzJztcblxuaW1wb3J0IHsgc2V0QWN0aXZlUGFnZVRpdGxlLCBzZXRBY3RpdmVSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvYWN0aXZlLXBhZ2UnO1xuaW1wb3J0IHsgcHJvZ3Jlc3NVcGRhdGUsIHRvZ2dsZVdhdGVyZmFsbEhlYWRlciB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvdXRpbHMnO1xuXG5pbXBvcnQgeyBnZXRBdXRvRG93bmxvYWRWYWwsIHNldEF1dG9Eb3dubG9hZCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL29mZmxpbmUtY2FjaGUnO1xuXG5pbXBvcnQgcyBmcm9tICcuL2Fib3V0LXZpZXcuc2Nzcyc7XG5cbmNsYXNzIEFib3V0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhdXRvRG93bmxvYWQ6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuc2V0QWN0aXZlUGFnZVRpdGxlKCdBYm91dCcpO1xuICAgIHRoaXMucHJvcHMuc2V0QWN0aXZlUm91dGUoJy9hYm91dCcpO1xuICAgIHRoaXMucHJvcHMudG9nZ2xlV2F0ZXJmYWxsSGVhZGVyKGZhbHNlKTtcbiAgICBcbiAgICB0aGlzLnByb3BzLnByb2dyZXNzVXBkYXRlKDEwMCk7XG5cbiAgICBnZXRBdXRvRG93bmxvYWRWYWwoKS50aGVuKChhdXRvRG93bmxvYWRWYWwpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBhdXRvRG93bmxvYWQ6IGF1dG9Eb3dubG9hZFZhbFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgX3NldEF1dG9Eb3dubG9hZCA9ICgpID0+IHtcbiAgICBzZXRBdXRvRG93bmxvYWQoIXRoaXMuc3RhdGUuYXV0b0Rvd25sb2FkKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBhdXRvRG93bmxvYWQ6ICF0aGlzLnN0YXRlLmF1dG9Eb3dubG9hZFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c1snYWJvdXQtY29udGFpbmVyJ119PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1snbWFya2Rvd24td3JhcHBlciddfT5cbiAgICAgICAgICA8aDE+XG4gICAgICAgICAgICBFQ01BU3ludGF4LmlvXG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgICA8aDI+XG4gICAgICAgICAgICBBYm91dFxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBFQ01BU3ludGF4IGlzIGFuIG9mZmxpbmUtZmlyc3QgUFdBIGRlc2lnbmVkIGZvciBkZXZlbG9wZXJzLlxuICAgICAgICAgICAgSXQgYWltcyB0byBwcm92aWRlIGEgcmVmZXJlbmNlIGZvciBKYXZhU2NyaXB0IHN5bnRheCxcbiAgICAgICAgICAgIGRldGFpbGluZyB3aGF0IHBpZWNlcyBvZiBzeW50YXggZG8sIGFuZCBob3cgdG8gdXNlIHRoZW0uXG4gICAgICAgICAgICBDdXJyZW50bHksIG9ubHkgdGhlIG5ld2VzdCBmZWF0dXJlcyBvZiB0aGUgSmF2YVNjcmlwdCBzcGVjaWZpY2F0aW9uIGFyZSBnaXZlbixcbiAgICAgICAgICAgIGJ1dCB0aGUgY29udGVudCB3aWxsIGhvcGVmdWxseSBiZSB1cGRhdGVkIG92ZXIgdGltZVxuICAgICAgICAgICAgdG8gaW5jbHVkZSBtb3JlIGxlZ2FjeSBhZGRpdGlvbnMuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgVGhpcyBpcyBhbiBPUEVOIHNvdXJjZSBwcm9qZWN0LCBjcmVhdGVkIGJ5XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9BbGV4SlJzYXVuZGVyc1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj4gQGFsZXhqcnNhdW5kZXJzPC9hPlxuICAgICAgICAgICAgLCBzbyBwbGVhc2UgZmVlbCBmcmVlIHRvIGhlbHAgb3V0IGJ5XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FsZXgtc2F1bmRlcnMvZWNtYXN5bnRheC5pb1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj4gcmVwb3J0aW5nIGJ1Z3MsIGZvcmtpbmcgYW5kIG9wZW5pbmcgcHVsbCByZXF1ZXN0cyB3aGVuIHBvc3NpYmxlPC9hPi5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBUbyBnZXQgc3RhcnRlZCwgc2VsZWN0IG9uZSBvZiB0aGUgaXRlbXMgaW4gdGhlIG1lbnVcbiAgICAgICAgICAgIChhbmQgZG9uJiMzOTt0IGZvcmdldCB0byBhZGQgdG8geW91ciBob21lc2NyZWVuISlcbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGgyPkNyZWRpdHM8L2gyPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgVGhlIGRlc2lnbiBmb3IgdGhpcyBzaXRlIHdhcyBpbnNwaXJlZCBieVxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9jc3NyZWZlcmVuY2UuaW8vXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPiBIVE1ML0NTU1JlZmVyZW5jZS5pbyA8L2E+XG4gICAgICAgICAgICAoMiB2ZXJ5IGF3ZXNvbWUgc2l0ZXMsIGdvIGNoZWNrIGVtIG91dCEpLCBjcmVhdGVkIGJ5XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9qZ3RobXNcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+IEBqZ3RobXM8L2E+XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgQ29udGVudCBoZWF2aWx5IHJlZmVyZW5jZXMgdGhlIG1hdGVyaWFsIGF2YWlsYWJsZSBvbiB0aGVcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL01ETi9BYm91dCRoaXN0b3J5XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPiBNb3ppbGxhIERldmVsb3BlciBOZXR3b3JrPC9hPi5cbiAgICAgICAgICAgIEFzIHdlbGwgYXMgdGhlIGF3ZXNvbWUgPGEgaHJlZj1cImh0dHA6Ly9lczYtZmVhdHVyZXMub3JnLyNDb25zdGFudHNcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+IGVzNi1mZWF0dXJlcy5vcmc8L2E+XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxoMj5cbiAgICAgICAgICAgIFNldHRpbmdzXG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5zZXR0aW5nc30+XG4gICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgaHRtbEZvcj1cImF1dG8tZG93bmxvYWQtc3dpdGNoXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzWydzZXR0aW5ncy1yb3cnXX0gJHtzWydyb3ctbGFiZWwnXX1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1sncm93LWRlc2NyaXB0b3InXX0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzWydkZXNjcmlwdG9yLXRpdGxlJ119PlxuICAgICAgICAgICAgICAgICAgQXV0byBEb3dubG9hZCBDb250ZW50XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c1snZGVzY3JpcHRvci1kZXRhaWwnXX0+XG4gICAgICAgICAgICAgICAgICBBdXRvbWF0aWNhbGx5IGRvd25sb2FkIGFsbCBjb250ZW50IHlvdSB2aXNpdCBmb3Igb2ZmbGluZSB1c2VcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c1sncm93LWFjdGlvbiddfT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YG1kYy1zd2l0Y2ggJHtzWydzd2l0Y2gtYnV0dG9uJ119YH0+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJhdXRvLWRvd25sb2FkLXN3aXRjaFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YG1kYy1zd2l0Y2hfX25hdGl2ZS1jb250cm9sICR7cy5pbnB1dH1gfVxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXsodGhpcy5zdGF0ZS5hdXRvRG93bmxvYWQpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fc2V0QXV0b0Rvd25sb2FkfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWRjLXN3aXRjaF9fYmFja2dyb3VuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kYy1zd2l0Y2hfX2tub2JcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFib3V0Vmlldy5wcm9wVHlwZXMgPSB7XG4gIGF1dG9Eb3dubG9hZDogUHJvcFR5cGVzLmJvb2wsXG4gIHNldEF1dG9Eb3dubG9hZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkFib3V0Vmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9Eb3dubG9hZDogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgc2V0QWN0aXZlUGFnZVRpdGxlOiAodGl0bGUpID0+IHsgZGlzcGF0Y2goc2V0QWN0aXZlUGFnZVRpdGxlKHRpdGxlKSk7IH0sXG4gICAgc2V0QWN0aXZlUm91dGU6IChyb3V0ZSkgPT4geyBkaXNwYXRjaChzZXRBY3RpdmVSb3V0ZShyb3V0ZSkpOyB9LFxuICAgIHByb2dyZXNzVXBkYXRlOiAocGVyY2VudGFnZSkgPT4geyBkaXNwYXRjaChwcm9ncmVzc1VwZGF0ZShwZXJjZW50YWdlKSk7IH0sXG4gICAgdG9nZ2xlV2F0ZXJmYWxsSGVhZGVyOiAodmlzaWJsZSkgPT4geyBkaXNwYXRjaCh0b2dnbGVXYXRlcmZhbGxIZWFkZXIodmlzaWJsZSkpOyB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMsIHN3aXRjaFN0eWxlcykoY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hdGNoRGlzcGF0Y2hUb1Byb3BzKShBYm91dFZpZXcpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hYm91dC12aWV3L2Fib3V0LXZpZXcuanN4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bytNb25vKTtcIiwgXCJcIl0pO1xuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBhYm91dC12aWV3X2ZhZGVJbl8yTnMge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcbkBrZXlmcmFtZXMgYWJvdXQtdmlld19mYWRlSW5fMk5zIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYWJvdXQtdmlld19mbHlJbkZyb21MZWZ0XzNLcSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGFib3V0LXZpZXdfZmx5SW5Gcm9tTGVmdF8zS3Ege1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBhYm91dC12aWV3X2ZhZGVJbl8yTnMge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgYWJvdXQtdmlld19mbHlJbkZyb21MZWZ0XzNLcSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwcHgpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9IH1cXG5cXG4uYWJvdXQtdmlld19mb290ZXItY29udGFpbmVyX0RDciB7XFxuICBtYXJnaW4tdG9wOiAyNHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlYWVjZWY7IH1cXG5cXG4uYWJvdXQtdmlld19yZWZlcmVuY2VzLWNvbnRhaW5lcl8xd0ogbGkge1xcbiAgZm9udC1zaXplOiAxNnB4OyB9XFxuXFxuLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGFib3V0LXZpZXdfZmFkZUluXzJOcyAwLjRzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogYWJvdXQtdmlld19mYWRlSW5fMk5zIDAuNHMgMTtcXG4gIGNvbG9yOiAjMjEyMTIxO1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIHBhZGRpbmc6IDE2cHggMzJweCAxNnB4IDMycHg7IH1cXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSB7XFxuICAgICAgcGFkZGluZzogMTZweDsgfSB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBoMSxcXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIGgyIHtcXG4gICAgZm9udC13ZWlnaHQ6IDMwMDsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gaDMge1xcbiAgICBmb250LXdlaWdodDogNDAwOyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBzdHJvbmcge1xcbiAgICBjb2xvcjogIzMzMztcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gaDEge1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMC4zZW07XFxuICAgIGZvbnQtc2l6ZTogMmVtOyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIG1hcmdpbjogMjBweCAwIDIwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWFlY2VmOyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBoMyB7XFxuICAgIG1hcmdpbjogMzJweCAwIDE2cHg7IH1cXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIHAge1xcbiAgICBjb2xvcjogIzM3MzczNzsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gcHJlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjhmYTtcXG4gICAgcGFkZGluZzogOHB4IDhweCA4cHggMTZweDtcXG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjMDBiNGEyO1xcbiAgICBib3JkZXItcmFkaXVzOiAwcHggM3B4IDNweCAwcHg7XFxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDsgfVxcbiAgICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBwcmUgY29kZSB7XFxuICAgICAgZm9udC1mYW1pbHk6ICdSb2JvdG8gTW9ubycsIG1vbm9zcGFjZTtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgLW1vei10YWItc2l6ZTogMjtcXG4gICAgICAgIC1vLXRhYi1zaXplOiAyO1xcbiAgICAgICAgICAgdGFiLXNpemU6IDI7IH1cXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIHRhYmxlIHtcXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IH1cXG4gICAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gdGFibGUgdHIge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7IH1cXG4gICAgICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSB0YWJsZSB0ciB0aCwgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gdGFibGUgdHIgdGQge1xcbiAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGZlMmU1OyB9XFxuICAgICAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gdGFibGUgdHIgdGgge1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gaHIge1xcbiAgICBib3JkZXItd2lkdGg6IDNweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC4xKTsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gYSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY29sb3I6ICMwMDc0Njg7IH1cXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIGltZyB7XFxuICAgIG1heC13aWR0aDogMTAwJTsgfVxcblxcbi5hYm91dC12aWV3X2Fib3V0LWNvbnRhaW5lcl8yZnUge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGFib3V0LXZpZXdfZmFkZUluXzJOcyAwLjRzIDE7XFxuICAgICAgICAgIGFuaW1hdGlvbjogYWJvdXQtdmlld19mYWRlSW5fMk5zIDAuNHMgMTsgfVxcbiAgLmFib3V0LXZpZXdfYWJvdXQtY29udGFpbmVyXzJmdSAuYWJvdXQtdmlld19zaGFyZV8xc1Qge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGhlaWdodDogMjhweDtcXG4gICAgd2lkdGg6IDI4cHg7IH1cXG4gICAgLmFib3V0LXZpZXdfYWJvdXQtY29udGFpbmVyXzJmdSAuYWJvdXQtdmlld19zaGFyZV8xc1QgaSB7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBmb250LXNpemU6IDI4cHg7IH1cXG4gICAgLmFib3V0LXZpZXdfYWJvdXQtY29udGFpbmVyXzJmdSAuYWJvdXQtdmlld19zaGFyZV8xc1QgLmFib3V0LXZpZXdfZmFjZWJvb2tfMVZGIHtcXG4gICAgICBjb2xvcjogIzNCNTk5ODsgfVxcbiAgICAuYWJvdXQtdmlld19hYm91dC1jb250YWluZXJfMmZ1IC5hYm91dC12aWV3X3NoYXJlXzFzVCAuYWJvdXQtdmlld190d2l0dGVyXzJQeiB7XFxuICAgICAgY29sb3I6ICM0MDk5RkY7IH1cXG5cXG4uYWJvdXQtdmlld19zZXR0aW5nc18xNjIgLmFib3V0LXZpZXdfc2V0dGluZ3Mtcm93X0pEcSB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IH1cXG4gIC5hYm91dC12aWV3X3NldHRpbmdzXzE2MiAuYWJvdXQtdmlld19zZXR0aW5ncy1yb3dfSkRxIC5hYm91dC12aWV3X3Jvdy1kZXNjcmlwdG9yXzFrOSB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgLmFib3V0LXZpZXdfc2V0dGluZ3NfMTYyIC5hYm91dC12aWV3X3NldHRpbmdzLXJvd19KRHEgLmFib3V0LXZpZXdfcm93LWRlc2NyaXB0b3JfMWs5IC5hYm91dC12aWV3X2Rlc2NyaXB0b3ItdGl0bGVfMVJkIHtcXG4gICAgICBwYWRkaW5nOiAwO1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gICAgLmFib3V0LXZpZXdfc2V0dGluZ3NfMTYyIC5hYm91dC12aWV3X3NldHRpbmdzLXJvd19KRHEgLmFib3V0LXZpZXdfcm93LWRlc2NyaXB0b3JfMWs5IC5hYm91dC12aWV3X2Rlc2NyaXB0b3ItZGV0YWlsXzFyMyB7XFxuICAgICAgcGFkZGluZzogMDtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGNvbG9yOiBncmV5OyB9XFxuICAuYWJvdXQtdmlld19zZXR0aW5nc18xNjIgLmFib3V0LXZpZXdfc2V0dGluZ3Mtcm93X0pEcSAuYWJvdXQtdmlld19yb3ctYWN0aW9uX25ibCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7IH1cXG5cXG4uYWJvdXQtdmlld19zZXR0aW5nc18xNjIgLmFib3V0LXZpZXdfcm93LWxhYmVsX1RheCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG4uYWJvdXQtdmlld19zd2l0Y2gtYnV0dG9uXzNlciB7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiBub25lOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiZm9vdGVyLWNvbnRhaW5lclwiOiBcImFib3V0LXZpZXdfZm9vdGVyLWNvbnRhaW5lcl9EQ3JcIixcblx0XCJyZWZlcmVuY2VzLWNvbnRhaW5lclwiOiBcImFib3V0LXZpZXdfcmVmZXJlbmNlcy1jb250YWluZXJfMXdKXCIsXG5cdFwibWFya2Rvd24td3JhcHBlclwiOiBcImFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW1cIixcblx0XCJmYWRlSW5cIjogXCJhYm91dC12aWV3X2ZhZGVJbl8yTnNcIixcblx0XCJhYm91dC1jb250YWluZXJcIjogXCJhYm91dC12aWV3X2Fib3V0LWNvbnRhaW5lcl8yZnVcIixcblx0XCJzaGFyZVwiOiBcImFib3V0LXZpZXdfc2hhcmVfMXNUXCIsXG5cdFwiZmFjZWJvb2tcIjogXCJhYm91dC12aWV3X2ZhY2Vib29rXzFWRlwiLFxuXHRcInR3aXR0ZXJcIjogXCJhYm91dC12aWV3X3R3aXR0ZXJfMlB6XCIsXG5cdFwic2V0dGluZ3NcIjogXCJhYm91dC12aWV3X3NldHRpbmdzXzE2MlwiLFxuXHRcInNldHRpbmdzLXJvd1wiOiBcImFib3V0LXZpZXdfc2V0dGluZ3Mtcm93X0pEcVwiLFxuXHRcInJvdy1kZXNjcmlwdG9yXCI6IFwiYWJvdXQtdmlld19yb3ctZGVzY3JpcHRvcl8xazlcIixcblx0XCJkZXNjcmlwdG9yLXRpdGxlXCI6IFwiYWJvdXQtdmlld19kZXNjcmlwdG9yLXRpdGxlXzFSZFwiLFxuXHRcImRlc2NyaXB0b3ItZGV0YWlsXCI6IFwiYWJvdXQtdmlld19kZXNjcmlwdG9yLWRldGFpbF8xcjNcIixcblx0XCJyb3ctYWN0aW9uXCI6IFwiYWJvdXQtdmlld19yb3ctYWN0aW9uX25ibFwiLFxuXHRcInJvdy1sYWJlbFwiOiBcImFib3V0LXZpZXdfcm93LWxhYmVsX1RheFwiLFxuXHRcInN3aXRjaC1idXR0b25cIjogXCJhYm91dC12aWV3X3N3aXRjaC1idXR0b25fM2VyXCIsXG5cdFwiZmx5SW5Gcm9tTGVmdFwiOiBcImFib3V0LXZpZXdfZmx5SW5Gcm9tTGVmdF8zS3FcIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuL34vcG9zdGNzcy1sb2FkZXI/e1wiaWRlbnRcIjpcInBvc3Rjc3NcIixcInNvdXJjZU1hcFwiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3tcInNvdXJjZU1hcFwiOnRydWV9IS4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2Fib3V0LXZpZXcvYWJvdXQtdmlldy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vYWJvdXQtdmlldy5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP21vZHVsZXMmbG9jYWxJZGVudE5hbWU9W25hbWVdX1tsb2NhbF1fW2hhc2g6YmFzZTY0OjNdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcz8/cG9zdGNzcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS0xLTMhLi9hYm91dC12aWV3LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vYWJvdXQtdmlldy5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2Fib3V0LXZpZXcvYWJvdXQtdmlldy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sInNvdXJjZVJvb3QiOiIifQ==