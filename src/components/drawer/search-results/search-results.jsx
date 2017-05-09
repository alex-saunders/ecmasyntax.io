import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './search-results.scss';

import CategorySection from './category-section/category-section';

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
    let pages = this.organisePages(this.props.pages);
    let output = pages.map((category, index) => {
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

    return (
      <div>
        { this.mapPages() }
      </div>
    );
	}

}

export default withStyles(s)(SearchResults);
