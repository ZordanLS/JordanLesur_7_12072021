module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();

  // Create a new Post
  router.post("/", comments.create);

  // Retrieve all comments
  router.get("/",auth, comments.findAll);

  // Retrieve a single Post with id
  router.get("/:id", comments.findOne);

  // Delete a Post with id
  router.delete("/:id", comments.delete);

  app.use("/api/comments", router);
};
