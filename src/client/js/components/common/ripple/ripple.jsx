import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './ripple.scss';

class Ripple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeRipple: null,
    };
  }

  onTouchStart = (e) => {
    e.stopPropagation();

    const rect = this.container.getBoundingClientRect();
    this.parentHeight = rect.height;
    this.parentWidth = rect.width;
    this.parentX = rect.left;
    this.parentY = rect.top;

    const clickX = e.touches[0].pageX;
    const clickY = e.touches[0].pageY;

    const x = clickX - this.parentX;
    const y = clickY - this.parentY;

    this.createRipple(x, y);
  }

  onTapDown = () => {
    console.log('tap down');
  }

  onMouseDown = (e) => {
    const rect = this.container.getBoundingClientRect();
    this.parentHeight = rect.height;
    this.parentWidth = rect.width;
    this.parentX = rect.left;
    this.parentY = rect.top;

    const clickX = e.pageX;
    const clickY = e.pageY;

    const x = clickX - this.parentX;
    const y = clickY - this.parentY;

    this.createRipple(x, y);
  }

  onMouseUp = () => {
    if (this.state.activeRipple) {
      this.fadeOutRipple(this.state.activeRipple);
    }
  }

  onMouseLeave = () => {
    if (this.state.activeRipple) {
      this.fadeOutRipple(this.state.activeRipple);
    }
  }

  createRipple = (x, y) => {
    const ripple = document.createElement('span');
    ripple.classList.add(s['ripple-origin']);

    ripple.style.transform = 'scale(0)';


    const size = Math.sqrt((this.parentWidth ** 2) + (this.parentHeight ** 2));
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - (size / 2)}px`;
    ripple.style.top = `${y - (size / 2)}px`;

    ripple.classList.add(s.animatable);

    this.container.appendChild(ripple);

    this.setState({
      activeRipple: ripple,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2)';
      });
    });
  }

  fadeOutRipple = (ripple) => {
    ripple.classList.add(s.out);

    ripple.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'opacity') {
        this.removeRipple(ripple);
      }
    });
  }

  removeRipple = (ripple) => {
    if (ripple && ripple.parentNode === this.container) {
      this.container.removeChild(ripple);
    }
  }

  render() {
    return (
      <div
        className={`${s['ripple-container']} ${this.props.className}`}
        onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
        ref={(div) => { this.container = div; }}
      >
        {this.props.children}
      </div>
    );
  }
}

Ripple.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

Ripple.defaultProps = {
  children: null,
  className: '',
};

export default withStyles(s)(Ripple);
