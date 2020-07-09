import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import SetJWTToken from "../security-untils/SetJWTToken";

import jwt_decode from "jwt-decode";

const baseURL = "http://localhost:8080";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    const serverResponse = await axios.post(
      baseURL + "/api/users/register",
      newUser
    );
    console.log(serverResponse);

    // redirect to login after successful creation of user
    history.push("/login");

    // clear out errors form previous calls
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const authenticateUser = (loginUser, history) => async (dispatch) => {
  try {
    // post Login request
    const serverResponse = await axios.post(
      baseURL + "/api/users/login",
      loginUser
    );
    console.log(serverResponse);

    // extract the token from response data
    const { token } = serverResponse.data;

    //store the token in localStorage
    localStorage.setItem("jwtToken", token);

    // set our token in header ***
    SetJWTToken(token);

    //decode token on react
    const decoded = jwt_decode(token);

    //dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  console.log("logging out now");
  
  //remove from local storage of browser
  localStorage.removeItem("jwtToken");

  //get rid of the token
  SetJWTToken(false);

  // dont send any payload user
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
