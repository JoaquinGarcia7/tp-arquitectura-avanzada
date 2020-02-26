import React, { Component } from "react";
import {
	Button,
	Checkbox,
	Form,
	Input
} from "semantic-ui-react";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null
		};
	}

	onSubmit = event => {
		event.preventDefault();
		//this.props.login(this.state);
		console.log("login");
	};

	handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<Form className="form-login" onSubmit={this.onSubmit}>
				<h1>Login</h1>
				<Form.Field>
					<label className="label-form">Usuario</label>
					<Form.Input
						type="text"
						placeholder="email"
						onChange={this.handleChange}
						name="username"
						required
					/>
				</Form.Field>
				<Form.Field>
					<label className="label-form">Contraseña</label>
					<Form.Input
						type="password"
						placeholder="password"
						onChange={this.handleChange}
						name="password"
						required
					/>
				</Form.Field>
				<Button className="btn" type="submit" loading={this.props.isLoading}>
					Iniciar sesion
				</Button>
			</Form>
		);
	}
}

export default Login;
