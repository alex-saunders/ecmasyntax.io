import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Route from '../../../../containers/common/route/route';
import Ripple from '../../../common/ripple/ripple';
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
      <Route route={this.props.page.fields.route}>
        <div className={s.result}>
          <p className={s['result-title']} dangerouslySetInnerHTML={{ __html: formattedName }} />
          <p className={s['result-url']}>{ page.fields.route }</p>
          <p className={s['result-route']} dangerouslySetInnerHTML={{ __html: `${formattedSpec} > ${formattedCat} > ${formattedName}` }} />
          <div className={s.ripple}>
            <Ripple />
          </div>
        </div>
      </Route>
    );
  }
}

SearchResult.propTypes = {
  currQuery: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
};

export default withStyles(s)(SearchResult);
