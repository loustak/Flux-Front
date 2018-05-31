import React from 'react';
import { Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form } from 'reactstrap';

export default class SideBar extends React.Component {

  render() {
    return(
      <div className={'sidebar-wrapper ' + this.props.className}>
        <CommunitySideBar token={this.props.token} />
        <DiscussionsSideBar />
      </div>
    )
  }
}

class CommunitySideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {communities: []};
    this.getUserCommunities = this.getUserCommunities.bind(this);
    this.getUserCommunities();
  }

  getUserCommunities() {
    fetch(process.env.REACT_APP_API_PATH + '/users/communities', {
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + this.props.token,
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.success) {
          this.setState({communities: result.communities});
        } else {
          this.setState({finished: true, error: true});
        }
      },

      (error) => {
        this.setState({finished: true, error: true});
      });
  }
  
  render() {
    var communities = [];
    var i = 0;
    this.state.communities.map((community) => {
      communities.push(
        <Community key={i} name={community.name} />
      );
    });

    return(
      <div className="community-sidebar-wrapper">
        <Nav>
          <NavItem>
            {communities}
            <CommunityJoinButton token={this.props.token} onCommunityChange={this.getUserCommunities}/>
          </NavItem>
        </Nav>
      </div>
    )
  }
}

class Community extends React.Component {

  render() {
    return (
      <NavLink href="/">{this.props.name}</NavLink>
    )
  }
}

class CommunityJoinButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Join</Button>
        <CommunityJoinForm token={this.props.token} isOpen={this.state.modal} 
          onCommunityChange={this.props.onCommunityChange}
          toggle={this.toggle} className={this.props.className} />
      </React.Fragment>
    )
  }
}

class CommunityJoinForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {communityId: ''};
    this.changeHandler = this.changeHandler.bind(this);
    this.joinHandler = this.joinHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({communityId: event.target.value});
  }

  joinHandler() {
    fetch(process.env.REACT_APP_API_PATH + '/communities/' + this.state.communityId + '/join', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + this.props.token,
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.success) {
          console.log("Community joined");
          this.props.onCommunityChange();
          this.props.toggle();
        } else {
          console.log("Error");
        }
      },

      (error) => {
        console.log("Error");
      });
  }

  render() {
    return(
      <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>Join a community</ModalHeader>
        <ModalBody>
            <Form>
              <Input placeholder="Community name" onChange={this.changeHandler} />
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={this.joinHandler}>Join</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

class DiscussionsSideBar extends React.Component {

  render() {
    return(
      <div className="discussion-sidebar-wrapper">
        <Nav>
          <NavItem>
            <NavLink href="/">Community Name</NavLink>
            <NavLink href="/">Discussion 1</NavLink>
            <NavLink href="/">Discussion 1</NavLink>
            <NavLink href="/">Discussion 1</NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}