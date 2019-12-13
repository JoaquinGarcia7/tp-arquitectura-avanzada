import { GET_USER, GET_SENSORES, UPDATE_SENSOR } from "./types";
import axios from "axios";

export const getUser = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3000/user`);
    dispatch({
      type: GET_USER,
      payload: res.data[0]
    });
  } catch (e) {
    console.error(e);
  }
};

export const getSensores = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3000/sensores`);
    dispatch({
      type: GET_SENSORES,
      payload: res.data
    });
  } catch (e) {
    console.error(e);
  }
};

export const updateSensor = sensor => async dispatch => {
  console.log(sensor);
  try {
    const res = await axios.put(
      `http://localhost:3000/sensores/${sensor.id}`,
      sensor
    );
    dispatch({
      type: UPDATE_SENSOR,
      payload: res.data
    });
  } catch (e) {
    console.error(e);
  }
};
