import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './adsense.scss';

class ArticleFilter extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={s['adsense-container']}>
      </div>
    );
  }

}

export default withStyles(s)(ArticleFilter);
