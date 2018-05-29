import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Form, Input } from 'reactstrap';
import SideBar from './sidebar.js';

export class HomeAuth extends React.Component {

  render() {
    return(
      <BottomInputForm />
    )
  }
}

class BottomInputForm extends React.Component {

  render() {
    return (
      <Form>
        <Input className="fixed-bottom rounded-0" placeholder="Type something..." />
      </Form>
    )
  }
}