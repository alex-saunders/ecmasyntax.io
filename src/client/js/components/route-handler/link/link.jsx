import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import URLSearchParams from 'url-search-params';

import Ripple from '../../common/ripple/ripple';
import s from './link.scss';

class Route extends React.Component {

  clickHandler = (e) => {
    e.preventDefault();

    if (this.props.route.startsWith('?')) {
      // location.search = this.props.route;

      const url = new URL(location.href);
      url.search = this.props.route;
      window.history.replaceState(null, null, url.href)
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
        className={`${s.route} ${this.props.className}`}
      >
        { this.props.ripple ? <Ripple /> : '' }
        {this.props.children}
      </a>
    );
  }

}

Route.propTypes = {
  route: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.element,
  handleClick: PropTypes.func,
  className: PropTypes.string,
};

Route.defaultProps = {
  children: null,
  disabled: false,
  className: ''
};

function mapStateToProps() {
  return {
  };
}

export default withStyles(s)(connect(mapStateToProps)(Route));
