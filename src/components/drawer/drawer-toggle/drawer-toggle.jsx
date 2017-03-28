import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../../actions/utils';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
        </div>
    );
  }

}

function mapStateToProps(state) {
	return {
    drawerOpen: state.utils.drawerOpen,
	};
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: (open) => dispatch(toggleDrawer(open)),
  }
}


export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(DrawerToggle));
