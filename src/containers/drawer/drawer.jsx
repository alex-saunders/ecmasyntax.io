import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../actions/utils';
import { addFilter, removeFilter } from '../../actions/search';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './drawer.scss';

import Ripple from '../../components/generic/ripple/ripple';
import SearchFilters from '../../components/drawer/search-filters/search-filters';
import SearchResults from '../../components/drawer/search-results/search-results';
import Ad from '../../components/drawer/adsense/adsense';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startX: 0,
      currentX: 0,
      touchingSideNav: false
    };

    this.DRAG_THRESHOLD = -30;
  }

  componentDidMount() {
    this.addEventListeners();
  }

  addEventListeners () {
    this.drawerContainer.addEventListener('click', this.hideSideNav);

    this.drawer.addEventListener('touchstart', this.onTouchStart, this.applyPassive());
    this.drawer.addEventListener('touchmove', this.onTouchMove, this.applyPassive());
    this.drawer.addEventListener('touchend', this.onTouchEnd);
  }

  applyPassive () {
    if (this.supportsPassive !== undefined) {
      return this.supportsPassive ? {passive: true} : false;
    }
    let isSupported = false;
    try {
      document.addEventListener('test', null, {get passive () {
        isSupported = true;
      }});
    } catch (e) { }
    this.supportsPassive = isSupported;
    return this.applyPassive();
  }


  onTouchStart = (evt) => {
    if (!this.drawerContainer.classList.contains(s['active']))
      return;

    this.drawer.classList.add(s['draggable']);

    this.setState({
      startX: evt.touches[0].pageX,
      currentX: this.startX,
      touchingSideNav: true
    });

    requestAnimationFrame(this.update);
  }

  onTouchMove = (evt) => {

    if (!this.state.touchingSideNav)
      return;

    this.setState({
      currentX: evt.touches[0].pageX
    })
  }

  onTouchEnd = (evt) => {
    if (!this.state.touchingSideNav)
      return;

    this.setState({
      touchingSideNav: false
    });
    
    this.drawer.classList.remove(s['draggable']);

    const translateX = Math.min(0, this.state.currentX - this.state.startX);
    this.drawer.style.transform = '';

    if (translateX < this.DRAG_THRESHOLD) {
      this.props.toggleDrawer(false);
    }
  }

  update = () => {
    if (!this.state.touchingSideNav)
      return;

    requestAnimationFrame(this.update);

    const translateX = Math.min(0, this.state.currentX - this.state.startX);
    this.drawer.style.transform = `translateX(${translateX}px)`;
  }

  hideSideNav = (evt) => {
    if (evt.target.contains(this.drawer)) {
      this.props.toggleDrawer(false);
    }
  }

	render() {
		return (
      <div className={`${s['drawer-container']} ${this.props.drawerOpen ? s['active'] : ''}`} 
        ref={(div) => { this.drawerContainer = div }}>
        <aside className={s['drawer']} ref={(aside) => { this.drawer = aside }}>
          <a className={s['drawer-logo']} href="/">
            {/*<img src="/static/img/ecmasyntax-logo.png" alt="logo" />*/}
          </a>
          <div className={s['drawer-homeContainer']}>
            <a className={`${s['drawer-home']} ${this.props.activePage ? '' : s.active}`} href="/">
              <i className='material-icons'>home</i>
              <span>
                Home
              </span>
              <Ripple />
            </a>
          </div>
          {/*<div className={s['search-container']}>
            
          </div>*/}
          {/*<div className={s['articleFilters-wrapper']}>
            <SearchFilters 
              entries={this.props.entries} 
              activePages={this.props.activePages}
              currFilters={this.props.currFilters} 
              addFilter={this.props.addFilter}
              removeFilter={this.props.removeFilter} 
            />
          </div>*/}
          <div className={s['pageList-wrapper']}>
            <SearchResults
              selectRoute={(page) => this.props.selectRoute(page)} 
              hasErrored={this.props.hasErrored}
              isLoading={this.props.isLoading}
              pages={this.props.entries}
              activePages={this.props.activePages}
              activeRoute={this.props.activeRoute}
            />
          </div>
          <div className={s['drawer-footer']}>
            {/*<Ad />*/}
          </div>
        </aside>
      </div>
    )
	}

}

function mapStateToProps(state) {
	return {
    hasErrored: state.pageList.pageListError,
    isLoading: state.pageList.pageListLoading,
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
    toggleDrawer: (open) => dispatch(toggleDrawer(open)),
    addFilter: (filter) => dispatch(addFilter(filter)),
    removeFilter: (filter) => dispatch(removeFilter(filter)),
  }
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Drawer));
