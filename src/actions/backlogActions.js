import axios from "axios";

const baseURL = "http://localhost:8080";

export const addProjectTask = (backlogId, projectTask, history) => async (
  dispatch
) => {
  const serverResponse = await axios(
    baseURL + `/api/backlog/${backlogId}`,
    projectTask
  );

  history.push(`/projectBoard/${backlogId}`);
  console.log(serverResponse);
};
