import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { search } from '../../actions/page-list';
import { toggleSearch, pushToast, setAutoDownload, progressUpdate, toggleWaterfallHeader } from '../../actions/utils';
import { getAutoDownload } from '../../utils/offline-cache';

import WaterfallHeader from '../waterfall-header/waterfall-header';
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

  componentDidMount() {
    getAutoDownload().then((result) => {
      this.props.setAutoDownload(result);
    });
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
    // const showWaterfallHeader =
    //   this.caches
    //   && this.props.activePage
    //   && new RegExp(/^\/pages\//).test(this.props.activePage.fields.route)
    //   && !this.props.searchOpen
    //   && !this.state.scrolled;
    //   // && !this.props.isLoading;

    const About = (props) => {
      return (
        <Bundle scrollDistance={this.state.scrollDistance} load={() => import(/* webpackChunkName: "about" */ '../../components/views/about-view/about-view')}>
          {(About) => <About
                        {...props}
                        autoDownload={this.props.autoDownload}
                        setAutoDownload={this.props.setAutoDownload}/>}
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
        {/* <div className={s['content-wrapper']}  ref={(div) => { this.contentWrapper = div; }}> */}
          <div className={`${s['page-view']} ${this.props.isLoading ? s['loading-view'] : ''}`}>
            <RouteHandler key={2} progressUpdate={this.props.progressUpdate}>
              <Route exact path="^\/about\/?$" component={About}/>
              <Route exact path="^\/pages\/(.*)$" component={Article}/>
              <Route exact query path="^(.*)\?search=?(.*)$" component={Search}/>
              <Route exact path="^\/loading\/?$" component={Loading}/>
              <Route notfound component={NoPage}/>
            </RouteHandler>
          </div>

            {!this.props.searchOpen ?
              <footer className={`${s.footer} ${this.props.isLoading ? s.hidden : ''}`}>
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
            :
              ''
            }
        {/* </div> */}
      </main>
    );
  }
}

Main.propTypes = {
  activePage: PropTypes.object,
  activeRoute: PropTypes.string,
  searchOpen: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  scrolled: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  pushToast: PropTypes.func.isRequired,
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
    activeRoute: state.activePage.route,
    activePage: state.activePage.page,
    activePageType: state.activePage.type,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen,
    waterfallHeaderOpen: state.utils.waterfallHeaderOpen,
    autoDownload: state.utils.autoDownload,
    currQuery: state.pageList.query,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: (open) => { dispatch(toggleDrawer(open)); },
    search: (query) => { dispatch(search(query)); },
    toggleSearch: (open) => { dispatch(toggleSearch(open)); },
    toggleWaterfallHeader: (visible) => { dispatch(toggleWaterfallHeader(visible)); },
    progressUpdate: (percentage) => { dispatch(progressUpdate(percentage)); },
    pushToast: (message, action, timeout, callback) => { dispatch(pushToast(message, action, timeout, callback)); },
    setAutoDownload: (bool) => { dispatch(setAutoDownload(bool)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Main));
