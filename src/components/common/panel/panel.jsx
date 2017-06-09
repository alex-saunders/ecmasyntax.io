import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './panel.scss';

class Panel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      closed: false,
      maxHeight: '',
    };

    this.maxHeight = 'none';
  }

  componentDidMount() {
    this._calcHeight();

    // yep this is horrible. TODO: Make this better.
    window.addEventListener('resize', this._calcHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._calcHeight);
  }

  _calcHeight = () => {
    this.setState({
      maxHeight: this.bodyContent.getBoundingClientRect().height,
    });
  }

  _handleClick = () => {
    this.setState((prevState) => {
      return {
        closed: !prevState.closed,
      };
    });
  }

  render() {
    const style = {
      maxHeight: this.state.closed ? '0px' : this.state.maxHeight,
    };
    return (
      <div className={s.panel}>
        <button className={s['panel-title']} onClick={this._handleClick}>
          {this.props.title}
          <div className={s.filler} />
          <svg
            viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
            className={`${s.expand} ${this.state.closed ? s.closed : ''}`}
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
        <div
          className={`${s['panel-body--wrapper']} ${this.state.closed ? s.closed : ''}`}
          ref={(div) => { this.body = div; }}
          style={style}
        >
          <div
            className={s['panel-body--content']}
            ref={(div) => { this.bodyContent = div; }}
          >
            {this.props.body}
          </div>
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
};

export default withStyles(s)(Panel);
