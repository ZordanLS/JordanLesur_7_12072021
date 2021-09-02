const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request A REVERIFIER
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Hash du mot de passe

  let hash = await bcrypt.hash(req.body.password, 10);
  console.log(hash);

  // Create a User
  const user = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: hash,
    picture: "",
    role: 0,
    token: ""
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const email = req.params.email;

  User.findByPk(email)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const email = req.params.email;

  User.update(req.body, {
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with email=${email}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with email=" + email
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const email = req.params.email;

  User.destroy({
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with email=${email}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with email=" + email
      });
    });
};


/*
// Importation des modules d'authentification

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { Sequelize } = require('sequelize');

const User = require("../models/user.model.js");

// Fonction de création de compte utilisateur

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(async (hash) => {
      await User.create({ email: req.body.email, first_name: req.body.firstname, last_name: req.body.lastname, password: hash, picture: "", role: 0, token: "" });
      /*const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        picture: "",
        role: 0,
        token: "",
      });
      */
     /*
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

*/