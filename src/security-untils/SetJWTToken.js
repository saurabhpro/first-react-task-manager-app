import axios from "axios";

/**
 *
 * @param {token} token to be appended to any request that requires it
 */
const SetJWTToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default SetJWTToken;
