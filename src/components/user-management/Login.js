import React, { Component } from "react";
import FormGroup from "react-bootstrap/FormGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Container>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <Form>
              <FormGroup>
                <Form.Control
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address (Username)"
                  name="email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Control
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  required
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

export default Login;
