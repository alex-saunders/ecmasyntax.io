import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './markdown-container.scss';

class MarkdownContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="markdown-wrapper" dangerouslySetInnerHTML={{ __html: this.props.content }}>
      </div>
    )
  }
}

export default withStyles(s)(MarkdownContainer);
