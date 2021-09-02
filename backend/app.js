// Importations

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json());

// Déclaration des différents chemins

require("./routes/user.routes")(app);

const db = require("./models");
//db.sequelize.sync();

module.exports = app;
