import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteProject } from "../../actions/projectActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ProjectItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  render() {
    const { project } = this.props;
    return (
      <Container className="mb-4">
        <Card>
          <Row className="bg-dark text-left">
            <Col className="text-light  ml-4">
              <span className="mx-auto">{project.projectIdentifier}</span>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="text-left ml-4">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>
            </Col>

            <Card border="light" className="ml-5 justify-content-center">
              <ButtonGroup vertical>
                <Link
                  to={`/projectBoard/${project.projectIdentifier}`}
                  className="btn-block"
                >
                  <Button variant="outline-primary" block className="mb-1">
                    <div className="float-left">
                      <FontAwesomeIcon icon="tasks" /> Project Board
                    </div>
                  </Button>
                </Link>

                <Link to={`/updateProject/${project.projectIdentifier}`}>
                  <Button variant="outline-success" block className="mb-1">
                    <div className="float-left">
                      <FontAwesomeIcon icon="edit" /> Update Project Info
                    </div>
                  </Button>
                </Link>

                <Button
                  className="text-left"
                  variant="outline-danger"
                  block
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <FontAwesomeIcon icon="minus-square" /> Delete Project
                </Button>
              </ButtonGroup>
            </Card>
          </Row>
        </Card>
      </Container>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
