import React, { Component } from "react";
import ProjectItem from "./project/ProjectItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

import CreateProjectButton from "./project/CreateProjectButton";

/**
 * The main component which allows the Projects to be visible once the token is validated
 */
class Dashboard extends Component {
  // Life Cycle Hooks
  // https://reactjs.org/docs/react-component.html#componentdidmount
  // is invoked immediately after a component is mounted (inserted into the tree).
  // Initialization that requires DOM nodes should go here.
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    // const projectList = this.props.project.projects;
    const { projects } = this.props.project; // destructuring requires exact matchinh property

    return (
      <Container fluid="sm" className="p-4 flex-fill justify-content-center">
        <Row className="justify-content-md-center">
          <h1 className="display-4 ml-2"> Projects</h1>
        </Row>
        <br />
        <Row className="justify-content-md-center">
          <CreateProjectButton />
        </Row>
        <hr />
        <Row>
          {
            //this prop name is same as the child extracted name
            projects.map((proj) => (
              <ProjectItem key={proj.id} project={proj} />
            ))
          }
        </Row>
      </Container>
    );
  }
}

// typescript type validation
Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
