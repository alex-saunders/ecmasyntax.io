import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import CategorySection from '../category-section/category-section';
import s from './specification-section.scss';

class SpecificationSection extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();

    this.container.classList.toggle(s['hidden']);
  }

  mapLinks = () => {
      return this.props.specification.categories.map((category, index) => {
          return (<CategorySection selectRoute={this.props.selectRoute} category={category} key={index}/>);
      })
  }

  render() {
    return (
      <div className={s['specificationSection']} ref={(div) => { this.container = div; }}>
        <a className={s['specificationSection-header']} href="#" onClick={this.handleClick}>
          {this.props.specification.fields.name}
          <i className={`material-icons ${s['chevron']}`} ref={(i) => { this.icon = i; }}>keyboard_arrow_down</i>
        </a>
        <div className={s['specificationSection-body']} ref={(div) => { this.linksContainer = div; }}>
          { this.mapLinks() }
        </div>
      </div>
    )
  }
}

export default withStyles(s)(SpecificationSection);
