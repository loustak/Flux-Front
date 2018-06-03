import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron } from 'reactstrap';

export class HomeVisitor extends React.Component {

  render() {
    return (
      <Jumbotron fluid>
        <div className="container-fluid flux-container">
          <div>
            <h1 id="text-logo" className="display-3 text-uppercase font-weight-bold">flux</h1>
            <img id="picture-logo" alt="Flux logo" src={process.env.PUBLIC_URL + '/logo_64.png'} />
          </div>
          <div>
            <p className="lead">A fast an light unified exchange.</p>

            <p>Flux is made to be as secure as possible. We use the latest cryptographics 
            algorithms to encode your data from end to end in the most secure way.</p>
          </div>
        </div>
      </Jumbotron>
    )
  }
}