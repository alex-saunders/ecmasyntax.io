import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import switchStyles from '@material/switch/dist/mdc.switch.css';
import s from './offline-switch.scss';

import Dialog from '../../common/dialog/dialog';

import { getAutoDownloadVal, getAutoDownloadSet, 
          setAutoDownload, checkCache, cacheResponse, 
          uncacheResponse } from '../../../utils/offline-cache';

class OfflineSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      activeRoute: this.props.activeRoute,
      dialogActive: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoute !== this.props.activeRoute) {
      this._updateState(nextProps.activeRoute);
    }
  }

  // this function gets called upon mount & subsequent route changes
  _updateState = (activeRoute) => {
    const apiRequest = this._generateRequest(activeRoute);

    checkCache(apiRequest).then((cached) => {
      this.setState({
        checked: cached
      })
    });

    getAutoDownloadVal().then((autoDownloadVal) => {
      if (autoDownloadVal) {
        this._cacheResponse(apiRequest);
      }
    })
  }

  _generateRequest = (route) => {
    return `${location.origin}/api${route}`;
  }

  handleClick = () => {
    if (!window.CacheStorage) {
      this.props.pushToast('Sorry, this feature is not available on your device!', 'OK', 3000, () => {
      });
      return;
    }

    const apiRequest = this._generateRequest(this.props.activeRoute)
    if (!this.state.checked) {
      this._cacheResponse(apiRequest).then(() => {
        this.props.pushToast('Content available offline', 'OK', 3000, () => {
        });
      })
    } else {
      this._uncacheResponse(apiRequest);
    }
  }

  _cacheResponse(apiRequest) {
    return new Promise((resolve, reject) => {
      cacheResponse(apiRequest).then(() => {
        this.setState({
          checked: true,
        });

        getAutoDownloadSet().then((autoDownloadSet) => {
          if (!autoDownloadSet) {
            this.setState({
              dialogActive: true,
            });
          }
        });

        resolve();
      }).catch((err) => {
        reject(err);
      })
    });
  }

  _uncacheResponse(apiRequest) {
    uncacheResponse(apiRequest).then(() => {
      this.setState({
        checked: false,
      })
    })
  }

  _closeDialog = () => {
    this.setState({
      dialogActive: false,
    });
  }

  _setAutoDownload = (bool) => {
    this._closeDialog();
    setAutoDownload(true);
  }

  render() {
    return (
      <div className={`${s['switch-container']} ${this.state.checked ? s.active : ''}`}>
        <label htmlFor="basic-switch" className={s['switch-label']}>
          <span>
            Available Offline
          </span>
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
