import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';

export class NavLink extends React.Component {

  render() {
    return (
      <Link to={this.props.to} className={'nav-link ' + this.props.className}>
        {this.props.children}
      </Link>
    )
  }
}