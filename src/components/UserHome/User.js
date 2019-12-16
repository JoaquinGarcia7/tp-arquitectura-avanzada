import React, { Component } from "react";
import "../../App.css";
import Login from "../../login";
import chart from "../chart";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  renderLoader = () => (
    <Segment>
      <Dimmer>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  );

  render() {
    if (!this.props.user && !this.props.sensores) return this.renderLoader();
    else {
      const sensorTemperatura = this.props.sensores.find(
        sensor => sensor.name_sensor === "temperatura"
      );
      const sensorHumedad = this.props.sensores.find(
        sensor => sensor.name_sensor === "humedad"
      );
      const sensorViento = this.props.sensores.find(
        sensor => sensor.name_sensor === "viento"
      );
      const temperatura = this.props.temperatura * sensorTemperatura.factor;
      const humedad = this.props.humedad * sensorHumedad.factor;
      const viento = this.props.viento * sensorViento.factor;
      return (
        <div className="container-all">
          <div className="container">
            <p>Temperatura</p>
            <div className="div-valor">
              <p>{temperatura} ºC</p>
            </div>
            {chart("Temperatura", temperatura)}
          </div>
          <div className="container">
            <p>Humedad</p>

            <div className="div-valor">
              <p>{humedad} %</p>
            </div>
            {chart("Humedad", humedad)}
          </div>
          <div className="container">
            <p>Velocidad del viento</p>
            <div className="div-valor">
              <p>{viento} km/h</p>
            </div>
            {chart("Viento", viento)}
          </div>
        </div>
      );
    }
  }
}

export default UserHome;
