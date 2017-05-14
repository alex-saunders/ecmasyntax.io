import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './markdown-container.scss';
import highlight from './atelier-estuary-light.css';

const MarkdownContainer = ({ content }) => {
  return (
    <div className={s['markdown-wrapper']} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

MarkdownContainer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default withStyles(s, highlight)(MarkdownContainer);
