import UserHome from "./User";
import {
  getUser,
  getSensores,
  updateSensor,
  guardarRegistro,
  getRegistro
} from "../../actions/actions";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    sensores: state.sensores,
    registro: state.registro,
    user: state.user,
    registroInProgress: state.registroInProgress,
    temperaturaAnt: state.temperatura,
    vientoAnt: state.viento,
    humedadAnt: state.humedad
  };
};

export default connect(mapStateToProps, {
  getUser,
  getSensores,
  updateSensor,
  guardarRegistro,
  getRegistro
})(UserHome);
