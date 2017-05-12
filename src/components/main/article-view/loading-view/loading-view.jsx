import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './loading-view.scss';

class MarkdownContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={s['loading-container']}>
        <div className={s.showbox}>
          <div className={s.loader}>
            <svg className={s.circular} viewBox="25 25 50 50">
              <circle className={s.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(MarkdownContainer);
