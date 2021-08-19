// Importations

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const likeRoutes = require("./routes/like");
//const postRoutes = require("./routes/post");
//const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");
const path = require("path");
require("dotenv").config();
var mysql = require("mysql");

// Connection à la base de données

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.SQL_DATABASE,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//app.use(bodyParser.json());
app.use(express.json());   


// Déclaration des différents chemins

//app.use("/api/like", likeRoutes);

app.use("/api/auth", userRoutes);

//app.use("/api/post", postRoutes);

//app.use("/api/comment", commentRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = db;
module.exports = app;
