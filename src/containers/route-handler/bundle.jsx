import React, { Component } from 'react';

class Bundle extends Component {
  constructor() {
    super();

    this.state = {
      mod: null,
    };
  }

  componentWillMount() {
    this.load(this.props);

    console.log('BUNDLE LOADING')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load().then((mod) => {
        this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default Bundle;
