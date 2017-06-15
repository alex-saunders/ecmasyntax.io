import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import OfflineSwitch from './offline-switch/offline-switch';
import s from './waterfall-header.scss';

const WaterfallHeader = ({ visible, activeRoute, pushToast }) => {
  const style = {
    maxHeight: visible ? '57px' : '0px',
  };
  return (
    <div className={s.header} style={style}>
      <div className={s['header-contentWrapper']}>
        <OfflineSwitch activeRoute={activeRoute} pushToast={pushToast} />
      </div>
    </div>
  );
};

WaterfallHeader.propTypes = {
  visible: PropTypes.bool.isRequired,
  activeRoute: PropTypes.string,
  pushToast: PropTypes.func.isRequired,
};

WaterfallHeader.defaultProps = {
  activeRoute: null,
};

export default withStyles(s)(WaterfallHeader);
