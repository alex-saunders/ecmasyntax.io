import React from 'react';
import ArticleView from '../../containers/article-view';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

	render() {

		return (
      <main className="main" ref={(main) => { this.main = main; }}>
        <div className="content-wrapper">
          <ArticleView />
          <footer className="footer">
          {/*
            <div className="githubButton-container">
              <a className="github-button" href="https://github.com/alex-saunders/ecmasyntax.io" data-icon="octicon-star" data-style="mega" data-count-href="/alex-saunders/ecmasyntax.io/stargazers" data-count-api="/repos/alex-saunders/ecmasyntax.io#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star alex-saunders/ecmasyntax.io on GitHub">Star</a>
            </div>
          */}
          </footer>
        </div>
      </main>
    )
	}

}

export default withStyles(s)(Main);
