import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../common/ripple/ripple';
import s from './adsense.scss';

const ArticleFilter = () => {
  return (
    <div className={s['adsense-container']}>

      <div className={s.circle}>
        <div className={s.fill}>
          <Ripple />
        </div>
      </div>

    </div>
  );
};

export default withStyles(s)(ArticleFilter);
