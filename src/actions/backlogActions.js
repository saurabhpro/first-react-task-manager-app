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
    console.debug(serverResponse);

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

// multiple project tasks
export const getBacklog = (backlogId) => async (dispatch) => {
  try {
    const serverResponse = await axios.get(
      baseURL + `/api/projects/${backlogId}/backlog/`
    );
    console.debug(serverResponse);

    dispatch({
      type: GET_BACKLOG,
      payload: serverResponse.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getProjectTask = (backlogId, projectTaskId, history) => async (
  dispatch
) => {
  try {
    const serverResponse = await axios.get(
      baseURL + `/api/backlogs/${backlogId}/tasks/${projectTaskId}`
    );
    console.debug(serverResponse);

    dispatch({
      type: GET_PROJECT_TASK,
      payload: serverResponse.data,
    });
  } catch (error) {
    console.error(error);
    history.push("/error");
  }
};

export const updateProjectTask = (
  backlogId,
  projectTaskId,
  projectTask,
  history
) => async (dispatch) => {
  try {
    await axios.patch(
      `/api/backlogs/${backlogId}/tasks/${projectTaskId}`,
      projectTask
    );

    history.push(`/projectBoard/${backlogId}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteProjectTask = (backlogId, projectTaskId) => async (
  dispatch
) => {
  if (
    window.confirm(
      `You are deleting project task ${projectTaskId}, this action cannot be undone?`
    )
  ) {
    await axios.delete(`/api/backlogs/${backlogId}/tasks/${projectTaskId}`);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: projectTaskId,
    });
  }
};
