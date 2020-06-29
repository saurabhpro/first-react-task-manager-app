import React, { Component } from "react";
import ProjectItem from "./project/ProjectItem";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class Dashboard extends Component {
  render() {
    return (
      <div className="projects">
        <Container fluid>
          <Row className="justify-content-md-center">
            <h1 className="display-4">Projects</h1>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Button href="ProjectForm.html" className="btn btn-lg btn-info">
              Create a Project
            </Button>
          </Row>
          <br />
          <Row>
            <ProjectItem />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
