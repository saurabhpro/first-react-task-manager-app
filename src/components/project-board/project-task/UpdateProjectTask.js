import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";

import classnames from "classnames";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      createdAt: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { backlogId, projectTaskId } = this.props.match.params;
    this.props.getProjectTask(backlogId, projectTaskId, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      createdAt,
    } = nextProps.projectTask;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      createdAt,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      createdAt: this.state.createdAt,
    };

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      updatedProjectTask,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <Container fluid className="p-2 flex-fill justify-content-center">
        <div className="col-md-8 m-auto">
          <Link
            to={`/projectBoard/${this.state.projectIdentifier}`}
            className="mb-3"
          >
            <Button variant="dark" className="float-left" size="sm">
              <FontAwesomeIcon icon="backward" /> Back to Project Board
            </Button>
          </Link>
          <br />
          <hr />
          <h4 className="display-4 text-center">Update Project Task</h4>
          <p className="lead text-center">
            Project Name: {this.state.projectIdentifier} | Project Task ID:{" "}
            {this.state.projectSequence}{" "}
          </p>
          <Form onSubmit={this.onSubmit} className="d-flex-fill p-1 text-left">
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
        </div>
      </Container>
    );
  }
}
UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  projectTask: PropTypes.object.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projectTask: state.backlog.projectTask,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
