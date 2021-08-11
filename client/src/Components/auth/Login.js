import React, { Component } from "react";
import { login } from "./auth-service";
// import axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import "./Login.css";


export default class LoginUser extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  // componentDidMount() {
  //   axios.post('http://localhost:5000/auth/login', { username: this.state.username, password: this.state.password })
  //     .then(response => response.data)
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    login(username, password)
    .then((response) => {
          // console.log(response);
          this.setState({ username: "", password: "" });
          this.props.updateUser(response);
          this.props.history.push("/auth");
        }).catch((err) => console.log(err));
    // axios
    //   .post(
    //     "http://localhost:5000/auth/login",
    //     {
    //       username: this.state.username,
    //       password: this.state.password,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({ username: "", password: "" });
    //     this.props.updateUser(response);
    //     this.props.history.push("/auth");
    //   })
    //   .catch((err) => this.setState({ error: err.response.data.message }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   authService.login(this.state.username, this.state.password)
  //     .then(response => {
  //       this.setState({error: ""});

  //       this.props.updateUser(response);
  //       this.props.history.push('/');
  //     })
  //     .catch(err => this.setState({error: err.response.data.message}))
  //   ;
  // }

  render() {
    return (

      <div className="green">
      <div className = "login">
      <img src='https://res.cloudinary.com/dro81vxlb/image/upload/v1628622049/logo-transparent_aamv79.png' alt="" className="logo"/>
      
        <form onSubmit={this.handleSubmit}>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <h1>SIGN IN</h1>
          <p>
            <label className ="toto">
              <em>Email</em>
              <input
                type="text"
                name="username"
                placeholder="yourmail@domain.com"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>
          </p>

          <p>
            <label>
              <em>Password</em>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <p className="forgot">Forgot password</p>
              <br></br>
              <br></br>

            </label>
          </p>
          <button className="log">Login</button>
        
         
        </form>
      </div>
      

      <div className="orange">
      <h1 >Welcome,</h1>
     
             <h1> Basketball player friends</h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              
             <h1> Dont'have an account</h1>
              <button className="butsign">SIGN UP</button>  
        </div> 

      </div>
    


    );
  }
}
