import { GET_USER, GET_SENSORES } from "./actions/types";
const initialState = {
  user: [],
  sensores: []
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload
      };
    case GET_SENSORES:
      return {
        ...state,
        sensores: payload
      };
    default:
      return state;
  }
};

export default reducer;
