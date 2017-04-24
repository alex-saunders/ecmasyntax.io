import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../generic/ripple/ripple';
import s from './adsense.scss';

class ArticleFilter extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={s['adsense-container']}>

        <div className={s['circle']}>
            <div className={s['fill']}>
              <Ripple />
            </div>
        </div>

      </div>
    );
  }

}

export default withStyles(s)(ArticleFilter);
