import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",

      // add errors to extract on form
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //component did mount stuff
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  // Life Cycle Hooks
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (migration)

  static getDerivedStateFromProps = (nextProps, state) => {
    if (nextProps.errors) {
      state.errors = nextProps.errors;
    }

    return state;
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    // prevents screen refresh once this event ends
    event.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);

    //log for test
    console.log(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container fluid="md">
        <Row lg className="justify-content-md-center">
          <h1 className="display-4 text-center">Sign Up</h1>
        </Row>
        <Row lg className="justify-content-md-center">
          <p className="lead text-center">Create your Account</p>
        </Row>

        <Row className="justify-content-md-center">
          <Col lg={6}>
          
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="p-1">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  size="lg"
                  required
                  className={classnames({
                    "is-invalid": errors.username,
                  })}
                  value={this.state.fullName}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </FormGroup>

              <Form.Group
                className="p-1 text-left"
                controlId="formBasicEmail"
              >
                <Form.Control
                  type="email"
                  placeholder="Email Address (Username)"
                  name="username"
                  size="lg"
                  required
                  className={classnames({
                    "is-invalid": errors.username,
                  })}
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <FormGroup className="p-1">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  size="lg"
                  required
                  className={classnames({
                    "is-invalid": errors.password,
                  })}
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="p-1">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  size="lg"
                  required
                  className={classnames({
                    "is-invalid": errors.confirmPassword,
                  })}
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </FormGroup>

              <Button type="submit" variant="info" className="mt-4" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { createNewUser })(Register);
