import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { WithCookiesAuth } from './auth.js';
import { NavBarVisitor } from './navbar-visitor.js';
import { Container } from 'reactstrap';
import { WithCookiesHomeAuth } from './home-auth.js';
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

export class RouterLogged extends React.Component {
  render() {
    // TODO: Handle 404 pages
    return(
      <React.Fragment>  
        <Route exact={true} path="/" component={() =>
          <CookiesProvider>
            <WithCookiesHomeAuth cookies={this.props.cookies} token={this.props.token} />
          </CookiesProvider>
        } />
      </React.Fragment>
    );
  }
}

export class RouterVisitor extends React.Component {
  render() {    
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
