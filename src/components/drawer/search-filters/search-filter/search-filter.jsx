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
      this.setState({ active: true })
    }

  }

  render() {
    return (
      <Ripple>
        <div className={`${s["rkmd-checkbox"]}`} >
          <label htmlFor={`filter-${this.props.filter}`} className={s["label"]}>{ this.props.filter }</label>
          <label className={`${s["input-checkbox"]}`}>
            <input type="checkbox" id={`filter-${this.props.filter}`} onChange={this.handleClick}></input>
            <span className={s["checkbox"]}></span>
          </label>
        </div>
      </Ripple>
    );
  }

}

export default withStyles(s)(ArticleFilter);
