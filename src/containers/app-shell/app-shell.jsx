import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from '../../scss/base.scss';

import { fetchPage } from '../../actions/active-page';
import { toggleDrawer, toggleSearch } from '../../actions/utils';
import { fetchPageList, search } from '../../actions/page-list';

import ProgressIndicator from '../../components/main/progress-indicator/progress-indicator';
import MainHeader from '../header/main-header';
import Drawer from '../drawer/drawer';
import Main from '../main/main';
import ToastManager from '../toast-manager/toast-manager';

class AppShell extends React.Component {
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
    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js').then((registration) => {
    //       // Registration was successful
    //       console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     }, (err) => {
    //       // registration failed :(
    //       console.log('ServiceWorker registration failed: ', err);
    //     });
    //   });
    // }

    // async fetch pagelist
    this.props.fetchPageList();
    // check service worker functionality is available
  }

  scrolled = (bool) => {
    this.setState({
      scrolled: bool,
    });
  }

  render() {
    return (
      <div className={s['app-container']}>
        <ProgressIndicator progress={this.props.progress} />
        <MainHeader scrolled={this.state.scrolled}/>
        <div className={s['main-container']}>
          <Drawer />
          <Main
            scrolled={this.scrolled}
          />
          <ToastManager />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    progress: state.utils.progress,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: () => { dispatch(fetchPageList()); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(AppShell));
