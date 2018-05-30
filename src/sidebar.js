import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css'

export default class SideBar extends React.Component {

  render() {
    return(
      <div className={'sidebar-wrapper ' + this.props.className}>
        <CommunitySideBar />
        <DiscussionsSideBar />
      </div>
    )
  }
}

class CommunitySideBar extends React.Component {
  
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