import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ListGame extends Component {
  state = {
    games: [],
  };

  getGames = () => {
    axios
      .get("http://localhost:5000/games")
      .then((response) => {
        console.log("games :", response);
        this.setState({ games: response.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getGames();
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.games.map((game) => {
            return (
              <li key={game._id}>
                <div>
                   <span>Image du Terrain</span>
                </div>
                <h1>
                  <Link to={`/games/${game._id}`}>{game.name}</Link>
                </h1>
                <div>
                   <span>{game.numPlayers} joueurs</span>
                </div>
                <div>
                   <span>Niveau de jeu : {game.levelGame} </span>
                </div>
                <div>
                   <span>Mood du match : {game.mood} </span>
                </div>
                <div>
                   <span>Jour du match: {game.date} </span>
                </div>
                <div>
                   <span>Terrain : {game.field} </span>
                </div>
                <div>
                   <span>Niveau de jeu : {game.levelGame} </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
