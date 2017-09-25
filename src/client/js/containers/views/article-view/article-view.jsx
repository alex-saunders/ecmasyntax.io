import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './article-view.scss';
import highlight from './atelier-estuary-light.css';

import { fetchPage } from '../../../actions/active-page';
import { toggleWaterfallHeader } from '../../../actions/utils';
 
import LoadingView from '../loading-view/loading-view';
import Link from '../../../components/route-handler/link/link';
import Markdown from '../../../components/article-view/markdown/markdown';
import Breadcrumbs from '../../../components/article-view/breadcrumbs/breadcrumbs';
import References from '../../../components/article-view/references/references';
import Tags from '../../../components/article-view/tags/tags';
import Contents from '../../../components/article-view/contents/contents';

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
      this.props.toggleWaterfallHeader(true);
    }
    
    // page is loading or has errored
    if (this.props.isLoading || this.props.hasErrored || !this.props.page) {
      this.props.toggleWaterfallHeader(false);
    }
  }

  async fetchArticle() {
    this.props.fetchPage(window.location.pathname);
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingView />;
    }
    if (this.props.page) {
      return (
        <div className={s['article-wrapper']} key={location.href}>    
          <div className={s['article-content']}>
            <Breadcrumbs 
              specification={this.props.page.fields.category.fields.specification.fields.name}
              category={this.props.page.fields.category.fields.name}
              name={this.props.page.fields.name}/>
            <Markdown
              markdown={this.props.page.fields.blob}
              scrollTo={this.props.scrollTo}/>
            <div className={s['footer-container']}>
              <Tags tags={this.props.page.fields.tags} />
              <References references={this.props.page.fields.references}/>
              <time>Last Updated: { this.props.page.sys.updatedAt }</time>
            </div>
          </div>
          <Contents contents={this.props.page.fields.contents} />
        </div>
      );
    } else {
      return (
        <div>Error loading article</div>
      )
    }
  }
}

ArticleView.propTypes = {
  scrollTo: PropTypes.func.isRequired
};

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
