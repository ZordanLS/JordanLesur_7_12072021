module.exports = (app) => {
  const posts = require("../controllers/post.controller.js");
  const auth = require("../middleware/auth.js");
  const multer = require("../middleware/multer-config");

  var router = require("express").Router();

  // Create a new Post
  router.post("/", multer, posts.create);

  // Retrieve all Posts
  router.get("/", auth, posts.findAll);

  router.get("/user/:id", auth, posts.findUsersPosts);

  // Retrieve a single Post with id
  router.get("/:id", posts.findOne);

  // Delete a Post with id
  router.delete("/:id", posts.delete);

  app.use("/api/posts", router);
};
