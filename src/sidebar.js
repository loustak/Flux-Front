import React from 'react';
import { Nav, NavItem, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form } from 'reactstrap';

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {discussions: '', currentCommunityId: null};
    this.getCommunityDiscussions = this.getCommunityDiscussions.bind(this);

    const communityId = this.props.cookies.get('communityId');
    if (communityId !== undefined) {
      this.getCommunityDiscussions(communityId);      
    }
  }

  getCommunityDiscussions(communityId) {
    if (this.state.currentCommunityId === communityId) { return; }

    console.warn("Loading discussions !");

    this.props.cookies.set('communityId', communityId, {path: '/'});
    fetch(process.env.REACT_APP_API_PATH + '/communities/' + communityId + '/discussions', {
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
          this.setState({discussions: result.discussions, currentCommunityId: communityId}, () => {
            if (result.discussions.length > 0) {
              const index = result.discussions[0];
              this.props.onDiscussionClick(index.id);
            }
          });
        } else {
          this.setState({finished: true, error: true});
        }
      },

      (error) => {
        this.setState({finished: true, error: true});
      });
  }

  render() {
    return(
      <div className={'sidebar-wrapper ' + this.props.className}>
        <CommunitySideBar token={this.props.token} onCommunityClick={this.getCommunityDiscussions}/>
        <DiscussionsSideBar discussions={this.state.discussions} onClick={this.props.onDiscussionClick} />
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
    for (let community of this.state.communities) {
      communities.push(
        <Community key={community.id} id={community.id} name={community.name} onClick={this.props.onCommunityClick} />
      );
    }

    return(
      <div className="community-sidebar-wrapper">
        <Nav>
          {communities}
          <CommunityJoinButton token={this.props.token} onCommunityChange={this.getUserCommunities} />
        </Nav>
      </div>
    )
  }
}

class Community extends React.Component {

  render() {
    return (
      <NavItem className="community-item-wrapper">
        <Button className="community-item text-uppercase" onClick={() => this.props.onClick(this.props.id)}>
          {this.props.name.charAt(0)}
        </Button>
      </NavItem>
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
      <NavItem className="community-item-wrapper">
        <React.Fragment>
          <Button onClick={this.toggle} className="community-item text-uppercase">
            +
          </Button>
          <CommunityJoinPopup token={this.props.token} isOpen={this.state.modal} 
            onCommunityChange={this.props.onCommunityChange}
            toggle={this.toggle} className={this.props.className} />
        </React.Fragment>
      </NavItem>
    )
  }
}

class CommunityJoinPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {joinName: '', createName: ''};
    this.joinChangeHandler = this.joinChangeHandler.bind(this);
    this.joinHandler = this.joinHandler.bind(this);
    this.createChangeHandler = this.createChangeHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
  }

  joinChangeHandler(event) {
    this.setState({joinName: event.target.value});
  }

  createChangeHandler(event) {
    this.setState({createName: event.target.value});
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

  createHandler() {
    fetch(process.env.REACT_APP_API_PATH + '/communities', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + this.props.token,
      },
      body: JSON.stringify({
        name: this.state.createName
      })
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
            <Form className="form-join-community">
              <Input placeholder="Community name" onChange={this.joinChangeHandler} />
              <Button color="secondary" onClick={this.joinHandler}>Join</Button>
            </Form>
        </ModalBody>
        <ModalBody>
            <p>Or create one</p>
            <Form className="form-create-community">
              <Input placeholder="Community name" onChange={this.createChangeHandler} />
              <Button color="secondary" onClick={this.createHandler}>Create</Button>
            </Form>
        </ModalBody>
        <ModalFooter>
            
        </ModalFooter>
      </Modal>
    )
  }
}

class DiscussionsSideBar extends React.Component {

  render() {
    var discussions = [];
    for (let discussion of this.props.discussions) {
      discussions.push(
        <Discussion key={discussion.id} id={discussion.id} name={'#' + discussion.name} onClick={this.props.onClick} />
      );
    }

    return(
      <div className="discussion-sidebar-wrapper">
        <Nav>
          {discussions}
        </Nav>
      </div>
    )
  }
}

class Discussion extends React.Component {

  render() {
    return (
      <NavItem className="discussion-item-wrapper">
        <a className="discussion-item text-lowercase" onClick={() => this.props.onClick(this.props.id)}>{this.props.name}</a>
      </NavItem>
    )
  }
}