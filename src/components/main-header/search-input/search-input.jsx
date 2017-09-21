import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './search-input.scss';

import RouteHandler from '../../route-handler/route-handler';

import Link from '../../route-handler/link/link'

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      nonEmpty: false,
    };

  }

  searchIconClick = () => {
    this.searchInput.focus();
  }

  searchFocused = () => {
    this.setState({ focused: true });
    
    document.body.addEventListener('click', this.searchUnfocused);
  }

  searchUnfocused = (evt) => {
    if (this.searchContainer.contains(evt.target)) {
      return;
    }
    document.body.removeEventListener('click', this.searchUnfocused);

    if (this.props.currQuery.length <= 0) {
      // removes the hash, getting rid of the search page
      RouteHandler.UpdateRoute(location.pathname);
    }
    this.setState({
      focused: false,
    });
  }

  handleInput = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ nonEmpty: true });
    } else {
      this.setState({ nonEmpty: false });
    }

    this.props.search(e.target.value);
  }

  clearInput = () => {
    this.props.search('');
    this.searchInput.focus();
  }

  render() {
    return (
      
        <label
          htmlFor="search"
          className={`${s['search-label']} 
            ${this.props.searchOpen ? s.opened : ''} 
            ${this.state.focused ? s.focused : ''}
            ${this.props.currQuery.length > 0 ? s.nonEmpty : ''}
          `}
          ref={(label) => { this.searchContainer = label; }}
        >
        <Link
        route={`?search=${this.props.currQuery}`}
        handleClick={this.searchFocused}
        disabled={this.state.focused}>
          <button className={`${s['icon-container']} ${s['search-searchIcon']}`} onClick={this.searchIconClick}>
            <svg className={s['search-icon']} fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
        </Link>


        <div className={s['search-input--container']}>
          <input
            type="text" id="search" placeholder="Search for syntax"
            value={this.props.currQuery}
            className={s['search-input']}
            onChange={this.handleInput}
            onFocus={this.searchFocused}
            ref={(input) => { this.searchInput = input; }}
          />

          <button
            className={`${s['icon-container']} ${s['search-closeIcon']}`}
            onClick={this.clearInput}
            ref={(btn) => { this.closeIcon = btn; }}
          >

            <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
        </div>
      </label>
    );
  }
}

SearchInput.propTypes = {
  searchOpen: PropTypes.bool.isRequired,
  currQuery: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};

export default withStyles(s)(SearchInput);
