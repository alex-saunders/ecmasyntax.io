import React from 'react';
import {connect} from 'react-redux';
import Markdown from 'markdown-to-jsx';

class ArticleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

	render() {
    let content;

    if (this.props.hasErrored) {
        content = (<p>Sorry! There was an error loading the items</p>);
    }
    else if (this.props.isLoading) {
        content = (<p>Loading…</p>);
    }
    else if (this.props.activePage) {
      content = (
        <div className="markdown-wrapper">
          <Markdown>{ this.props.activePage.body }</Markdown>
        </div>
      );
    } else {
      content = (<div>no page selected</div>)
    }
    return (
      <div className="page-view">
        {content}
      </div>
    )
	}

}

function mapStateToProps(state) {
	return {
    activePage: state.activePage.article,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading
	};
}

export default connect(mapStateToProps)(ArticleView);
