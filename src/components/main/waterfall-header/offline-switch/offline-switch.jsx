import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import switchStyles from '@material/switch/dist/mdc.switch.css';
import s from './offline-switch.scss';

import { AUTO_DOWNLOAD_EXPIRY } from '../../../../utils/constants';
import { getObjectStore, getKeyVal, putKeyVal } from '../../../../utils/idb';

import Dialog from '../../../common/dialog/dialog';

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

    this._getAutoDownload()
    .then((autoDownload) => {
      // if user has chosen to auto download all content
      if (autoDownload && autoDownload.value) {
        this._checkCache(request)
        .then((cached) => {
          // and the content is not already cached
          if (!cached) {
            // cache the response
            this._cacheResponse(request)
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
        this._checkCache(request).then((cached) => {
          // set the state dependent on whether the content is already cached or not
          this.setState({
            checked: cached,
            activeRoute,
          });
        });
      }
    });
  }

  _generateRequest = (route) => {
    return `${location.origin}/api${route}`;
  }

  _checkCache = (request) => {
    return new Promise((resolve, reject) => {
      caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  _uncacheResponse = (request) => {
    return new Promise((resolve, reject) => {
      caches.open('ecmasyntax-runtime').then((cache) => {
        cache.delete(request).then(() => {
          resolve();
          // this.props.pushToast('Content removed from offline use', 'OK', 3000);
        });
      })
      .catch((err) => {
        reject();
        throw new Error(err);
      });
    });
  }

  _cacheResponse = (request) => {
    return new Promise((resolve, reject) => {
      caches.open('ecmasyntax-runtime').then((cache) => {
        document.body.style.cursor = 'wait';
        fetch(request).then((response) => {
          cache.put(request, response.clone()).then(() => {
            document.body.style.cursor = '';
            resolve();
          });
        })
        .catch((err) => {
          reject();
          throw new Error(err);
        });
      });
    });
  }

  handleClick = () => {
    if (!window.CacheStorage) {
      this._showToast('Sorry, this feature is not available in your browser!', 'OK', 3000, () => {
      });
    }
    const request = this._generateRequest(this.props.activeRoute);
    this._checkCache(request).then((cached) => {
      if (cached) {
        this._uncacheResponse(request).then(() => {
          this.setState({
            checked: false,
          });
        });
      } else {
        this._autoDownloadDialog();
        this._cacheResponse(request).then(() => {
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

    this._getAutoDownload()
    .then((result) => {
      if (!result || (result.expiration < Date.now())) {
        this.setState({
          dialogActive: true,
        });
      }
    });
  }

  _getAutoDownload = () => {
    return new Promise((resolve, reject) => {
      getObjectStore('Settings')
      .then((store) => {
        getKeyVal(store, 'auto-download-content')
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
          throw new Error(err);
        });
      });
    });
  }

  _setAutoDownload = (bool) => {
    this._closeDialog();

    getObjectStore('Settings')
    .then((store) => {
      putKeyVal(store, {
        setting: 'auto-download-content',
        value: bool,
        expiration: (Date.now() + AUTO_DOWNLOAD_EXPIRY),
      });
    });
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
          message="Would you like to automatically download all content you visit for offline use?"
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
};

OfflineSwitch.defaultProps = {
  activeRoute: null,
};

export default withStyles(s, switchStyles)(OfflineSwitch);
