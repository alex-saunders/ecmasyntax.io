import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { toggleDrawer, toggleSearch } from '../../actions/utils';
import { search } from '../../actions/page-list';

import HeaderIcon from '../../components/main-header/header-icon/header-icon';
import SearchInput from '../../components/main-header/search-input/search-input';

import s from './main-header.scss';

class MainHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFocused: false,
    };
  }

  searchFocused = (bool) => {
    this.setState({
      searchFocused: bool,
    });
  }

  render() {
    return (
      <div
        className={`${s.header} 
        ${this.props.searchOpen ? s.searchOpen : ''}
        ${this.props.showWaterfallHeader ? s.waterfallOpen : ''}
        `}
      >
        <div className={s['title-container']}>
          <div className={s['toggle-container']}>
            <HeaderIcon
              drawerOpen={this.props.drawerOpen}
              searchOpen={this.props.searchOpen}
              toggleDrawer={this.props.toggleDrawer}
            />
          </div>
          <span className={s.title}>
            ECMASyntax
            <span
              className={s['title-detail']}
              dangerouslySetInnerHTML={{
                __html: this.props.activePageTitle ?
                ` &ndash; ${this.props.activePageTitle}`
                :
                '' }}
            />
          </span>
        </div>
        <div className={s['search-container']}>
        {/* <div className={s['search-container']}> */}
        <SearchInput
          currQuery={this.props.currQuery}
          searchOpen={this.props.searchOpen}
          search={this.props.search}
        />
        </div>
      </div>
    );
  }
}

MainHeader.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  searchOpen: PropTypes.bool.isRequired,
  currQuery: PropTypes.string.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

MainHeader.defaultProps = {
  setActivePageTitle: null,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen,
    currQuery: state.pageList.query,
    activePageTitle: state.activePage.title,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: (open) => { dispatch(toggleDrawer(open)); },
    search: (query) => { dispatch(search(query)); }
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(MainHeader));
