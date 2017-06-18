import React /* , { PropTypes } */ from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AboutView from '../../components/views/about-view/about-view';
import ArticleView from '../../components/views/article-view/article-view';
import LoadingView from '../../components/views/loading-view/loading-view';

import { search } from '../../actions/page-list';
import { setActivePageTitle } from '../../actions/active-page';
import { toggleSearch, setAutoDownload } from '../../actions/utils';

import s from './route-handler.scss';

class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    this._setActiveContent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._setActiveContent(nextProps);
  }

  _setupRoutes = (props) => {
    return [
      {
        route: '^/about/?$',
        title: 'About',
        content: (
          <AboutView
            autoDownload={props.autoDownload}
            setAutoDownload={props.setAutoDownload}
          />
        ),
      },
      {
        route: '^/pages/(.*)$',
        title: props.activePage.fields.name,
        content: (
          <ArticleView
            search={props.search}
            toggleSearch={props.toggleSearch}
            content={props.activePage.fields.blob}
            references={props.activePage.fields.references}
            tags={props.activePage.fields.tags}
          />
        ),
      },
    ];
  }

  _setActiveContent(props) {
    const routes = this._setupRoutes(props);

    let content;
    if (props.isLoading) {
      content = (
        <LoadingView color="#28353e" size="45px" />
      );
    } else {
      const matchingRoute = routes.find((route) => {
        return (props.activePage.fields.route.match(new RegExp(route.route)));
      });
      if (matchingRoute) {
        content = (
          <div key={matchingRoute.route}>
            { matchingRoute.content }
          </div>
        );
        props.setActivePageTitle(matchingRoute.title);
      } else {
        content = (
          <div>404</div>
        );
      }
    }

    this.setState({
      content,
    });
  }

  render() {
    return (
      <div className={s['page-view']} ref={(div) => { this.pageContainer = div; }}>
        {this.state.content}
      </div>
    );
  }
}

// RouteHandler.propTypes = {
//   search: PropTypes.func.isRequired,
//   toggleSearch: PropTypes.func.isRequired,
//   setActivePageTitle: PropTypes.func.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   activePage: PropTypes.object,
// };

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
