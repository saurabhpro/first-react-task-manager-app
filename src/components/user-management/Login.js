import React, { Component } from "react";
import FormGroup from "react-bootstrap/FormGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import { authenticateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    // prevents screen refresh once this event ends
    event.preventDefault();
    const loginUser = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.authenticateUser(loginUser, this.props.history);

    //log for test
    console.log(loginUser);
  };

  render() {
    return (
      <div className="login">
        <Container>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Form.Control
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address (Username)"
                  name="username"
                  required
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Control
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  required
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button type="submit" variant="info" className="mt-4" block>
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

Login.propType = {
  authenticateUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(mapStateToProps, { authenticateUser })(Login);
