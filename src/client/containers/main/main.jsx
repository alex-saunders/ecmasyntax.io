import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { search } from '../../actions/page-list';
import { setAutoDownload, progressUpdate, toggleWaterfallHeader } from '../../actions/utils';

import WaterfallHeader from '../waterfall-header/waterfall-header';
import Footer from '../../components/footer/footer';
import Bundle from '../../components/route-handler/bundle';
import Route from '../../components/route-handler/route';
import RouteHandler from '../../components/route-handler/route-handler';

import s from './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollDistance: 0,
    };
  }

  scrollHandler = () => {
    if (this.props.activePageType === 'article' && !this.props.searchOpen && this.main) {
      if (this.main.scrollTop > 0 && this.props.waterfallHeaderOpen) {
        this.props.toggleWaterfallHeader(false);
      }
      if (this.main.scrollTop < 1 && !this.props.waterfallHeaderOpen) {
        this.props.toggleWaterfallHeader(true);
      }
    }
  }

  render() {
    const About = (props) => {
      return (
        <Bundle scrollDistance={this.state.scrollDistance} load={() => import(/* webpackChunkName: "about" */ '../../components/views/about-view/about-view')}>
          {(About) => (
              <About
                {...props}
                autoDownload={this.props.autoDownload}
                setAutoDownload={this.props.setAutoDownload}/>
            )
          }
        </Bundle>
      );
    }
    
    const Article = (props) => (
      <Bundle load={() => import(/* webpackChunkName: "article" */ '../../components/views/article-view/article-view')}>
        {(Article) => <Article
                        {...props}
                        triggerScrollHandler={this.scrollHandler}/>}
      </Bundle>
    );
    
    const Search = (props) => (
      <Bundle load={() => import(/* webpackChunkName: "search" */ '../../components/views/search-view/search-view')}>
        {(Search) => <Search {...props}/>}
      </Bundle>
    )
    
    const Loading = (props) => (
      <Bundle load={() => import(/* webpackChunkName: "loading" */ '../../components/views/loading-view/loading-view')}>
        {(Loading) => <Loading
                        {...props}
                        color="#28353e"
                        size="45px"/>}
      </Bundle>
    );
    
    const NoPage = (props) => (
      <Bundle load={() => import(/* webpackChunkName: "404" */ '../../components/views/404-view/404-view')}>
        {(NoPage) => <NoPage {...props}/>}
      </Bundle>
    );


    return (
      <main className={s.main} ref={(main) => { this.main = main; }} onScroll={this.scrollHandler}>
        <WaterfallHeader />
          <div className={`${s['page-view']} ${this.props.isLoading || this.props.pageListIsLoading ? s['loading-view'] : ''}`}>
            <RouteHandler key={2} progressUpdate={this.props.progressUpdate}>
              <Route exact path="^\/$" component={Loading}/>
              <Route exact path="^\/about\/?$" component={About}/>
              <Route exact path="^\/pages\/(.*)$" component={Article}/>
              <Route exact query path="^(.*)\?search=?(.*)$" component={Search}/>
              <Route notfound component={NoPage}/>
            </RouteHandler>
          </div>
          <Footer hidden={this.props.isLoading || this.props.searchOpen}/>
      </main>
    );
  }
}

Main.propTypes = {
  searchOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  autoDownload: PropTypes.bool,
  setAutoDownload: PropTypes.func.isRequired,
};

Main.defaultProps = {
  hasErrored: false,
  isLoading: false,
  activePage: null,
  activeRoute: null,
  autoDownload: null,
};

function mapStateToProps(state) {
  return {
    activePageType: state.activePage.type,
    isLoading: state.activePage.isLoading,
    pageListIsLoading: state.pageList.isLoading,
    searchOpen: state.utils.searchOpen,
    waterfallHeaderOpen: state.utils.waterfallHeaderOpen,
    autoDownload: state.utils.autoDownload,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    search: (query) => { dispatch(search(query)); },
    toggleWaterfallHeader: (visible) => { dispatch(toggleWaterfallHeader(visible)); },
    progressUpdate: (percentage) => { dispatch(progressUpdate(percentage)); },
    setAutoDownload: (bool) => { dispatch(setAutoDownload(bool)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Main));
