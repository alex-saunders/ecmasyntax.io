import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './drawer.scss';

import { toggleDrawer } from '../../actions/utils';
import { addFilter, removeFilter } from '../../actions/page-list';

import Route from '../common/route/route';
import Ripple from '../../components/common/ripple/ripple';
import PageList from '../../components/drawer/page-list/page-list';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startX: 0,
      currentX: 0,
      touchingSideNav: false,
    };

    this.DRAG_THRESHOLD = -30;
  }

  componentDidMount() {
    this.addEventListeners();
  }

  onTouchStart = (evt) => {
    if (!this.drawerContainer.classList.contains(s.active)) {
      return;
    }

    this.drawer.classList.add(s.draggable);

    this.setState({
      startX: evt.touches[0].pageX,
      currentX: this.startX,
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
    });

    this.drawer.classList.remove(s.draggable);

    const translateX = Math.min(0, this.state.currentX - this.state.startX);
    this.drawer.style.transform = '';

    if (translateX < this.DRAG_THRESHOLD) {
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

    if (Math.abs(translateX) < 15) {
      return;
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
            <Route route={'/'}>
              <div
                className={`${s['drawer-home']} ${this.props.activePage && this.props.activePage.fields.name === 'Home' ? s.active : ''}`}
              >
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <span>
                  Home
                </span>
                <Ripple />
              </div>
            </Route>
          </div>
          {/* <div className={s['articleFilters-wrapper']}>
            <SearchFilters
              entries={this.props.entries}
              activePages={this.props.activePages}
              currFilters={this.props.currFilters}
              addFilter={this.props.addFilter}
              removeFilter={this.props.removeFilter}
            />
          </div> */}
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
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  drawerOpen: PropTypes.bool.isRequired,
  entries: PropTypes.array.isRequired,
  activePages: PropTypes.array.isRequired,
  activePage: PropTypes.object,
  activeRoute: PropTypes.string,
  toggleDrawer: PropTypes.func.isRequired,
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
    fetchPage: (route) => { dispatch(fetchPage(route)); },
    toggleDrawer: (open) => { dispatch(toggleDrawer(open)); },
    updatePageList: (pages) => { dispatch(updatePageList(pages)); },
    addFilter: (filter) => { dispatch(addFilter(filter)); },
    removeFilter: (filter) => { dispatch(removeFilter(filter)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Drawer));
