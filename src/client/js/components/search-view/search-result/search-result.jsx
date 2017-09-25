import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../../route-handler/link/link';
import Ripple from '../../common/ripple/ripple';

import s from './search-result.scss';

class SearchResult extends React.Component {
  render() {
    const page = this.props.page;
    const category = page.fields.category;
    const specification = category.fields.specification;

    const reg = new RegExp(this.props.currQuery, 'gi');

    const formattedName = page.fields.name.replace(reg, (str) => { return `<b>${str}</b>`; });
    const formattedCat = category.fields.name.replace(reg, (str) => { return `<b>${str}</b>`; });
    const formattedSpec = specification.fields.name.replace(reg, (str) => { return `<b>${str}</b>`; });

    return (
        <Link route={this.props.page.fields.route} className={`${s['result-container']} ${this.props.className}`}>
          <div className={s.result}>
            <p className={s['result-title']} dangerouslySetInnerHTML={{ __html: formattedName }} />
            <p className={s['result-url']}>{ page.fields.route }</p>
            <p className={s['result-route']} dangerouslySetInnerHTML={{ __html: `${formattedSpec} > ${formattedCat} > ${formattedName}` }} />
            <div className={s.ripple}>
            </div>
            <Ripple className={s['ripple']}/>
          </div>
        </Link>
    );
  }
}

SearchResult.propTypes = {
  currQuery: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
  className: PropTypes.string,
};

SearchResult.defaultProps = {
  className: '',
};

export default withStyles(s)(SearchResult);
