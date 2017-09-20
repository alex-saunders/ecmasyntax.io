import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../../common/ripple/ripple';
import Link from '../../../../containers/route-handler/link/link';

import s from './category-section.scss';

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
          key={entry.sys.id}
        >
          <div
            className={
              ((this.props.activeRoute) && (this.props.activeRoute === entry.fields.route))
              ?
              (`${s['pageList-item']} ${s.active}`)
              :
              s['pageList-item']}
          >
            <Ripple />
            {entry.fields.name}
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className={s.categorySection} ref={(div) => { this.container = div; }}>
        <div className={s['categorySection-header']} href="#">
          {this.props.category.fields.name}
        </div>
        <div className={s['categorySection-body']} ref={(div) => { this.linksContainer = div; }}>
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

export default withStyles(s)(CategorySection);
