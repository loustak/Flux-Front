import React from 'react';
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { ErrorAlert } from './error-alert.js'

class RegisterPath extends React.Component {

  render() {
    return (
      <Jumbotron fluid>
        <div className="container-fluid flux-container">
          <h1 className="display-3">Register</h1>
          <p className="lead">So exciting ! Only a few more steps to join us !</p>

          <FormValidator history={this.props.history} />
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
      errorMessage: '',
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
    fetch(process.env.REACT_APP_API_PATH + '/users', {
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
          var error = result.errors;
          var message;
          if (error.email) {
            message = 'Oh no, this email is already used';
          } else if (error.password) {
            message = 'Oups, the password is too short...';
          } else {
            message = 'Unknown error :\'(';
          }
          this.setState({errorMessage: message});  
        } else {
          this.props.history.push('/sign-in')
        }
      },

      (error) => {
        const message = 'We have a hard time communicating with the server, sorry... Try again in a few minutes please';
        this.setState({errorMessage: message});
      });
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        
        <ErrorAlert message={this.state.errorMessage} />

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