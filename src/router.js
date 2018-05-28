import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { NavBarLogged, NavBarVisitor } from './navbar.js'
import { Container } from 'reactstrap'
import { HomeVisitor } from './home-visitor.js'
import { Register } from './register.js'
import { SignIn } from './sign-in.js'

export function FluxRouter(apiPath) {
  var logged = false;

  if (logged) {
    return <RouterLogged />
  }

  return <RouterVisitor />
}

class RouterLogged extends React.Component {
  render() {
    return(
      <React.Fragment>
        <NavBarLogged />
        <Container>
          <Router>
            <h1>Logged</h1>
          </Router>
        </Container>
      </React.Fragment>
    );
  }
}

class RouterVisitor extends React.Component {
  render() {
    return(
      <React.Fragment>
        <NavBarVisitor />
        <Router>
          <Container>
            <Route exact={true} path="/" component={HomeVisitor} />
            <Route exact={true} path="/register/" component={Register} />
            <Route exact={true} path="/sign-in/" component={SignIn} />
          </Container>
        </Router>
      </React.Fragment>
  )
  }
}