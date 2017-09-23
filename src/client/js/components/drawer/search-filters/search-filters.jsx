import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../common/ripple/ripple';
import ArticleFilter from './search-filter/search-filter';

import s from './search-filters.scss';

class SearchFilters extends React.Component {

  static generateFilters(pages) {
    const specifications = [];
    pages.forEach((page) => {
      const specification = page.fields.category.fields.specification.fields.name;
      if (specifications.indexOf(specification) < 0) {
        specifications.push(specification);
      }
    });
    return specifications;
  }

  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
    };
  }

  mapFilters() {
    const pages = this.props.activePages;
    const filters = SearchFilters.generateFilters(pages);
    const articleFilters = filters.map((filter) => {
      return (
        <ArticleFilter
          filter={filter}
          key={filter}
          currFilters={this.props.currFilters}
          addFilter={this.props.addFilter}
          removeFilter={this.props.removeFilter}
        />
      );
    });
    return articleFilters;
  }

  handleClick = (evt) => {
    this.setState((prevState) => {
      return {
        hidden: !prevState.hidden,
      };
    });
    evt.preventDefault();
  }

  render() {
    return (
      <div className={`${s.articleFilters} ${this.state.hidden ? s.hidden : ''}`} ref={(div) => { this.container = div; }}>
        <button className={s['articleFilters-header']} onClick={this.handleClick}>
          <span>
          Filter By Specification
          </span>
          <i className={`material-icons ${s['articleFilters-expandIcon']}`}>keyboard_arrow_down</i>
          <Ripple />
        </button>
        <div className={s['articleFilters-body']}>
          { this.mapFilters() }
        </div>
      </div>
    );
  }
}

SearchFilters.propTypes = {
  activePages: PropTypes.array.isRequired,
  currFilters: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

export default withStyles(s)(SearchFilters);
