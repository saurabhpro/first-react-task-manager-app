import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

class ProjectItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  render() {
    const { project } = this.props;
    console.log(this.props);
    return (
      <Container className="bg-light mb-3">
        <Row>
          <div className="col-2">
            <span className="mx-auto">{project.projectIdentifier}</span>
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{project.projectName}</h3>
            <p>{project.description}</p>
          </div>

          <Card>
            <ButtonGroup vertical>
              <Link
                to={`/projectBoard/${project.projectIdentifier}`}
                className="btn-block"
              >
                <Button variant="outline-primary" block>
                  <div className="float-left">
                    <FontAwesomeIcon icon="tasks" /> Project Board
                  </div>
                </Button>
              </Link>
              <Link to={`/updateProject/${project.projectIdentifier}`}>
                <Button variant="outline-info" block>
                  <div className="float-left">
                    <FontAwesomeIcon icon="edit" /> Update Project Info
                  </div>
                </Button>
              </Link>
              <Button
                variant="outline-danger"
                block
                onClick={this.onDeleteClick.bind(
                  this,
                  project.projectIdentifier
                )}
              >
                <div className="float-left">
                  <FontAwesomeIcon icon="minus-square" /> Delete Project
                </div>
              </Button>
            </ButtonGroup>
          </Card>
        </Row>
      </Container>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
