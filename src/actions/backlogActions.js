import axios from "axios";

import {
  GET_ERRORS,
  GET_PROJECT_TASK,
  GET_BACKLOG,
  DELETE_PROJECT_TASK,
} from "./types";

const baseURL = "http://localhost:8080";

export const addProjectTask = (backlogId, projectTask, history) => async (
  dispatch
) => {
  try {
    const serverResponse = await axios.post(
      baseURL + `/api/projects/${backlogId}/backlog`,
      projectTask
    );

    history.push(`/projectBoard/${backlogId}`);
    console.log(serverResponse);

    //clear out any previous errors from state
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
