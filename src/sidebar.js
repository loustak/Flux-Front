import React from 'react';
import { Nav, NavItem, Modal, ModalHeader, ModalBody, Button, Input, Form } from 'reactstrap';

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {discussions: '', currentCommunityId: ''};
    this.getCommunityDiscussions = this.getCommunityDiscussions.bind(this);
    this.createCommunity = this.createCommunity.bind(this);

    const communityId = this.props.cookies.get('communityId');
    if (communityId !== undefined) {
      this.getCommunityDiscussions(communityId);      
    }
  }

  getCommunityDiscussions(communityId) {
    if (this.state.currentCommunityId === communityId) {
      // Same community, don't fetch the server again
      return; 
    }

    if (communityId === undefined) {
      // TODO: Split this in another function
      // When we want to refresh the community id
      communityId = this.state.currentCommunityId;
    }

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
          // TODO: Do something with this error
        }
      },

      (error) => {
        this.setState({finished: true, error: true});
        // TODO: Do something with this error
      });
  }

  createCommunity(name) {
    fetch(process.env.REACT_APP_API_PATH + '/communities/' + this.state.currentCommunityId + '/discussions', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + this.props.token,
      },
      body: JSON.stringify({
        name: name
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.success) {
          this.getCommunityDiscussions();
        } else {
          // TODO: Handle errors
          console.error(result.errors);
        }
      },
      (error) => {
        // TODO: Handle errors
        console.error(error);
      });
  }

  render() {
    return(
      <div id={this.props.id} className={'sidebar-wrapper ' + this.props.className}>
        <CommunitySideBar token={this.props.token} onCommunityClick={this.getCommunityDiscussions}/>
        <DiscussionsSideBar token={this.props.token} discussions={this.state.discussions} 
        discussionRefresh={this.getCommunityDiscussions} create={this.createCommunity} onClick={this.props.onDiscussionClick} />
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
      <React.Fragment>
        <NavItem id={'tooltip-target-' + this.props.id} className="community-item-wrapper">
          <Button className="community-item text-uppercase" title={this.props.name} onClick={() => this.props.onClick(this.props.id)}>
            {this.props.name.charAt(0)}
          </Button>
        </NavItem>
      </React.Fragment>
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
    this.state = {joinName: '', createName: '', communities: []};
    this.loadCommunities = this.loadCommunities.bind(this);
    this.joinChangeHandler = this.joinChangeHandler.bind(this);
    this.joinHandler = this.joinHandler.bind(this);
    this.createChangeHandler = this.createChangeHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.loadCommunities();
  }

  loadCommunities() {
    fetch(process.env.REACT_APP_API_PATH + '/communities/all', {
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
          //TODO: This is a horrible strategy because communities name aren't uniques
          // Use autocomplete in the future
          var communities = {};
          for (let index in result.communities) {
            var community = result.communities[index];
            communities[community.name.toUpperCase()] = community.id;
          }

          this.setState({communities: communities});
        } else {
          // TODO: Do something with the error
          console.log("Error");
        }
      },

      (error) => {
        // TODO: Do something with the error
        console.log("Error");
      });
  }

  joinChangeHandler(event) {
    this.setState({joinName: event.target.value});
  }

  createChangeHandler(event) {
    this.setState({createName: event.target.value});
  }

  joinHandler() {
    // TODO: Horrible, because communities name aren't unique.
    // Use something like autocomplete to get unique id from a list of communities
    const communityId = this.state.communities[this.state.joinName.toUpperCase()];

    fetch(process.env.REACT_APP_API_PATH + '/communities/' + communityId + '/join', {
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
          this.props.onCommunityChange();
          this.props.toggle();
        } else {
          // TODO: Do something with the error
          console.log("Error");
        }
      },

      (error) => {
        // TODO: Do something with the error
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
            <Form autoComplete="off" className="form-join-community">
              <div className="text-center autocomplete">
                <Input placeholder="Community name" onChange={this.joinChangeHandler} />
                <Button color="secondary" onClick={this.joinHandler}>Join</Button>
              </div>
            </Form>
        </ModalBody>
        <ModalBody>
            <p>Or create one</p>
            <Form className="form-create-community">
              <div className="text-center">
                <Input placeholder="Community name" onChange={this.createChangeHandler} />
                <Button color="secondary" onClick={this.createHandler}>Create</Button>
              </div>
            </Form>
        </ModalBody>
      </Modal>
    )
  }
}

class DiscussionsSideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {modal: false, createModal: false, discussion: {id: '', name: ''}, discussionName: ''};
    this.toggle = this.toggle.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.editOnChange = this.editOnChange.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.delete = this.delete.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.createOnChange = this.createOnChange.bind(this);
    this.createWrapper = this.createWrapper.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  editHandler(event, discusisonId, discussionName) {
    event.preventDefault();
    this.setState({discussion: {
      id: discusisonId,
      name: discussionName,
    }}, () => { 
      this.toggle();
    });
  }

  editOnChange(event) {
    this.setState({discussion: {id: this.state.discussion.id, name: event.target.value}});
  }

  saveEdit(event) {
    fetch(process.env.REACT_APP_API_PATH + '/discussions/' + this.state.discussion.id, {
      method: 'put',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + this.props.token,
      },
      body: JSON.stringify({
        name: this.state.discussion.name,
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.success) {
          this.props.discussionRefresh();
          this.toggle();
        } else {
          // TODO: Handle errors
          console.error(result.errors);
        }
      },
      (error) => {
        // TODO: Handle errors
        console.error(error);
      });
  }

  delete() {
    fetch(process.env.REACT_APP_API_PATH + '/discussions/' + this.state.discussion.id, {
      method: 'delete',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + this.props.token,
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.success) {
          this.props.discussionRefresh();
          this.toggle();
        } else {
          // TODO: Handle errors
          console.error(result.errors);
        }
      },
      (error) => {
        // TODO: Handle errors
        console.error(error);
      });
  }

  toggleCreate(event) {
    this.setState({
      createModal: !this.state.createModal
    });
  }

  createOnChange(event) {
    this.setState({discussionName: event.target.value});
  }

  createWrapper() {
    this.props.create(this.state.discussionName);
    this.setState({discussionName: ''});
    this.toggleCreate();
  }

  render() {
    var discussions = [];
    for (let discussion of this.props.discussions) {
      discussions.push(
        <Discussion key={discussion.id} id={discussion.id} name={discussion.name} 
          onClick={this.props.onClick} onEdit={this.editHandler} />
      );
    }

    return(
      <div className="discussion-sidebar-wrapper">
        <Nav>
          <DiscussionCreate onClick={this.toggleCreate}/>
          {discussions}
        </Nav>

        <Modal centered isOpen={this.state.createModal} toggle={this.toggleCreate}>
          <ModalHeader toggle={this.toggleCreate}>Create a discussion</ModalHeader>
          <ModalBody>
              <Form autoComplete="off" className="form-join-community">
                <div className="text-center autocomplete">
                  <Input placeholder="Discussion name" value={this.state.discussionName} onChange={this.createOnChange} />
                  <Button color="secondary" onClick={this.createWrapper}>Create</Button>
                </div>
              </Form>
          </ModalBody>
        </Modal>

        <Modal centered isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit a discussion</ModalHeader>
          <ModalBody>
              <Form autoComplete="off" className="form-join-community">
                <div className="text-center autocomplete">
                  <Input placeholder="Discussion name" value={this.state.discussion.name} onChange={this.editOnChange} />
                  <Button color="secondary" onClick={this.saveEdit}>Save</Button>
                </div>
              </Form>
          </ModalBody>
          <ModalHeader>Delete the discussion</ModalHeader>
          <ModalBody>
            <div className="text-center">
              <Button color="danger" onClick={this.delete}>Delete</Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

class Discussion extends React.Component {

  render() {
    return (
      <NavItem className="discussion-item-wrapper">
        <div>
          <a className="discussion-item text-lowercase" onClick={() => this.props.onClick(this.props.id)}>{this.props.name}</a>
          <a className="edit" href="/" onClick={(event) => {this.props.onEdit(event, this.props.id, this.props.name)}}>edit</a>
        </div>
      </NavItem>
    )
  }
}

class DiscussionCreate extends React.Component {

  render() {
    return (
      <NavItem className="discussion-item-wrapper">
        <div>
          <a className="discussion-item text-lowercase" onClick={this.props.onClick}>create a discussion</a>
        </div>
      </NavItem>
    )
  }
}