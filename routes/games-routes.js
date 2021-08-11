const express = require("express");
const Game = require("../models/Game");
const Field = require("../models/Field");
const gamesRoutes = express.Router();
const mongoose = require("mongoose");

//-------- ROUTE GET ALL GAMES --------------

gamesRoutes.get("/", (req, res, next) => {
  //------On trouve le match-------//
  Game.find() // [ {field: '12341234234'}, {} ]
    .populate("field")
    .populate("organisator")
    .then((AllGamesFromDb) => {
      // console.log("AllGamesFromDb", AllGamesFromDb);
      res.json(AllGamesFromDb);
    })
    .catch((err) => console.log(err));
});

//-------- ROUTE CREATE A GAME --------------

gamesRoutes.post("/add", (req, res, next) => {
  // const organisator = req.session.currentUser;
  const {
    name,
    players,
    numPlayers,
    levelGame,
    field,
    mood,
    date,
    hour,
    typeGame,
  } = req.body;
  if (!req.session.currentUser) {
    res.status(400).json({ message: "you need to login" });
    return;
  }

  const data = {
    name,
    players,
    numPlayers,
    levelGame,
    field,
    mood,
    date,
    hour,
    typeGame,
  };
  console.log("data game : ", data);
  console.log("organisator is : ", req.session.currentUser._id);

  const aNewGame = new Game({
    organisator: req.session.currentUser._id,
    name: name,
    players: players,
    numPlayers: numPlayers,
    levelGame: levelGame,
    mood: mood,
    hour: hour,
    date: date,
    typeGame: typeGame,
    field: field,
  });

  aNewGame.save().then(() => {
    console.log("newGame", aNewGame);
    res.status(200).json(aNewGame);
  });
});

//-----ROUTE AFFICHER UN GAME--------

gamesRoutes.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (!req.session.currentUser) {
    res.status(400).json({ message: "you need to login" });
    return;
  }

  Game.findById(req.params.id)
    .populate("field")
    .populate("players")
    .then((game) => {
      // console.log("GameDetail : ", game);
      res.status(200).json(game);
    })
    .catch((err) => console.log(err));
});

gamesRoutes.put("/edit/:id", (req, res, next) => {
  
  const organisator = req.session.currentUser;

  const { name, players, numPlayers, levelGame, field, mood, date, typeGame } =
    req.body;

  const data = {
    name,
    players,
    numPlayers,
    levelGame,
    field,
    mood,
    date,
    typeGame,
  };


  const id = req.params.id;

  if (!req.session.currentUser) {
    res.status(401).json({ message: "You need to be logged in!" });
    return;
  }
  if (req.file) {
    data.avatar = req.file.path;
  }
  Game.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((newGame) => {
      console.log("new user", newGame);
      res.status(200).json(newGame);
    })
    .catch(next);
});

//--------ROUTES ADD A PLAYER TO THE GAME --------------

gamesRoutes.put("/:id/listPlayer", (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(401).json({ message: "You need to be logged in!" });
    return;
  }
  console.log("IdUser", req.session.currentUser._id);

  Game.findById({ _id: req.params.id })
    .then((game) => {
      game.players.push(req.session.currentUser._id);
      game.save().then((updateGame) => {
        res.status(200).json(updateGame);
      });
    })
    .catch((err) => console.log(err));

});
//--------ROUTES OUT THE PLAYER TO THE GAME --------------


gamesRoutes.put("/:id/outPlayer", (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(401).json({ message: "You need to be logged in!" });
    return;
  }
  // const players = req.body.players;
  console.log("IdUser", req.session.currentUser._id);

  Game.findById({ _id: req.params.id })
    .then((game) => {
      var indexUser = game.players.indexOf(req.session.currentUser._id);
      if (indexUser > -1) {
        game.players.splice(indexUser, 1);
      }

      game.save().then((updateGame) => {
        res.status(200).json(updateGame);
      });
    })
    .catch((err) => console.log(err));
});

gamesRoutes.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  Game.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = gamesRoutes;
