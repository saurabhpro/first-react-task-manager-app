import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  validToken: false,
  user: {},
};

/**
 *
 * @param {payload} payload which contains JWT Claims (user info)
 */
const booleanActionPayload = (payload) => {
  return !!payload; //  true if has value (the !! makes sure we return boolean and not the payload content)
};

export default function (state = initialState, action) {
  if (action.type === SET_CURRENT_USER) {
    return {
      ...state,
      validToken: booleanActionPayload(action.payload),
      user: action.payload,
    };
  } else {
    return state;
  }
}
