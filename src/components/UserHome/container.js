import UserHome from "./User";
import { getUser, getSensores, updateSensor } from "../../actions/actions";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    sensores: state.sensores
  };
};

export default connect(mapStateToProps, { getUser, getSensores, updateSensor })(
  UserHome
);
