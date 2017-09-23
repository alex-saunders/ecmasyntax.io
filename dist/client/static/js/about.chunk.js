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

var _mdcSwitch = __webpack_require__(284);

var _mdcSwitch2 = _interopRequireDefault(_mdcSwitch);

var _activePage = __webpack_require__(282);

var _utils = __webpack_require__(49);

var _offlineCache = __webpack_require__(283);

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
exports.push([module.i, "@-webkit-keyframes about-view_fadeIn_2Ns {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n@keyframes about-view_fadeIn_2Ns {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes about-view_fadeIn_2Ns {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.about-view_footer-container_DCr {\n  margin-top: 24px;\n  border-top: 1px solid #eaecef; }\n\n.about-view_references-container_1wJ li {\n  font-size: 16px; }\n\n.about-view_markdown-wrapper_2-m {\n  color: #212121;\n  line-height: 1.5;\n  -webkit-animation: about-view_fadeIn_2Ns 0.6s 1;\n          animation: about-view_fadeIn_2Ns 0.6s 1;\n  padding: 16px 32px 16px 32px; }\n  @media (max-width: 500px) {\n    .about-view_markdown-wrapper_2-m {\n      padding: 16px; } }\n  .about-view_markdown-wrapper_2-m h1,\n  .about-view_markdown-wrapper_2-m h2 {\n    font-weight: 300; }\n  .about-view_markdown-wrapper_2-m h3 {\n    font-weight: 400; }\n  .about-view_markdown-wrapper_2-m strong {\n    color: #333;\n    font-weight: 500; }\n  .about-view_markdown-wrapper_2-m h1 {\n    padding-bottom: 0.3em;\n    font-size: 2em; }\n  .about-view_markdown-wrapper_2-m h2 {\n    font-size: 1.5em;\n    margin: 20px 0 20px;\n    border-bottom: 1px solid #eaecef; }\n  .about-view_markdown-wrapper_2-m h3 {\n    margin: 32px 0 16px; }\n  .about-view_markdown-wrapper_2-m p {\n    color: #373737; }\n  .about-view_markdown-wrapper_2-m pre {\n    background-color: #f6f8fa;\n    padding: 8px 8px 8px 16px;\n    border-left: 4px solid #00b4a2;\n    border-radius: 0px 3px 3px 0px;\n    white-space: pre-wrap; }\n    .about-view_markdown-wrapper_2-m pre code {\n      font-family: 'Roboto Mono', monospace;\n      font-size: 14px;\n      -moz-tab-size: 2;\n        -o-tab-size: 2;\n           tab-size: 2; }\n  .about-view_markdown-wrapper_2-m table {\n    border-spacing: 0;\n    border-collapse: collapse; }\n    .about-view_markdown-wrapper_2-m table tr {\n      background-color: #fff; }\n      .about-view_markdown-wrapper_2-m table tr th, .about-view_markdown-wrapper_2-m table tr td {\n        padding: 8px 16px;\n        border: 1px solid #dfe2e5; }\n      .about-view_markdown-wrapper_2-m table tr th {\n        font-weight: 500; }\n  .about-view_markdown-wrapper_2-m hr {\n    border-width: 3px;\n    border-bottom: none;\n    border-right: none;\n    border-left: none;\n    border-color: rgba(0, 0, 0, .1); }\n  .about-view_markdown-wrapper_2-m a {\n    text-decoration: none;\n    color: #007468; }\n  .about-view_markdown-wrapper_2-m img {\n    max-width: 100%; }\n\n.about-view_about-container_2fu {\n  -webkit-animation: about-view_fadeIn_2Ns .6s 1;\n          animation: about-view_fadeIn_2Ns .6s 1; }\n  .about-view_about-container_2fu .about-view_share_1sT {\n    display: inline-block;\n    height: 28px;\n    width: 28px; }\n    .about-view_about-container_2fu .about-view_share_1sT i {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      font-size: 28px; }\n    .about-view_about-container_2fu .about-view_share_1sT .about-view_facebook_1VF {\n      color: #3B5998; }\n    .about-view_about-container_2fu .about-view_share_1sT .about-view_twitter_2Pz {\n      color: #4099FF; }\n\n.about-view_settings_162 .about-view_settings-row_JDq {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-descriptor_1k9 {\n    padding: 0; }\n    .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-descriptor_1k9 .about-view_descriptor-title_1Rd {\n      padding: 0;\n      margin: 0;\n      font-size: 16px; }\n    .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-descriptor_1k9 .about-view_descriptor-detail_1r3 {\n      padding: 0;\n      margin: 0;\n      font-size: 14px;\n      color: grey; }\n  .about-view_settings_162 .about-view_settings-row_JDq .about-view_row-action_nbl {\n    margin-left: 8px; }\n\n.about-view_settings_162 .about-view_row-label_Tax {\n  cursor: pointer; }\n\n.about-view_switch-button_3er {\n  background: none;\n  border: none; }\n", ""]);

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
	"switch-button": "about-view_switch-button_3er"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYWJvdXQtdmlldy9hYm91dC12aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYWJvdXQtdmlldy9hYm91dC12aWV3LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9jb21wb25lbnRzL3ZpZXdzL2Fib3V0LXZpZXcvYWJvdXQtdmlldy5zY3NzP2FlNjIiXSwibmFtZXMiOlsiQWJvdXRWaWV3IiwicHJvcHMiLCJfc2V0QXV0b0Rvd25sb2FkIiwic3RhdGUiLCJhdXRvRG93bmxvYWQiLCJ0aGVuIiwic2V0U3RhdGUiLCJzZXRBY3RpdmVQYWdlVGl0bGUiLCJzZXRBY3RpdmVSb3V0ZSIsInRvZ2dsZVdhdGVyZmFsbEhlYWRlciIsInByb2dyZXNzVXBkYXRlIiwiYXV0b0Rvd25sb2FkVmFsIiwic2V0dGluZ3MiLCJpbnB1dCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImJvb2wiLCJzZXRBdXRvRG93bmxvYWQiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImRlZmF1bHRQcm9wcyIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hdGNoRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJ0aXRsZSIsInJvdXRlIiwicGVyY2VudGFnZSIsInZpc2libGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU1BLFM7OztBQUVKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1hBLEtBRFc7O0FBQUEsVUF3Qm5CQyxnQkF4Qm1CLEdBd0JBLFlBQU07QUFDdkIseUNBQWdCLENBQUMsTUFBS0MsS0FBTCxDQUFXQyxZQUE1QixFQUEwQ0MsSUFBMUMsQ0FBK0MsWUFBTTtBQUNuRCxjQUFLQyxRQUFMLENBQWM7QUFDWkYsd0JBQWMsQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRGQsU0FBZDtBQUdELE9BSkQ7QUFLRCxLQTlCa0I7O0FBS2pCLFVBQUtELEtBQUwsR0FBYTtBQUNYQyxvQkFBYztBQURILEtBQWI7QUFMaUI7QUFRbEI7Ozs7d0NBRW1CO0FBQUE7O0FBQ2xCLFdBQUtILEtBQUwsQ0FBV00sa0JBQVgsQ0FBOEIsT0FBOUI7QUFDQSxXQUFLTixLQUFMLENBQVdPLGNBQVgsQ0FBMEIsUUFBMUI7QUFDQSxXQUFLUCxLQUFMLENBQVdRLHFCQUFYLENBQWlDLEtBQWpDOztBQUVBLFdBQUtSLEtBQUwsQ0FBV1MsY0FBWCxDQUEwQixHQUExQjs7QUFFQSw4Q0FBcUJMLElBQXJCLENBQTBCLFVBQUNNLGVBQUQsRUFBcUI7QUFDN0MsZUFBS0wsUUFBTCxDQUFjO0FBQ1pGLHdCQUFjTztBQURGLFNBQWQ7QUFHRCxPQUpEO0FBS0Q7Ozs2QkFVUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVyxvQkFBRSxpQkFBRixDQUFoQjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVcsb0JBQUUsa0JBQUYsQ0FBaEI7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBSkY7QUFPRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBUEY7QUFlRTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBQUE7QUFBQSxnQkFBRyxNQUFLLG9DQUFSLEVBQTZDLFFBQU8sUUFBcEQsRUFBNkQsS0FBSSxxQkFBakU7QUFBQTtBQUFBLGFBRkY7QUFBQTtBQUlFO0FBQUE7QUFBQSxnQkFBRyxNQUFLLGdEQUFSLEVBQXlELFFBQU8sUUFBaEUsRUFBeUUsS0FBSSxxQkFBN0U7QUFBQTtBQUFBLGFBSkY7QUFBQTtBQUFBLFdBZkY7QUFxQkU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXJCRjtBQXlCRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBekJGO0FBMEJFO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLGdCQUFHLE1BQUsseUJBQVIsRUFBa0MsUUFBTyxRQUF6QyxFQUFrRCxLQUFJLHFCQUF0RDtBQUFBO0FBQUEsYUFGRjtBQUFBO0FBSUU7QUFBQTtBQUFBLGdCQUFHLE1BQUssNEJBQVIsRUFBcUMsUUFBTyxRQUE1QyxFQUFxRCxLQUFJLHFCQUF6RDtBQUFBO0FBQUE7QUFKRixXQTFCRjtBQWdDRTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBQUE7QUFBQSxnQkFBRyxNQUFLLDREQUFSLEVBQXFFLFFBQU8sUUFBNUUsRUFBcUYsS0FBSSxxQkFBekY7QUFBQTtBQUFBLGFBRkY7QUFBQTtBQUd5QjtBQUFBO0FBQUEsZ0JBQUcsTUFBSyxvQ0FBUixFQUE2QyxRQUFPLFFBQXBELEVBQTZELEtBQUkscUJBQWpFO0FBQUE7QUFBQTtBQUh6QixXQWhDRjtBQXFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBckNGO0FBd0NFO0FBQUE7QUFBQSxjQUFLLFdBQVcsb0JBQUVDLFFBQWxCO0FBQ0U7QUFBQTtBQUFBO0FBQ0UseUJBQVEsc0JBRFY7QUFFRSwyQkFBYyxvQkFBRSxjQUFGLENBQWQsU0FBbUMsb0JBQUUsV0FBRjtBQUZyQztBQUlFO0FBQUE7QUFBQSxrQkFBSyxXQUFXLG9CQUFFLGdCQUFGLENBQWhCO0FBQ0U7QUFBQTtBQUFBLG9CQUFHLFdBQVcsb0JBQUUsa0JBQUYsQ0FBZDtBQUFBO0FBQUEsaUJBREY7QUFJRTtBQUFBO0FBQUEsb0JBQUcsV0FBVyxvQkFBRSxtQkFBRixDQUFkO0FBQUE7QUFBQTtBQUpGLGVBSkY7QUFZRTtBQUFBO0FBQUEsa0JBQUssV0FBVyxvQkFBRSxZQUFGLENBQWhCO0FBQ0U7QUFBQTtBQUFBLG9CQUFRLDJCQUF5QixvQkFBRSxlQUFGLENBQWpDO0FBQ0U7QUFDRSwwQkFBSyxVQURQLEVBQ2tCLElBQUcsc0JBRHJCO0FBRUUsK0RBQXlDLG9CQUFFQyxLQUY3QztBQUdFLDZCQUFVLEtBQUtWLEtBQUwsQ0FBV0MsWUFIdkI7QUFJRSw4QkFBVSxLQUFLRjtBQUpqQixvQkFERjtBQU9FO0FBQUE7QUFBQSxzQkFBSyxXQUFVLHdCQUFmO0FBQ0UsMkRBQUssV0FBVSxrQkFBZjtBQURGO0FBUEY7QUFERjtBQVpGO0FBREY7QUF4Q0Y7QUFERixPQURGO0FBeUVEOzs7O0VBNUdxQixnQkFBTVksUzs7QUErRzlCZCxVQUFVZSxTQUFWLEdBQXNCO0FBQ3BCWCxnQkFBYyxvQkFBVVksSUFESjtBQUVwQkMsbUJBQWlCLG9CQUFVQyxJQUFWLENBQWVDO0FBRlosQ0FBdEI7O0FBS0FuQixVQUFVb0IsWUFBVixHQUF5QjtBQUN2QmhCLGdCQUFjO0FBRFMsQ0FBekI7O0FBSUEsU0FBU2lCLGVBQVQsQ0FBeUJsQixLQUF6QixFQUFnQztBQUM5QixTQUFPLEVBQVA7QUFDRDs7QUFFRCxTQUFTbUIsb0JBQVQsQ0FBOEJDLFFBQTlCLEVBQXdDO0FBQ3RDLFNBQU87QUFDTGhCLHdCQUFvQiw0QkFBQ2lCLEtBQUQsRUFBVztBQUFFRCxlQUFTLG9DQUFtQkMsS0FBbkIsQ0FBVDtBQUFzQyxLQURsRTtBQUVMaEIsb0JBQWdCLHdCQUFDaUIsS0FBRCxFQUFXO0FBQUVGLGVBQVMsZ0NBQWVFLEtBQWYsQ0FBVDtBQUFrQyxLQUYxRDtBQUdMZixvQkFBZ0Isd0JBQUNnQixVQUFELEVBQWdCO0FBQUVILGVBQVMsMkJBQWVHLFVBQWYsQ0FBVDtBQUF1QyxLQUhwRTtBQUlMakIsMkJBQXVCLCtCQUFDa0IsT0FBRCxFQUFhO0FBQUVKLGVBQVMsa0NBQXNCSSxPQUF0QixDQUFUO0FBQTJDO0FBSjVFLEdBQVA7QUFNRDs7a0JBRWMsb0VBQTRCLHlCQUFRTixlQUFSLEVBQXlCQyxvQkFBekIsRUFBK0N0QixTQUEvQyxDQUE1QixDOzs7Ozs7O0FDbEpmO0FBQ0E7QUFDQSwwRkFBMkY7O0FBRTNGO0FBQ0EsbUVBQW9FLFVBQVUsaUJBQWlCLEVBQUUsUUFBUSxpQkFBaUIsRUFBRSxFQUFFLG9DQUFvQyxVQUFVLGlCQUFpQixFQUFFLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSxzQ0FBc0MsVUFBVSxpQkFBaUIsRUFBRSxRQUFRLGlCQUFpQixFQUFFLEVBQUUsc0NBQXNDLHFCQUFxQixrQ0FBa0MsRUFBRSw2Q0FBNkMsb0JBQW9CLEVBQUUsc0NBQXNDLG1CQUFtQixxQkFBcUIsb0RBQW9ELG9EQUFvRCxpQ0FBaUMsRUFBRSwrQkFBK0Isd0NBQXdDLHNCQUFzQixFQUFFLEVBQUUsaUZBQWlGLHVCQUF1QixFQUFFLHlDQUF5Qyx1QkFBdUIsRUFBRSw2Q0FBNkMsa0JBQWtCLHVCQUF1QixFQUFFLHlDQUF5Qyw0QkFBNEIscUJBQXFCLEVBQUUseUNBQXlDLHVCQUF1QiwwQkFBMEIsdUNBQXVDLEVBQUUseUNBQXlDLDBCQUEwQixFQUFFLHdDQUF3QyxxQkFBcUIsRUFBRSwwQ0FBMEMsZ0NBQWdDLGdDQUFnQyxxQ0FBcUMscUNBQXFDLDRCQUE0QixFQUFFLGlEQUFpRCw4Q0FBOEMsd0JBQXdCLHlCQUF5Qix5QkFBeUIseUJBQXlCLEVBQUUsNENBQTRDLHdCQUF3QixnQ0FBZ0MsRUFBRSxpREFBaUQsK0JBQStCLEVBQUUsb0dBQW9HLDRCQUE0QixvQ0FBb0MsRUFBRSxzREFBc0QsMkJBQTJCLEVBQUUseUNBQXlDLHdCQUF3QiwwQkFBMEIseUJBQXlCLHdCQUF3QixzQ0FBc0MsRUFBRSx3Q0FBd0MsNEJBQTRCLHFCQUFxQixFQUFFLDBDQUEwQyxzQkFBc0IsRUFBRSxxQ0FBcUMsbURBQW1ELG1EQUFtRCxFQUFFLDJEQUEyRCw0QkFBNEIsbUJBQW1CLGtCQUFrQixFQUFFLCtEQUErRCwyQkFBMkIsb0JBQW9CLHFCQUFxQix3QkFBd0IsRUFBRSxzRkFBc0YsdUJBQXVCLEVBQUUscUZBQXFGLHVCQUF1QixFQUFFLDJEQUEyRCx5QkFBeUIseUJBQXlCLGtCQUFrQixtQ0FBbUMsa0NBQWtDLGdDQUFnQyxnQ0FBZ0MsOEJBQThCLCtCQUErQiwyQ0FBMkMsRUFBRSwwRkFBMEYsaUJBQWlCLEVBQUUsNkhBQTZILG1CQUFtQixrQkFBa0Isd0JBQXdCLEVBQUUsOEhBQThILG1CQUFtQixrQkFBa0Isd0JBQXdCLG9CQUFvQixFQUFFLHNGQUFzRix1QkFBdUIsRUFBRSx3REFBd0Qsb0JBQW9CLEVBQUUsbUNBQW1DLHFCQUFxQixpQkFBaUIsRUFBRTs7QUFFNXdJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7O0FDeEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RCx5Q0FBeUMsMkJBQTJCO0FBQ3BFLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxnQkFBZ0I7QUFDeEQsT0FBTztBQUNQLHFDQUFxQyxhQUFhLEVBQUU7QUFDcEQiLCJmaWxlIjoiYWJvdXQuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgc3dpdGNoU3R5bGVzIGZyb20gJ0BtYXRlcmlhbC9zd2l0Y2gvZGlzdC9tZGMuc3dpdGNoLmNzcyc7XG5cbmltcG9ydCB7IHNldEFjdGl2ZVBhZ2VUaXRsZSwgc2V0QWN0aXZlUm91dGUgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL2FjdGl2ZS1wYWdlJztcbmltcG9ydCB7IHByb2dyZXNzVXBkYXRlLCB0b2dnbGVXYXRlcmZhbGxIZWFkZXIgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL3V0aWxzJztcblxuaW1wb3J0IHsgZ2V0QXV0b0Rvd25sb2FkVmFsLCBzZXRBdXRvRG93bmxvYWQgfSBmcm9tICcuLi8uLi8uLi91dGlscy9vZmZsaW5lLWNhY2hlJztcblxuaW1wb3J0IHMgZnJvbSAnLi9hYm91dC12aWV3LnNjc3MnO1xuXG5jbGFzcyBBYm91dFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXV0b0Rvd25sb2FkOiBmYWxzZSxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnNldEFjdGl2ZVBhZ2VUaXRsZSgnQWJvdXQnKTtcbiAgICB0aGlzLnByb3BzLnNldEFjdGl2ZVJvdXRlKCcvYWJvdXQnKTtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZVdhdGVyZmFsbEhlYWRlcihmYWxzZSk7XG4gICAgXG4gICAgdGhpcy5wcm9wcy5wcm9ncmVzc1VwZGF0ZSgxMDApO1xuXG4gICAgZ2V0QXV0b0Rvd25sb2FkVmFsKCkudGhlbigoYXV0b0Rvd25sb2FkVmFsKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYXV0b0Rvd25sb2FkOiBhdXRvRG93bmxvYWRWYWxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIF9zZXRBdXRvRG93bmxvYWQgPSAoKSA9PiB7XG4gICAgc2V0QXV0b0Rvd25sb2FkKCF0aGlzLnN0YXRlLmF1dG9Eb3dubG9hZCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYXV0b0Rvd25sb2FkOiAhdGhpcy5zdGF0ZS5hdXRvRG93bmxvYWRcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ2Fib3V0LWNvbnRhaW5lciddfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ21hcmtkb3duLXdyYXBwZXInXX0+XG4gICAgICAgICAgPGgxPlxuICAgICAgICAgICAgRUNNQVN5bnRheC5pb1xuICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPGgyPlxuICAgICAgICAgICAgQWJvdXRcbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgRUNNQVN5bnRheCBpcyBhbiBvZmZsaW5lLWZpcnN0IFBXQSBkZXNpZ25lZCBmb3IgZGV2ZWxvcGVycy5cbiAgICAgICAgICAgIEl0IGFpbXMgdG8gcHJvdmlkZSBhIHJlZmVyZW5jZSBmb3IgSmF2YVNjcmlwdCBzeW50YXgsXG4gICAgICAgICAgICBkZXRhaWxpbmcgd2hhdCBwaWVjZXMgb2Ygc3ludGF4IGRvLCBhbmQgaG93IHRvIHVzZSB0aGVtLlxuICAgICAgICAgICAgQ3VycmVudGx5LCBvbmx5IHRoZSBuZXdlc3QgZmVhdHVyZXMgb2YgdGhlIEphdmFTY3JpcHQgc3BlY2lmaWNhdGlvbiBhcmUgZ2l2ZW4sXG4gICAgICAgICAgICBidXQgdGhlIGNvbnRlbnQgd2lsbCBob3BlZnVsbHkgYmUgdXBkYXRlZCBvdmVyIHRpbWVcbiAgICAgICAgICAgIHRvIGluY2x1ZGUgbW9yZSBsZWdhY3kgYWRkaXRpb25zLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIFRoaXMgaXMgYW4gT1BFTiBzb3VyY2UgcHJvamVjdCwgY3JlYXRlZCBieVxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vQWxleEpSc2F1bmRlcnNcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+IEBhbGV4anJzYXVuZGVyczwvYT5cbiAgICAgICAgICAgICwgc28gcGxlYXNlIGZlZWwgZnJlZSB0byBoZWxwIG91dCBieVxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hbGV4LXNhdW5kZXJzL2VjbWFzeW50YXguaW9cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+IHJlcG9ydGluZyBidWdzLCBmb3JraW5nIGFuZCBvcGVuaW5nIHB1bGwgcmVxdWVzdHMgd2hlbiBwb3NzaWJsZTwvYT4uXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgVG8gZ2V0IHN0YXJ0ZWQsIHNlbGVjdCBvbmUgb2YgdGhlIGl0ZW1zIGluIHRoZSBtZW51XG4gICAgICAgICAgICAoYW5kIGRvbiYjMzk7dCBmb3JnZXQgdG8gYWRkIHRvIHlvdXIgaG9tZXNjcmVlbiEpXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxoMj5DcmVkaXRzPC9oMj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIFRoZSBkZXNpZ24gZm9yIHRoaXMgc2l0ZSB3YXMgaW5zcGlyZWQgYnlcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwOi8vY3NzcmVmZXJlbmNlLmlvL1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj4gSFRNTC9DU1NSZWZlcmVuY2UuaW8gPC9hPlxuICAgICAgICAgICAgKDIgdmVyeSBhd2Vzb21lIHNpdGVzLCBnbyBjaGVjayBlbSBvdXQhKSwgY3JlYXRlZCBieVxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vamd0aG1zXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPiBAamd0aG1zPC9hPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIENvbnRlbnQgaGVhdmlseSByZWZlcmVuY2VzIHRoZSBtYXRlcmlhbCBhdmFpbGFibGUgb24gdGhlXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9NRE4vQWJvdXQkaGlzdG9yeVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj4gTW96aWxsYSBEZXZlbG9wZXIgTmV0d29yazwvYT4uXG4gICAgICAgICAgICBBcyB3ZWxsIGFzIHRoZSBhd2Vzb21lIDxhIGhyZWY9XCJodHRwOi8vZXM2LWZlYXR1cmVzLm9yZy8jQ29uc3RhbnRzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPiBlczYtZmVhdHVyZXMub3JnPC9hPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8aDI+XG4gICAgICAgICAgICBTZXR0aW5nc1xuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3Muc2V0dGluZ3N9PlxuICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgIGh0bWxGb3I9XCJhdXRvLWRvd25sb2FkLXN3aXRjaFwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c1snc2V0dGluZ3Mtcm93J119ICR7c1sncm93LWxhYmVsJ119YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3Jvdy1kZXNjcmlwdG9yJ119PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c1snZGVzY3JpcHRvci10aXRsZSddfT5cbiAgICAgICAgICAgICAgICAgIEF1dG8gRG93bmxvYWQgQ29udGVudFxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e3NbJ2Rlc2NyaXB0b3ItZGV0YWlsJ119PlxuICAgICAgICAgICAgICAgICAgQXV0b21hdGljYWxseSBkb3dubG9hZCBhbGwgY29udGVudCB5b3UgdmlzaXQgZm9yIG9mZmxpbmUgdXNlXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3NbJ3Jvdy1hY3Rpb24nXX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BtZGMtc3dpdGNoICR7c1snc3dpdGNoLWJ1dHRvbiddfWB9PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiYXV0by1kb3dubG9hZC1zd2l0Y2hcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtZGMtc3dpdGNoX19uYXRpdmUtY29udHJvbCAke3MuaW5wdXR9YH1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17KHRoaXMuc3RhdGUuYXV0b0Rvd25sb2FkKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX3NldEF1dG9Eb3dubG9hZH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kYy1zd2l0Y2hfX2JhY2tncm91bmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZGMtc3dpdGNoX19rbm9iXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BYm91dFZpZXcucHJvcFR5cGVzID0ge1xuICBhdXRvRG93bmxvYWQ6IFByb3BUeXBlcy5ib29sLFxuICBzZXRBdXRvRG93bmxvYWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5BYm91dFZpZXcuZGVmYXVsdFByb3BzID0ge1xuICBhdXRvRG93bmxvYWQ6IG51bGwsXG59O1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBtYXRjaERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIHNldEFjdGl2ZVBhZ2VUaXRsZTogKHRpdGxlKSA9PiB7IGRpc3BhdGNoKHNldEFjdGl2ZVBhZ2VUaXRsZSh0aXRsZSkpOyB9LFxuICAgIHNldEFjdGl2ZVJvdXRlOiAocm91dGUpID0+IHsgZGlzcGF0Y2goc2V0QWN0aXZlUm91dGUocm91dGUpKTsgfSxcbiAgICBwcm9ncmVzc1VwZGF0ZTogKHBlcmNlbnRhZ2UpID0+IHsgZGlzcGF0Y2gocHJvZ3Jlc3NVcGRhdGUocGVyY2VudGFnZSkpOyB9LFxuICAgIHRvZ2dsZVdhdGVyZmFsbEhlYWRlcjogKHZpc2libGUpID0+IHsgZGlzcGF0Y2godG9nZ2xlV2F0ZXJmYWxsSGVhZGVyKHZpc2libGUpKTsgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzLCBzd2l0Y2hTdHlsZXMpKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXRjaERpc3BhdGNoVG9Qcm9wcykoQWJvdXRWaWV3KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdmlld3MvYWJvdXQtdmlldy9hYm91dC12aWV3LmpzeCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG8rTW9ubyk7XCIsIFwiXCJdKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYWJvdXQtdmlld19mYWRlSW5fMk5zIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcbkBrZXlmcmFtZXMgYWJvdXQtdmlld19mYWRlSW5fMk5zIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgYWJvdXQtdmlld19mYWRlSW5fMk5zIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5hYm91dC12aWV3X2Zvb3Rlci1jb250YWluZXJfRENyIHtcXG4gIG1hcmdpbi10b3A6IDI0cHg7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2VhZWNlZjsgfVxcblxcbi5hYm91dC12aWV3X3JlZmVyZW5jZXMtY29udGFpbmVyXzF3SiBsaSB7XFxuICBmb250LXNpemU6IDE2cHg7IH1cXG5cXG4uYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSB7XFxuICBjb2xvcjogIzIxMjEyMTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYWJvdXQtdmlld19mYWRlSW5fMk5zIDAuNnMgMTtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBhYm91dC12aWV3X2ZhZGVJbl8yTnMgMC42cyAxO1xcbiAgcGFkZGluZzogMTZweCAzMnB4IDE2cHggMzJweDsgfVxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIHtcXG4gICAgICBwYWRkaW5nOiAxNnB4OyB9IH1cXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIGgxLFxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gaDIge1xcbiAgICBmb250LXdlaWdodDogMzAwOyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBoMyB7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7IH1cXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIHN0cm9uZyB7XFxuICAgIGNvbG9yOiAjMzMzO1xcbiAgICBmb250LXdlaWdodDogNTAwOyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBoMSB7XFxuICAgIHBhZGRpbmctYm90dG9tOiAwLjNlbTtcXG4gICAgZm9udC1zaXplOiAyZW07IH1cXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgbWFyZ2luOiAyMHB4IDAgMjBweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWVjZWY7IH1cXG4gIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIGgzIHtcXG4gICAgbWFyZ2luOiAzMnB4IDAgMTZweDsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gcCB7XFxuICAgIGNvbG9yOiAjMzczNzM3OyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBwcmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmOGZhO1xcbiAgICBwYWRkaW5nOiA4cHggOHB4IDhweCAxNnB4O1xcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICMwMGI0YTI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDBweCAzcHggM3B4IDBweDtcXG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwOyB9XFxuICAgIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIHByZSBjb2RlIHtcXG4gICAgICBmb250LWZhbWlseTogJ1JvYm90byBNb25vJywgbW9ub3NwYWNlO1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAtbW96LXRhYi1zaXplOiAyO1xcbiAgICAgICAgLW8tdGFiLXNpemU6IDI7XFxuICAgICAgICAgICB0YWItc2l6ZTogMjsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gdGFibGUge1xcbiAgICBib3JkZXItc3BhY2luZzogMDtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgfVxcbiAgICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSB0YWJsZSB0ciB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgfVxcbiAgICAgIC5hYm91dC12aWV3X21hcmtkb3duLXdyYXBwZXJfMi1tIHRhYmxlIHRyIHRoLCAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSB0YWJsZSB0ciB0ZCB7XFxuICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZmUyZTU7IH1cXG4gICAgICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSB0YWJsZSB0ciB0aCB7XFxuICAgICAgICBmb250LXdlaWdodDogNTAwOyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBociB7XFxuICAgIGJvcmRlci13aWR0aDogM3B4O1xcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgLjEpOyB9XFxuICAuYWJvdXQtdmlld19tYXJrZG93bi13cmFwcGVyXzItbSBhIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogIzAwNzQ2ODsgfVxcbiAgLmFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW0gaW1nIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlOyB9XFxuXFxuLmFib3V0LXZpZXdfYWJvdXQtY29udGFpbmVyXzJmdSB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYWJvdXQtdmlld19mYWRlSW5fMk5zIC42cyAxO1xcbiAgICAgICAgICBhbmltYXRpb246IGFib3V0LXZpZXdfZmFkZUluXzJOcyAuNnMgMTsgfVxcbiAgLmFib3V0LXZpZXdfYWJvdXQtY29udGFpbmVyXzJmdSAuYWJvdXQtdmlld19zaGFyZV8xc1Qge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGhlaWdodDogMjhweDtcXG4gICAgd2lkdGg6IDI4cHg7IH1cXG4gICAgLmFib3V0LXZpZXdfYWJvdXQtY29udGFpbmVyXzJmdSAuYWJvdXQtdmlld19zaGFyZV8xc1QgaSB7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBmb250LXNpemU6IDI4cHg7IH1cXG4gICAgLmFib3V0LXZpZXdfYWJvdXQtY29udGFpbmVyXzJmdSAuYWJvdXQtdmlld19zaGFyZV8xc1QgLmFib3V0LXZpZXdfZmFjZWJvb2tfMVZGIHtcXG4gICAgICBjb2xvcjogIzNCNTk5ODsgfVxcbiAgICAuYWJvdXQtdmlld19hYm91dC1jb250YWluZXJfMmZ1IC5hYm91dC12aWV3X3NoYXJlXzFzVCAuYWJvdXQtdmlld190d2l0dGVyXzJQeiB7XFxuICAgICAgY29sb3I6ICM0MDk5RkY7IH1cXG5cXG4uYWJvdXQtdmlld19zZXR0aW5nc18xNjIgLmFib3V0LXZpZXdfc2V0dGluZ3Mtcm93X0pEcSB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IH1cXG4gIC5hYm91dC12aWV3X3NldHRpbmdzXzE2MiAuYWJvdXQtdmlld19zZXR0aW5ncy1yb3dfSkRxIC5hYm91dC12aWV3X3Jvdy1kZXNjcmlwdG9yXzFrOSB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgLmFib3V0LXZpZXdfc2V0dGluZ3NfMTYyIC5hYm91dC12aWV3X3NldHRpbmdzLXJvd19KRHEgLmFib3V0LXZpZXdfcm93LWRlc2NyaXB0b3JfMWs5IC5hYm91dC12aWV3X2Rlc2NyaXB0b3ItdGl0bGVfMVJkIHtcXG4gICAgICBwYWRkaW5nOiAwO1xcbiAgICAgIG1hcmdpbjogMDtcXG4gICAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gICAgLmFib3V0LXZpZXdfc2V0dGluZ3NfMTYyIC5hYm91dC12aWV3X3NldHRpbmdzLXJvd19KRHEgLmFib3V0LXZpZXdfcm93LWRlc2NyaXB0b3JfMWs5IC5hYm91dC12aWV3X2Rlc2NyaXB0b3ItZGV0YWlsXzFyMyB7XFxuICAgICAgcGFkZGluZzogMDtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGNvbG9yOiBncmV5OyB9XFxuICAuYWJvdXQtdmlld19zZXR0aW5nc18xNjIgLmFib3V0LXZpZXdfc2V0dGluZ3Mtcm93X0pEcSAuYWJvdXQtdmlld19yb3ctYWN0aW9uX25ibCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7IH1cXG5cXG4uYWJvdXQtdmlld19zZXR0aW5nc18xNjIgLmFib3V0LXZpZXdfcm93LWxhYmVsX1RheCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG4uYWJvdXQtdmlld19zd2l0Y2gtYnV0dG9uXzNlciB7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiBub25lOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiZm9vdGVyLWNvbnRhaW5lclwiOiBcImFib3V0LXZpZXdfZm9vdGVyLWNvbnRhaW5lcl9EQ3JcIixcblx0XCJyZWZlcmVuY2VzLWNvbnRhaW5lclwiOiBcImFib3V0LXZpZXdfcmVmZXJlbmNlcy1jb250YWluZXJfMXdKXCIsXG5cdFwibWFya2Rvd24td3JhcHBlclwiOiBcImFib3V0LXZpZXdfbWFya2Rvd24td3JhcHBlcl8yLW1cIixcblx0XCJmYWRlSW5cIjogXCJhYm91dC12aWV3X2ZhZGVJbl8yTnNcIixcblx0XCJhYm91dC1jb250YWluZXJcIjogXCJhYm91dC12aWV3X2Fib3V0LWNvbnRhaW5lcl8yZnVcIixcblx0XCJzaGFyZVwiOiBcImFib3V0LXZpZXdfc2hhcmVfMXNUXCIsXG5cdFwiZmFjZWJvb2tcIjogXCJhYm91dC12aWV3X2ZhY2Vib29rXzFWRlwiLFxuXHRcInR3aXR0ZXJcIjogXCJhYm91dC12aWV3X3R3aXR0ZXJfMlB6XCIsXG5cdFwic2V0dGluZ3NcIjogXCJhYm91dC12aWV3X3NldHRpbmdzXzE2MlwiLFxuXHRcInNldHRpbmdzLXJvd1wiOiBcImFib3V0LXZpZXdfc2V0dGluZ3Mtcm93X0pEcVwiLFxuXHRcInJvdy1kZXNjcmlwdG9yXCI6IFwiYWJvdXQtdmlld19yb3ctZGVzY3JpcHRvcl8xazlcIixcblx0XCJkZXNjcmlwdG9yLXRpdGxlXCI6IFwiYWJvdXQtdmlld19kZXNjcmlwdG9yLXRpdGxlXzFSZFwiLFxuXHRcImRlc2NyaXB0b3ItZGV0YWlsXCI6IFwiYWJvdXQtdmlld19kZXNjcmlwdG9yLWRldGFpbF8xcjNcIixcblx0XCJyb3ctYWN0aW9uXCI6IFwiYWJvdXQtdmlld19yb3ctYWN0aW9uX25ibFwiLFxuXHRcInJvdy1sYWJlbFwiOiBcImFib3V0LXZpZXdfcm93LWxhYmVsX1RheFwiLFxuXHRcInN3aXRjaC1idXR0b25cIjogXCJhYm91dC12aWV3X3N3aXRjaC1idXR0b25fM2VyXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi9+L3Bvc3Rjc3MtbG9hZGVyP3tcImlkZW50XCI6XCJwb3N0Y3NzXCIsXCJzb3VyY2VNYXBcIjp0cnVlfSEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz97XCJzb3VyY2VNYXBcIjp0cnVlfSEuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hYm91dC12aWV3L2Fib3V0LXZpZXcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL2Fib3V0LXZpZXcuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9tb2R1bGVzJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9bbG9jYWxdX1toYXNoOmJhc2U2NDozXSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanM/P3Bvc3Rjc3MhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tMS0zIS4vYWJvdXQtdmlldy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bW9kdWxlcyZsb2NhbElkZW50TmFtZT1bbmFtZV1fW2xvY2FsXV9baGFzaDpiYXNlNjQ6M10hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2luZGV4LmpzPz9wb3N0Y3NzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTEtMyEuL2Fib3V0LXZpZXcuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGllbnQvY29tcG9uZW50cy92aWV3cy9hYm91dC12aWV3L2Fib3V0LXZpZXcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJzb3VyY2VSb290IjoiIn0=