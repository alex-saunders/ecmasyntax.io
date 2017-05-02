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
        <div>
          { this.mapPages() }
        </div>
      )
    }

    return (
      <div className={s.noResults}>
        <p className={s["noResults-copy"]}>
          <i className="material-icons">&#xE000;</i>
          <span>
          Sorry, no results found.
          </span>
        </p>
      </div>
    )
	}

}

export default withStyles(s)(SearchResults);
