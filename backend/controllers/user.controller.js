const db = require("../models");
const User = db.users;
const Post = db.posts;
const Comment = db.comments;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request A REVERIFIER
  if (!req.body.email) {
    res.status(400).send({
      message: "Please enter an email",
    });
    return;
  }
  let pattern = /^[a-z]([\.\-\_]{0,}[a-z_0-9]|[a-z_0-9]\.[a-z_0-9])+@([a-z0-9]|[a-z0-9][\.\-][a-z0-9])+\.[a-z]{2,}$/i;
  if (!pattern.test(req.body.email)) {
    res.status(400).send({
      message: "Please enter a valid email",
    });
    return;
  }

  // Hash du mot de passe

  let hash = await bcrypt.hash(req.body.password, 10);

  // Create a User
  const user = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: hash,
    picture: "http://localhost:3000/assets/defaultuser.jpg",
    role: 0,
    token: "",
  };

  if (req.file != null) {
    user.picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  let id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  const id = req.body.id;

  const user = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
  };

  if (req.body.password != null) {
    let hash = await bcrypt.hash(req.body.password, 10);
    user.password = hash;
  }
  if (req.file != null) {
    User.findOne({
      where: { id: id },
    }).then((user) => {
      let oldpicture = user.picture.split("http://localhost:3000/images/")[1];
      fs.unlink(`images/${oldpicture}`, () => {});
    });
    user.picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  let updateUserToken = req.headers.authorization;
  let clearUpdateUserToken = updateUserToken.replace("Basic ", "");
  jwt.verify(clearUpdateUserToken, "RANDOM_TOKEN_SECRET", function (err, tokeninfo) {
    let userIdDecoded = tokeninfo.userId;
    if (userIdDecoded == req.body.id) {
      User.update(user, {
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
            res.send({
              message: "User was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating User with id=" + id,
          });
        });
    }
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  let deleteUserToken = req.headers.authorization;
  let clearDeleteUserToken = deleteUserToken.replace("Basic ", "");
  jwt.verify(clearDeleteUserToken, "RANDOM_TOKEN_SECRET", function (err, tokeninfo) {
    let userIdDecoded = tokeninfo.userId;
    let userRoleDecoded = tokeninfo.userRole;

    if (userRoleDecoded === 1 || userIdDecoded === req.body.userid) {
      Comment.destroy({
        where: { user_id: id },
      });
      Post.destroy({
        where: { user_id: id },
      });
      User.findOne({
        where: { id: id },
      })
        .then((user) => {
          let filename = user.picture.split("http://localhost:3000/images/")[1];
          fs.unlink(`images/${filename}`, () => {});

          User.destroy({
            where: { id: id },
          })
            .then((num) => {
              if (num == 1) {
                res.send({
                  message: "User was deleted successfully!",
                });
              } else {
                res.send({
                  message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not delete User with id=" + id,
              });
            });
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

// Fonction de connection

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          user.token = jwt.sign({ userEmail: user.email, userId: user.id, userRole: user.role }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" });
          User.update(user.dataValues, {
            where: { id: user.id },
          })
            .then((num) => {
              res.status(200).json({
                message: "Utilisateur connecté !",
                userEmail: user.email,
                userId: user.id,
                token: user.token,
                role: user.role,
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not connect User with email=" + email,
              });
            });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(502).json({ error }));
};
