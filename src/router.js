import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { NavBarLogged, NavBarVisitor } from './navbar.js';
import { Container } from 'reactstrap';
import { HomeAuth } from './home-auth.js';
import { HomeVisitor } from './home-visitor.js';
import { Register } from './register.js';
import { SignIn } from './sign-in.js';

export class FluxRouter extends React.Component {

  render() {
    return(
      <Router>
        <React.Fragment>
          <CookiesProvider>
            <WithCookiesAuth cookies={this.props.cookies} />
          </CookiesProvider>
        </React.Fragment>
      </Router>
    )
  }
}

class Auth extends React.Component {

  render() {
    // Try to decode the token
    try {
      const token = this.props.cookies.get('token');
      var decoded = jwt_decode(token);
    } catch (error) {
      decoded = undefined;
    }
    
    console.log("rerender auth");

    // Did we success?
    const logged = decoded !== undefined;

    if (logged) {
      return <RouterLogged />
    }

    return <RouterVisitor />
  }
}

const WithCookiesAuth = withCookies(Auth);

class RouterLogged extends React.Component {
  render() {
    return(
      <React.Fragment>
        <NavBarLogged />
        <Route exact={true} path="/" component={HomeAuth} />
      </React.Fragment>
    );
  }
}

class RouterVisitor extends React.Component {
  render() {
    console.log("rerender route visitor");
    
    return(
      <React.Fragment>
        <NavBarVisitor />
        <Container>
          <Route exact={true} path="/" component={HomeVisitor} />
          <Route exact={true} path="/register/" component={Register} />
          <Route exact={true} path="/sign-in/" component={SignIn} />
        </Container>
      </React.Fragment>
    )
  }
}
