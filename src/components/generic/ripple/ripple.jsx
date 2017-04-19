import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './ripple.scss';

class Ripple extends React.Component {

	constructor(props) {
		super(props);
	}

  triggerRipple = (e) => {
    e.stopPropagation();
    
    this.parentWidth = this.container.getBoundingClientRect().width;
    this.parentX = this.container.offsetLeft;
    this.parentY = this.container.offsetTop;

    const clickX = e.pageX;
    const clickY = e.pageY;

    const x = clickX - this.parentX
    const y = clickY - this.parentY;

    this.createRipple(x, y);
  }

  createRipple = (x, y) => {
    var ripple = document.createElement("span");
    ripple.classList.add(s['ripple-origin']);

    ripple.style.transform = 'scale(0)';
    ripple.style.width = `${this.parentWidth}px`;
    ripple.style.height = `${this.parentWidth}px`
    ripple.style.left = `${x - (this.parentWidth / 2)}px`;
    ripple.style.top = `${y - (this.parentWidth / 2)}px`;

    ripple.classList.add(s['animatable']);
    
    this.container.appendChild(ripple);

    ripple.addEventListener('transitionend', (e) => {
      this.removeRipple(ripple);
    });
    this.removeRippleOverride = setTimeout(() => {
      this.removeRipple(ripple);
    }, 1000);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = 0;
      })
    });
  }

  removeRipple = (ripple) => {
    clearTimeout(this.removeRippleOverride);

    if (ripple && ripple.parentNode == this.container) {
      this.container.removeChild(ripple);
    }
  }

	render() {
		return (
			<div className={s['ripple-container']} onClick={this.triggerRipple} ref={(div) => this.container = div}>
        {this.props.children}
      </div>
		)
	}
}

export default withStyles(s)(Ripple);
