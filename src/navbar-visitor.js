import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { NavLink } from './nav-link';

export class NavBarVisitor extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavLink className="text-uppercase font-weight-bold navbar-brand" to="/">flux</NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/sign-in">Sign-in</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/register">Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}