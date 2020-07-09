import axios from "axios";
import { GET_ERRORS } from "./types";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    const serverResponse = await axios.post("/api/users/register", newUser);
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
    const serverResponse = await axios.post("/api/users/login", loginUser);
    console.log(serverResponse);

    // redirect to login after successful creation of user
    history.push("/dashboard");

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
