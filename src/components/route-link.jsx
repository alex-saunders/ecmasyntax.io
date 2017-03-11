import React from 'react';

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
        className={this.props.active ? "pageList-item active" : "pageList-item"}
        href={this.props.route}
        onClick={ this.clickHandler }>
        {this.props.children}
      </a>
    )
	}

}


export default RouteLink;
