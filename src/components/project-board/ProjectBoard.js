import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backlog from "./Backlog";

class ProjectBoard extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Container fluid className="justify-content-md-center">
        <br />
        <Link to={`/addProjectTask/${id}`} className="mb-3">
          <Button variant="light" size="lg">
            <FontAwesomeIcon icon="plus-square" /> Create Project Task
          </Button>
        </Link>
        <hr />
        <Backlog/>
      </Container>
    );
  }
}

export default ProjectBoard;
