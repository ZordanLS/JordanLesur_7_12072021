module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const auth = require("../middleware/auth.js");
  const multer = require("../middleware/multer-config");

  var router = require("express").Router();

  // Create a new User
  router.post("/", multer, users.create);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", multer, users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Login
  router.post("/login", users.login);

  app.use("/api/users", router);
};
