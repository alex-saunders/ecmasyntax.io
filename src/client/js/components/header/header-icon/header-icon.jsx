import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../common/ripple/ripple';

import RouteHandler from '../../route-handler/route-handler';

import s from './header-icon.scss';
import headerStyles from '../../../containers/header/main-header.scss';

class HeaderIcon extends React.Component {

  toggleDrawer = () => {
    this.props.toggleDrawer(!this.props.drawerOpen);
  };

  closeSearch = () => {
    // this.props.search('');
    RouteHandler.UpdateRoute(location.pathname);
  }

  render() {
    return (
      <div className={`${this.props.searchOpen ? s.searchOpen : ''}`}>

        <button onClick={this.toggleDrawer} 
          className={`${headerStyles['header-icon']} ${s['icon--menu']}`}>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
          <Ripple />
        </button>

        <button onClick={this.closeSearch} 
          className={`${headerStyles['header-icon']} ${s['icon--back']}`}>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <Ripple />
        </button>

      </div>
    );
  }
}

HeaderIcon.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  searchOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default withStyles(s, headerStyles)(HeaderIcon);
