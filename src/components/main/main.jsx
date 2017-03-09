import React from 'react';
import ArticleView from '../../containers/article-view';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../scss/main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

	render() {

		return (
      <main className="main">
        <div className="content-wrapper">
          <ArticleView />
          <footer className="footer">
          </footer>
        </div>
      </main>
    )
	}

}

export default withStyles(s)(Main);
