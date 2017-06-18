import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './page-list.scss';

import LoadingView from '../../views/loading-view/loading-view';
import CategorySection from './category-section/category-section';

class PageList extends React.Component {

  static getCategoryIndex(category, pages) {
    let matchedCat = pages.findIndex((cat) => {
      return (cat.sys.id === category.sys.id);
    });
    if (matchedCat < 0) {
      matchedCat = pages.length;
    }
    return matchedCat;
  }

  static organisePages(entries) {
    let pages = [];
    entries.forEach((entry) => {
      const category = entry.fields.category;

      const categoryIndex = this.getCategoryIndex(category, pages);

      pages = this.addEntryToCategory(category, categoryIndex, entry, pages);
    });
    return pages;
  }

  static addEntryToCategory(category, categoryIndex, entry, pages) {
    if (!pages[categoryIndex]) {
      pages.push(Object.assign({}, category, { entries: [] }));
    }

    pages[categoryIndex].entries.push(entry);
    return pages;
  }

  mapPages = () => {
    const pages = PageList.organisePages(this.props.pages);
    const output = pages.map((category) => {
      return (
        <CategorySection
          key={category.sys.id}
          category={category}
          activeRoute={this.props.activeRoute}
        />
      );
    });
    return output;
  }

  render() {
    if (this.props.hasErrored) {
      return (<p>Sorry! There was an error loading the items</p>);
    }

    if (this.props.isLoading) {
      return (<LoadingView />);
    }

    return (
      <div className={s['pagelist-wrapper']}>
        { this.mapPages() }
      </div>
    );
  }
}

PageList.propTypes = {
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  activeRoute: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

PageList.defaultProps = {
  activeRoute: null,
};

export default withStyles(s)(PageList);
