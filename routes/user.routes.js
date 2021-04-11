module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.createNewUser);

    //Add a chore to an existing user's personal chores
    router.post("/chore/:id",users.addPersonalChore);

    //Get a specific User with their id
    router.get("/id/:id",users.getUserWithId);

    //Get a specific User with their emailId --still doubtful
    router.get("/email/:email",users.getUserWithEmail);

    //Get a specific User with their username
    router.get("/username/:username",users.getUserWithUsername);

    //Check if a User exists before logging them in
    router.post("/login",users.checkLoginUser);

    //Delete a specific User account with its id
    router.delete("/id/:id", users.deleteUserAccount);

    //Remove a specific User from group/chore with its id
    router.delete("/remove/:id", users.removeUserFromGroup);

    //Delete all Users in the users collection
    router.delete("/",users.deleteAllUsers);

    app.use('/api/users', router);
};