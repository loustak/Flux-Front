import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css'

export default class SideBar extends React.Component {

  render() {
    return(
      <Nav>
        <NavItem>
          <NavLink href="/">1</NavLink>
          <NavLink href="/">2</NavLink>
          <NavLink href="/">3</NavLink>
        </NavItem>
      </Nav>
    )
  }
}