import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { getProject, createProject } from "../../actions/projectActions";

import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

class UpdateProject extends Component {

  // static getDerivedStateFromProps = (nextProps, state) => {
  //   if (nextProps.errors) {
  //     state.errors = nextProps.errors;
  //   }

  //   if (nextProps.projectName) {
  //     state.project.projectName= nextProps.projectName;
  //   }
  //   if (nextProps.description) {
  //     state.project.description= nextProps.description;
  //   }
  //   if (nextProps.startDate) {
  //     state.project.startDate= nextProps.startDate;
  //   }
  //   if (nextProps.endDate) {
  //     state.project.endDate= nextProps.endDate;
  //   }
  //   return state;
  // };
  
  // to make it controlled componenet we create a constructor
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: "",

      //error handling
      errors: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onChange.bind(this);
  }

  // Life Cycle Hooks
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (migration)

  //   static getDerivedStateFromProps = (nextProps, state) => {
  //     console.log(nextProps);
  //     state = {
  //       id: nextProps.project.id,
  //       projectName: nextProps.project.projectName,
  //       projectIdentifier: nextProps.project.projectIdentifier,
  //       description: nextProps.project.description,
  //       startDate: nextProps.project.startDate,
  //       endDate:
  //         nextProps.project.endDate != null ? nextProps.project.endDate : "",
  //     };

  //     return state;
  //   };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    } = nextProps.project;

    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    });
  }

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    // destructuring
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }

  onChange(event) {
    // this meants get the target name property and set it to the value property
    // then setState
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    // prevents screen refresh once this event ends
    event.preventDefault();

    const newProject = {
      id: this.state.id,
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
      <Container className="p-2 flex-fill justify-content-center">
        <div className="col-md-8 m-auto">
          <h5 className="display-4 ">Update Project Form</h5>
          <hr />

          {
            // for with onSubmit Action - this.onSubmit can have any arbitary name too like onSave etc
          }
          <Form onSubmit={this.onSubmit} className="d-flex-fill p-1 text-left">
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
                disabled
                placeholder="Project Unique Identifier"
                name="projectIdentifier"
                value={this.state.projectIdentifier}
                onChange={this.onChange}
              />
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
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

//https://react-redux.js.org/using-react-redux/connect-mapstate
const mapStateToProps = (state) => ({
  // define the variable to be used
  project: state.project.project,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
