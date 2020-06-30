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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    // this meants get the target name property and set it to the value property
    // then setState
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    // prevents screen refresh once this event ends
    event.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };

    //log for test
    console.log(newProject);
  }

  render() {
    return (
      <Container className="p-2 flex-fill justify-content-center">
        <div className="col-md-8 m-auto">
          <h5 className="display-4 ">Create Project form</h5>
          <hr />

          {
            // for with onSubmit Action - this.onSubmit can have any arbitary name too like onSave etc
          }
          <Form onSubmit={this.onSubmit} className="d-flex-fill p-1 text-left">
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                as="input"
                placeholder="Project Name"
                name="projectName"
                value={this.state.projectName}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="formProjectIdentifier">
              <Form.Label>Project Unique Identifier</Form.Label>
              <Form.Control
                as="input"
                //disabled
                placeholder="Project Unique Identifier"
                name="projectIdentifier"
                value={this.state.projectIdentifier}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="formProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Project Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={this.state.start_date}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>Estimated End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={this.state.end_date}
                onChange={this.onChange}
              />
            </Form.Group>
            <Button type="submit" block>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default AddProject;
