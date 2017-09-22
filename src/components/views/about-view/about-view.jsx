import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import switchStyles from '@material/switch/dist/mdc.switch.css';

import { setActivePageTitle, setActiveRoute } from '../../../actions/active-page';
import { progressUpdate, toggleWaterfallHeader } from '../../../actions/utils';

import { getAutoDownloadVal, setAutoDownload } from '../../../utils/offline-cache';

import s from './about-view.scss';

class AboutView extends React.Component {

  constructor(props) {
    super(props);

    

    this.state = {
      autoDownload: false,
    }
  }

  componentDidMount() {
    this.props.setActivePageTitle('About');
    this.props.setActiveRoute('/about');
    this.props.toggleWaterfallHeader(false);
    
    this.props.progressUpdate(100);

    getAutoDownloadVal().then((autoDownloadVal) => {
      this.setState({
        autoDownload: autoDownloadVal
      })
    })
  }

  _setAutoDownload = () => {
    setAutoDownload(!this.state.autoDownload).then(() => {
      this.setState({
        autoDownload: !this.state.autoDownload
      })
    })
  }

  render() {
    return (
      <div className={s['about-container']}>
        <div className={s['markdown-wrapper']}>
          <h1>
            ECMASyntax.io
          </h1>
          <h2>
            About
          </h2>
          <p>
            ECMASyntax is an offline-first PWA designed for developers.
            It aims to provide a reference for JavaScript syntax,
            detailing what pieces of syntax do, and how to use them.
            Currently, only the newest features of the JavaScript specification are given,
            but the content will hopefully be updated over time
            to include more legacy additions.
          </p>
          <p>
            This is an OPEN source project, created by
            <a href="https://twitter.com/AlexJRsaunders" target="_blank" rel="noopener noreferrer"> @alexjrsaunders</a>
            , so please feel free to help out by
            <a href="https://github.com/alex-saunders/ecmasyntax.io" target="_blank" rel="noopener noreferrer"> reporting bugs, forking and opening pull requests when possible</a>.
          </p>
          <p>
            To get started, select one of the items in the menu
            (and don&#39;t forget to add to your homescreen!)
          </p>
          <h2>Credits</h2>
          <p>
            The design for this site was inspired by
            <a href="http://cssreference.io/" target="_blank" rel="noopener noreferrer"> HTML/CSSReference.io </a>
            (2 very awesome sites, go check em out!), created by
            <a href="https://twitter.com/jgthms" target="_blank" rel="noopener noreferrer"> @jgthms</a>
          </p>
          <p>
            Content heavily references the material available on the
            <a href="https://developer.mozilla.org/en-US/docs/MDN/About$history" target="_blank" rel="noopener noreferrer"> Mozilla Developer Network</a>.
            As well as the awesome <a href="http://es6-features.org/#Constants" target="_blank" rel="noopener noreferrer"> es6-features.org</a>
          </p>
          <h2>
            Settings
          </h2>
          <div className={s.settings}>
            <label
              htmlFor="auto-download-switch"
              className={`${s['settings-row']} ${s['row-label']}`}
            >
              <div className={s['row-descriptor']}>
                <p className={s['descriptor-title']}>
                  Auto Download Content
                </p>
                <p className={s['descriptor-detail']}>
                  Automatically download all content you visit for offline use
                </p>
              </div>
              <div className={s['row-action']}>
                <button className={`mdc-switch ${s['switch-button']}`}>
                  <input
                    type="checkbox" id="auto-download-switch"
                    className={`mdc-switch__native-control ${s.input}`}
                    checked={(this.state.autoDownload)}
                    onChange={this._setAutoDownload}
                  />
                  <div className="mdc-switch__background">
                    <div className="mdc-switch__knob" />
                  </div>
                </button>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

AboutView.propTypes = {
  autoDownload: PropTypes.bool,
  setAutoDownload: PropTypes.func.isRequired,
};

AboutView.defaultProps = {
  autoDownload: null,
};

function mapStateToProps(state) {
  return {};
}

function matchDispatchToProps(dispatch) {
  return {
    setActivePageTitle: (title) => { dispatch(setActivePageTitle(title)); },
    setActiveRoute: (route) => { dispatch(setActiveRoute(route)); },
    progressUpdate: (percentage) => { dispatch(progressUpdate(percentage)); },
    toggleWaterfallHeader: (visible) => { dispatch(toggleWaterfallHeader(visible)); },
  };
}

export default withStyles(s, switchStyles)(connect(mapStateToProps, matchDispatchToProps)(AboutView));
