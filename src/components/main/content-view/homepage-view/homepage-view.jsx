import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './homepage-view.scss';

const Homepage = () => {
  return (
    <div className={s['homepage-container']}>
      <div className={s['markdown-wrapper']}>
        <h1>
          ECMASyntax.io 🚀
        </h1>
        <h2>
          About
        </h2>
        <p>
          ECMASyntax is an offline-first PWA designed for developers.
          It aims to provide a reference for JavaScript syntax,
          detailing what pieces of syntax do, and how to use them.
          Currently, only the newest features of the JavaScript specification are given,
          but the content will hopefully be updated over time
          to include more legacy additions.
        </p>
        <p>
          This is an OPEN source project, created by
          <a href="https://twitter.com/AlexJRsaunders" target="_blank" rel="noopener noreferrer"> @alexjrsaunders</a>
          , so please feel free to help out by
          <a href="https://github.com/alex-saunders/ecmasyntax.io" target="_blank" rel="noopener noreferrer"> reporting bugs, forking and opening pull requests when possible</a>.
        </p>
        <p>
          To get started, select one of the items in the menu
          (and don&#39;t forget to add to your homescreen!)
        </p>
        <h2>Credits</h2>
        <p>
          The design for this site was inspired by
          <a href="http://cssreference.io/" target="_blank" rel="noopener noreferrer"> HTML/CSSReference.io </a>
          (2 very awesome sites, go check em out!), created by
          <a href="https://twitter.com/jgthms" target="_blank" rel="noopener noreferrer"> @jgthms</a>
        </p>
        <p>
          Content heavily references the material available on the
          <a href="https://developer.mozilla.org/en-US/docs/MDN/About$history" target="_blank" rel="noopener noreferrer"> Mozilla Developer Network</a>.
          As well as the awesome <a href="http://es6-features.org/#Constants" target="_blank" rel="noopener noreferrer"> es6-features.org</a>
        </p>
        <h2>Contributors</h2>
        <ul>
          <li>
            <a href="https://twitter.com/AlexJRsaunders" target="_blank" rel="noopener noreferrer">Alex Saunders</a>
          </li>
          <li>
            More soon... hopefully 👀
          </li>
        </ul>
        <h2>Changelog</h2>
        <ul>
          <li><strong>12/06/2017:</strong> V1.0.0 released, hooray! 🎉</li>
        </ul>
      </div>
    </div>
  );
};

export default withStyles(s)(Homepage);
