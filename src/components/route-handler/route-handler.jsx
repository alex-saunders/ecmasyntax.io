import React /* , { PropTypes } */ from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './route-handler.scss';

class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validRoutes: [],
      notFoundRoute: <div>404</div>,
    };
  }

  componentWillMount() {
    window.addEventListener('popstate', this.onPopState);  
    
    let validRoutes = [];
    React.Children.forEach(this.props.children, (child) => {
      if (child.props.hasOwnProperty('notfound')) {
        this.setState({ notFoundRoute: child })
      } else {
        validRoutes.push(child);
      }
    });

    this.validRoutes = validRoutes;

    this.setState({
      location: location.href,
    })

    this.onPopState();
  }
  

  static UpdateRoute(route) {
    window.history.pushState(null, null, route);
    window.dispatchEvent(new Event('popstate'));
  }

  static ReplaceRoute(route) {
    window.history.replaceState(null, null, route);
    window.dispatchEvent(new Event('popstate'));
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState);
  }

  onPopState = () => {
    this.props.progressUpdate(0);
    this.chooseActiveRoute();
  }

  chooseActiveRoute = () => {  
    let content;  

    if (location.search) {
      for (let validRoute of this.validRoutes) {
        if (validRoute.props.query) {
          const regex = new RegExp(validRoute.props.path)
          if (regex.test(location.search)) {
            content = validRoute;
            break;
          }
        }
      }
    } 

    if (!content) {
      for (let validRoute of this.validRoutes) {
        const regex = new RegExp(validRoute.props.path)
        if (regex.test(location.pathname)) {
          content = validRoute;
          break;
        }
      }
    };
    if (content) {
      this.props.progressUpdate(50);
    }
    content = content || this.state.notFoundRoute;

    this.setState({
      content: React.cloneElement(
        content,
        { location: `${location.href}` }
      )
    });
  }


  render() {
    return (
      <div className={s['page-view']}>
        {this.state.content}
      </div>
    );
  }
}

RouteHandler.defaultProps = {
  activePage: null,
};

export default withStyles(s)(RouteHandler);
