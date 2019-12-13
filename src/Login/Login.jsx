import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import React from "react";
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

/*export class Login extends React.Component{
    constructor(props){
        super(props);
    }
}*/

class Login extends React.Component {
    constructor(props){
        super(props);

        // reset login status
        this.props.logout();

        this.state={
            username:'',
            password:'',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

/*
handleClick(event) {
    var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;
    var payload={
        "email":this.state.username,
        "password":this.state.password
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
    console.log(response);
    if(response.data.code == 200){
        console.log("Login successfull");
    var uploadScreen=[];
    uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
    }
    else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
    }
    else{
        console.log("Username does not exists");
        alert("Username does not exist");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
}
*/
    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state; 
        return ( 
            <div className = "col-md-6 col-md-offset-3">
                <h2>Admin</h2>
                <form name="form"
                    onSubmit={ this.handleSubmit }>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username"> Administrador </label>
                        <input type="text" className="form-control" name="username" value={ username } onChange={ this.handleChange } />
                        { submitted && !username &&
                            <div className="help-block">Nombre de administrador requerido</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password"> Contraseña </label>
                        <input type="password" className="form-control" name="password" value={ password } onChange={ this.handleChange } />
                        { submitted && !password &&
                            <div className="help-block">La contraseña es requerida</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Iniciar sesion</button>
                        {loggingIn && 
                        
                        }
                        <Link to="/register" className="btn btn-link"> Registrarse </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLogin = connect(mapState, actionCreators)(Login);
export { connectedLogin as Login };

/*
        ref={this.props.containerRef}>
            <div className="header">Register</div>

            <div className="content">
                <div className="image">
                    <img src = {loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <TextField
                            hintText="Ingrese su usuario"
                            floatingLabelText="Username"
                            onChange = { (event, newValue) => this.setState({username:newValue})}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            hintText="Ingrese su contraseña"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                Login
                </button>
            </div>

{/*            
            <MuiThemeProvider>
                <div>
                    <AppBar title="Login" />
                    <TextField
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br/>
                    <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
}
        </div>
    );
}
const style = {
    margin: 15,
};
export default Login;
/*
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->
    <h2 class="active"> Sign In </h2>
    <h2 class="inactive underlineHover">Sign Up </h2>

    <!-- Icon -->
    <div class="fadeIn first">
      <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
    </div>

    <!-- Login Form -->
    <form>
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="login">
      <input type="text" id="password" class="fadeIn third" name="login" placeholder="password">
      <input type="submit" class="fadeIn fourth" value="Log In">
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <a class="underlineHover" href="#">Forgot Password?</a>
    </div>

  </div>
</div>

*/  


/*import React, { Component } from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

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
*/