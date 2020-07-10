import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

import ProjectTask from "../project-board/project-task/ProjectTask";

class Backlog extends Component {
  render() {
    //must have the same name as passed property in ProjectBoard
    const { projectTasksProp } = this.props;

    // group tasks into three decks
    let { toDoItems, inProgressItems, doneItems } = this.distributeToCardDecks(
      projectTasksProp
    );

    const styles1 = {
      margin: '20px',
      width: '250px',
      height: '250px',
      backgroundColor: 'yellow',
      display: 'inline-block',
    };

    return (
      
      <CardDeck>
        <Card bg="dark" text="white" className="text-center p-2 ">
          <Card.Header as="h5" className="mb-2">
            TO DO
          </Card.Header>
          {toDoItems}
        </Card>

        <Card
          md={{ offset: 1 }}
          bg="warning"
          text="light"
          className="text-center p-2 card-transparent"
          
        >
          <Card.Header as="h5" className="mb-2">
            In Progress
          </Card.Header>
          {inProgressItems}
        </Card>

        <Card bg="success" text="light" className="text-center p-2  card-transparent">
          <Card.Header as="h5" className="mb-2">
            Done
          </Card.Header>
          {doneItems}
        </Card>
      </CardDeck>
    );
  }

  distributeToCardDecks = (projectTasksProp) => {
    // now prepare and embeddeble object
    const tasks = projectTasksProp.map((projectTask) => (
      <ProjectTask key={projectTask.id} projectTask={projectTask} />
    ));

    let toDoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    tasks.forEach((task) => {
      switch (task.props.projectTask.status) {
        case "TO_DO":
          toDoItems.push(task);
          break;
        case "IN_PROGRESS":
          inProgressItems.push(task);
          break;
        case "DONE":
          doneItems.push(task);
          break;
        default:
          console.error("Unknown Card Deck : " + task.props.projectTask.status);
          break;
      }
    });
    return { toDoItems, inProgressItems, doneItems };
  };
}

export default Backlog;
