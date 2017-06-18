import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import switchStyles from '@material/switch/dist/mdc.switch.css';
import s from './offline-switch.scss';

import Dialog from '../../../common/dialog/dialog';

import { checkCache, cacheResponse, uncacheResponse } from '../../../../utils/offline-cache';

class OfflineSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      activeRoute: this.props.activeRoute,
      dialogActive: false,
    };
  }

  componentDidMount() {
    this._updateState(this.props.activeRoute);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoute !== this.props.activeRoute) {
      this._updateState(nextProps.activeRoute);
    }
  }

  // this function gets called upon mount & subsequent route changes
  _updateState = (activeRoute) => {
    // if no change in route, get out of here
    if (activeRoute === this.state.activeRoute) {
      return;
    }

    const request = this._generateRequest(activeRoute);

    // if user has chosen to auto download all content
    if (this.props.autoDownload) {
      checkCache(request)
      .then((cached) => {
        // and the content is not already cached
        if (!cached) {
          // cache the response
          cacheResponse(request)
          .then(() => {
            this.setState({
              checked: true,
            });
          });
        } else {
          // else if the content is already cached, update state
          this.setState({
            checked: true,
          });
        }
      });
    } else {
      // else if the user has not chosen to auto download all content
      checkCache(request).then((cached) => {
        // set the state dependent on whether the content is already cached or not
        this.setState({
          checked: cached,
          activeRoute,
        });
      });
    }
  }

  _generateRequest = (route) => {
    return `${location.origin}/api${route}`;
  }

  handleClick = () => {
    if (!window.CacheStorage) {
      this._showToast('Sorry, this feature is not available in your browser!', 'OK', 3000, () => {
      });
    }
    const request = this._generateRequest(this.props.activeRoute);
    checkCache(request).then((cached) => {
      if (cached) {
        uncacheResponse(request).then(() => {
          this.setState({
            checked: false,
          });
        });
      } else {
        this._autoDownloadDialog();
        cacheResponse(request).then(() => {
          this.setState({
            checked: true,
          });
          this._showToast('Content avaliable offline', 'OK', 3000, () => {
          });
        });
      }
    });
  }

  _closeDialog = () => {
    this.setState({
      dialogActive: false,
    });
  }

  // checks IDB for whether user has decided whether or not to
  // download all content automatically
  _autoDownloadDialog() {
    // at the moment, if indexedDB not avaliable, no alternative.
    if (!window.indexedDB) {
      return;
    }

    // user has not confirmed whether or not to auto download content
    if (this.props.autoDownload === null) {
      this.setState({
        dialogActive: true,
      });
    }
  }

  _setAutoDownload = (bool) => {
    this._closeDialog();
    this.props.setAutoDownload(bool);
  }

  _showToast = (message, actionText, timeout, action) => {
    this.props.pushToast(message, actionText, timeout, action);
  }

  render() {
    return (
      <div className={`${s['switch-container']} ${this.state.checked ? s.active : ''}`}>
        <span className={s['switch-label']}>
          Available Offline
        </span>
        <label htmlFor="basic-switch">
          <button className={`mdc-switch ${s.button}`} onClick={this.handleClick}>
            <input
              type="checkbox" id="basic-switch"
              className={`mdc-switch__native-control ${s.input}`} checked={this.state.checked}
            />
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob" />
            </div>
          </button>
        </label>
        <Dialog
          active={this.state.dialogActive}
          title="Automatically download content"
          message="Would you like to automatically download all content you visit for offline use? (this setting can be changed in the About page)"
          cancelText="No"
          confirmText="Yes"
          cancelAction={() => { this.setState({ dialogActive: false }); }}
          negativeAction={() => { this._setAutoDownload(false); }}
          confirmAction={() => { this._setAutoDownload(true); }}
        />
      </div>
    );
  }
}

OfflineSwitch.propTypes = {
  activeRoute: PropTypes.string,
  pushToast: PropTypes.func.isRequired,
  autoDownload: PropTypes.bool,
  setAutoDownload: PropTypes.func.isRequired,
};

OfflineSwitch.defaultProps = {
  autoDownload: null,
  activeRoute: null,
};

export default withStyles(s, switchStyles)(OfflineSwitch);
