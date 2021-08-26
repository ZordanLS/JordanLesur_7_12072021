// Importations

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const saucesRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");
const { Sequelize } = require('sequelize');
require("dotenv").config();

// Connection à la base de données

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: "mysql",
  host: process.env.DATABASE_HOST
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL avec Sequelize!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

// Instruction de test

sequelize.query("SELECT * FROM user").then(([results, metadata]) => {
  console.log(results);
})

/*const db = mysql.createConnection({

  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: true

});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});*/

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

app.use("/api/sauces", saucesRoutes);

app.use("/api/auth", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
