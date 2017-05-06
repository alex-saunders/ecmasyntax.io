import React from 'react';
import RouteLink from './route-link/route-link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './category-section.scss';

class CategorySection extends React.Component {
  constructor(props) {
    super(props);
  }

  mapLinks() {
// active={(this.props.activeRoute ? this.props.activeRoute : null) === page.route}
    return this.props.category.entries.map((entry, index) => {
      return (
        <RouteLink
          page={entry}
          key={index}
          activePage={this.props.activePage}
          selectRoute={ this.props.selectRoute }>
          {entry.fields.name}
        </RouteLink>
      );
    });
  }

  render() {
    return (
      <div className={s['categorySection']} ref={(div) => { this.container = div; }}>
        <div className={s['categorySection-header']} href="#">
          {this.props.category.fields.name}
        </div>
        <div className={s['categorySection-body']} ref={(div) => { this.linksContainer = div; }}>
          { this.mapLinks() }
        </div>
      </div>
    )
  }
}

export default withStyles(s)(CategorySection);
