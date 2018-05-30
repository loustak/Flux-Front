import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

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
        <NavLink className="text-uppercase font-weight-bold navbar-brand" to="/">flux</NavLink>
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
          <NavLink to="/sign-in">Sign-in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register">Register</NavLink>
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

export class NavLink extends React.Component {

  render() {
    return (
      <Link to={this.props.to} className={'nav-link ' + this.props.className}>
        {this.props.children}
      </Link>
    )
  }
}