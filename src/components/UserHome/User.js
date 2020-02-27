import React, { Component } from "react";
import "../../App.css";
import Login from "../Login";
import chart from "../chart";
import {
  Segment,
  Dimmer,
  Loader,
  Input,
  Button,
  Form
} from "semantic-ui-react";
import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import "./styles.css";

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempAnt: 0,
      vientoAnt: 0,
      humedadAnt: 0,
      fechaMin: "",
      fechaMax: ""
    };
  }
  componentDidMount() {
    this.props.getSensores();
  }
  renderLoader = () => (
    <Segment>
      <Dimmer>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  );

  descargarInformacion = async (
    e,
    temp,
    viento,
    humedad,
    fechaMin,
    fechaMax
  ) => {
    e.preventDefault();
    console.log("descargar");
    await this.props.getRegistro({ fechaMin, fechaMax });
    console.log(this.props.registro);
    const registro = this.props.registro;
    var contenido = "";
    registro.map(item => {
      contenido += `${
        item.id_sensor
      }: ${item.valueSensor.toString()} °C, Fecha: ${item.fecha}, Horario: ${
        item.horario
      } \n`;
    });
    /*if (temp !== -999)
      //setear temp en -999 si el admin lo deshabilito
      contenido += "Temperatura:   " + temp.toString() + " °C \n";
    if (viento !== -999)
      //setear viento en -999 si el admin lo deshabilito
      contenido += "Viento:   " + viento.toString() + " Km/h \n";
    if (humedad !== -999)
      //setear viento en -999 si el admin lo deshabilito
      contenido += "Humedad:   " + humedad.toString() + " % \n";*/
    console.log(contenido);
    if (!contenido.trim())
      contenido = "Los sensores estan desactivados, no se registraron valores";

    const file = new Blob([contenido], {
      type: "text/plain"
    });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  saveRegistro = (temperaturaActual, humedadActual, vientoActual) => {
    const {
      guardarRegistro,
      temperaturaAnt,
      vientoAnt,
      humedadAnt
    } = this.props;
    const date = new Date();
    const fecha = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    const horario = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if (temperaturaAnt !== temperaturaActual) {
      guardarRegistro({
        id_sensor: "temperatura",
        valueSensor: temperaturaActual,
        fecha,
        horario
      });
    }
    if (vientoAnt !== vientoActual) {
      guardarRegistro({
        id_sensor: "viento",
        valueSensor: vientoActual,
        fecha,
        horario
      });
    }
    if (humedadAnt !== humedadActual) {
      guardarRegistro({
        id_sensor: "humedad",
        valueSensor: humedadActual,
        fecha,
        horario
      });
    }
  };

  render() {
    const {
      sensores,
      tempAnt,
      humedadAnt,
      vientoAnt,
      user,
      registroInProgress
    } = this.props;
    if ((!user && !sensores) || registroInProgress) return this.renderLoader();
    else {
      const sensorTemperatura = sensores.find(
        sensor => sensor.name_sensor === "temperatura"
      );
      const sensorHumedad = sensores.find(
        sensor => sensor.name_sensor === "humedad"
      );
      const sensorViento = sensores.find(
        sensor => sensor.name_sensor === "viento"
      );
      const temperatura = Math.round(
        this.props.temperatura * sensorTemperatura.factor
      );
      const humedad = Math.round(this.props.humedad * sensorHumedad.factor);
      const viento = Math.round(this.props.viento * sensorViento.factor);
      //this.saveRegistro(temperatura, humedad, viento);
      if (temperatura > sensorTemperatura.max_value)
        this.props.sendMail("temperatura");
      return (
        <div>
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
          <div className="container-download">
            <Form className="form-fecha">
              <p>Fecha</p>
              <Form.Field className="input-container">
                Desde
                <Input
                  type="text"
                  defaultValue={this.state.fechaMin}
                  placeholder="yyyy-mm-dd"
                  className="input-container"
                  name="fechaMin"
                  onChange={
                    (e, data) => this.setState({ fechaMin: data.value })
                    //console.log(data)
                  }
                />
              </Form.Field>
              <Form.Field className="input-container">
                Hasta
                <Input
                  type="text"
                  defaultValue={this.state.fechaMax}
                  className="input-container"
                  placeholder="yyyy-mm-dd"
                  name="fechaMax"
                  onChange={(e, data) =>
                    this.setState({ fechaMax: data.value })
                  }
                />
              </Form.Field>
              <Button
                type="submit"
                className="button"
                onClick={
                  //this.downloadTxtFile()
                  e =>
                    this.descargarInformacion(
                      e,
                      temperatura,
                      humedad,
                      viento,
                      this.state.fechaMin,
                      this.state.fechaMax
                    )
                }
              >
                Descargar
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  }
}

export default UserHome;
