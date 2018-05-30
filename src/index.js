// To use JSX syntax
import React from 'react';
// To use ReactDOM
import ReactDOM from 'react-dom';
import { FluxRouter } from './router.js'

export const ApiPath = React.createContext();
export const Logged = React.createContext();

class App extends React.Component {

  render() {
    return (
      <Logged.Provider>
        <FluxRouter />}
      </Logged.Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
