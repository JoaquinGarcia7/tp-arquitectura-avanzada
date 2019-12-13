import AdminHome from "./AdminHome";
import { getUser, getSensores, updateSensor } from "../../actions/actions";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.user,
    sensores: state.sensores
  };
};

export default connect(mapStateToProps, { getUser, getSensores, updateSensor })(
  AdminHome
);
