import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../../common/ripple/ripple';
import s from './header-icon.scss';

class HeaderIcon extends React.Component {

  openDrawer = () => {
    this.props.toggleDrawer(!this.props.drawerOpen);
  };

  closeSearch = () => {
    this.props.search('');
    this.props.toggleSearch(false);
  }

  render() {
    return (
      <div className={s['header-icon']}>

        <button onClick={this.openDrawer} className={`${s['icon-container']} ${s.menuIcon} ${this.props.searchOpen ? s.searchOpen : ''}`}>
          <i className="material-icons">
            menu
          </i>
          <Ripple />
        </button>

        <button onClick={this.closeSearch} className={`${s['icon-container']} ${s.backIcon} ${this.props.searchOpen ? s.searchOpen : ''}`}>
          <i className="material-icons">
            keyboard_backspace
          </i>
          <Ripple />
        </button>

      </div>
    );
  }
}

HeaderIcon.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  searchOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default withStyles(s)(HeaderIcon);
