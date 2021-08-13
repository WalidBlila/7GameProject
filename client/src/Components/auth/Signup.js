import React, { Component } from 'react';
import { signup } from './auth-service';
import { uploadFile } from './auth-service';
import { saveNewThing } from './auth-service';
import './Signup.css'

import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    height: "",
    age: "",
    level: "",
    avatar: "",
  }

  handleFormSubmit = (event) => {
    console.log(this.state);

    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    const height = this.state.height;
    const age = this.state.age;
    const level = this.state.level;
    const avatar = this.state.avatar;



    signup(username, password, email, height, age, level, avatar)

      .then(response => {
        console.log("response client :", response);
        this.setState({ username: "", password: "", email: "", height: "", age: "", level: "", avatar: "" });
        this.props.addUser(response);
        this.props.history.push("/auth");
      })
      .catch(error => console.log(error))


  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  fileChange = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);


    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('avatar', e.target.files[0]);

    uploadFile(uploadData)
      .then(response => {
        console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ avatar: response.avatar });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });

  };

  render() {
    return (
      <div className="green">
      <div className='signup'>
      
      <img src='https://res.cloudinary.com/dro81vxlb/image/upload/v1628768443/logo_vf_mwvddj.png' alt="" className="logo"/>
        <h1>SIGN UP</h1>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.error && (
            <p className="error">
              {this.state.error}
            </p>)}
          <p>
            <label>
              <em>Username</em>   </label>
            <input type="text" name="username" classnName="sousbloc1" value={this.state.username} onChange={(e) => this.handleChange(e)} />

          </p>
          <p>
            <label>
              <em>Password</em> </label>
            <input type="password" name="password" classnName="sousbloc3" value={this.state.password} onChange={(e) => this.handleChange(e)} />

          </p>
          <p>
            <label>
              <em>Email</em>      </label>
            <input type="text" name="email" classnName="sousbloc1" value={this.state.email} onChange={(e) => this.handleChange(e)} />

          </p>
          <p>
            <label>
              <em>Height</em>     </label>
            <input type="number" name="height" classnName="sousbloc2" value={this.state.height} onChange={(e) => this.handleChange(e)} />
          </p>

          <p>
            <label>
              <em>Age</em>  </label>
            <input type="number" name="age" classnName="sousbloc2" value={this.state.age} onChange={(e) => this.handleChange(e)} />
          </p>

          <p>
            <label >
              <em>Level</em>      </label>
            <select name="level" classnName="sousbloc3" value={this.state.level} onChange={(e) => this.handleChange(e)}>
              <option value="Débutant">Débutant</option>
              <option value="Amateur">Amateur</option>
              <option value="Confirmé">Confirmé</option>
              <option value="ProA">ProA</option>
              <option value="ProB">ProB</option>
            </select>
          </p>

          <p>
            <label>
              <em>Avatar</em>     </label>
            <input type="file" onChange={(e) => this.fileChange(e)} />
          </p>
          <button className="log" type="submit">I create my account</button>
        </form>
      </div>
      </div>

    
    )
  }
}


