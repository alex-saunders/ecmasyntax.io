import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import switchStyles from '@material/switch/dist/mdc.switch.css';
import s from './offline-switch.scss';

class OfflineSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
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

  _updateState = (activeRoute) => {
    this._checkCache(activeRoute).then((cached) => {
      this.setState({
        checked: cached,
      });
    });
  }

  _checkCache = (activeRoute) => {
    this.apiRequest = `${location.origin}/api${activeRoute}`;
    return new Promise((resolve, reject) => {
      caches.match(this.apiRequest)
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

  handleClick = () => {
    this._checkCache(this.props.activeRoute).then((cached) => {
      if (cached) {
        caches.open('ecmasyntax-runtime').then((cache) => {
          cache.delete(this.apiRequest).then(() => {
            this.setState({
              checked: false,
            });
          });
        });
      } else {
        caches.open('ecmasyntax-runtime').then((cache) => {
          document.body.style.cursor = 'wait';
          fetch(this.apiRequest).then((response) => {
            cache.put(this.apiRequest, response.clone()).then(() => {
              document.body.style.cursor = '';
              this.setState({
                checked: true,
              });
            });
          });
        });
      }
    });
  }

  render() {
    return (
      <div className={`${s['switch-container']} ${this.state.checked ? s.active : ''}`}>
        <span className={s['switch-label']}>
          Available Offline
        </span>
        <button className={`mdc-switch ${s.button}`} onClick={this.handleClick}>
          <input
            type="checkbox" id="basic-switch"
            className="mdc-switch__native-control" checked={this.state.checked}
          />
          <div className="mdc-switch__background">
            <div className="mdc-switch__knob" />
          </div>
        </button>
      </div>
    );
  }
}

OfflineSwitch.propTypes = {
  activeRoute: PropTypes.string,
};

OfflineSwitch.defaultProps = {
  activeRoute: null,
};

export default withStyles(s, switchStyles)(OfflineSwitch);
