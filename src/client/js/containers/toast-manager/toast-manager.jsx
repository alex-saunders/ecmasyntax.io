import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { popToast } from '../../actions/utils';

import s from './toast-manager.scss';

class ToastManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      toast: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toasts.length < 1) {
      return;
    }

    this._triggerToast(nextProps.toasts[nextProps.toasts.length - 1]);
  }

  _triggerToast(toast) {
    if (this.state.active) {
      return;
    }

    this.setState({
      toast,
      active: true,
    });

    if (toast.timeout) {
      this.timeout = setTimeout(() => {
        this._closeToast();
      }, toast.timeout);
    }
  }

  _closeToast = () => {
    this.setState({
      active: false,
    });
    this.toast.addEventListener('transitionend', this._removeToast);
  }

  _removeToast = () => {
    this.toast.removeEventListener('transitionend', this._removeToast);
    this.props.popToast();
  }

  _handleClick = () => {
    clearTimeout(this.timeout);
    this._closeToast();
    if (this.state.toast.callback) {
      this.state.toast.callback();
    }
  }

  render() {
    return (
      <div className={s['toast-container']}>
        <div
          className={`${s['toast-wrapper']} ${this.state.active ? s.active : ''}`}
          ref={(div) => { this.toast = div; }}
        >
          <div className={s.toast}>
            <p className={s.message}>
              {this.state.toast.messageText}
            </p>
            <button className={s.action} onClick={this._handleClick}>
              {this.state.toast.actionText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ToastManager.propTypes = {
  toasts: PropTypes.array.isRequired,
  popToast: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    toasts: state.utils.toasts,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    popToast: () => { dispatch(popToast()); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(ToastManager));
