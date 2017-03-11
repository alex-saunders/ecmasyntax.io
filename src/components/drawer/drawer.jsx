import React from 'react';
import ArticleList from '../../containers/article-list';
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
    this.searchContainer.classList.add('focused');
    this.searchInput.click();
  }

  searchUnfocused = () => {
    this.searchContainer.classList.remove('focused');
  }

  handleInput = (e) => {
    this.setState({
      searchQuery: e.target.value
    });

    if (e.target.value.length > 0) {
      this.searchContainer.classList.add('non-empty');
    } else {
      this.searchContainer.classList.remove('non-empty');
    }
  }

  clearInput = (e) => {
    this.setState({
      searchQuery: ''
    });
    this.searchContainer.click();
    this.searchContainer.classList.remove('non-empty');
  }

	render() {
		return (
      <aside className="drawer">
        <a className="drawer-logo" href="/">
          <img src="/static/img/ecmasyntax-logo.png" alt="logo" />
        </a>
        <hr className="drawer-divider"/>
        <div className="search-container">
          <label htmlFor="search"
            className="search-label"
            onFocus={this.searchFocused}
            ref={(label) => { this.searchContainer = label; }}>
            <button className="icon-container" onClick={this.searchIconClick}>
              <i className="material-icons search-icon">search</i>
            </button>

            <input type="text" id="search" placeholder="Search for syntax"
              value={this.state.searchQuery}
              className="search-input"
              onChange={this.handleInput}
              onBlur={this.searchUnfocused}
              ref={(input) => { this.searchInput = input; }} />

            <button className="icon-container search-closeIcon" onClick={this.clearInput}>
              <i className="material-icons ">close</i>
            </button>
          </label>
        </div>
        <div className="pageList-wrapper">
          <ArticleList
            query={this.state.searchQuery}
            selectRoute={(page) => this.props.selectRoute(page)}/>
        </div>
        <hr className="drawer-divider"/>
        <div className="drawer-footer">

        </div>
      </aside>
    )
	}

}

export default withStyles(s)(Drawer);
