import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './markdown-container.scss';
import highlight from './atelier-estuary-light.css';

import Panel from '../../../common/panel/panel';

class MarkdownContainer extends React.Component {

  mapReferences() {
    const references = this.props.references.map((reference) => {
      let referenceText;
      switch (reference.fields.type) {
        case 'MDN':
          referenceText = (
            <li key={reference.sys.id}>
              <a href={reference.fields.link} target="_blank" rel="noopener noreferrer">{reference.fields.name}</a>
              &nbsp;by <a href="https://developer.mozilla.org/en-US/docs/MDN/About$history" target="_blank" rel="noopener noreferrer">Mozilla Contributors</a>
              , licensed under <a href="https://creativecommons.org/licenses/by-sa/2.5/" target="_blank" rel="noopener noreferrer">CC-BY-SA 2.5</a>.
            </li>
          );
          break;
        case 'es6-features':
          referenceText = (
            <li key={reference.sys.id}>
              <a href={reference.fields.link} target="_blank" rel="noopener noreferrer">es6-features.org &ndash; <i>{reference.fields.name}</i></a>
              &nbsp;by <a href="" target="_blank" rel="noopener noreferrer">Ralf S. Engelschall</a>
              , licensed under <a href="https://github.com/rse/es6-features/blob/gh-pages/LICENSE.txt" target="_blank" rel="noopener noreferrer">MIT</a>.
            </li>
          );
          break;
        default:
          referenceText = (
            <li key={reference.sys.id}>
              <a href={reference.fields.link} target="_blank" rel="noopener noreferrer">{reference.fields.name}</a>
            </li>
          );
      }
      return referenceText;
    });
    return references;
  }

  mapTags() {
    const tags = this.props.tags.map((tag, index) => {
      return (
        <span key={tag.sys.id} className={s.tag}>
          {index > 0 ? ', ' : ''}
          {tag.fields.name}
        </span>
      );
    });
    return tags;
  }

  render() {
    return (
      <div className={s['markdown-wrapper']}>
        <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        <div className={s['footer-container']}>
          <Panel
            icon={<svg><path d="M0 0h24v24H0z" fill="none" /><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" /></svg>}
            title="Tags"
            body={this.mapTags()}
          />

          <Panel
            icon={<svg><path d="M0 0h24v24H0z" fill="none" /><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" /></svg>}
            title="References"
            body={<ol>{this.mapReferences()}</ol>}
            closed
          />
        </div>
      </div>
    );
  }
}

MarkdownContainer.propTypes = {
  content: PropTypes.string.isRequired,
  references: PropTypes.array,
  tags: PropTypes.array,
};

MarkdownContainer.defaultProps = {
  references: null,
  tags: [],
};

export default withStyles(s, highlight)(MarkdownContainer);
