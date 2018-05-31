import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css'

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

    // Fetch all the comunity of the users
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
          console.log(result);
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
      <div className="community-sidebar-wrapper">
        <Nav>
          <NavItem>
            <NavLink href="/">1</NavLink>
            <NavLink href="/">2</NavLink>
            <NavLink href="/">3</NavLink>
          </NavItem>
        </Nav>
      </div>
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