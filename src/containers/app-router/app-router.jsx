import React from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../../actions/active-page';
import { toggleDrawer } from '../../actions/utils';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../scss/base.scss';

import Drawer from '../../components/drawer/drawer';
import DrawerToggle from '../../components/drawer/drawer-toggle/drawer-toggle';
import Main from '../../components/main/main';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onPopstate);

    if (this.props.route) {
      // route set from url
      console.log(`DEEP LINKED TO %c${this.props.route}`, "color: blue");
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopstate);
  }

  // route change function
  onPopstate = () => {
    const path = window.location.pathname;
    console.log('here');
    this.props.fetchPage(path);
  }

  selectRoute = (page) => {
    if (this.props.route === page)
      return;

    console.log(`MANUAL SELECT %c${page}`, "color: darkblue;");

    window.history.pushState(null, null, (page));
    this.props.toggleDrawer(false);

    return this.onPopstate();
  }

	render() {
    return (
      <div className={s['app-container']}>
        <DrawerToggle />
        <Drawer selectRoute={this.selectRoute}/>
        <Main />
      </div>
    );
	}
}

function mapStateToProps(state) {
	return {
    route: state.activePage.route,
    hasErrored: state.activePage.pageListError,
    isLoading: state.activePage.pageListLoading,
	};
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: (url) => dispatch(fetchPage(url)),
    toggleDrawer: (open) => dispatch(toggleDrawer(open))
  }
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(AppRouter));
