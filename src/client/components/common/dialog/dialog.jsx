import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './dialog.scss';

import Ripple from '../ripple/ripple';

class Dialog extends React.Component {

  _bgClick = () => {
    this.props.cancelAction();
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: s.enter,
          enterActive: s.enterActive,
          leave: s.leave,
          leaveActive: s.leaveActive,
          appear: s.appear,
          appearActive: s.appearActive,
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppearTimeout={300}
        transitionAppear
      >
        {
          this.props.active ?
            <div className={`${s['dialog-container']}`} key={1} onClick={this._bgClick}>
              <div className={s.dialog} ref={(div) => { this.dialog = div; }}>
                <header className={s.header}>
                  <h1 className={s.title}>
                    {this.props.title}
                  </h1>
                </header>
                <section className={s.body}>
                  <p className={s['body-text']}>
                    {this.props.message}
                  </p>
                </section>
                <footer className={s.footer}>
                  <div className={s.actions}>
                    <button className={s.action} onClick={this.props.negativeAction}>
                      {this.props.cancelText}
                      <Ripple />
                    </button>
                    <button className={s.action} onClick={this.props.confirmAction}>
                      {this.props.confirmText}
                      <Ripple />
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          :
          ''
        }

      </ReactCSSTransitionGroup>
    );
  }
}

Dialog.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelAction: PropTypes.func,
  negativeAction: PropTypes.func,
  confirmAction: PropTypes.func,
};

Dialog.defaultProps = {
  active: false,
  cancelText: 'cancel',
  confirmText: 'Ok',
  cancelAction: () => { },
  negativeAction: () => { },
  confirmAction: () => { },
};

export default withStyles(s)(Dialog);
