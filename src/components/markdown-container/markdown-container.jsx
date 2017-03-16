import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './markdown-container.scss';
import highlight from './atelier-estuary-light.scss';

class MarkdownContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={s['markdown-wrapper']} dangerouslySetInnerHTML={{ __html: this.props.content }}>
      </div>
    )
  }
}

export default withStyles(s, highlight)(MarkdownContainer);
