module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.createNewUser);

    //Add a chore to an existing user's personal chores
    router.post("/:id",users.addPersonalChore);

    //Get a specific User with their id
    router.get("/:id",users.getUserWithId);

    //Get a specific User with their emailId
    router.get("/",users.getUserWithEmail);

    //Delete a specific User with its id
    router.delete("/:id", users.deleteUser);

    //Delete all Users in the users collection
    router.delete("/",users.deleteAllUsers);

    app.use('/api/users', router);
};