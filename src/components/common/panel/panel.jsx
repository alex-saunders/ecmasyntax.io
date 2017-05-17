import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './panel.scss';

class Panel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      closed: this.props.closed,
    };
  }

  _handleClick = () => {
    this.setState((prevState) => {
      return {
        closed: !prevState.closed,
      };
    });
  }

  render() {
    return (
      <div className={s.panel}>
        <button className={s['panel-title']} onClick={this._handleClick}>
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className={s.icon}>
            {this.props.icon}
          </svg>
          {this.props.title}
          <div className={s.filler} />
          <svg
            fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
            className={`${s.expand} ${this.state.closed ? s.closed : ''}`}
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
        <div className={`${s['panel-body']} ${this.state.closed ? s.closed : ''}`}>
          {this.props.body}
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
  closed: PropTypes.bool,
};

Panel.defaultProps = {
  closed: false,
};

export default withStyles(s)(Panel);
