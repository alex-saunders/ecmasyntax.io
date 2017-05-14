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
          <svg className={s.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className={s.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
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
