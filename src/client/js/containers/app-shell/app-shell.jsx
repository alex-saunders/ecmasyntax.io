import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import s from './app-shell.scss';

import { fetchPage } from '../../actions/active-page';
import { toggleDrawer, toggleSearch, toggleWaterfallHeader } from '../../actions/utils';
import { fetchPageList, search } from '../../actions/page-list';

import ProgressIndicator from '../../components/main/progress-indicator/progress-indicator';
import MainHeader from '../header/main-header';
import Drawer from '../drawer/drawer';
import Footer from '../../components/footer/footer';
import ToastManager from '../toast-manager/toast-manager';

class AppShell extends React.Component {
  constructor(props) {
    super(props);

    this.latestKnownScrollY = 0;
    this.ticking = false;
  }


  componentDidMount() {
    // async fetch pagelist
    this.props.fetchPageList();
  }

  scrollTo = (scrollY) => {
    this.contentWrapper.scrollTop = scrollY;
  }

  updateWaterfallHeader() {
    if (this.props.activePageType === 'article' && !this.props.searchOpen) {
      if (this.contentWrapper.scrollTop > 0 && this.props.waterfallHeaderOpen) {
        this.props.toggleWaterfallHeader(false);        
      }
      if (this.contentWrapper.scrollTop < 1 && !this.props.waterfallHeaderOpen) {
        this.props.toggleWaterfallHeader(true);
      }
    }
  }

  update = () => {
    this.ticking = false;

    const currentScrollY = this.latestKnownScrollY;

    this.updateWaterfallHeader();
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(this.update);
    }
    this.ticking = true;
  }

  scrollHandler = () => {
    // debounce scroll events
    this.latestKnownScrollY = this.contentWrapper.scrollTop;
    this.requestTick();
  }

  render() {
    return (
      <div className={s['app-wrapper']}>
        <Drawer />
        <div className={s['main-wrapper']}>
          <ProgressIndicator progress={this.props.progress} />
          <MainHeader />
          <div className={s['content-wrapper']} onScroll={this.scrollHandler} ref={(div) => { this.contentWrapper = div; }}>
            <div className={s['align-top']}>
              {this.props && this.props.children ? 
                React.cloneElement(this.props.children, {
                  triggerScrollHandler: this.scrollHandler,
                  scrollTo: this.scrollTo
                }) 
                :
                ''
              }
              <ToastManager />
            </div>
            <div className={s['align-bottom']}>
              <Footer isLoading={this.props.isLoading} searchOpen={this.props.searchOpen}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    progress: state.utils.progress,
    waterfallHeaderOpen: state.utils.waterfallHeaderOpen,
    isLoading: state.activePage.isLoading,
    activePageType: state.activePage.type,
    searchOpen: state.utils.searchOpen,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: () => { dispatch(fetchPageList()); },
    toggleWaterfallHeader: (bool) => { dispatch(toggleWaterfallHeader(bool)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(AppShell));
