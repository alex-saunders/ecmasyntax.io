import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './route-link.scss';

class RouteLink extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.selectRoute(this.props.route);
  }

	render() {
		return (
      <a
        className={this.props.active ? (`${s['pageList-item']} ${s['active']}`) : s['pageList-item']}
        href={this.props.route}
        onClick={ this.clickHandler }>
        {this.props.children}
      </a>
    )
	}

}


export default withStyles(s)(RouteLink);
