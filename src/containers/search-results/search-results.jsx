import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SearchResult from '../../components/views/search-view/search-result/search-result';
import s from './search-results.scss';

class SearchResults extends React.Component {

  mapResults() {
    if (this.props.currQuery.length < 1) {
      return [];
    }
    const results = this.props.activePages.map((page) => {
      return (
        <SearchResult
          key={page.sys.id}
          currQuery={this.props.currQuery}
          page={page}
        />
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

SearchResults.propTypes = {
  currQuery: PropTypes.string.isRequired,
  activePages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    activePages: state.pageList.activePages,
    currQuery: state.pageList.query,
  };
}

export default withStyles(s)(connect(mapStateToProps)(SearchResults));
