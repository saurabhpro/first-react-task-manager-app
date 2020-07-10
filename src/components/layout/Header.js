import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

// BootStrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * class to get the nice looking banner at the top
 * - this also contains dynamic buttons based on when a user is logged in
 */
class Header extends Component {
  logout = () => {
    this.props.logout();
    window.location.href = "/";
  };

  render() {
    // get important info from security (token) user
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard" className="text-light">
            Dashboard
          </Nav.Link>
        </Nav>

        <Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search Project"
              className="mr-sm-1 justify-content-end"
            />
            <Button variant="outline-light mr-2"> Search </Button>
          </Form>
        </Nav>

        <Nav>
          {" "}
          <Navbar.Text className="text-light">
            <FontAwesomeIcon icon="user-circle" /> {user.fullName}
          </Navbar.Text>
          <Nav.Link onClick={this.logout.bind(this)} className="text-light">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );

    const userIsNotAuthenticated = (
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/register" className="text-light">
            Sign Up
          </Nav.Link>
          <Nav.Link href="/login" className="text-light">
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );

    let HeaderLink;

    if (user && validToken) {
      HeaderLink = userIsAuthenticated;
    } else {
      HeaderLink = userIsNotAuthenticated;
    }

    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon="project-diagram" /> First React Task Manager
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {HeaderLink}
        </Navbar>
      </>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
