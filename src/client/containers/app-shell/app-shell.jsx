import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from '../../scss/base.scss';

import { fetchPage } from '../../actions/active-page';
import { toggleDrawer, toggleSearch } from '../../actions/utils';
import { fetchPageList, search } from '../../actions/page-list';

import ProgressIndicator from '../../components/main/progress-indicator/progress-indicator';
import MainHeader from '../header/main-header';
import Drawer from '../drawer/drawer';
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
    // async fetch pagelist
    this.props.fetchPageList();
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
          { this.props.children }
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
