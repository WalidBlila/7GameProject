require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
// const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');




mongoose.connect('mongodb+srv://ChloeT:AxC36oVEkWZF775W@cluster0.jwh3k.mongodb.net/sevengameproject', { useNewUrlParser: true })
	.then(x => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	})
	.catch(err => {
		console.error('Error connecting to mongo', err)
	});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


require('./configs/session.config')(app);


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
const cors = require("cors");
app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:3000"],
	})
);




const index = require('./routes/index');
// app.use('/', index);

app.use("/auth", require("./routes/auth-routes"));
app.use("/games", require("./routes/games-routes"));
app.use("/fields", require("./routes/field-routes"));

// Serve static files from client/build folder
app.use(express.static('client/build'));

// For any other routes: serve client/build/index.html SPA
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/client/build/index.html`, err => {
    if (err) next(err)
  })
});


module.exports = app;
