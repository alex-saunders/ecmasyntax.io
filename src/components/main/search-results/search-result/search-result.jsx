import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Ripple from '../../../generic/ripple/ripple';
import s from './search-result.scss';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  };

  clickHandler = (e) => {
    e.preventDefault();
    this.props.selectRoute(this.props.page);
  }

  render() {
    const page = this.props.page;
    const reg = new RegExp(this.props.currQuery, 'gi');
    const formattedName = page.fields.name.replace(reg, function(str) {return '<b>'+str+'</b>'});
    const formattedCat = page.fields.category.fields.name.replace(reg, function(str) {return '<b>'+str+'</b>'});
    const formattedSpec = page.fields.category.fields.specification[0].fields.name.replace(reg, function(str) {return '<b>'+str+'</b>'});

        
    return (
      <div className={s.result} onClick={this.clickHandler} >
        <p className={s['result-title']} dangerouslySetInnerHTML={{ __html: formattedName }}></p>
        <p className={s['result-url']}>{ page.fields.route } </p>
        <p className={s['result-route']} dangerouslySetInnerHTML={{ __html: `${formattedSpec} > ${formattedCat} > ${formattedName}` }}></p>
        <div className={s.ripple}>
          <Ripple />
        </div>
      </div>
    );
  }

}


export default withStyles(s)(SearchResult);
