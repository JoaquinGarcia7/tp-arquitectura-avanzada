import React, { Component } from "react";
import { Button,/* Checkbox,*/ Form/*, Input*/ } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    //Restablecer el estado de inicio de sesión.
    //this.props.logout();

    this.state = {
      password: null,
      submitted: false,
      username: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    //const { name, value } = e.target;
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //this.props.login(this.state);
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
        this.props.login(username, password);
    }
  };


  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Administrador</h1>
        <Form className="form-login" onSubmit={this.handleSubmit}>
          <div className={ 'form-group' + (submitted && !username ? ' has-error' : '') }>
            <Form.Field>
              <label className="label-form"> Usuario </label>
              <Form.Input
                type="text"
                placeholder="Email"
                onChange={this.handleChange}
                name="username"
                value={username}
                required
              />
              {submitted && !username && 
                <div className="help-block">Nombre de usuario requerido</div>
              }
            </Form.Field>
          </div>
          <div className={ 'form-group' + (submitted && !password ? ' has-error' : '') }> 
            <Form.Field>
              <label className="label-form"> Contraseña </label>
              <Form.Input
                type="password"
                placeholder="password"
                onChange={this.handleChange}
                name="password"
                value={password}
                required
              />
              {submitted && !password &&
                <div className="help-block">Contraseña requerida</div>
              }
            </Form.Field>
          </div>
          <div className="form-group">
            <Button className="btn btn-primary" type="submit" loading={this.props.isLoading}>
              Iniciar sesion
            </Button>
            {loggingIn &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/register" className="btn btn-link">Registrarse</Link>
          </div>
        </Form>
      </div>
    );
  }
}

function mapState(state){
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userACtions.login,
  logout: userACtions.logout
};

const connectedLogin = connect(mapState, actionCreators)(Login);
export { connectedLogin as Login }
