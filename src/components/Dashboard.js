import React, { Component } from "react";
import ProjectItem from "./project/ProjectItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CreateProjectButton from "./project/CreateProjectButton";

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
            <CreateProjectButton />
          </Row>
          <br />
          <Row>
            <ProjectItem />
            <br />
            <ProjectItem />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
