import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
    };
  }

  onChange(e) {
    this.setState({ projectName: e.target.value });
  }
  render() {
    return (
      <Container className="p-2 flex-fill justify-content-center">
        <div className="col-md-8 m-auto">
          <h5 className="display-4 ">Create Project form</h5>
          <hr />

          <Form className="d-flex-fill p-1 text-left">
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                as="input"
                placeholder="Project Name"
                name="projectName"
                value={this.state.projectName}
                onChange= {this.onChange.bind(this)}
              />
            </Form.Group>
            <Form.Group controlId="formProjectIdentifier">
              <Form.Label>Project Unique Identifier</Form.Label>
              <Form.Control
                as="input"
                disabled
                placeholder="Project Unique Identifier"
                name="projectIdentifier"
                value={this.state.projectIdentifier}
              />
            </Form.Group>
            <Form.Group controlId="formProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Project Description"
                name="description"
                value={this.state.description}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={this.state.start_date}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>Estimated End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={this.state.end_date}
              />
            </Form.Group>
            <Button as="input" type="submit" value="Submit" block />{" "}
          </Form>
        </div>
      </Container>
    );
  }
}

export default AddProject;
