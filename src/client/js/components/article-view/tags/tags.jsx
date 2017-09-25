import React from 'react';
import PropTypes from 'prop-types';

import Panel from '../../common/panel/panel';
import Tag from './tag/tag';

class Tags extends React.Component {

  _mapTags() {
    const tags = this.props.tags.map((tag, index) => {
      return (
        <Tag
          key={tag.sys.id}
          tag={tag}
          index={index}
          search={this.props.search}
          toggleSearch={this.props.toggleSearch}
        />
      );
    });
    return tags;
  }

  render() {
    return (
      <Panel
        title="Tags"
        body={this._mapTags()}
      />
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.array,
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
