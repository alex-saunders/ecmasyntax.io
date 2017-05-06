import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './search-input.scss';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      nonEmpty: false,
    }
  };

  searchIconClick = () => {
    this.props.toggleSearch(true);
    setTimeout(() => {
      this.searchInput.focus();
    }, 200);
  }

  searchFocused = () => {
    this.setState({ focused: true })
    this.searchInput.click();
  }

  searchUnfocused = (evt) => {
    // if (evt.target === this.searchInput) {
    //   return;
    // }

    if (this.props.currQuery.length <= 0) {
      this.props.toggleSearch(false);
    }
    this.setState({ 
      focused: false,
    })
  }

  handleInput = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ nonEmpty: true })
    } else {
      this.setState({ nonEmpty: false })
    }

    this.props.search(e.target.value);
  }

  clearInput = (e) => {
    this.props.search('');
    this.searchInput.focus();
  }

  render() {
    return (
      <label htmlFor="search"
        className={`${s['search-label']} 
          ${this.props.searchOpen ? s.opened : ''} 
          ${this.state.focused ? s.focused : ''}
          ${this.props.currQuery.length > 0 ? s.nonEmpty : ''}
        `}
        ref={(label) => { this.searchContainer = label; }}>
        <button className={`${s['icon-container']} ${s['search-searchIcon']}`} onClick={this.searchIconClick}>
          <i className={`material-icons ${s['search-icon']}`}>search</i>
        </button>

        <div className={s['search-input--container']}>
          <input type="text" id="search" placeholder="Search for syntax"
            value={this.props.currQuery}
            className={s['search-input']}
            onChange={this.handleInput}
            onFocus={this.searchFocused}
            onBlur={this.searchUnfocused}
            ref={(input) => { this.searchInput = input; }} />

          <button 
            className={`${s['icon-container']} ${s['search-closeIcon']}`} 
            onClick={this.clearInput} 
            ref={(btn) => { this.closeIcon = btn; }}>

            <i className='material-icons'>close</i>
          </button>
        </div>
      </label>
    );
  }

}

export default withStyles(s)(SearchInput);
