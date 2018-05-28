import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

class FluxNavBar extends React.Component {

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
        <NavbarBrand className="text-uppercase font-weight-bold" href="/">flux</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {this.props.components}
        </Collapse>
      </Navbar>
    );
  }
}

export class NavBarLogged extends React.Component {

  components() {
    return(
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/sign-out/">Sign-out</NavLink>
        </NavItem>
      </Nav>
    )
  }

  render() {
    return(
      <FluxNavBar components={this.components()} />
    )
  }
}

export class NavBarVisitor extends React.Component {

  components() {
    return(
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/sign-in/">Sign-in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register/">Register</NavLink>
        </NavItem>
      </Nav>
    )
  }

  render() {
    return(
      <FluxNavBar components={this.components()} />
    )
  }
}