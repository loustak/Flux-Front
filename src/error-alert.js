import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Alert } from 'reactstrap';

export class ErrorAlert extends React.Component {

  render() {
    if (this.props.message != '') {
      return <Alert color="danger">{this.props.message}</Alert>
    }
    return (null);
  }
}