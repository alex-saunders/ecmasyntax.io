import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './article-view.scss';
import highlight from './atelier-estuary-light.css';

import Tag from './tag/tag';
import Panel from '../../common/panel/panel';

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
        <Tag
          key={tag.sys.id}
          tag={tag}
          index={index}
          search={this.props.search}
          toggleSearch={this.props.toggleSearch}
        />
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
            title="Tags"
            body={this.mapTags()}
          />

          <Panel
            title="References"
            body={<ol>{this.mapReferences()}</ol>}
          />
        </div>
      </div>
    );
  }
}

MarkdownContainer.propTypes = {
  content: PropTypes.string,
  references: PropTypes.array,
  tags: PropTypes.array,
  search: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};

MarkdownContainer.defaultProps = {
  content: '',
  references: [],
  tags: [],
};

export default withStyles(s, highlight)(MarkdownContainer);
