import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Form, Container, Input, Nav, NavItem, Navbar } from 'reactstrap';
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

  getDiscussionMessages(discussionId) {
    
  }

  render() {
    return(
      <React.Fragment>
        <Container fluid className={'home-auth-container h-100 ' + this.state.className}>
          
          <SideBar token={this.props.token} className={this.state.className} onDiscussionClick={this.getDiscussionMessages} />

          <div className="main-content">
            <Container fluid >
              <NavBarLogged onClick={this.toggle} />
              <BottomInputForm className={this.state.className} />
              <Messages />
            </Container>
          </div>

        </Container>
      </React.Fragment>
    )
  }
}

class NavBarLogged extends React.Component {

  render() {
    return (
      <Navbar color="dark" dark expand="md" className="navbar-logged">
        <Nav navbar>
          <NavItem>
            <ButtonToggle onClick={this.props.onClick} />
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

class ButtonToggle extends React.Component {

  render() {
    return(
      <div className="button-toggle-wrapper pull-left" onClick={this.props.onClick}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    )
  }
}

class Messages extends React.Component {

  render() {
    return (
      <div className="main-content-logged-wrapper">
        <h1>Hello</h1>
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