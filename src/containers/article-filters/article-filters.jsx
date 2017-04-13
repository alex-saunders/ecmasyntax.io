import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ArticleFilter from './article-filter/article-filter';
import { addFilter, removeFilter } from '../../actions/article-list';

import s from './article-filters.scss';

class ArticleFilters extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
  }

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

  render() {
    return (
      <div className={s["articleFilters"]}>
        <h1 className={s["articleFilters-header"]}>
          <i className="material-icons">filter_list</i>
          <span>
          Filter By Specification
          </span>
        </h1>
        <div className={s["articleFilters-body"]}>
          { this.mapFilters() }
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
	return {
		entries: state.pageList.entries,
    currFilters: state.pageList.filters,
	};
}

function matchDispatchToProps(dispatch) {
  return {
    addFilter: (filter) => dispatch(addFilter(filter)),
    removeFilter: (filter) => dispatch(removeFilter(filter)),
  }
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(ArticleFilters));
