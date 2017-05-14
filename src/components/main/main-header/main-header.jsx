import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HeaderIcon from './header-icon/header-icon';
import SearchInput from './search-input/search-input';
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
        <div className={s['toggle-container']}>
          <HeaderIcon
            drawerOpen={this.props.drawerOpen}
            searchOpen={this.props.searchOpen}
            toggleDrawer={this.props.toggleDrawer}
            toggleSearch={this.props.toggleSearch}
            search={this.props.search}
          />
        </div>
        <span className={s.title}>
          ECMASyntax
          <span
            dangerouslySetInnerHTML={{
              __html: this.props.activePage ?
              ` &ndash; ${this.props.activePage.fields.name}`
              :
              '' }}
          />
        </span>
        {/* <div className={s['search-container']}> */}
        <SearchInput
          currQuery={this.props.currQuery}
          search={this.props.search}
          searchOpen={this.props.searchOpen}
          toggleSearch={this.props.toggleSearch}
        />
        {/* </div> */}
      </div>
    );
  }
}

MainHeader.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  showWaterfallHeader: PropTypes.bool.isRequired,
  searchOpen: PropTypes.bool.isRequired,
  currQuery: PropTypes.string.isRequired,
  activePage: PropTypes.object,
  toggleDrawer: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

MainHeader.defaultProps = {
  activePage: null,
};

export default withStyles(s)(MainHeader);
