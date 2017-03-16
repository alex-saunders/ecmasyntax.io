import React, { PropTypes } from 'react';
import AppRouter from '../containers/app-router/app-router';

const ContextType = {
  // Enables critical path CSS rendering
  insertCss: PropTypes.func.isRequired,
};

class App extends React.Component {

	static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
  };

	static childContextTypes = ContextType;

	getChildContext() {
    return this.props.context;
  }

	render() {
		return (
		  <AppRouter />
		)
	}
}

export default App;
