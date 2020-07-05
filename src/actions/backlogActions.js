import axios from "axios";

const baseURL = "http://localhost:8080";

export const addProjectTask = (backlogId, projectTask, history) => async (
  dispatch
) => {
  const serverResponse = await axios.post(
    baseURL + `/api/projects/${backlogId}/backlog`,
    projectTask
  );

  history.push(`/projectBoard/${backlogId}`);
  console.log(serverResponse);
};
