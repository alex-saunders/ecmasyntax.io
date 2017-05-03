import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './progress-indicator.scss';

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: '100%',
      opacity: 1,
      animatable: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && !nextProps.hasErrored && (nextProps.activePage !== this.props.activePage)) {
      // this.progressIndicator.addEventListener('transitionend', this._fadeout);
      this.setState({
        width: '100%',
        opacity: 1,
        animatable: true,
      });
    }

    if (nextProps.isLoading && !this.props.isLoading) {
      this.setState({
        width: '0%',
        opacity: 1,
        animatable: false,
      });

      // Hacky and horrible, TODO: Improve this (extra action creator?)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (this.props.isLoading) {
          this.setState({
            width: '42%',
            opacity: 1,
            animatable: true,
          });
          }
        })
      })
    }


    // if (!nextProps.isLoading) {
    //   this.setState({
    //     width: '50%',
    //     opacity: 1,
    //     animatable: true,
    //   });
    // }

  }

  _fadeout = () => {
    this.progressIndicator.removeEventListener('transitionend', this._fadeout);
    this.setState({
      opacity: 0,
    });
    this.progressIndicator.addEventListener('transitionend', this._reset);
  }

  _reset = (evt) => {
    if (evt.propertyName === 'opacity') {
      this.progressIndicator.removeEventListener('transitionend', this._reset);

      this.setState({
        width: '0%',
        opacity: 1,
        animatable: false,
      });
    }
  }

  render() {
    const style = {
      width: this.state.width,
      opacity: this.state.opacity,
    };

    return (
      <div
        ref={(div) => { this.progressIndicator = div; }}
        className={`${s.progressIndicator} ${this.state.animatable ? s.animatable : ''}`}
        style={style} 
      />
    );
  }

}

export default withStyles(s)(ProgressIndicator);
