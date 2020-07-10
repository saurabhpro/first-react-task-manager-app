import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProjectTask } from "../../../actions/backlogActions";

import classnames from "classnames";
import { Row, Col } from "react-bootstrap";

class AddProjectTask extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props.match.params;

    this.state = {
      summary: "",
      acceptanceCriteria: "",
      priority: 0,
      status: "",
      dueDate: "",
      projectIdentifier: id, //the path variable will become project identifier
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    // this meants get the target name property and set it to the value property
    // then setState
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    // prevents screen refresh once this event ends
    event.preventDefault();
    const newProjectTask = {
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      priority: this.state.priority,
      projectIdentifier: this.state.projectIdentifier,
      dueDate: this.state.dueDate,
      status: this.state.status,
    };

    // call the post method
    this.props.addProjectTask(
      this.state.projectIdentifier,
      newProjectTask,
      this.props.history
    );

    //log for test
    console.debug(newProjectTask);
  };

  // Life Cycle Hooks
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (migration)

  static getDerivedStateFromProps = (nextProps, state) => {
    if (nextProps.errors) {
      state.errors = nextProps.errors;
    }

    return state;
  };

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;

    return (
      <Container fluid className="flex-fill justify-content-center">
        <Row className="justify-content-md-left">
          <Link to={`/projectBoard/${id}`}>
            <Button variant="dark" className="float-left" size="sm">
              <FontAwesomeIcon icon="backward" /> Back to Project Board
            </Button>
          </Link>
        </Row>

        <Row className="justify-content-md-center">
          <h4 className="display-4">Add Project Task</h4>
        </Row>

        <Row className="justify-content-md-center">
          <Col lg={6}>
            <Form
              onSubmit={this.onSubmit}
              className="d-flex-fill p-1 text-left"
            >
              <Form.Label>Project Task Summary</Form.Label>
              <Form.Group>
                <Form.Control
                  as="input"
                  name="summary"
                  className={classnames({
                    "is-invalid": errors.summary,
                  })}
                  placeholder="Project Task summary"
                  value={this.state.summary}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.summary}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Acceptance Criteria</Form.Label>
                <Form.Control
                  as="textarea"
                  name="acceptanceCriteria"
                  placeholder="Acceptance Criteria"
                  value={this.state.acceptanceCriteria}
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={this.state.dueDate}
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="priority"
                  required
                  value={this.state.priority}
                  onChange={this.onChange}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                >
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
          </Col>
        </Row>
      </Container>
    );
  }
}

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
