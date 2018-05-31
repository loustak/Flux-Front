// To use JSX syntax
import React from 'react';
// To use ReactDOM
import ReactDOM from 'react-dom';
import { FluxRouter } from './router.js'

class App extends React.Component {

  render() {
    return (
      <FluxRouter />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
