import React from 'react';
import Ripple from '../../../../generic/ripple/ripple';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './route-link.scss';

class RouteLink extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler = (e) => {
    
    this.props.selectRoute(this.props.page);
    e.preventDefault();
  }

	render() {
		return (
        <a
          className={((this.props.activeRoute) && (this.props.activeRoute === this.props.page.fields.route)) ? (`${s['pageList-item']} ${s['active']}`) : s['pageList-item']}
          href={this.props.page.fields.route}
          onClick={ this.clickHandler }>
          {this.props.children}
          <Ripple />
        </a>
    )
	}

}


export default withStyles(s)(RouteLink);
