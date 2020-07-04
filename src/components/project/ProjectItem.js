import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

class ProjectItem extends Component {
  render() {
    const { project } = this.props;
    console.log(this.props);
    return (
      <Container className="card card-body bg-light mb-3">
        <Row>
          <div className="col-2">
            <span className="mx-auto">{project.projectIdentifier}</span>
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{project.projectName}</h3>
            <p>{project.description}</p>
          </div>

          <ButtonGroup vertical>
            <Button href="#" variant="outline-primary" size="lg">
              <div className="float-left">
                <FontAwesomeIcon icon="coffee" /> Project Board
              </div>
            </Button>{" "}
            <Link to={`/updateProject/${project.projectIdentifier}`}>
              <Button variant="outline-info" size="lg">
                <div className="float-left">
                  <FontAwesomeIcon icon="edit" /> Update Project Info
                </div>
              </Button>{" "}
            </Link>
            <Link to={`/deleteProject/${project.projectIdentifier}`}>
              <Button variant="outline-danger" size="lg">
                <div className="float-left">
                  <FontAwesomeIcon icon="minus" /> Delete Project
                </div>
              </Button>{" "}
            </Link>
          </ButtonGroup>
        </Row>
      </Container>
    );
  }
}

export default ProjectItem;
