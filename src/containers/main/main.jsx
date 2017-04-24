import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toggleDrawer } from '../../actions/utils';
import MainHeader from '../../components/main/main-header/main-header';
import ProgressIndicator from '../../components/main/progress-indicator/progress-indicator';
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
        <MainHeader
          activePage={this.props.activePage}
          drawerOpen={this.props.drawerOpen}
          toggleDrawer={this.props.toggleDrawer} 
        />
        <ProgressIndicator
          activePage={this.props.activePage}
          hasErrored={this.props.hasErrored}
          isLoading={this.props.isLoading}
        />
        <div className={s['progressBar']} />
        <div className={s['content-wrapper']}>
          <ArticleView
            activePage={this.props.activePage}
            hasErrored={this.props.hasErrored}
            isLoading={this.props.isLoading}
          />
          <footer className={s['footer']}>
            <div className={s.section}>
              <h1>
                A free, open source project to help web developers
              </h1>
              <p>
                Created by <a href="#" target="_blank">@alexjrsaunders</a>
              </p>
              <p>
                Design inspired by
                <a href="#" target="_blank"> HTML/CSSReference.io</a>
                , created by
                <a href="#" target="_blank"> @jgthms</a>
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
  };
}

function matchDispatchToProps(dispatch) {
  return {
    toggleDrawer: (open) => { dispatch(toggleDrawer(open)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(Main));
