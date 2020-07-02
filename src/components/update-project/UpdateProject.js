import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { getProject } from "../../actions/projectActions";

import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

class UpdateProject extends Component {
  componentDidMount() {
    // destructuring
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }
  render() {
    return (
      <Container className="p-2 flex-fill justify-content-center">
        <div className="col-md-8 m-auto">
          <h5 className="display-4 ">Update Project Form</h5>
          <hr />

          {
            // for with onSubmit Action - this.onSubmit can have any arbitary name too like onSave etc
          }
          <Form className="d-flex-fill p-1 text-left">
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                as="input"
                required
                placeholder="Project Name"
                name="projectName"
              />
            </Form.Group>
            <Form.Group controlId="formProjectIdentifier">
              <Form.Label>Project Unique Identifier</Form.Label>
              <Form.Control
                as="input"
                required
                disabled
                placeholder="Project Unique Identifier"
                name="projectIdentifier"
              />
            </Form.Group>
            <Form.Group controlId="formProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                required
                placeholder="Project Description"
                name="description"
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>Estimated End Date</Form.Label>
              <Form.Control type="date" name="endDate" />
            </Form.Group>
            <Button type="submit" block>
              Update
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // define the variable to be used
  project: state.project.project,
});

export default connect(mapStateToProps, { getProject })(UpdateProject);
