module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
      
    // Retrieve a single User with email
    router.get("/:email", users.findOne);
  
    // Update a User with email
    router.put("/:email", users.update);
  
    // Delete a User with email
    router.delete("/:email", users.delete);

    // Login
    router.post("/login", users.login);
  
    app.use('/api/users', router);
  };