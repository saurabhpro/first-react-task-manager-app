import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backlog from "./Backlog";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { projectTasks } = this.props.backlog;

    return (
      <Container fluid className="justify-content-md-center">
        <br />
        <Link to={`/addProjectTask/${id}`} className="mb-3">
          <Button variant="light" size="lg">
            <FontAwesomeIcon icon="plus-square" /> Create Project Task
          </Button>
        </Link>
        <hr />
        <Backlog projectTasksProp={projectTasks} />
      </Container>
    );
  }
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  backlog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
