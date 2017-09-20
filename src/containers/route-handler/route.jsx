import React, { Component } from 'react';

class Route extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.location)
    return <div>{this.props.component({ location: this.props.location })}</div>
  }
}

export default Route;
