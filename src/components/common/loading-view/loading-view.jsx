import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './loading-view.scss';

class LoadingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        visible: true,
      });
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const style = {
      color: this.props.color,
      fontSize: this.props.size,
    };
    return (
      <div className={s['loading-container']}>
        { this.state.visible ?
            <div className={s.loader} style={style} />
          :
          ''
        }
      </div>
    );
  }
}

LoadingView.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

LoadingView.defaultProps = {
  color: '#fff',
  size: '60px',
};

export default withStyles(s)(LoadingView);
