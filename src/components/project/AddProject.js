import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";

import classnames from "classnames";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      // add errors to extract on form
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Life Cycle Hooks
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = (event) => {
    // this meants get the target name property and set it to the value property
    // then setState
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (event) => {
    // prevents screen refresh once this event ends
    event.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };

    this.props.createProject(newProject, this.props.history);

    //log for test
    console.log(newProject);
  };

  render() {
    {
      // restructuring
    }
    const { errors } = this.state;

    return (
      <Container className="p-2 flex-fill justify-content-center">
        <div className="col-md-8 m-auto">
          <h5 className="display-4 ">Create Project form</h5>
          <hr />

          {
            // for with onSubmit Action - this.onSubmit can have any arbitary name too like onSave etc
          }
          <Form onSubmit={this.onSubmit} className="d-flex-fill p-1 text-left">
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                as="input"
                placeholder="Project Name"
                name="projectName"
                className={classnames({
                  "is-invalid": errors.projectName,
                })}
                value={this.state.projectName}
                onChange={this.onChange}
              />
              {errors.projectName && (
                <div className="invalid-feedback">{errors.projectName}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formProjectIdentifier">
              <Form.Label>Project Unique Identifier</Form.Label>
              <Form.Control
                as="input"
                //disabled
                placeholder="Project Unique Identifier"
                name="projectIdentifier"
                className={classnames({
                  "is-invalid": errors.projectName,
                })}
                value={this.state.projectIdentifier}
                onChange={this.onChange}
              />
              {errors.projectIdentifier && (
                <div className="invalid-feedback">
                  {errors.projectIdentifier}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId="formProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Project Description"
                name="description"
                className={classnames({
                  "is-invalid": errors.description,
                })}
                value={this.state.description}
                onChange={this.onChange}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={this.state.start_date}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>Estimated End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={this.state.end_date}
                onChange={this.onChange}
              />
            </Form.Group>
            <Button type="submit" block>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

/**
 * https://reactjs.org/docs/typechecking-with-proptypes.html
 * Simple means it can checl what argument type we have (since we are using js not ts it might be handy)
 * React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property
 * More: https://blog.bitsrc.io/understanding-react-proptypes-type-checking-in-react-9648a62ce12e
 * PropTypes.func.isRequired = The prop must be a function and it must be provided else error will be thrown.
 */
AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

// https://blog.logrocket.com/react-redux-connect-when-and-how-to-use-it-f2a1edab2013/
export default connect(mapStateToProps, { createProject })(AddProject);
