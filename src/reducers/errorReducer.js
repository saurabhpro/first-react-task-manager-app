import { GET_ERRORS } from "../actions/types";

const initialState = {};

// function to return the payload for our action type
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
