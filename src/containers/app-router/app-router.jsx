import React from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../../actions/active-page';
import { toggleDrawer } from '../../actions/utils';
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

    if (this.props.activeRoute) {
      console.log(`DEEP LINKED TO %c${this.props.activeRoute}`, "color: blue");
    }
  }

  componentDidMount() {
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
    // temp fix
    if (location.pathname === '/') {
      location.reload();
    } else {
      this.props.fetchPage(location.pathname);
    }
  }

  selectRoute = (page) => {
    let category = page.fields.category;
    let specification = category.fields.specification[0];
    let route = `/${specification.fields.name}/${category.fields.name}/${page.fields.name}`;

    if (this.props.activeRoute === route)
      return;

    window.history.pushState(null, null, (route));

    console.log(`MANUAL SELECT %c${page}`, "color: darkblue;");

    this.props.toggleDrawer(false);
    
    return this.onPopstate();

  }

	render() {
    return (
      <div className={s['app-container']}>
        <ProgressIndicator
          activePage={this.props.activePage}
          hasErrored={this.props.hasErrored}
          isLoading={this.props.isLoading}
        />
        <MainHeader
          activePage={this.props.activePage}
          drawerOpen={this.props.drawerOpen}
          toggleDrawer={this.props.toggleDrawer} 
        />
        <div className={s['main-container']}>
          <Drawer selectRoute={this.selectRoute}/>
          <Main />
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
    drawerOpen: state.utils.drawerOpen,
	};
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: (url) => dispatch(fetchPage(url)),
    toggleDrawer: (open) => dispatch(toggleDrawer(open))
  }
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(AppRouter));
