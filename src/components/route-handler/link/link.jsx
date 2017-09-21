import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './link.scss';

class Route extends React.Component {

  clickHandler = (e) => {
    e.preventDefault();

    if (this.props.route.startsWith('#')) {
      location.hash = this.props.route;
    } else {
      window.history.pushState(null, null, (this.props.route));
    }

    window.dispatchEvent(new Event('popstate'));

    if (this.props.handleClick) this.props.handleClick(e);
  }
    

  render() {
    return (
      <a
        href={this.props.route}
        onClick={this.clickHandler}
        className={s.route}
      >
        {this.props.children}
      </a>
    );
  }

}

Route.propTypes = {
  route: PropTypes.string.isRequired,
  children: PropTypes.element,
  handleClick: PropTypes.func
};

Route.defaultProps = {
  children: null,
};

function mapStateToProps() {
  return {
  };
}

export default withStyles(s)(connect(mapStateToProps)(Route));
