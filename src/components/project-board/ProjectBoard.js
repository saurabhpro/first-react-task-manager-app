import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

class ProjectBoard extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Container fluid className="justify-content-md-center">
      <br/>
        <Link to={`/addProjectTask/${id}`} className="mb-3">
          <Button>
            <FontAwesomeIcon icon="plus" />
            Create Project Task
          </Button>
        </Link>

        <hr />

        <CardDeck>
          <Card bg="secondary" text="white" className="mb-2 text-center p-2">
            <Card.Header as="h5">TO DO</Card.Header>

            <Card text="dark">
              <Card.Header className="text-primary">
                ID: projectSequence -- Priority: priorityString
              </Card.Header>
              <Card.Body>
                <Card.Title>projectTask.summary Hey Summary</Card.Title>
                <Card.Text className="text-truncate">
                  project_task.acceptanceCriteria
                </Card.Text>

                <Button variant="primary">View / Update</Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          </Card>

          <Card
            md={{ offset: 1 }}
            bg="warning"
            text="white"
            className="mb-2 text-center p-2"
          >
            <Card.Header as="h5">In Progress</Card.Header>
            <Card text="dark">
              <Card.Header className="text-primary">
                ID: projectSequence -- Priority: priorityString
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Card>

          <Card
            md={{ offset: 1 }}
            bg="success"
            text="white"
            className="mb-2 text-center p-2"
          >
            <Card.Header as="h5">Done</Card.Header>

            <Card text="dark">
              <Card.Header className="text-primary">
                ID: projectSequence -- Priority: priorityString
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

export default ProjectBoard;
