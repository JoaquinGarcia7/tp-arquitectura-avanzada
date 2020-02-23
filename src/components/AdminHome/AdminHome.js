import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

/*class AdminHome extends Component {
  
*/
class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempMin: 0,
      tempMax: 0,
      humMin: 0,
      humMax: 0,
      vientoMin: 0,
      vientoMax: 0,
      coefT: 0,
      coefH: 0,
      coefV: 0,
      user: null
    };
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getSensores();
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
    this.props.handleChange(name, value);
  };

  handleDeleteUser(id) {
      return (e) => this.props.deleteUser(id);
  }

  render() {
      const { user, users } = this.props;
      return (
          <div className="col-md-6 col-md-offset-3">
              <h1>Hi {user.firstName}!</h1>
              <p>You're logged in with React!!</p>
              <h3>All registered users:</h3>
              {users.loading && <em>Loading users...</em>}
              {users.error && <span className="text-danger">ERROR: {users.error}</span>}
              {users.items &&
                  <ul>
                      {users.items.map((user, index) =>
                          <li key={user.id}>
                              {user.firstName + ' ' + user.lastName}
                              {
                                  user.deleting ? <em> - Deleting...</em>
                                  : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                  : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                              }
                          </li>
                      )}
                  </ul>
              }
              <p>
                  <Link to="/login">Logout</Link>
              </p>
          </div>
      );
  }
/*if (!this.props.user && !this.props.sensores) return <p>loading</p>;
    else {
      console.log(this.props.sensores);
      return (
        <div>
          <div className="container-all">
            <div className="container">
              <p>Temperatura</p>
              <label>
                Valor minimo
                <input
                  type="text"
                  value={this.state.tempMin}
                  className="input-container"
                  name="tempMin"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Valor maximo
                <input
                  type="text"
                  value={this.state.tempMax}
                  className="input-container"
                  name="tempMax"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Coeficiente de conversion
                <input
                  type="text"
                  value={this.state.coefT}
                  className="input-container"
                  name="coefT"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Desactivar
                <input name="isGoing" type="checkbox" />
              </label>
            </div>
            <div className="container">
              <p>Humedad</p>
              <label>
                Valor minimo
                <input
                  type="text"
                  value={this.state.humMin}
                  className="input-container"
                  name="humMin"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Valor maximo
                <input
                  type="text"
                  value={this.state.humMax}
                  className="input-container"
                  name="humMax"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Coeficiente de conversion
                <input
                  type="text"
                  value={this.state.coefH}
                  className="input-container"
                  name="coefH"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Desactivar
                <input name="isGoing" type="checkbox" />
              </label>
            </div>
            <div className="container">
              <p>Velocidad del viento</p>
              <label>
                Valor minimo
                <input
                  type="text"
                  value={this.state.vientoMin}
                  className="input-container"
                  name="vientoMin"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Valor maximo
                <input
                  type="text"
                  value={this.state.vientoMax}
                  className="input-container"
                  name="vientoMax"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Coeficiente de conversion
                <input
                  type="text"
                  value={this.state.coefV}
                  className="input-container"
                  name="coefV"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Desactivar
                <input name="isGoing" type="checkbox" />
              </label>
            </div>
          </div>
          <div>
            <p>Mail</p>
            <input type="text" />
          </div>
        </div>
      );
    }
  }*/


}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };





/*import React, { Component } from "./node_modules/react";
import "../../App.css";
import Login from "../Login";
import { fetchUser } from "../../services";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempMin: 0,
      tempMax: 0,
      humMin: 0,
      humMax: 0,
      vientoMin: 0,
      vientoMax: 0,
      coefT: 0,
      coefH: 0,
      coefV: 0,
      user: null
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getSensores();
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
    this.props.handleChange(name, value);
  };
  render() {
    if (!this.props.user && !this.props.sensores) return <p>loading</p>;
    else {
      console.log(this.props.sensores);
      return (
        <div>
          <div className="container-all">
            <div className="container">
              <p>Temperatura</p>
              <label>
                Valor minimo
                <input
                  type="text"
                  value={this.state.tempMin}
                  className="input-container"
                  name="tempMin"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Valor maximo
                <input
                  type="text"
                  value={this.state.tempMax}
                  className="input-container"
                  name="tempMax"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Coeficiente de conversion
                <input
                  type="text"
                  value={this.state.coefT}
                  className="input-container"
                  name="coefT"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Desactivar
                <input name="isGoing" type="checkbox" />
              </label>
            </div>
            <div className="container">
              <p>Humedad</p>
              <label>
                Valor minimo
                <input
                  type="text"
                  value={this.state.humMin}
                  className="input-container"
                  name="humMin"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Valor maximo
                <input
                  type="text"
                  value={this.state.humMax}
                  className="input-container"
                  name="humMax"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Coeficiente de conversion
                <input
                  type="text"
                  value={this.state.coefH}
                  className="input-container"
                  name="coefH"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Desactivar
                <input name="isGoing" type="checkbox" />
              </label>
            </div>
            <div className="container">
              <p>Velocidad del viento</p>
              <label>
                Valor minimo
                <input
                  type="text"
                  value={this.state.vientoMin}
                  className="input-container"
                  name="vientoMin"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Valor maximo
                <input
                  type="text"
                  value={this.state.vientoMax}
                  className="input-container"
                  name="vientoMax"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Coeficiente de conversion
                <input
                  type="text"
                  value={this.state.coefV}
                  className="input-container"
                  name="coefV"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Desactivar
                <input name="isGoing" type="checkbox" />
              </label>
            </div>
          </div>
          <div>
            <p>Mail</p>
            <input type="text" />
          </div>
        </div>
      );
    }
  }
}

export default AdminHome;
*/