import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './offline-switch.scss';
import switchStyles from '@material/switch/dist/mdc.switch.css';

class OfflineSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.apiRequest = location.origin + '/api' + this.props.activeRoute;
    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    this._update();
  }

  componentWillReceiveProps() {
    this._update();
  }


  _update() {
    this._checkCache().then((cached) => {
      if (cached) {
        this.setState({
          checked: true,
        });
      } else {
        this.setState({
          checked: false,
        });
      }
    });
  }

  _checkCache = () => {
    return new Promise((resolve, reject) => {
      caches.match(this.apiRequest).then((cachedResponse) => {
        if (cachedResponse) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  handleClick = (evt) => {
    this._checkCache().then((cached) => {
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
          fetch(this.apiRequest).then((response) => {
            cache.put(this.apiRequest, response.clone()).then(() => {
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
        <div className={switchStyles['mdc-switch']} onClick={this.handleClick}>
          <input type="checkbox" id="basic-switch" 
            className={switchStyles['mdc-switch__native-control']} checked={this.state.checked} />
          <div className={switchStyles['mdc-switch__background']}>
            <div className={switchStyles['mdc-switch__knob']}></div>
          </div>
        </div>
      </div>
    );
  }

}

export default withStyles(s, switchStyles)(OfflineSwitch);
