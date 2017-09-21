import React, { Component } from 'react';

class Route extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {

    if (nextProps !== this.props) {
      return true;
    }

    return false;
  }

  render() {
    return <div>{this.props.component({ ...this.props })}</div>
  }
}

export default Route;
