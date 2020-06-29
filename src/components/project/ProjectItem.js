import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProjectItem extends Component {
  render() {
    return (
      <Container className="card card-body bg-light mb-3">
        <Row>
          <div className="col-2">
            <span className="mx-auto">REACT</span>
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>Spring / React Project</h3>
            <p>Project to create a Kanban Board with Spring Boot and React</p>
          </div>

          <Card style={{ width: "18rem" }}>
            <Button href="#" variant="outline-primary">
              <FontAwesomeIcon icon="coffee" />
              Project Board{" "}
            </Button>{" "}
            <Button href="#" variant="outline-info">
              <FontAwesomeIcon icon="edit" />
              Update Project Info
            </Button>{" "}
            <Button href="#" variant="outline-danger">
              <FontAwesomeIcon icon="minus-cicle" />
              Delete Project
            </Button>{" "}
          </Card>
        </Row>
      </Container>
    );
  }
}

export default ProjectItem;
