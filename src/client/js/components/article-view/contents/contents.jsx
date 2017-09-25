import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './contents.scss';

import Panel from '../../common/panel/panel';

class Contents extends React.Component {

  render() {
    return (
      <Panel
        className={s['contents']}
        title="Contents"
        body={<nav dangerouslySetInnerHTML={{ __html: this.props.contents }}/>}
      />
    );
  }
}

Contents.propTypes = {
  contents: PropTypes.string,
};

Contents.defaultProps = {
  contents: '',
};

export default withStyles(s)(Contents);
