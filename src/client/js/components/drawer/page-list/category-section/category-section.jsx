import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../route-handler/link/link';

import drawer from '../../../../containers/drawer/drawer.scss';

class CategorySection extends React.Component {

  mapLinks() {
    // active={(this.props.activeRoute ? this.props.activeRoute : null) === page.route}
    const entries = this.props.category.entries;
    entries.sort((a, b) => {
      return a.fields.name.charCodeAt(0) - b.fields.name.charCodeAt(0);
    });
    return entries.map((entry) => {
      return (
        <Link
          route={entry.fields.route}
          ripple
          className={
            ((this.props.activeRoute) && (this.props.activeRoute === entry.fields.route))
            ?
            (`${drawer['drawer-item']} ${drawer.active}`)
            :
            drawer['drawer-item']
          }
          key={entry.sys.id}
        >
          <span>{entry.fields.name}</span>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className={drawer['drawer-section']} ref={(div) => { this.container = div; }}>
        <div className={drawer['drawer-subheading']} href="#">
          {this.props.category.fields.name}
        </div>
        <div ref={(div) => { this.linksContainer = div; }}>
          { this.mapLinks() }
        </div>
      </div>
    );
  }
}

CategorySection.propTypes = {
  activeRoute: PropTypes.string,
  category: PropTypes.object.isRequired,
};

CategorySection.defaultProps = {
  activeRoute: null,
};

export default withStyles(drawer)(CategorySection);
