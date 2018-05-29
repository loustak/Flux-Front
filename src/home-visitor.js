import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Container } from 'reactstrap';

export class HomeVisitor extends React.Component {
  //<img src={process.env.PUBLIC_URL + 'security.svg'} className="pull-left vertical-align" />

  render() {
    return (
      <Jumbotron fluid>
        <div className="container-fluid flux-container">
          <h1 className="display-3 text-uppercase font-weight-bold">flux</h1>
          <p className="lead">A fast an light unified exchange.</p>

          <p>Flux is made to be as secure as possible. We use the latest cryptographics 
          algorithms to encode your data from end to end in the most secure way.</p>

        </div>
      </Jumbotron>
    )
  }
}