import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './search-filter.scss';

import Ripple from '../../../common/ripple/ripple';

class ArticleFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (this.props.currFilters.indexOf(this.props.filter) > -1),
    };
  }

  handleClick = (e) => {
    if ((this.props.currFilters.indexOf(this.props.filter) > -1)) {
      this.props.removeFilter(this.props.filter);
      this.setState({ active: false });
    } else {
      this.props.addFilter(this.props.filter);
      this.setState({ active: true });
    }
    e.preventDefault();
  }

  render() {
    const active = (this.props.currFilters.indexOf(this.props.filter) > -1);
    return (
      <button className={`${s['rkmd-checkbox']}`} onClick={this.handleClick}>
        <label htmlFor={`filter-${this.props.filter}`} className={s.label}>
          { this.props.filter }
          <Ripple />
        </label>
        <label className={`${s['input-checkbox']}`} htmlFor={`filter-${this.props.filter}`}>
          <input type="checkbox" checked={active} id={`filter-${this.props.filter}`} />
          <span className={s.checkbox} />
        </label>
        {/* <Ripple /> */}
      </button>
    );
  }
}

ArticleFilter.propTypes = {
  currFilters: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
  addFilter: PropTypes.func.isRequired,
};

export default withStyles(s)(ArticleFilter);
