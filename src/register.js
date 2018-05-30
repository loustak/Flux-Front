import React from 'react';
import { withRouter } from "react-router-dom";
import {ApiPath} from './index.js'
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Alert, FormFeedback } from 'reactstrap';

class RegisterPath extends React.Component {

  render() {
    return (
      <Jumbotron fluid>
        <div className="container-fluid flux-container">
          <h1 className="display-3">Register</h1>
          <p className="lead">So exciting ! Only a few more steps to join us !</p>

          <ApiPath.Consumer>
            {apiPath => <FormValidator history={this.props.history} apiPath={apiPath} />}
          </ApiPath.Consumer>

        </div>
      </Jumbotron>
    )
  }
}

export const Register = withRouter(RegisterPath);

class FormValidator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordAgain: '',
      passwordDontMatch: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var change = {};
    const name = event.target.name;
    const value = event.target.value
    change[name] = value;
    this.setState(change, () => { this.validateField(name, value) });
  }

  validateField(name, value) {
    if (name === 'password' || name === 'passwordAgain') {
      var match = this.state.password !== this.state.passwordAgain;

      if (this.state.passwordAgain.length > 0) {
        this.setState({passwordDontMatch: match});
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(this.props.apiPath + '/users', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.errors) {
          this.errorHandler(result.errors);
        } else {
          this.props.history.push('/sign-in')
        }
      });
  }

  errorHandler(error) {
    var errorMessage = 'Something went wrong';

    if (error.email) {
      errorMessage = 'Oh no, this email is already used';
    } else if (error.password) {
      errorMessage = 'Oups, the password is too short...';
    }

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
            placeholder="A nice and neat email address" autoComplete="email" required />
        </FormGroup>

        <FormGroup>
          <Label for="username">Display name</Label>
          <Input type="username" name="username" id="username" onChange={this.handleChange}
            placeholder="What's your name?" autoComplete="name" required />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.handleChange}
            placeholder="Chuuuuut... Keep it secret" autoComplete="password" required />
        </FormGroup>

        <FormGroup>
          <Label for="passwordAgain">Password again</Label>
          <Input invalid={this.state.passwordDontMatch} type="password" name="passwordAgain" 
            id="password-again" onChange={this.handleChange}
            placeholder="Just in case you made a typo" autoComplete="password" required />
          <FormFeedback>Humm, it looks like password don't match</FormFeedback>
        </FormGroup>

        <div className="text-center">
          <Button outline color="primary" className="px-5">Submit</Button>
        </div>

      </Form>
    )
  }
}