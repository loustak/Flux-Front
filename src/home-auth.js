import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import { Form, Container, Input, Row, Col } from 'reactstrap';
import SideBar from './sidebar.js';

export class HomeAuth extends React.Component {

  render() {
    return(
      <React.Fragment>
        <Container fluid className="home-auth-container h-100">
          <Row className="h-100">
            <Col xs="2" className="community-sidebar-wrapper">
              <SideBar />
            </Col>
            <Col xs="10">
              <BottomInputForm />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

class BottomInputForm extends React.Component {

  render() {
    return (
      <Form className="fixed-bottom message-form">
        <Input className="rounded-0" autoFocus="autofocus" placeholder="Type something..." />
      </Form>
    )
  }
}