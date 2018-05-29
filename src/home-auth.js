import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Form, Input, Row, Col } from 'reactstrap';
import SideBar from './sidebar.js';

export class HomeAuth extends React.Component {

  render() {
    return(
      <React.Fragment>
        <div class="container-fluid">
        <Row>
          <Col xs="2">
            <SideBar />
          </Col>
          <Col xs="9">
            <h1>Hello</h1>
            <BottomInputForm />
          </Col>
        </Row>
        </div>
      </React.Fragment>
    )
  }
}

class BottomInputForm extends React.Component {

  render() {
    return (
      <h1>Lel</h1>
    )
  }
}