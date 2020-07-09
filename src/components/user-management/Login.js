import React, { Component } from "react";
import FormGroup from "react-bootstrap/FormGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import { authenticateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";

import classnames from "classnames";

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

  // Life Cycle Hooks
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (migration)

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    return null;
  };

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
    const { errors } = this.state;

    return (
      <div className="login">
        <Container>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Form.Control
                  type="email"
                  placeholder="Email Address (Username)"
                  name="username"
                  required
                  className={classnames({
                    "is-invalid": errors.username,
                  })}
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  className={classnames({
                    "is-invalid": errors.password,
                  })}
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

  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { authenticateUser })(Login);
