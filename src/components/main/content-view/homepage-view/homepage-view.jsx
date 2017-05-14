import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './homepage-view.scss';

const Homepage = () => {
  return (
    <div className={s['homepage-container']}>
      <h1>
        ECMASyntax.io
      </h1>
      <p className={s.subtitle}>
        A free ECMAScript (JavaScript) syntax reference
      </p>
      <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ecmasyntax.io" rel="noopener" className={s.share}>
        <i className={`${s.facebook} fa fa-facebook-square`} aria-hidden="true" />
      </a>
      <a href="https://twitter.com/home?status=Javascript%20syntax%20reference%3A%20https%3A//ecmasyntax.io" rel="noopener" className={s.share}>
        <i className={`${s.twitter} fa fa-twitter-square`} aria-hidden="true" />
      </a>
      <p>
        Design inspired by
        <a href="http://cssreference.io/" rel="noopener"> HTML/CSSReference.io</a>
        , created by
        <a href="https://twitter.com/jgthms" rel="noopener"> @jgthms</a>
      </p>
    </div>
  );
};

export default withStyles(s)(Homepage);
