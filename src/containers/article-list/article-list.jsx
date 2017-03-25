import React from 'react';
import { connect } from 'react-redux';
import { fetchPageList } from '../../actions/article-list';
import { fetchPage } from '../../actions/active-page';

import CategorySection from '../../components/drawer/category-section/category-section';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.fetchPageList();
  }

  organisePages = () => {
    let pages;
    if (this.props.query.length > 0) {
      pages = this.props.pages.filter((page) => {
          return (
            page.name.toLowerCase().match( this.props.query ) ||
            page.category.toLowerCase().match( this.props.query )
          );
      });
    } else {
      pages = this.props.pages;
    }

    return this.mapPages(pages);
  }

  mapPages = (pages) => {
    let output = Object.keys(pages).map((category, index) => {
      let links = pages[category].pages;
      return (
        <CategorySection key={index} category={category} links={links} activeRoute={this.props.activeRoute} selectRoute={this.selectRoute}/>
      )
    });
    return output;
  }

  selectRoute = (page) => {
    this.props.selectRoute(page)
  }

	render() {
    if (this.props.hasErrored) {
        return (<p>Sorry! There was an error loading the items</p>);
    }

    if (this.props.isLoading) {
        return (<p></p>);
    }

		return (
      <div className="pageList">
        { this.organisePages() }
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
