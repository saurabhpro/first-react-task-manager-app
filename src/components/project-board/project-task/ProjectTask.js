import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import moment from "moment";

class ProjectTask extends Component {
  render() {
    const { projectTask } = this.props;
    const createdAt = moment(projectTask).format("MMMM Do YYYY");

    return (
      <div className="row-sm-3">
        <Card text="dark" className="mb-2 mh-20">
          <Card.Header className="text-primary">
            ID: {projectTask.projectSequence} & Priority: {projectTask.priority}
          </Card.Header>
          <Card.Body>
            <Card.Title>{projectTask.summary}</Card.Title>
            <Card.Text className="text-truncate">
              {projectTask.acceptanceCriteria}
            </Card.Text>

            <ButtonGroup>
              {" "}
              <Button variant="primary" className="mr-2">
                <FontAwesomeIcon icon="edit" /> View / Update
              </Button>
              <Button variant="danger">
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
}

export default ProjectTask;
