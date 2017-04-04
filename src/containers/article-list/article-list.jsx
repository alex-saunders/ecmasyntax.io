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
  }

  organisePages() {
    let pages = this.props.activePages;
    console.log('ACTIVE PAGES', pages);
    return this.mapPages(pages);
  }

  mapPages = (activePages) => {
    let output = activePages.map((category, index) => {
      return (
        <CategorySection key={index} category={category} activeRoute={this.props.activeRoute} selectRoute={this.selectRoute}/>
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

    if (this.props.activePages) {
      return (
        <div className="pageList">
          { this.props.activePages.length > 0 ? this.organisePages() : <p>No Results</p> }
        </div>
      )
    }

    return (
      <p>No Results</p>
    )
	}

}

function mapStateToProps(state) {
  const { pages, searchText } = state.pageList;
	return {
    hasErrored: state.pageList.pageListError,
    isLoading: state.pageList.pageListLoading,
		pageList: state.pageList.pages,
    activePages: state.pageList.activePages,
    activeRoute: state.activePage.route
	};
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPageList: () => dispatch(fetchPageList()),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ArticleList);
