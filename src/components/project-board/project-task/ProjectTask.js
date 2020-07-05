import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProjectTask extends Component {
  render() {
    return (
      <Card text="dark">
        <Card.Header className="text-primary">
          ID: projectSequence -- Priority: priorityString
        </Card.Header>
        <Card.Body>
          <Card.Title>projectTask.summary Hey Summary</Card.Title>
          <Card.Text className="text-truncate">
            project_task.acceptanceCriteria
          </Card.Text>

          <ButtonGroup>
            {" "}
            <Button variant="primary">
              <FontAwesomeIcon icon="edit" /> View / Update
            </Button>
            <Button variant="danger">
              <FontAwesomeIcon icon="minus-square" /> Delete
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default ProjectTask;
