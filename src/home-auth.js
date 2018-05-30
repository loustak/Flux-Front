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
              <ButtonToggle onClick={this.toggle} />
              <BottomInputForm className={this.state.className} />
            </Container>
          </div>

        </Container>
      </React.Fragment>
    )
  }
}

class ButtonToggle extends React.Component {

  render() {
    return(
      <div className="button-toggle" onClick={this.props.clickHandle}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    )
  }
}

class BottomInputForm extends React.Component {

  render() {
    return (
      <Form className={'message-form fixed-bottom ' + this.props.className}>
        <Input className="rounded-0" autoFocus="autofocus" placeholder="Type something..." />
      </Form>
    )
  }
}