import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { SPECIFICATION_SEARCH, CATEGORY_SEARCH } from '../../../utils/constants';
import Link from '../../route-handler/link/link';

import s from './breadcrumbs.scss';

class Breadcrumbs extends React.Component {

  render() {
    return (
      <ul className={s['breadcrumbs']}>
        <li>
          <Link className={s.breadcrumb} route={`?search=${SPECIFICATION_SEARCH}:${this.props.specification}`}>
            <span>{ this.props.specification }</span>
          </Link>
        </li>
        <li>
          <Link className={s.breadcrumb} route={`?search=${CATEGORY_SEARCH}:${this.props.category}`}>
            <span>{ this.props.category }</span>
          </Link>
        </li> 
        <li>
          <Link className={s.breadcrumb} route={`?search=${this.props.name}`}>
            <span>{ this.props.name }</span>
          </Link>
        </li>
      </ul>
    );
  }
}

Breadcrumbs.propTypes = {
  specification: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(s)(Breadcrumbs);
