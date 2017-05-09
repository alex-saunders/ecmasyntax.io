import React from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../../actions/active-page';
import { toggleDrawer, toggleSearch } from '../../actions/utils';
import { search } from '../../actions/search';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../scss/base.scss';

import ProgressIndicator from '../../components/main/progress-indicator/progress-indicator';
import MainHeader from '../../components/main/main-header/main-header';
import Drawer from '../drawer/drawer';
import Main from '../main/main';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoute: this.props.activeRoute,
    }
  }

  componentDidMount() {
    if (window.location.pathname); {
      this.onPopstate();
      console.log(`DEEP LINKED TO %c${window.location.pathname}`, "color: blue");
    }
    window.addEventListener('popstate', this.onPopstate);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopstate);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeRoute !== this.state.activeRoute) {
      return this.onPopstate();
    }
  }

  // route change function
  onPopstate = () => {
    if (location.pathname !== '/') {
      this.props.fetchPage(location.pathname);
    }
  }

  selectRoute = (page) => {
    const route = page.fields.route;

    // if (this.props.activeRoute === route)
    //   return;

    window.history.pushState(null, null, (route));

    console.log(`MANUAL SELECT %c${route}`, "color: darkblue;");

    this.props.toggleDrawer(false);
    this.props.toggleSearch(false);
    this.props.search('');
    
    return this.onPopstate();

  }

	render() {
    return (
      <div className={s['app-container']}>
        <ProgressIndicator
          activePage={this.props.activePage}
          activeRoute={this.props.activeRoute}
          hasErrored={this.props.hasErrored}
          isLoading={this.props.isLoading}
        />
        <MainHeader
          activePage={this.props.activePage}
          drawerOpen={this.props.drawerOpen}
          searchOpen={this.props.searchOpen}
          toggleDrawer={this.props.toggleDrawer}
          toggleSearch={this.props.toggleSearch}
          currQuery={this.props.currQuery} 
          search={this.props.search}
        />
        <div className={s['main-container']}>
          <Drawer selectRoute={this.selectRoute}/>
          <Main selectRoute={this.selectRoute} />
        </div>
      </div>
    );
	}
}

function mapStateToProps(state) {
	return {
    activePage: state.activePage.page,
    activeRoute: state.activePage.route,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    currQuery: state.pageList.query,
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen,
	};
}

function matchDispatchToProps(dispatch) {
  return {
    search: (query) => dispatch(search(query)),
    fetchPage: (url) => dispatch(fetchPage(url)),
    toggleDrawer: (open) => dispatch(toggleDrawer(open)),
    toggleSearch: (open) => dispatch(toggleSearch(open))
  }
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(AppRouter));
