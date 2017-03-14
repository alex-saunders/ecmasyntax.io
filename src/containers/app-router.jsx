import React from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/active-page';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../scss/base.scss';

import Drawer from '../components/drawer/drawer';
import Main from '../components/main/main';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onPopstate);

    if (this.props.route) {
      // route set from url
      console.log(`DEEP LINKED TO %c${this.props.route}`, "color: blue");
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopstate);
  }

  // route change function
  onPopstate = () => {
    const path = window.location.pathname;
    this.props.fetchPage(path);
  }

  selectRoute = (page) => {
    if (this.props.route === page)
      return;

    console.log(`MANUAL SELECT %c${page}`, "color: blue;");

    window.history.pushState(null, null, (page));
    return this.onPopstate();
  }

	render() {
    return (
      <div className="app-container">
        <Drawer selectRoute={this.selectRoute}/>
        <Main />
      </div>
    );
	}
}

function mapStateToProps(state) {
	return {
    route: state.activePage.route,
    hasErrored: state.activePage.pageListError,
    isLoading: state.activePage.pageListLoading,
	};
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: (url) => dispatch(fetchPage(url)),
  }
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(AppRouter));
