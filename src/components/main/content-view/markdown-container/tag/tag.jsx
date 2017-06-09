import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './tag.scss';

class Tag extends React.Component {

  _handleClick = (evt) => {
    this.props.toggleSearch(true);
    this.props.search(`taggedin:${this.props.tag.fields.name}`);

    evt.preventDefault();
  }

  render() {
    return (
      <a className={s.tag} onClick={this._handleClick} href="#">
        {this.props.index > 0 ? ', ' : ''}
        {this.props.tag.fields.name}
      </a>
    );
  }
}

Tag.propTypes = {
  index: PropTypes.number.isRequired,
  tag: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};

export default withStyles(s)(Tag);
