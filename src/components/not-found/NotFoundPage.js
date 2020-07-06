import React, { Component } from "react";

import { Link } from "react-router-dom";
import PageNotFound from "../../assets/images/PageNotFound.png";

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <img src={PageNotFound} alt="Page not Found" />
        <p style={{ textAlign: "center" }}>
          <Link to="/">Go to Home </Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
