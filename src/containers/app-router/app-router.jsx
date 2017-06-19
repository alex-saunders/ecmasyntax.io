import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../scss/base.scss';

import { fetchPage } from '../../actions/active-page';
import { toggleDrawer, toggleSearch } from '../../actions/utils';
import { fetchPageList, search } from '../../actions/page-list';

import ProgressIndicator from '../../components/main/progress-indicator/progress-indicator';
import MainHeader from '../../components/main/main-header/main-header';
import Drawer from '../drawer/drawer';
import Main from '../main/main';
import ToastManager from '../toast-manager/toast-manager';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoute: this.props.activeRoute,
      scrolled: false,
      cacheStorage: false,
    };

    this.caches = false;
  }

  componentDidMount() {
    // service worker initialisation
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err) => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

    // async fetch pagelist
    this.props.fetchPageList();
    // async fetch routed page
    this.props.fetchPage(location.pathname);
    // check service worker functionality is available
    this.caches = window.caches;

    window.addEventListener('popstate', this.onPopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState);
  }

  onPopState = () => {
    this.props.fetchPage(location.pathname);
  }

  scrolled = (bool) => {
    this.setState({
      scrolled: bool,
    });
  }

  render() {
    const showWaterfallHeader =
      this.caches
      && this.props.activePage
      && new RegExp(/^\/pages\//).test(this.props.activePage.fields.route)
      && !this.props.searchOpen
      && !this.state.scrolled;
      // && !this.props.isLoading;

    return (
      <div className={s['app-container']}>
        <ProgressIndicator
          activePage={this.props.activePage}
          activeRoute={this.props.activeRoute}
          hasErrored={this.props.hasErrored}
          isLoading={this.props.isLoading}
        />
        <MainHeader
          activePageTitle={this.props.activePageTitle}
          drawerOpen={this.props.drawerOpen}
          searchOpen={this.props.searchOpen}
          toggleDrawer={this.props.toggleDrawer}
          toggleSearch={this.props.toggleSearch}
          currQuery={this.props.currQuery}
          search={this.props.search}
          showWaterfallHeader={showWaterfallHeader}
        />
        <div className={s['main-container']}>
          <Drawer />
          <Main
            scrolled={this.scrolled}
            showWaterfallHeader={showWaterfallHeader}
          />
          <ToastManager />
        </div>
      </div>
    );
  }
}

AppRouter.propTypes = {
  activeRoute: PropTypes.string,
  currQuery: PropTypes.string.isRequired,
  activePage: PropTypes.object,
  activePageTitle: PropTypes.string,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  drawerOpen: PropTypes.bool,
  searchOpen: PropTypes.bool,
  pageList: PropTypes.array,
  fetchPageList: PropTypes.func.isRequired,
  fetchPage: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

AppRouter.defaultProps = {
  hasErrored: false,
  isLoading: false,
  drawerOpen: false,
  searchOpen: false,
  pageList: [],
  activeRoute: null,
  activePage: null,
  activePageTitle: null,
};

function mapStateToProps(state) {
  return {
    activePage: state.activePage.page,
    activePageTitle: state.activePage.title,
    activeRoute: state.activePage.route,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    pageList: state.pageList.entries,
    currQuery: state.pageList.query,
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: () => { dispatch(fetchPageList()); },
    search: (query) => { dispatch(search(query)); },
    fetchPage: (url) => { dispatch(fetchPage(url)); },
    toggleDrawer: (open) => { dispatch(toggleDrawer(open)); },
    toggleSearch: (open) => { dispatch(toggleSearch(open)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(AppRouter));
