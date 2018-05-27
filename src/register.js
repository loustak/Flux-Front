import React from 'react';
import './bootstrap.css';
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, } from 'reactstrap';

export class Register extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Sign-in</h1>
          <p className="lead">So exciting ! Only one more step to join us !</p>

          <FormValidator />

        </Container>
      </Jumbotron>
    )
  }
}

class FormValidator extends React.Component {
  render() {
    return(
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" 
            placeholder="A nice and neat email address" autoComplete="email" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Password</Label>
          <Input type="password" name="password" id="password" 
            placeholder="Chuuuuut... Keep it secret" autoComplete="password" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordAgain">Password again</Label>
          <Input type="password" name="passwordAgain" id="password-again" 
            placeholder="Just in case you made a typo" autoComplete="password" />
        </FormGroup>
        <div className="text-center">
          <Button outline color="primary" className="px-5">Submit</Button>
        </div>
      </Form>
    )
  }
}