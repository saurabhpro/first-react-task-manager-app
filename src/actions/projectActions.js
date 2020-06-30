import axios from "axios";

import { GET_ERRORS } from "./types";

const baseURL = "http://localhost:8080";

/**
 * history -> helps redirect once form is submitted
 * aysnc returns a promise, await waits for the promis to get done
 * thunk allows us to have a function returns dispatch function
 * */
export const createProject = (project, history) => async (dispatch) => {
  try {
    const serverResponse = await axios.post(baseURL + "/api/project", project);
    console.log(serverResponse);
    
     //redirect to this route with props set (visible in redux debug tool)
    history.push("/dashboard");
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
