import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export class Register extends React.Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Sign-in</h1>
          <p className="lead">So exciting ! Only a few more step to join us !</p>

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
        <EmailValidator />
        <FormGroup>
          <Label for="password">Password</Label>
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

class EmailValidator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '', valid: false};
    this.onChange = this.onChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  onChange(event) {
    this.setState({email: event.target.value});
    clearTimeout(this.timer);
    this.timer = setTimeout(this.checkValidity, 2000);
  }

  checkValidity() {
    if (this.state.email.length > 0) {
      console.log("ok");
      this.setState({valid: true});
    }
  }

  render() {
    return(
      <FormGroup>
        <Label for="email">Email</Label>
        <Input valid={this.state.valid} type="email" name="email" id="email" onChange={this.onChange}
          placeholder="A nice and neat email address" autoComplete="email" />
        <FormFeedback valid>This email is availabe hura !</FormFeedback>
      </FormGroup>
    )
  }
}