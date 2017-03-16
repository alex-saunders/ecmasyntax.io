import React from 'react';
import ArticleList from '../../containers/article-list/article-list';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './drawer.scss';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    };
  }

  searchIconClick = () => {
    this.searchInput.focus();
  }

  searchFocused = () => {
    this.searchContainer.classList.add(s['focused']);
    this.searchInput.click();
  }

  searchUnfocused = () => {
    this.searchContainer.classList.remove(s['focused']);
  }

  handleInput = (e) => {
    this.setState({
      searchQuery: e.target.value
    });

    if (e.target.value.length > 0) {
      this.searchContainer.classList.add(s['non-empty']);
    } else {
      this.searchContainer.classList.remove(s['non-empty']);
    }
  }

  clearInput = (e) => {
    this.setState({
      searchQuery: ''
    });
    this.searchContainer.click();
    this.searchContainer.classList.remove(s['non-empty']);
  }

	render() {
		return (
      <aside className={s['drawer']}>
        <a className={s['drawer-logo']} href="/">
          <img src="/static/img/ecmasyntax-logo.png" alt="logo" />
        </a>
        <hr className={s['drawer-divider']}/>
        <div className={s['search-container']}>
          <label htmlFor="search"
            className={s['search-label']}
            onFocus={this.searchFocused}
            ref={(label) => { this.searchContainer = label; }}>
            <button className={s['icon-container']} onClick={this.searchIconClick}>
              <i className={`material-icons ${s['search-icon']}`}>search</i>
            </button>

            <input type="text" id="search" placeholder="Search for syntax"
              value={this.state.searchQuery}
              className={s['search-input']}
              onChange={this.handleInput}
              onBlur={this.searchUnfocused}
              ref={(input) => { this.searchInput = input; }} />

            <button className={`${s['icon-container']} ${s['search-closeIcon']}`} onClick={this.clearInput}>
              <i className='material-icons'>close</i>
            </button>
          </label>
        </div>
        <div className={s['pageList-wrapper']}>
          <ArticleList
            query={this.state.searchQuery}
            selectRoute={(page) => this.props.selectRoute(page)}/>
        </div>
        <hr className={s['drawer-divider']}/>
        <div className={s['drawer-footer']}>

        </div>
      </aside>
    )
	}

}

export default withStyles(s)(Drawer);
