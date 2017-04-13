import React from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../../actions/active-page';

import CategorySection from '../../components/drawer/category-section/category-section';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillReceiveProps(props) {
    this.organisePages(props.activePages);
  }

  organisePages(entries) {
    let pages = [];
    entries.forEach((entry) => {
      const category = entry.fields.category;

      const categoryIndex = this.getCategoryIndex(category, pages);

      pages = this.addEntryToCategory(category, categoryIndex, entry, pages);
    });
    return pages;
  }

  getCategoryIndex(category, pages) {
    let matchedCat = pages.findIndex((cat) => {
      return (cat.sys.id === category.sys.id);
    });
    if (matchedCat < 0) {
      matchedCat = pages.length;
    }
    return matchedCat;
  }

  addEntryToCategory(category, categoryIndex, entry, pages) {

    if (!pages[categoryIndex]) {
      pages.push(Object.assign({}, category, { entries: [] }))
    }

    pages[categoryIndex].entries.push(entry);
    return pages;
  }

  mapPages = () => {
    let pages = this.organisePages(this.props.activePages);
    let output = pages.map((category, index) => {
      return (
        <CategorySection key={index} category={category} activePage={this.props.activePage} selectRoute={this.selectRoute}/>
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

    if (this.props.activePages.length > 0) {
      return (
        <div className="pageList">
          { this.props.activePages.length > 0 ? this.mapPages() : <p>No Results</p> }
        </div>
      )
    }

    return (
      <p>No Results</p>
    )
	}

}

function mapStateToProps(state) {
	return {
    hasErrored: state.pageList.pageListError,
    isLoading: state.pageList.pageListLoading,
    activePages: state.pageList.activePages,
    activePage: state.activePage.page,
    activeRoute: state.activePage.route
	};
}

export default connect(mapStateToProps)(SearchResults);
