import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './progress-indicator.scss';

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: '0%',
      opacity: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this.progressIndicator.classList.add(s.animatable);
      this.setState({
        width: '50%',
        opacity: 1,
      });
    }
    if (!nextProps.isLoading && !nextProps.hasErrored && (nextProps.activePage !== this.props.activePage)) {
      this.progressIndicator.classList.add(s.animatable);
      this.progressIndicator.addEventListener('transitionend', this._fadeout);
      this.setState({
        width: '100%',
        opacity: 1,
      });
    }
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
      this.progressIndicator.classList.remove(s.animatable);

      this.setState({
        width: '0%',
        opacity: 1,
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
        className={s.progressIndicator}
        style={style} 
      />
    );
  }

}

export default withStyles(s)(ProgressIndicator);
