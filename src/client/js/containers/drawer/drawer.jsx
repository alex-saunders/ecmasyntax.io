import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './drawer.scss';

import { INITIATE_DRAGGING_THRESHOLD, DRAWER_CLOSE_THRESHOLD } from '../../utils/constants';
import { toggleDrawer } from '../../actions/utils';

import RouteHandler from '../../components/route-handler/route-handler';
import Link from '../../components/route-handler/link/link';
import Ripple from '../../components/common/ripple/ripple';
import PageList from '../../components/drawer/page-list/page-list';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startX: 0,
      currentX: 0,
      touchingSideNav: false,
      initialisedDragging: false,
    };
  }

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate(prevProps) {
    // got page list
    if (prevProps.entries.length < 1 && this.props.entries.length > 0) {
      if (window.location.pathname !== '/') {
        return;
      }
      console.log('replacing state');
      RouteHandler.ReplaceRoute(this.props.entries[0].fields.route);
    }
  }

  onTouchStart = (evt) => {
    if (!this.drawerContainer.classList.contains(s.active)) {
      return;
    }

    this.drawer.classList.add(s.draggable);

    this.setState({
      startX: evt.touches[0].pageX,
      currentX: evt.touches[0].pageX,
      touchingSideNav: true,
    });

    requestAnimationFrame(this.update);
  }

  onTouchMove = (evt) => {
    if (!this.state.touchingSideNav) {
      return;
    }

    this.setState({
      currentX: evt.touches[0].pageX,
    });
  }

  onTouchEnd = () => {
    if (!this.state.touchingSideNav) {
      return;
    }

    this.setState({
      touchingSideNav: false,
      initialisedDragging: false,
    });

    this.drawer.classList.remove(s.draggable);

    const translateX = Math.min(0, this.state.currentX - this.state.startX);
    this.drawer.style.transform = '';

    if (translateX < -DRAWER_CLOSE_THRESHOLD) {
      this.props.toggleDrawer(false);
    }
  }

  applyPassive() {
    if (this.supportsPassive !== undefined) {
      return this.supportsPassive ? { passive: true } : false;
    }
    let isSupported = false;
    try {
      document.addEventListener('test', null, { get passive() {
        isSupported = true;
      } });
    } catch (e) { return () => {}; }
    this.supportsPassive = isSupported;
    return this.applyPassive();
  }

  addEventListeners() {
    this.drawerContainer.addEventListener('click', this.hideSideNav);

    this.drawer.addEventListener('touchstart', this.onTouchStart, this.applyPassive());
    this.drawer.addEventListener('touchmove', this.onTouchMove, this.applyPassive());
    this.drawer.addEventListener('touchend', this.onTouchEnd);
  }

  update = () => {
    if (!this.state.touchingSideNav) {
      return;
    }

    requestAnimationFrame(this.update);

    const translateX = Math.min(0, this.state.currentX - this.state.startX);

    if (!this.state.initialisedDragging && (translateX > -INITIATE_DRAGGING_THRESHOLD)) {
      return;
    }

    if (!this.state.initialisedDragging) {
      this.setState({
        initialisedDragging: true,
      });
    }

    this.drawer.style.transform = `translateX(${translateX}px)`;
  }

  hideSideNav = (evt) => {
    if (evt.target.contains(this.drawer)) {
      this.props.toggleDrawer(false);
    }
  }

  render() {
    return (
      <div
        className={`${s['drawer-container']} ${this.props.drawerOpen ? s.active : ''}`}
        ref={(div) => { this.drawerContainer = div; }}
      >
        <aside className={s.drawer} ref={(aside) => { this.drawer = aside; }}>
          <div className={s['drawer-homeContainer']}>
            <Link route={'/about'}>
              <div
                className={`${s['drawer-home']} 
                ${this.props.activeRoute === '/about' ? s.active : ''}`}
              >
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
                </svg>
                <span>
                  About
                </span>
                <Ripple />
              </div>
            </Link>
          </div>
          <div className={s['pageList-wrapper']}>
            <PageList
              hasErrored={this.props.hasErrored}
              isLoading={this.props.isLoading}
              pages={this.props.entries}
              activePages={this.props.activePages}
              activeRoute={this.props.activeRoute}
            />
          </div>
          <div className={s['drawer-footer']}>
            {/* <Ad /> */}
          </div>
        </aside>
      </div>
    );
  }

}

Drawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  entries: PropTypes.array.isRequired,
  activePages: PropTypes.array.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  activePage: PropTypes.object,
  activeRoute: PropTypes.string,
};

Drawer.defaultProps = {
  hasErrored: false,
  isLoading: false,
  activePage: null,
  activeRoute: null,
};

function mapStateToProps(state) {
  return {
    hasErrored: state.pageList.hasErrored,
    isLoading: state.pageList.isLoading,
    entries: state.pageList.entries,
    activePages: state.pageList.activePages,
    activePage: state.activePage.page,
    activeRoute: state.activePage.route,
    currFilters: state.pageList.filters,
    drawerOpen: state.utils.drawerOpen,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: (open) => { dispatch(toggleDrawer(open)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Drawer));
