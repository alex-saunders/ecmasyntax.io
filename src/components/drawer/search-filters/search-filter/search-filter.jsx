import React from 'react';
import Ripple from '../../../generic/ripple/ripple';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './search-filter.scss';

class ArticleFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (this.props.currFilters.indexOf(this.props.filter) > -1),
    }
  };

  handleClick = (e) => {
    if ((this.props.currFilters.indexOf(this.props.filter) > -1)) {
      this.props.removeFilter(this.props.filter);
      this.setState({ active: false });
    } else {
      this.props.addFilter(this.props.filter);
      console.log(`setting ${this.props.filter} to active`);
      this.setState({ active: true })
    }
    e.preventDefault();
  }

  render() {
    const active = (this.props.currFilters.indexOf(this.props.filter) > -1);
    return (
      <a className={`${s["rkmd-checkbox"]}`} href="#" onClick={this.handleClick}>
        <label htmlFor={`filter-${this.props.filter}`} className={s["label"]}>
          { this.props.filter }
          <Ripple />
        </label>
        <label className={`${s["input-checkbox"]}`}>
          <input type="checkbox" checked={active}  id={`filter-${this.props.filter}`}></input>
          <span className={s["checkbox"]}></span>
        </label>
        {/*<Ripple />*/}
      </a>
    );
  }

}

export default withStyles(s)(ArticleFilter);
