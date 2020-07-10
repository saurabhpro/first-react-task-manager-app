import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classnames from "classnames";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import { Row, Col } from "react-bootstrap";

/**
 * the create new project form with all validations
 */
class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: "",
      // add errors to extract on form
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Life Cycle Hooks
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (migration)

  static getDerivedStateFromProps = (nextProps, state) => {
    if (nextProps.errors) {
      state.errors = nextProps.errors;
    }

    return state;
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
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    this.props.createProject(newProject, this.props.history);

    //log for test
    console.log(newProject);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container fluid className="p-2 flex-fill justify-content-center">
        <Row className="justify-content-md-center">
          <h5 className="display-4 ">Create Project form</h5>
        </Row>
        <hr />
        <Row className="justify-content-md-center">
          {" "}
          <Col lg={6}>
            {
              // for with onSubmit Action - this.onSubmit can have any arbitary name too like onSave etc
            }
            <Form
              onSubmit={this.onSubmit}
              className="d-flex-fill p-1 text-left"
            >
              <Form.Group controlId="formProjectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  as="input"
                  required
                  placeholder="Project Name"
                  name="projectName"
                  className={classnames({
                    "is-invalid": errors.projectName,
                  })}
                  value={this.state.projectName}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.projectName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formProjectIdentifier">
                <Form.Label>Project Unique Identifier</Form.Label>
                <Form.Control
                  as="input"
                  required
                  //disabled
                  placeholder="Project Unique Identifier"
                  name="projectIdentifier"
                  className={classnames({
                    "is-invalid": errors.projectIdentifier,
                  })}
                  value={this.state.projectIdentifier}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.projectIdentifier}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formProjectDescription">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  placeholder="Project Description"
                  name="description"
                  className={classnames({
                    "is-invalid": errors.description,
                  })}
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group controlId="formEndDate">
                <Form.Label>Estimated End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.onChange}
                />
              </Form.Group>
              
              <Button type="submit" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
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
