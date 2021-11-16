const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const fs = require("fs");

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.postcontent) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let userToken = req.body.usertoken;
  jwt.verify(userToken, "RANDOM_TOKEN_SECRET", function (err, tokeninfo) {
    let userIdDecoded = tokeninfo.userId;

    // Create a Post
    let post = {
      content: req.body.postcontent,
      picture: null,
      user_id: userIdDecoded,
    };

    if (req.file != null) {
      post.picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    // Save Post in the database
    Post.create(post)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Post.",
        });
      });
  });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  db.sequelize
    .query(
      "SELECT A.*, B.first_name, B.last_name, B.email, B.picture AS user_picture, CASE WHEN C.comments_count IS NULL THEN 0 ELSE C.comments_count END as comments_count FROM posts A INNER JOIN users B ON A.user_id = B.id LEFT JOIN (SELECT post_id, count(id) AS comments_count FROM comments GROUP BY post_id) C ON A.id = C.post_id order by A.createdAt DESC",
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// Retrieve all Posts from one user.
exports.findUsersPosts = (req, res) => {
  let id = req.params.id;

  db.sequelize
    .query(
      `SELECT A.*, B.first_name, B.last_name, B.email, B.picture AS user_picture, CASE WHEN C.comments_count IS NULL THEN 0 ELSE C.comments_count END as comments_count FROM posts A INNER JOIN users B ON A.user_id = B.id LEFT JOIN (SELECT post_id, count(id) AS comments_count FROM comments GROUP BY post_id) C ON A.id = C.post_id WHERE A.user_id=${id} order by A.createdAt DESC`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  db.sequelize
    .query(
      `SELECT A.*, B.first_name, B.last_name, B.email, B.picture AS user_picture, CASE WHEN C.comments_count IS NULL THEN 0 ELSE C.comments_count END as comments_count FROM posts A INNER JOIN users B ON A.user_id = B.id LEFT JOIN (SELECT post_id, count(id) AS comments_count FROM comments GROUP BY post_id) C ON A.id = C.post_id WHERE A.id=${id} order by A.createdAt DESC`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  let deleteUserToken = req.headers.authorization;
  let clearDeleteUserToken = deleteUserToken.replace("Basic ", "");
  jwt.verify(clearDeleteUserToken, "RANDOM_TOKEN_SECRET", function (err, tokeninfo) {
    let userIdDecoded = tokeninfo.userId;
    let userRoleDecoded = tokeninfo.userRole;

    if (userRoleDecoded === 1 || userIdDecoded === req.body.userid) {
      Comment.destroy({
        where: { post_id: id },
      });
      Post.findOne({
        where: { id: id },
      })
        .then((post) => {
          let filename = post.picture.split("http://localhost:3000/images/")[1];
          console.log(filename);
          fs.unlink(`images/${filename}`, () => {});
          Post.destroy({
            where: { id: id },
          })
            .then((num) => {
              if (num == 1) {
                res.send({
                  message: "Post was deleted successfully!",
                });
              } else {
                res.send({
                  message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not delete Post with id=" + id,
              });
            });
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};
