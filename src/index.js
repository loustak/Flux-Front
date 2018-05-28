// To use JSX syntax
import React from 'react';
// To use ReactDOM
import ReactDOM from 'react-dom';
// To use route inside React on the web
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container } from 'reactstrap';

import { FluxNavBar } from './navbar.js'
import { Home } from './home.js'
import { Register } from './register.js'

export const ApiPath = React.createContext('');

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div id="app-container">
          <ApiPath.Provider value="http://127.0.0.1:4000">
            <FluxNavBar />
            <Container>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/sign-in/" component={Register} />
            </Container>
          </ApiPath.Provider>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);