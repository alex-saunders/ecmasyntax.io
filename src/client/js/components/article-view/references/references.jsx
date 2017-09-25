import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './references.scss';

import Panel from '../../common/panel/panel';

class References extends React.Component {

  _mapReferences() {
    const references = this.props.references.map((reference) => {
      let referenceText;
      switch (reference.fields.type) {
        case 'MDN':
          referenceText = (
            <li key={reference.sys.id} className={s.reference}>
              <a href={reference.fields.link} target="_blank" rel="noopener noreferrer">{reference.fields.name}</a>
              &nbsp;by <a href="https://developer.mozilla.org/en-US/docs/MDN/About$history" target="_blank" rel="noopener noreferrer">Mozilla Contributors</a>
              , licensed under <a href="https://creativecommons.org/licenses/by-sa/2.5/" target="_blank" rel="noopener noreferrer">CC-BY-SA 2.5</a>.
            </li>
          );
          break;
        case 'es6-features':
          referenceText = (
            <li key={reference.sys.id} className={s.reference}>
              <a href={reference.fields.link} target="_blank" rel="noopener noreferrer">es6-features.org &ndash; <i>{reference.fields.name}</i></a>
              &nbsp;by <a href="" target="_blank" rel="noopener noreferrer">Ralf S. Engelschall</a>
              , licensed under <a href="https://github.com/rse/es6-features/blob/gh-pages/LICENSE.txt" target="_blank" rel="noopener noreferrer">MIT</a>.
            </li>
          );
          break;
        default:
          referenceText = (
            <li key={reference.sys.id} className={s.reference}>
              <a href={reference.fields.link} target="_blank" rel="noopener noreferrer">{reference.fields.name}</a>
            </li>
          );
      }
      return referenceText;
    });
    return references;
  }

  render() {
    return (
      <Panel
        title="References"
        body={<ol>{this._mapReferences()}</ol>}
      />
    );
  }
}

References.propTypes = {
  references: PropTypes.array,
};

References.defaultProps = {
  references: [],
};

export default withStyles(s)(References);
