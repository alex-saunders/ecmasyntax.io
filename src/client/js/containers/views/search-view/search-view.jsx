import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import URLSearchParams from 'url-search-params';

import { toggleSearch, toggleWaterfallHeader, progressUpdate } from '../../../actions/utils';
import { search } from '../../../actions/page-list';

import SearchResult from '../../../components/search-view/search-result/search-result';

import s from './search-view.scss';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currQuery: this._fetchSearchParam()
    };
  }

  componentWillMount() {    
    this.props.toggleWaterfallHeader(false);
    this.props.progressUpdate(100);
    this.props.toggleSearch(true);

    this.props.search(this._fetchSearchParam());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currQuery: nextProps.currQuery
    })

    this._updateSearchParam(nextProps.currQuery);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageList.length < 1 && this.props.pageList.length >= 1) {
      this.props.search(this._fetchSearchParam());
    }
  }

  componentWillUnmount() {
    this.props.toggleSearch(false);
    this.props.search('');
  }

  _fetchSearchParam() {
    const url = new URL(this.props.location);
    const searchParams = new URLSearchParams(url.search)
    for (let p of searchParams) {
      if (p[0] === "search") return p[1];
    }
    return "";
  }

  _updateSearchParam(query) {
    const url = new URL(this.props.location);
    const searchParams = new URLSearchParams(url.search)
    searchParams.set('search', query);
    url.search = searchParams.toString();
    window.history.replaceState(null, null, url.href)
  }

  mapResults() {
    if (this.props.currQuery.length < 1) {
      return [];
    }
    const results = this.props.activePages.map((page) => {
      return (
        <SearchResult
          key={page.sys.id}
          currQuery={this.state.currQuery}
          className={s['search-result']}
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
            Results for <span className={s['search-query']}>"{this.state.currQuery}"</span>
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
    searchOpen: state.utils.activePages,
    currQuery: state.pageList.query,
    activePages: state.pageList.activePages,
    pageList: state.pageList.entries,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    search: (query) => { dispatch(search(query)); },
    toggleSearch: (open) => { dispatch(toggleSearch(open)); },
    toggleWaterfallHeader: (visible) => { dispatch(toggleWaterfallHeader(visible)); },
    progressUpdate: (percentage) => { dispatch(progressUpdate(percentage)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(SearchResults));
