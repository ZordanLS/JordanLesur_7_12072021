// Importations

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const image = multer({ dest: "images/" });
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
require("./routes/post.routes")(app);
require("./routes/comment.routes")(app);

app.use("/images", express.static(path.join(__dirname, "images")));

const db = require("./models");
//db.sequelize.sync();

module.exports = app;
