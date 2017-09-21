import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../../../route-handler/link/link';

import s from './tag.scss';

class Tag extends React.Component {

  render() {
    return (
      <Link className={s.tag} route={`?search=taggedin:${this.props.tag.fields.name}`}>
        <span>
          {this.props.index > 0 ? ', ' : ''}
          {this.props.tag.fields.name}
        </span>
      </Link>
    );
  }
}

Tag.propTypes = {
  index: PropTypes.number.isRequired,
  tag: PropTypes.object.isRequired,
};

export default withStyles(s)(Tag);
