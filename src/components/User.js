import React, { Component } from "react";
import "../App.css";
import Login from "./Login";
import chart from "./chart";

class UserHome extends Component {
  render() {
    return (
      <div className="container-all">
        <div className="container">
          <p>Temperatura</p>
          <div className="div-valor">
            <p>{this.props.temperatura} ºC</p>
          </div>
          {chart("Temperatura", this.props.temperatura)}
        </div>
        <div className="container">
          <p>Humedad</p>
          
          <div className="div-valor">
            <p>{this.props.humedad} %</p>
          </div>
          {chart("Humedad", this.props.humedad)}
        </div>
        <div className="container">
          <p>Velocidad del viento</p>
          <div className="div-valor">
            <p>{this.props.viento} km/h</p>
          </div>
          {chart("Viento", this.props.viento)}
        </div>
      </div>
    );
  }
}

export default UserHome;
