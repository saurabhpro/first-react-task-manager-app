import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

import ProjectTask from "../project-board/project-task/ProjectTask";

class Backlog extends Component {
  render() {
    //must have the same name as passed property in ProjectBoard
    const { projectTasksProp } = this.props;

    // now prepare and embeddeble object
    const tasks = projectTasksProp.map((projectTask) => (
      <ProjectTask key={projectTask.id} projectTask={projectTask} />
    ));

    return (
      <CardDeck>
        <Card bg="dark" text="white" className="text-center p-2">
          <Card.Header as="h5" className="mb-2">
            TO DO
          </Card.Header>
          {tasks}
        </Card>

        <Card
          md={{ offset: 1 }}
          bg="warning"
          text="white"
          className="text-center p-2"
        >
          <Card.Header as="h5" className="mb-2">
            In Progress
          </Card.Header>
        </Card>

        <Card bg="success" text="white" className="text-center p-2">
          <Card.Header as="h5" className="mb-2">
            Done
          </Card.Header>
        </Card>
      </CardDeck>
    );
  }
}

export default Backlog;
