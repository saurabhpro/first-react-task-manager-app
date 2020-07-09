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
  constructor() {
    super();

    this.state = {
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { projectTasks } = this.props.backlog;

    // algo to show cards deck dyncamically
    const { errors } = this.state;
    let boardContent;

    const boardAlgorithm = this.boardAlgorithm();

    boardContent = boardAlgorithm(errors, projectTasks);

    return (
      <Container fluid className="justify-content-md-center">
        <br />
        <Link to={`/addProjectTask/${id}`} className="mb-3">
          <Button variant="light" size="lg" className="float-left">
            <FontAwesomeIcon icon="plus-square" /> Create Project Task
          </Button>
        </Link>
        <br />
        <hr />
        {boardContent}
      </Container>
    );
  }

  boardAlgorithm() {
    return (errors, projectTasks) => {
      if (projectTasks.length < 1) {
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          );
        } else if (errors.projectIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectIdentifier}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project Tasks on this board
            </div>
          );
        }
      } else {
        return <Backlog projectTasksProp={projectTasks} />;
      }
    };
  }
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  backlog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
