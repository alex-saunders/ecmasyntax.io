import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SearchResult from '../../components/main/search-results/search-result/search-result';
import s from './search-results.scss';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  };

  mapResults() {
    if (this.props.currQuery.length < 1) {
      return;
    }
    const results = this.props.activePages.map((page, index) => {
      return (
        <SearchResult key={index} currQuery={this.props.currQuery} page={page} selectRoute={this.props.selectRoute} />
      );
    });
    return results;
  }

  render() {
    return (
      <div className={s['search-container']}>
        <div className={s['search-results']}>
          <h1 className={s['search-title']}>
            Results for <span className={s['search-query']}>{this.props.currQuery}</span>
          </h1>
          {this.mapResults()}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    activePages: state.pageList.activePages,
    currQuery: state.pageList.query,
  };
}

export default withStyles(s)(connect(mapStateToProps)(SearchResults));
