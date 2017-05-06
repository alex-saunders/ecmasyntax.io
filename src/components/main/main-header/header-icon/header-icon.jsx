import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../../generic/ripple/ripple';
import s from './header-icon.scss';

class HeaderIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  openDrawer = (evt) => {
    this.props.toggleDrawer(!this.props.drawerOpen);
  };

  closeSearch = (evt) => {
    this.props.search('');
    this.props.toggleSearch(false);
  }

  render() {
    return (
        <div className={s['header-icon']}>
          <i 
            className={`material-icons ${s.menuIcon} ${this.props.searchOpen ? s.searchOpen : ''}`}
            onClick={this.openDrawer}>
            menu
            <Ripple />
          </i>

          <i 
            className={`material-icons ${s.backIcon} ${this.props.searchOpen ? s.searchOpen : ''}`}
            onClick={this.closeSearch}>
            keyboard_backspace
            <Ripple />
          </i>

        </div>
    );
  }

}

export default withStyles(s)(HeaderIcon);
