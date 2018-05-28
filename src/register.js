import React from 'react';
import {ApiPath} from './index.js'
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';

export class Register extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Sign-in</h1>
          <p className="lead">So exciting ! Only a few more steps to join us !</p>

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
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(this.props.apiPath + '/api/users', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      if (data.errors) {
        if (data.errors.email) {

        }
      } else {
        console.log('success:' + data);
      }
    })
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.handleChange}
            placeholder="A nice and neat email address" autoComplete="email" required />
          <FormFeedback valid>This email is availabe hura !</FormFeedback>
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
          <Input type="password" name="passwordAgain" id="password-again" onChange={this.handleChange}
            placeholder="Just in case you made a typo" autoComplete="password" required />
        </FormGroup>

        <div className="text-center">
          <Button outline color="primary" className="px-5">Submit</Button>
        </div>
      </Form>
    )
  }
}