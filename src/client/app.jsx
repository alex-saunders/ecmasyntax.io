import React from 'react';
import PropTypes from 'prop-types'; 
import AppShell from './containers/app-shell/app-shell';

const ContextType = {
  // Enables critical path CSS rendering
  insertCss: PropTypes.func.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <AppShell>
        { this.props.children }
      </AppShell>
    );
  }
}

export default App;
