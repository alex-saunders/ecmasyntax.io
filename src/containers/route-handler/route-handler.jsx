import React /* , { PropTypes } */ from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { search } from '../../actions/page-list';
import { setActivePageTitle } from '../../actions/active-page';
import { toggleSearch, setAutoDownload } from '../../actions/utils';

import s from './route-handler.scss';

class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '/',
      validRoutes: [],
      notFoundRoute: <div>404</div>,
    };
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onPopState);  
    
    let validRoutes = [];
    React.Children.forEach(this.props.children, (child) => {
      if (child.props.hasOwnProperty('notfound')) {
        this.setState({ notFoundRoute: child })
      } else {
        validRoutes.push(child);
      }
    });

    this.setState({
      validRoutes
    });

    this.onPopState();
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState);
  }

  onPopState = () => {
    console.log('POP STATE');
    this.chooseActiveRoute();
  }

  chooseActiveRoute = () => {  
    let content;  
    for (let validRoute of this.state.validRoutes) {
      const regex = new RegExp(validRoute.props.path)
      if (regex.test(location.pathname)) {
        content = validRoute;
        break;
      }
    };
    content = content || this.state.notFoundRoute;
    this.setState({
      content: React.cloneElement(
        content,
        { location: location.pathname }
      )
    });
  }


  render() {

    return (
      <div>
        {this.state.content}
      </div>
    );
  }
}

RouteHandler.defaultProps = {
  activePage: null,
};

function mapStateToProps(state) {
  return {
    activePage: state.activePage.page,
    isLoading: state.activePage.isLoading,
    autoDownload: state.utils.autoDownload,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    search: (query) => { dispatch(search(query)); },
    toggleSearch: (open) => { dispatch(toggleSearch(open)); },
    setActivePageTitle: (title) => { dispatch(setActivePageTitle(title)); },
    setAutoDownload: (bool) => { dispatch(setAutoDownload(bool)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(RouteHandler));
