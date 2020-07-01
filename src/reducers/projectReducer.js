import { GET_PROJECTS } from "../actions/types";

const initialState = {
  projects: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state, // spread operator
        projects: action.payload,
      };
    default:
      return state;
  }
}
