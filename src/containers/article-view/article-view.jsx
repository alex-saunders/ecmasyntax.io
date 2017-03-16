import React from 'react';
import {connect} from 'react-redux';
import MarkdownContainer from '../../components/markdown-container/markdown-container.jsx';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './article-view.scss';

const VISIBLE = { transform: 'translateX(0)', opacity: '1' },
      HIDDEN = { transform: 'translateX(60px)', opacity: '0' };

const OUT_KEYFRAMES = [
  VISIBLE,
  HIDDEN
];
const IN_KEYFRAMES = [
  HIDDEN,
  VISIBLE
];
const ANIM_OPTIONS = {
  duration: 350,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  iterations: 1
};

class ArticleView extends React.Component {

  constructor(props) {
    super(props);

    this.ANIMATING_OUT = false;
    this.outAnim;
    this.inAnim;

    if (this.props.activePage) {
      this.state = {
        content: (
          <MarkdownContainer content={ this.props.activePage.jsx } />
        )
      };
    } else {
      this.state = {
        content: (<div>no page selected</div>)
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this._out(nextProps.activePage);
    }
    if (!nextProps.isLoading && !nextProps.hasErrored) {
      this._in(nextProps)
    }
  }

  _out() {
    if (this.ANIMATING_OUT)
      return;

    this.ANIMATING_OUT = true;
    this.outAnim = this.pageContainer.animate(
      OUT_KEYFRAMES,
      ANIM_OPTIONS
    )
    this.outAnim.onfinish = _ => {
      this.setState({
        content: (
          <div>loading</div>
        )
      })
      this.ANIMATING_OUT = false;
    }
  }

  _in(nextProps) {
    if (this.ANIMATING_OUT) {
      this.outAnim.onfinish = _ => {
        this.ANIMATING_OUT = false;
        this._animateIn(nextProps);
      }
    } else {
      this._animateIn(nextProps);
    }
  }

  _animateIn(nextProps) {
    this.setState({
      content: (
        <MarkdownContainer content={ nextProps.activePage.jsx } />
      )
    });

    this.inAnim = this.pageContainer.animate(
      IN_KEYFRAMES,
      ANIM_OPTIONS
    ).onfinish = _ => {
      this.pageContainer.style.transform = 'scale(1)';
      this.pageContainer.style.opacity = '1';
    }
  }

	render() {
    return (
      <div className={s['page-view']} ref={(div) => { this.pageContainer = div; }}>
        {this.state.content}
      </div>
    )
	}

}

function mapStateToProps(state) {
	return {
    activePage: state.activePage.article,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading
	};
}

export default withStyles(s)(connect(mapStateToProps)(ArticleView));
