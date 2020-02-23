import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import UserHome from "./components/User";
import AdminHome from "./components/AdminHome/container";
import socketIOClient from "socket.io-client";

/*Probando git */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatura: 0,
      humedad: 0,
      viento: 0,
      endpoint: "localhost:3030",
      tempMin: 0,
      tempMax: 0,
      humMin: 0,
      humMax: 0,
      vientoMin: 0,
      vientoMax: 0,
      coefT: 0.445,
      coefH: 0.2,
      coefV: 0.1,
      sensor: []
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    const { coefT, coefH, coefV } = this.state;
    socket.on("arduinodata", data => {
      console.log(data.Temperatura);
      this.setState({
        temperatura: data.Temperatura * coefT,
        humedad: data.Humedad * coefH,
        viento: data.Viento * coefV
      });
    });
    /*try {
      const sensor = await fetch("/");
      console.log(sensor);
      const r = JSON.stringify(sensor.body);
      console.log(JSON.parse(r));
      //console.log(JSON.parse(sensor));
      //let sensor = await r.json();
      //this.setState({ sensor });
    } catch (error) {
      console.log(error);
    }*/
  }

  handleChange = (name, value) => {
    this.setState({
    [name]: value
    });
  };
  
  render() {
    const { temperatura, humedad, viento } = this.state;
    console.log(this.state.sensor);
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/user-home">
              <UserHome
                temperatura={temperatura}
                viento={viento}
                humedad={humedad}
              />
            </Route>
            <Route path="/admin-home">
              <AdminHome handleChange={this.handleChange} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
