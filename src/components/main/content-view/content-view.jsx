import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HomePage from './homepage-view/homepage-view';
import MarkdownContainer from './markdown-container/markdown-container';
import LoadingView from '../../common/loading-view/loading-view';

import s from './content-view.scss';

const VISIBLE = { transform: 'translateX(0)', opacity: '1' };
const HIDDEN = { transform: 'translateX(60px)', opacity: '0' };

const OUT_KEYFRAMES = [
  VISIBLE,
  HIDDEN,
];
const IN_KEYFRAMES = [
  HIDDEN,
  VISIBLE,
];
const ANIM_OPTIONS = {
  duration: 350,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  iterations: 1,
};

class ContentView extends React.Component {

  constructor(props) {
    super(props);

    this.ANIMATING_OUT = false;
  }

  componentWillReceiveProps() {
    // if (nextProps.isLoading) {
    //   this._out(nextProps.activePage);
    // }
    // if (!nextProps.isLoading
    // && !nextProps.hasErrored
    // && (nextProps.activePage !== this.props.activePage)) {
    //   this._in(nextProps)
    // }
  }

  _out() {
    if (this.ANIMATING_OUT) {
      return;
    }

    this.ANIMATING_OUT = true;
    this.outAnim = this.pageContainer.animate(
      OUT_KEYFRAMES,
      ANIM_OPTIONS,
    );
    this.outAnim.onfinish = () => {
      // TODO: Loading
      this.pageContainer.style.opacity = 0;
      this.ANIMATING_OUT = false;
    };
  }

  _in(nextProps) {
    if (this.ANIMATING_OUT) {
      this.outAnim.onfinish = () => {
        this.ANIMATING_OUT = false;
        this._animateIn(nextProps);
      };
    } else {
      this._animateIn(nextProps);
    }
  }

  _animateIn(nextProps) {
    this.setState({
      content: (
        <MarkdownContainer content={nextProps.activePage.fields.blob} />
      ),
    });

    this.pageContainer.style.opacity = 1;

    this.inAnim = this.pageContainer.animate(
      IN_KEYFRAMES,
      ANIM_OPTIONS,
    );
    this.isAnim.onfinish = () => {
      this.pageContainer.style.transform = 'scale(1)';
      this.pageContainer.style.opacity = '1';
    };
  }

  render() {
    let content;
    if (this.props.isLoading) {
      content = (
        <LoadingView color="#28353e" size="45px" />
      );
    } else
    if (this.props.activePage.fields.name !== 'Home') {
      content = (
        <MarkdownContainer content={this.props.activePage.fields.blob} />
      );
    } else {
      // no content - homepage
      content = (<HomePage />);
    }

    return (
      <div className={s['page-view']} ref={(div) => { this.pageContainer = div; }}>
        {content}
      </div>
    );
  }
}

ContentView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  activePage: PropTypes.object,
};

ContentView.defaultProps = {
  activePage: null,
};

export default withStyles(s)(ContentView);
