module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
      
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);

    // Login
    router.post("/login", users.login);
  
    app.use('/api/users', router);
  };