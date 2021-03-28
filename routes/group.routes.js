module.exports = app => {
    const groups = require("../controllers/group.controller.js");

    var router = require("express").Router();

    // Create a new Group
    router.post("/", groups.createNewGroup);

    //Add a chore to an existing Group
    router.post("/chore/:id",groups.addGroupChore);

    //Get a specific Group with its id
    router.get("/id/:id",groups.getGroupWithId);

    //Delete a specific Group with its id
    router.delete("/id/:id", groups.deleteGroup);

    //Delete all Groups in the groups collection
    router.delete("/",groups.deleteAllGroups);

    app.use('/api/groups', router);
};