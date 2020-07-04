import axios from "axios";

import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

/**
 * history -> helps redirect once form is submitted
 * aysnc returns a promise, await waits for the promis to get done
 * thunk allows us to have a function returns dispatch function
 * */
export const createProject = (project, history) => async (dispatch) => {
  try {
    const serverResponse = await axios.post("/api/project", project);
    console.debug(serverResponse);

    //redirect to this route with props set (visible in redux debug tool)
    history.push("/dashboard");

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

export const getProjects = () => async (dispatch) => {
  const serverResponse = await axios.get("/api/project/all");
  console.debug(serverResponse);

  dispatch({
    type: GET_PROJECTS,
    payload: serverResponse.data,
  });
};

export const getProject = (id, history) => async (dispatch) => {
  try {
    const serverResponse = await axios.get(`/api/project/${id}`);
    console.debug(serverResponse);

    dispatch({
      type: GET_PROJECT,
      payload: serverResponse.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = (id, history) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`/api/project/${id}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      });
  }
};
