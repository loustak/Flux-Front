import React from 'react';
import {ApiPath} from './index.js'
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

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

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var change = {};
    const name = event.target.name;
    const value = event.target.value
    change[name] = value;
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(this.props.apiPath + '/api/token', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.errors) {
          this.errorHandler(result.errors);
        } else {
          console.log(result);
          //this.props.history.push('/sign-in')
        }
      });
  }

  errorHandler(error) {
    var errorMessage = 'Ups! Your email or password is incorrect';

    var errorElement = <Alert color="danger">{errorMessage}</Alert>
    this.setState({errorElement: errorElement});
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>

        {this.state.errorElement}

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