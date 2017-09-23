import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './footer.scss';

const Footer = (hidden) => {
  return (
    <footer className={`${s.footer} ${hidden ? s.hidden : ''}`}>
      <div className={s.section}>
        <h1>
          A free, open source project to help web developers
        </h1>
        <p>
          v1.1.0 | Created by <a href="https://twitter.com/AlexJRsaunders" target="_blank" rel="noopener noreferrer">@alexjrsaunders</a>
        </p>
        <p>
          Released under the
          <a href="https://github.com/alex-saunders/ecmasyntax.io/blob/master/LICENSE.txt" target="_blank" rel="noopener noreferrer">
            &nbsp;MIT license.
          </a>
        </p>
      </div>
      <div className={s.section}>
        <h1>Share</h1>
        <p>

          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ecmasyntax.io" target="_blank" rel="noopener noreferrer">
            <i className={`${s.facebook} fa fa-facebook-square`} aria-hidden="true" />
          </a>
          <a href="https://twitter.com/home?status=Javascript%20syntax%20reference%3A%20https%3A//ecmasyntax.io">
            <i className={`${s.twitter} fa fa-twitter-square`} aria-hidden="true" />
          </a>
        </p>
        <iframe src="https://ghbtns.com/github-btn.html?user=alex-saunders&repo=ecmasyntax.io&type=star&count=true" frameBorder="0" scrolling="0" width="160px" height="30px" />
      </div>
    </footer>
  )
}

export default withStyles(s)(Footer);
