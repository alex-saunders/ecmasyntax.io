import React from 'react';
import RouteLink from '../route-link';

class CategorySection extends React.Component {
  constructor(props) {
    super(props);
  }

  mapLinks() {
    return this.props.links.map((page, index) => {
      return (
        <RouteLink
          key={index}
          active={(this.props.activeRoute ? this.props.activeRoute : null) === page.route}
          route={page.route}
          category={page.category}
          selectRoute={ this.props.selectRoute }>
          {page.name}
        </RouteLink>
      )
    })
  }

  handleClick = (e) => {
    e.preventDefault();

    this.icon.classList.toggle('hidden');
    this.linksContainer.classList.toggle('hidden');
  }

  render() {
    return (
      <div className="categorySection">
        <a className="categorySection-header" href="#" onClick={this.handleClick} ref={(a) => { this.header = a; }}>
          {this.props.category}
          <i className="material-icons chevron" ref={(i) => { this.icon = i; }}>keyboard_arrow_down</i>
        </a>
        <div className="categorySection-body" ref={(div) => { this.linksContainer = div; }}>
          { this.mapLinks() }
        </div>
      </div>
    )
  }
}

export default CategorySection;
