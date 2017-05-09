import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toggleDrawer } from '../../actions/utils';
import SearchResults from '../search-results/search-results';
import ArticleView from '../../components/main/article-view/article-view';
import s from './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <main className={s['main']} ref={(main) => { this.main = main; }}>
        <div className={s['progressBar']} />
        <div className={s['content-wrapper']}>
          <CSSTransitionGroup
            transitionName={ {
              enter: s.enter,
              enterActive: s.enterActive,
              leave: s.leave,
              leaveActive: s.leaveActive,
              appear: s.appear,
              appearActive: s.appearActive,
            }}
            component="div"
            className={s['transition-container']}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
          {this.props.searchOpen ? 
          <SearchResults 
            selectRoute={this.props.selectRoute} key={1}/>
          :
          <ArticleView
            activePage={this.props.activePage}
            hasErrored={this.props.hasErrored}
            isLoading={this.props.isLoading} key={2}/>
          }
          </CSSTransitionGroup>
          {!this.props.searchOpen ? 
            <footer className={s['footer']}>
              <div className={s.section}>
                <h1>
                  A free, open source project to help web developers
                </h1>
                <p>
                  Created by <a href="https://twitter.com/AlexJRsaunders" target="_blank">@alexjrsaunders</a>
                </p>
                <p>
                  Design inspired by
                  <a href="http://cssreference.io/" target="_blank"> HTML/CSSReference.io</a>
                  , created by
                  <a href="https://twitter.com/jgthms" target="_blank"> @jgthms</a>
                </p>
              </div>
              <div className={s.section}>
                <h1>Share</h1>
                <p>

                  <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ecmasyntax.io" target="_blank">
                    <i className={`${s.facebook} fa fa-facebook-square`} aria-hidden="true"></i>
                  </a>
                  <a href="https://twitter.com/home?status=Javascript%20syntax%20reference%3A%20https%3A//ecmasyntax.io">
                    <i className={`${s.twitter} fa fa-twitter-square`} aria-hidden="true"></i>
                  </a>
                </p>
                <iframe src="https://ghbtns.com/github-btn.html?user=alex-saunders&repo=ecmasyntax.io&type=star&count=true" frameBorder="0" scrolling="0" width="160px" height="30px" />
              </div>
            </footer>
          :
            ''
          }
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePage: state.activePage.page,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading,
    drawerOpen: state.utils.drawerOpen,
    searchOpen: state.utils.searchOpen,
    currQuery: state.pageList.query,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: (open) => { dispatch(toggleDrawer(open)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Main));
