import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../actions/utils';
import ArticleList from '../../containers/article-list/article-list';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './drawer.scss';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      startX: 0,
      currentX: 0,
      touchingSideNav: false
    };
  }

  componentDidMount() {
    this.addEventListeners();
  }
  

  searchIconClick = () => {
    this.searchInput.focus();
  }

  searchFocused = () => {
    this.searchContainer.classList.add(s['focused']);
    this.searchInput.click();
  }

  searchUnfocused = () => {
    this.searchContainer.classList.remove(s['focused']);
  }

  handleInput = (e) => {
    this.setState({
      searchQuery: e.target.value
    });

    if (e.target.value.length > 0) {
      this.searchContainer.classList.add(s['non-empty']);
    } else {
      this.searchContainer.classList.remove(s['non-empty']);
    }
  }

  clearInput = (e) => {
    this.setState({
      searchQuery: ''
    });
    this.searchContainer.click();
    this.searchContainer.classList.remove(s['non-empty']);
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

    if (translateX < -60) {
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
            <img src="/static/img/ecmasyntax-logo.png" alt="logo" />
          </a>
          <div className={s['search-container']}>
            <label htmlFor="search"
              className={s['search-label']}
              onFocus={this.searchFocused}
              ref={(label) => { this.searchContainer = label; }}>
              <button className={s['icon-container']} onClick={this.searchIconClick}>
                <i className={`material-icons ${s['search-icon']}`}>search</i>
              </button>

              <input type="text" id="search" placeholder="Search for syntax"
                value={this.state.searchQuery}
                className={s['search-input']}
                onChange={this.handleInput}
                onBlur={this.searchUnfocused}
                ref={(input) => { this.searchInput = input; }} />

              <button className={`${s['icon-container']} ${s['search-closeIcon']}`} onClick={this.clearInput}>
                <i className='material-icons'>close</i>
              </button>
            </label>
          </div>
          <div className={s['pageList-wrapper']}>
            <ArticleList
              query={this.state.searchQuery}
              selectRoute={(page) => this.props.selectRoute(page)}/>
          </div>
          <hr className={s['drawer-divider']}/>
          <div className={s['drawer-footer']}>

          </div>
        </aside>
      </div>
    )
	}

}

function mapStateToProps(state) {
	return {
    drawerOpen: state.utils.drawerOpen,
	};
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: (open) => dispatch(toggleDrawer(open)),
  }
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Drawer));
