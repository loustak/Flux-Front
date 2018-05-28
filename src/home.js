import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Container } from 'reactstrap';

export class Home extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Flux</h1>
          <p className="lead">A fast an light unified exchange.</p>
          <p className="lead">For everyday use, for work and for everything else</p>

        </Container>
      </Jumbotron>
    )
  }
}