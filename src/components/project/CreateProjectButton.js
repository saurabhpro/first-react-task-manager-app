import React from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CreateProjectButton = () => {
  return (
    <React.Fragment>
      <Link to="/addProject">
        <Button className="btn btn-lg btn-info">
          Create a Project
        </Button>
      </Link>
    </React.Fragment>
  );
};

export default CreateProjectButton;
