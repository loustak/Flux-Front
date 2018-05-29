import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import Transition from 'react-transition-group/Transition';
import { Form, Container, Input, Row, Col, Button } from 'reactstrap';
import SideBar from './sidebar.js';

export class HomeAuth extends React.Component {

  constructor(props) {
    super(props);
    this.state = { collapse: true, className: 'sidebar-transition-show'};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const collapse = !this.state.collapse
    var className;
    if (collapse) {
      className = 'sidebar-transition-show';
    } else {
      className = 'sidebar-transition-hide';
    }

    this.setState({ collapse: collapse, className: className});
  }

  render() {
    return(
      <React.Fragment>
        <Container fluid className={'home-auth-container h-100 ' + this.state.className}>
          
          <SideBar className={this.state.className} />

          <div className="main-content">
            <Container fluid >
              <Button onClick={this.toggle}>Test</Button>
            </Container>
          </div>

        </Container>
      </React.Fragment>
    )
  }
}

class BottomInputForm extends React.Component {

  render() {
    return (
      <Form className="">
        <Input className="rounded-0" autoFocus="autofocus" placeholder="Type something..." />
      </Form>
    )
  }
}