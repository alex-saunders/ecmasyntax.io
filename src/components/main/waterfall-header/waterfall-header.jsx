import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import OfflineSwitch from './offline-switch/offline-switch';
import s from './waterfall-header.scss';

class WaterfallHeader extends React.Component {

  render() {
    const style = {
      maxHeight: this.props.scrolled ? '0px' : '57px',
    }
    return (
      <div className={s.header} style={style}>
        <div className={s['header-contentWrapper']}>
          <OfflineSwitch activeRoute={this.props.activeRoute} />
        </div>
      </div>
    );
  }

}

export default withStyles(s)(WaterfallHeader);
