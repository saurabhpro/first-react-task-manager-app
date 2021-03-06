import React from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateProjectButton = () => {
  return (
    <React.Fragment>
      <Link to="/addProject">
        <Button size="lg" variant="info" className="ml-2">
          <FontAwesomeIcon icon="plus-square" /> Create a Project
        </Button>
      </Link>
    </React.Fragment>
  );
};

export default CreateProjectButton;
