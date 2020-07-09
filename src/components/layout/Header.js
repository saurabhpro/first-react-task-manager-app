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
          <Navbar.Brand href="/">First React Task Manager</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>

            <Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 justify-content-end"
                />
                <Button variant="outline-light">Search</Button>
              </Form>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link href="/register">Sign Up</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
            {
            //   <Navbar.Text>
            //   Signed in as: <a href="/login">Saurabh Kumar</a>
            // </Navbar.Text>
            }
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
