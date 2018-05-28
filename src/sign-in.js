import React from 'react';
import {ApiPath} from './index.js'
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, Alert, FormFeedback } from 'reactstrap';

export class SignIn extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Sign-in</h1>
          <p className="lead">Glad to see you again !</p>

          <ApiPath.Consumer>
            {apiPath => <FormValidator apiPath={apiPath} />}
          </ApiPath.Consumer>

        </Container>
      </Jumbotron>
    )
  }
}

class FormValidator extends React.Component {

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.handleChange}
            placeholder="Nice and sweet email adress" autoComplete="email" required />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.handleChange}
            placeholder="Very secured password" autoComplete="password" required />
        </FormGroup>

        <div className="text-center">
          <Button outline color="primary" className="px-5">Submit</Button>
        </div>

      </Form>
    )
  }
}