import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../../generic/ripple/ripple';
import s from './drawer-toggle.scss';

class DrawerToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  openDrawer = () => {
    this.props.toggleDrawer(true);
  };

  render() {
    return (
        <div className={s['drawer-toggle']} onClick={this.openDrawer}>
          <i className='material-icons'>menu</i>
          <Ripple />
        </div>
    );
  }

}

export default withStyles(s)(DrawerToggle);
