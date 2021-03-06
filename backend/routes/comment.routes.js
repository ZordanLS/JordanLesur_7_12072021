module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();

  // Create a new Comment
  router.post("/", comments.create);

  router.get("/post/:id", auth, comments.findPostsComments);

  // Delete a Post with id
  router.delete("/:id", comments.delete);

  app.use("/api/comments", router);
};
