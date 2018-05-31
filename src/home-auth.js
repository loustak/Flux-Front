import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Socket } from 'phoenix';
import { Form, Container, Input, Nav, NavItem, Navbar } from 'reactstrap';
import SideBar from './sidebar.js';
import jwt_decode from 'jwt-decode';

export class HomeAuth extends React.Component {

  constructor(props) {
    super(props);
    this.state = { socket: null, collapse: true, className: 'sidebar-transition-show'};
    this.toggle = this.toggle.bind(this);
    this.createSocket = this.createSocket.bind(this);
    this.connectDiscussion = this.connectDiscussion.bind(this);

    this.createSocket();
  }

  createSocket() {
    const token = this.props.token;

    const socket = new Socket(process.env.REACT_APP_SOCKET_PATH, {
      params: {token: token},
      logger: (kind, message, data) => {console.log(kind + ': ' + message + ' ' + data)}
    });
    socket.connect();
    this.state = {socket: socket};
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

  connectDiscussion(discussionId) {
    console.log("discussion id: " + discussionId);
    if (this.state.socket == null) { return false; }
    const channel = this.state.socket.channel('discussion:' + discussionId);
    channel.join().receive('ok', (response) => {
      console.log('Connected: ' + response);
    })
  }

  render() {
    return(
      <React.Fragment>
        <Container fluid className={'home-auth-container h-100 ' + this.state.className}>
          
          <SideBar token={this.props.token} className={this.state.className} onDiscussionClick={this.connectDiscussion} />

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