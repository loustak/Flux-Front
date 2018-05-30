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
      <ApiPath.Provider value="http://127.0.0.1:4000">
        <Logged.Provider>

          <ApiPath.Consumer>
            {apiPath => <FluxRouter apitPath={apiPath} />}
          </ApiPath.Consumer>

        </Logged.Provider>
      </ApiPath.Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
