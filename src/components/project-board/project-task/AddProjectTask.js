import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddProjectTask extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {};

  render() {
    const { id } = this.props.match.params;

    return (
      <Container fluid className="p-2 flex-fill justify-content-center">
        <div className="col-md-8 m-auto">
          <Link to={`/projectBoard/${id}`} className="mb-3">
            <Button variant="dark" className="float-left" size="sm">
              <FontAwesomeIcon icon="backward" /> Back to Project Board
            </Button>
          </Link>
          <br />
          <hr />
          <h4 className="display-4 text-center">Add Project Task</h4>
          <p className="lead text-center">Project Name + Project Code</p>
          <Form onSubmit={this.onSubmit} className="d-flex-fill p-1 text-left">
            <Form.Label>Project Task Summary</Form.Label>
            <Form.Group>
              <Form.Control
                as="input"
                name="summary"
                placeholder="Project Task summary"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Acceptance Criteria</Form.Label>
              <Form.Control
                as="textarea"
                name="acceptanceCriteria"
                placeholder="Acceptance Criteria"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="dueDate" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" custom name="priority" required>
                <option value={0}>Select Priority</option>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" custom name="status">
                <option value="">Select Status</option>
                <option value="TO_DO">TO DO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </Form.Control>
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

export default AddProjectTask;
