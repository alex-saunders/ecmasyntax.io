import React from 'react';
import Ripple from '../../generic/ripple/ripple';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ArticleFilter from './search-filter/search-filter';

import s from './search-filters.scss';

class ArticleFilters extends React.Component {
  constructor(props) {
    super(props);
  };

  generateFilters(pages) {
    let specifications = [];
    pages.forEach((page) => {
      let specification = page.fields.category.fields.specification[0].fields.name;
      if (specifications.indexOf(specification) < 0) {
        specifications.push(specification);
      }
    })
    return specifications;
  }

  mapFilters() {
    let pages = this.props.entries;
    let filters = this.generateFilters(pages);
    let articleFilters = filters.map((filter, index) => {
      return (<ArticleFilter filter={filter} key={index} currFilters={this.props.currFilters}
                addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>)
    });
    return articleFilters;
  }

  handleClick = (evt) => {
    this.container.classList.toggle(s.hidden);
  }

  render() {
    return (
      <div className={`${s.articleFilters} ${s.hidden}`} ref={(div) => { this.container = div; }}>
        <h1 className={s["articleFilters-header"]} onClick={this.handleClick}>
          <span>
          Filter By Specification
          </span>
          <i className={`material-icons ${s['articleFilters-expandIcon']}`}>keyboard_arrow_down</i>
          <Ripple />
        </h1>
        <div className={s["articleFilters-body"]}>
          { this.mapFilters() }
        </div>
      </div>
    );
  }

}

export default withStyles(s)(ArticleFilters);
