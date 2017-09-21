import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './progress-indicator.scss';

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: '0%',
      opacity: 1,
      animatable: true,
    };
  }

  render() {
    const style = {
      width: `${this.props.progress}%`,
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

ProgressIndicator.propTypes = {
  progress: PropTypes.number.isRequired
};

export default withStyles(s)(ProgressIndicator);
