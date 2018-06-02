import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Socket } from 'phoenix';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { Form, Container, Input, Nav, NavItem, Navbar, NavLink } from 'reactstrap';
import SideBar from './sidebar.js';

class HomeAuth extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      socket: null, 
      channel: null,    // Used by phoenix to manage clients
      info: null,       // Data representation 
      currentDiscussionId: null,
      messages: [],
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
      // TODO: Hide sockets messages in production
      logger: (kind, message, data) => {console.log(kind + ': ' + message + ' ' + data)}
    });
    socket.connect();
    this.setState({socket: socket}, () => {
      const discussionId = this.props.cookies.get('discussionId');
      if (discussionId !== undefined) {
        this.joinDiscussion(discussionId);
      }
    });
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

  loadOlderMessages(lastMessage) {
    const discussionId = this.state.discussion.id;
    const lastMessageTime = lastMessage.time;
    fetch(process.env.REACT_APP_API_PATH + '/discussions/' + discussionId + '/' + lastMessageTime, {
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
    });
  }

  joinDiscussion(discussionId) {
    if (this.state.currentDiscussionId === discussionId) {
      // Same channel, don't fetch the server again
      return;
    }

    this.leaveDiscussion();

    if (this.state.socket == null) { return false; }
    const channel = this.state.socket.channel('discussion:' + discussionId);
    channel.join().receive('ok', (response) => {
      var messages = [];
      for (let message of response.messages.reverse()) {
        messages.push(<Message key={message.id} data={message} />);
      }

      channel.on('message_created', (message) => {
        this.messageReceive(message);
      });

      this.setState({channel: channel, info: response, currentDiscussionId: discussionId, messages: messages}, () => {
        // Scroll to the bottom of the view
        this.refs.viewMessagesBottom.scrollIntoView();
      });

      this.props.cookies.set('discussionId', discussionId, {path: '/'});
    })
  }

  leaveDiscussion() {
    if (this.state.channel != null) {
      this.state.channel.leave();
    }
  }

  sendMessage(data) {
    const channel = this.state.channel;
    if (channel == null) { return false; }
    channel.push('new_message', data);
  }

  messageReceive(message) {
    this.setState((previousState) => ({
      messages: [previousState.messages, <Message key={message.id} data={message} />]
    }), () => {
      // If the message was sent by this user scoll to the bottom
      if (message.user.id === this.state.info.user.id) {
        this.refs.viewMessagesBottom.scrollIntoView({block: 'end', behavior: 'smooth'});
      }
    });
  }

  render() {
    return(
      <React.Fragment>
        <Container fluid className={'home-auth-container h-100 ' + this.state.className}>
          
          <SideBar token={this.props.token} cookies={this.props.cookies}
            className={this.state.className} onDiscussionClick={this.joinDiscussion} />

          <div className="main-content">
            <Container fluid >
              <WithCookiesAndRouterNavBarLogged cookies={this.props.cookies} history={this.props.history} onClick={this.toggle} />
              <BottomInputForm className={this.state.className} onSubmit={this.sendMessage} />
              <MessagesContainer messages={this.state.messages} />
              <div ref="viewMessagesBottom"></div>
            </Container>
          </div>

        </Container>
      </React.Fragment>
    )
  }
}

export const WithCookiesHomeAuth = withCookies(HomeAuth);

class NavBarLogged extends React.Component {

  constructor(props) {
    super(props);
    this.clickHandle = this.clickHandle.bind(this);
  }

  clickHandle(event) {
    event.preventDefault();
    this.props.cookies.set('token', '', {path: '/'});
    this.props.history.push('/');
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md" className="navbar-logged">
        <Nav navbar>
          <NavItem>
            <ButtonToggle onClick={this.props.onClick} />
          </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
          <NavItem>
            <NavLink href="/" onClick={this.clickHandle}>Sign-out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

const WithRouterNavBarLogged = withRouter(NavBarLogged);
const WithCookiesAndRouterNavBarLogged = withCookies(WithRouterNavBarLogged);

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

class Message extends React.Component {

  render() {
    return(
      <div className="message-item-wrapper">
        <p className="message-item-username font-weight-bold">
          {this.props.data.user.username}
        </p>
        <p className="message-item-content font-weight-normal">
          {this.props.data.text}
        </p>
      </div>
    )
  }
}

class MessagesContainer extends React.Component {

  render() {
    return (
      <div className="messages-wrapper">
        {this.props.messages}
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
    this.setState({value: ''});
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