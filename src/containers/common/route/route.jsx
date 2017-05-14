import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { fetchPage } from '../../../actions/active-page';

import s from './route.scss';

class Route extends React.Component {

  clickHandler = (e) => {
    e.preventDefault();
    // console.info(`MANUAL SELECT %c${this.props.route}`, 'color: darkblue;');
    window.history.pushState(null, null, (this.props.route));
    this.props.fetchPage(this.props.route);
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
  fetchPage: PropTypes.func.isRequired,
};

Route.defaultProps = {
  children: null,
};

function mapStateToProps() {
  return {
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: (url) => { dispatch(fetchPage(url)); },
  };
}


export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Route));
