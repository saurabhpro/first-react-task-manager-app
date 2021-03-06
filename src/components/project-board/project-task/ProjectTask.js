import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class ProjectTask extends Component {
  onDeleteClick(backlogId, projectTaskId) {
    this.props.deleteProjectTask(backlogId, projectTaskId);
  }

  render() {
    const { projectTask } = this.props;
    //using moment.js
    const createdAt = moment(projectTask).format("MMMM Do YYYY");

    // using dynamic colorization and convert to String value
    let {
      priorityColorClass,
      priorityAsString,
    } = this.getPriorityColorAndStringValue(projectTask);

    return (
      <div className="row-sm-3">
        <Card text="dark" className="mb-2 mh-20">
          <Card.Header className={`${priorityColorClass}`}>
            ID: {projectTask.projectSequence} | Priority: {priorityAsString}
          </Card.Header>
          <Card.Body>
            <Card.Title>{projectTask.summary}</Card.Title>
            <Card.Text className="text-truncate">
              {projectTask.acceptanceCriteria}
            </Card.Text>

            <ButtonGroup>
              {" "}
              <Link
                to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
              >
                <Button variant="primary" className="mr-2">
                  <FontAwesomeIcon icon="edit" /> View / Update
                </Button>
              </Link>
              <Button
                variant="danger"
                onClick={this.onDeleteClick.bind(
                  this,
                  projectTask.projectIdentifier,
                  projectTask.projectSequence
                )}
              >
                <FontAwesomeIcon icon="minus-square" /> Delete
              </Button>
            </ButtonGroup>
          </Card.Body>
          <Card.Text>
            <small className="text-muted">Created on {createdAt}</small>
          </Card.Text>
        </Card>
      </div>
    );
  }

  getPriorityColorAndStringValue = (projectTask) => {
    let priorityAsString;
    let priorityColorClass;
    switch (projectTask.priority) {
      case 1:
        priorityAsString = "HIGH";
        priorityColorClass = "bg-danger text-light";
        break;
      case 2:
        priorityAsString = "MEDIUM";
        priorityColorClass = "bg-primary text-light";
        break;
      case 3:
        priorityAsString = "LOW";
        priorityColorClass = "bg-secondary text-light";
        break;
      default:
        break;
    }
    return { priorityColorClass, priorityAsString };
  };
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteProjectTask })(ProjectTask);
