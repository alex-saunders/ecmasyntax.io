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
    console.log('manual select', page);

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
