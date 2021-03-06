import React, { Component } from "react";
import "../../App.css";
import Login from "../Login/index";

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
	}

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