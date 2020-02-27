import {
  GET_USER,
  GET_SENSORES,
  GET_REGISTRO,
  GET_REGISTRO_IN_PROGRESS,
  SAVE_REGISTRO_SENSOR,
  SET_SEND_TRUE
} from "./actions/types";
const initialState = {
  user: null,
  sensores: null,
  registro: {},
  registroInProgress: false,
  temperatura: 0,
  humedad: 0,
  viento: 0,
  sentMessage: false
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
    case GET_REGISTRO:
      return {
        ...state,
        registro: payload,
        registroInProgress: false
      };
    case GET_REGISTRO_IN_PROGRESS:
      return {
        ...state,
        registroInProgress: true
      };
    case SAVE_REGISTRO_SENSOR:
      return {
        ...state,
        [payload.sensor]: payload.value
      };
    case SET_SEND_TRUE:
      return {
        ...state,
        sentMessage: true
      };
    default:
      return state;
  }
};

export default reducer;
