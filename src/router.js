import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { WithCookiesAuth } from './auth.js';
import { NavBarVisitor } from './navbar-visitor.js';
import { Container, Jumbotron } from 'reactstrap';
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
        <Switch>
          <Route exact={true} path="/" component={() =>
            <CookiesProvider>
              <WithCookiesHomeAuth cookies={this.props.cookies} token={this.props.token} />
            </CookiesProvider>
          } />
          <Route component={PageNotFound} />
        </Switch>
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
          <Switch>
            <Route exact={true} path="/" component={HomeVisitor} />
            <Route exact={true} path="/register/" component={Register} />
            <Route exact={true} path="/sign-in/" component={SignIn} />
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </React.Fragment>
    )
  }
}

class PageNotFound extends React.Component {

  render() {
    return(
      <Jumbotron fluid>
        <div className="container-fluid flux-container">
          <h1>404</h1>
          <p className="lead">Oups... This page does not exists :'(</p>
          <a href="/">Get back to home</a>
        </div>
      </Jumbotron>
    )
  }
}