import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Socket } from 'phoenix';
import { Form, Container, Input, Nav, NavItem, Navbar } from 'reactstrap';
import SideBar from './sidebar.js';

export class HomeAuth extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      socket: null, 
      channel: null,    // Used by phoenix to manage clients
      discussion: null, // Data representation 
      collapse: true, 
      className: 'sidebar-transition-show'};
    this.toggle = this.toggle.bind(this);
    this.createSocket = this.createSocket.bind(this);
    this.joinDiscussion = this.joinDiscussion.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.messageReceive = this.messageReceive.bind(this);
  }

  componentDidMount() {
    this.createSocket();
  }

  componentWillUnmount() {
    this.leaveDiscussion(this.props.channel);
  }

  createSocket() {
    const token = this.props.token;

    const socket = new Socket(process.env.REACT_APP_SOCKET_PATH, {
      params: {token: token},
      logger: (kind, message, data) => {console.log(kind + ': ' + message + ' ' + data)}
    });
    socket.connect();
    this.setState({socket: socket});
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

  joinDiscussion(discussionId) {
    this.leaveDiscussion();

    if (this.state.socket == null) { return false; }
    const channel = this.state.socket.channel('discussion:' + discussionId);
    channel.join().receive('ok', (response) => {
      channel.on('message_created', (message) => {
        this.messageReceive(message);
      });
      this.setState({channel: channel, discussion: response});
    })
  }

  leaveDiscussion() {
    if (this.state.channel != null) {
      this.state.channel.leave();
    }
  }

  sendMessage(data) {
    console.log("Message sent: " + data);
    const channel = this.state.channel;
    if (channel == null) { return false; }
    channel.push('new_message', data);
  }

  messageReceive(message) {
    console.log(message);
  }

  render() {
    return(
      <React.Fragment>
        <Container fluid className={'home-auth-container h-100 ' + this.state.className}>
          
          <SideBar token={this.props.token} className={this.state.className} onDiscussionClick={this.joinDiscussion} />

          <div className="main-content">
            <Container fluid >
              <NavBarLogged onClick={this.toggle} />
              <BottomInputForm className={this.state.className} onSubmit={this.sendMessage} />
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
      <div className="messages-wrapper">
        
      </div>
    )
  }
}

class BottomInputForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({value: event.target.value});
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <Form className={'message-form fixed-bottom ' + this.props.className}
        onSubmit={this.submitHandler} >
        <Input className="rounded-0" autoFocus="autofocus" placeholder="Type something..." 
          onChange={this.changeHandler} value={this.state.value} />
      </Form>
    )
  }
}