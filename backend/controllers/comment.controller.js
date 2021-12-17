const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.commentcontent) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let userToken = req.body.usertoken;
  jwt.verify(userToken, "RANDOM_TOKEN_SECRET", function (err, tokeninfo) {
    let userIdDecoded = tokeninfo.userId;

    // Create a Comment
    const comment = {
      content: req.body.commentcontent,
      userId: userIdDecoded,
      postId: req.body.post_id,
    };

    // Save Comment in the database
    Comment.create(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the comment.",
        });
      });
  });
};

// Retrieve all Comments from one post.
exports.findPostsComments = (req, res) => {
  let id = req.params.id;

  db.sequelize
    .query(
      `SELECT A.*, B.first_name, B.last_name, B.email, B.picture FROM comments A INNER JOIN users B ON A.user_id = B.id WHERE A.post_id=${id} order by A.createdAt ASC`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving comments.",
      });
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};
