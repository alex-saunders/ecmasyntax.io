import React from 'react';
import { connect } from 'react-redux';
import { fetchPageList } from '../actions/article-list';
import { fetchPage } from '../actions/active-page';

import RouteLink from '../components/drawer/route-link';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPageList();

    if (this.props.activeRoute) {
      // route set from url
      console.log('deep linked to', this.props.activeRoute);
    }
  }

  mapPages() {
    let pages;
    if (this.props.query.length > 0) {
      pages = this.props.pages.filter((page) => {
          return page.name.toLowerCase().match( this.props.query );
      });
    } else {
      pages = this.props.pages;
    }
    var items = pages.map((page, index) => {
      return (
        <RouteLink
          key={index}
          active={(this.props.activeRoute ? this.props.activeRoute : null) === page}
          route={page.route}
          selectRoute={ this.selectRoute }>
          {page.name}
        </RouteLink>
      );
    })
    return items;
  }

  selectRoute = (page) => {
    this.props.selectRoute(page)
  }

	render() {
    if (this.props.hasErrored) {
        return (<p>Sorry! There was an error loading the items</p>);
    }

    if (this.props.isLoading) {
        return (<p>Loading…</p>);
    }

		return (
      <div className="pageList">
        { this.mapPages() }
      </div>
    )
	}

}

function mapStateToProps(state) {
	return {
    hasErrored: state.pageList.pageListError,
    isLoading: state.pageList.pageListLoading,
		pages: state.pageList.pages,
    activeRoute: state.activePage.route
	};
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: () => dispatch(fetchPageList())
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ArticleList);
