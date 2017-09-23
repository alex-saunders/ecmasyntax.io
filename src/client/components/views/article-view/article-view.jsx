import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './article-view.scss';
import highlight from './atelier-estuary-light.css';

import { fetchPage } from '../../../actions/active-page';
import { toggleWaterfallHeader } from '../../../actions/utils';
 
import LoadingView from '../loading-view/loading-view';
import Tag from './tag/tag';
import Panel from '../../common/panel/panel';

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchArticle();
  }

  componentDidUpdate(prevProps) {
    // page has been retrieved
    if (this.props.page && !this.props.isLoading && prevProps.isLoading) {
      this.props.triggerScrollHandler();
    }
  }

  async fetchArticle() {
    this.props.fetchPage(window.location.pathname);
  }

  mapReferences() {
    const references = this.props.page.fields.references.map((reference) => {
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
    const tags = this.props.page.fields.tags.map((tag, index) => {
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
    if (this.props.isLoading) {
      return <LoadingView />;
    }
    if (this.props.page) {
      return (
        <div className={s['markdown-wrapper']}>          
            <div dangerouslySetInnerHTML={{ __html: this.props.page.fields.blob }} />
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
    } else {
      return (
        <div>{ this.props.location }</div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    page: state.activePage.page,
    waterfallHeaderOpen: state.utils.waterfallHeaderOpen,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchPage: (route) => { dispatch(fetchPage(route)); },
    toggleWaterfallHeader: (visible) => { dispatch(toggleWaterfallHeader(visible)); },
  };
}

export default withStyles(s, highlight)(connect(mapStateToProps, matchDispatchToProps)(ArticleView));
