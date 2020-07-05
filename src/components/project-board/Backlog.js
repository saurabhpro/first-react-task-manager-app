import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

import ProjectTask from "../project-board/project-task/ProjectTask";

class Backlog extends Component {
  render() {
    const { projectTasksProp } = this.props;
    const tasks = projectTasksProp.map((projectTask) => (
      <ProjectTask key={projectTask.id} projectTask={projectTask} />
    ));
    return (
      <CardDeck>
        <Card bg="secondary" text="white" className="mb-2 text-center p-2">
          <Card.Header as="h5">TO DO</Card.Header>
          {tasks}
        </Card>

        <Card
          md={{ offset: 1 }}
          bg="warning"
          text="white"
          className="mb-2 text-center p-2"
        >
          <Card.Header as="h5">In Progress</Card.Header>
        </Card>

        <Card
          md={{ offset: 1 }}
          bg="success"
          text="white"
          className="mb-2 text-center p-2"
        >
          <Card.Header as="h5">Done</Card.Header>
        </Card>
      </CardDeck>
    );
  }
}

export default Backlog;
