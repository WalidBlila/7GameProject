import React, { Component } from "react";
import service from "./auth-service";
import axios from "axios";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import "./Profile.css";
import UserInfo from "./UserInfo";
import Moment from "react-moment";

export default class Profile extends Component {
  state = {
    games: [],
    gamesOrga: [],
  };
  componentDidMount() {
    this.listPlayerGame();
    // this.listOrganisatorGame();
  }
  // componentDidUpdate(){
  //   this.props.updateUser();
  // }
  logout = (event) => {
    axios
      .post(`${process.env.REACT_APP_APIURL || ""}/auth/logout`, {})
      .then((response) => {
        this.props.updateUser(false);
      });
  };

  listPlayerGame = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/games`)
      .then((response) => {
        let copyGames = response.data.filter((e) =>  e.players.includes(this.props.userInSession._id));
        // console.log("playersGame", copyGames);
        let organisatorGame = response.data.filter((e) => e.organisator._id === this.props.userInSession._id
        );
        // console.log("organisatorGame", organisatorGame);
        this.setState({ games: copyGames, gamesOrga: organisatorGame });
      });
  };

  // listOrganisatorGame = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_APIURL || ""}/games`)
  //     .then((response) => {
  //       let copyGames = [...response.data];
  //       copyGames.filter(
  //         (e) => e.organisator._id === this.props.userInSession._id
  //       );
  //       console.log("copyGames", copyGames.length);
  //       this.setState({ gamesOrga: copyGames });
  //     });
  // };

  render() {
    // console.log("games", this.state.games);
    console.log("UserSession", this.props.userInSession);
    if (!this.props.userInSession) {
      return "loading";
    }
    return (
      // <Link to='/logout'>Se déconnecter</Link>
      <div className="profile">
        <div className="section1">
          <h1> Hello {this.props.userInSession.username} !</h1>
        </div>
        <div className="section2">
          <UserCard userInSession={this.props.userInSession} />
          <UserInfo userInSession={this.props.userInSession} />
        </div>
        <div className="cta">
          <Link to="/">
            <button className="btn logout" onClick={this.logout}>
              Logout
            </button>
          </Link>
          <Link to="/games/add">
            <button className="btn add">Create a game</button>
          </Link>
          <Link to="/auth/edit">
            <button className="btn add">Modifier son profil</button>
          </Link>
        </div>
        <div>
          <div>
            <div>
              <h2>Games soon</h2>
              {this.state.games.map((game) => {
                return (
                  <div>
                    <h2>{game.name}</h2>
                    <div>
                      <Moment format="D MMM YYYY" withTitle>
                        {game.date}
                      </Moment>
                    </div>
                    <div>{game.hour}</div>
                    <div>{game.field.name}</div>
                    <div>{game.organisator.username}</div>
                    <Link to={`/games/${game._id}`}>
                      <button>Detail Game</button>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div>
              <h2>Leader games</h2>
              {this.state.gamesOrga.map((game) => {
                return (
                  <div>
                    <h2>{game.name}</h2>
                    <div>{game.date}</div>
                    <div>{game.hour}</div>
                    <div>{game.field.name}</div>
                    <div>{game.organisator.username}</div>
                    <Link to={`/games/${game._id}`}>
                      <button>Detail Game</button>
                    </Link>
                    <button>Delete game</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
