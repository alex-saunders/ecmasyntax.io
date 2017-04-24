import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DrawerToggle from './drawer-toggle/drawer-toggle';
import s from './main-header.scss';

class MainHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.header}>
        <div className={s['toggle-container']}>
          <DrawerToggle
            drawerOpen={this.props.drawerOpen}
            toggleDrawer={this.props.toggleDrawer}/>
        </div>
        <span className={s.title}>
          ECMASyntax -
          {
            this.props.activePage ?
            ` ${this.props.activePage.fields.name}`
            :
            ' Home'
          }
        </span>
      </div>
    );
  }

}

export default withStyles(s)(MainHeader);
