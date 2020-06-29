import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default class header extends Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="#home">First React Task Manager</Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
          </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>

            <Navbar.Collapse  className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">Saurabh Kumar</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Nav>
        </Navbar>
      </>
    );
  }
}
