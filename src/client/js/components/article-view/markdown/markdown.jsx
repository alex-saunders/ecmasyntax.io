import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './markdown.scss';

class Markdown extends React.Component {

  componentDidMount() {
    if (location.hash) {
      const heading = this.content.querySelector(location.hash);
      if (heading) {
        this.props.scrollTo(heading.offsetTop);
      }
    }
  }

  render() {
    return (
      <div
        className={s.markdown}
        ref={(div) => { this.content = div; }}
        dangerouslySetInnerHTML={{ __html: this.props.markdown }}/>
    );
  }
}

Markdown.propTypes = {
  markdown: PropTypes.string,
  scrollTo: PropTypes.func.isRequired,
};

Markdown.defaultProps = {
  markdown: '',
};

export default withStyles(s)(Markdown);
