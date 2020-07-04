import React, { Component } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

class DeleteProject extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.props.deleteProject(id, this.props.history);
  }

  render() {
    return <div></div>;
  }
}

DeleteProject.propTypes = {
  deletetProject: PropTypes.func.isRequired,
};

//https://react-redux.js.org/using-react-redux/connect-mapstate
const mapStateToProps = (state) => ({
  // define the variable to be used
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { deleteProject })(DeleteProject);
