import React, { Component } from "react";

import FormGroup from "react-bootstrap/FormGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

import classnames from "classnames";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authenticateUser } from "../../actions/securityActions";

/**
 * Simple login page component
 */
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

    // componentDidMount stuff is basically this place in constructor
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
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

  componentDidMount() {}

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
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <h1 className="display-4 text-center">Log In</h1>
        </Row>

        <Row xl className="justify-content-md-center">
          <Col lg={6}>
          
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="p-1 text-left">
                <Form.Control
                  type="email"
                  placeholder="Email Address (Username)"
                  name="username"
                  required
                  className={classnames({
                    "is-invalid": errors.username,
                  })}
                  size="lg"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="p-1 text-left">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  className={classnames({
                    "is-invalid": errors.password,
                  })}
                  size="lg"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
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

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,

  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { authenticateUser })(Login);
