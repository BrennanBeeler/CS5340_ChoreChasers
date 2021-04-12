module.exports = app => {
    const chores = require("../controllers/chore.controller.js");

    var router = require("express").Router();

    // Update a Chore
    router.put("/id/:id",chores.updateChore);

    //Get a specific chore with its id
    router.get("/id/:id",chores.getChoreWithId);

    //Add an existing user as an assignee to a chore
    router.post("/assignee/:id", chores.addChoreAssignee);

    //Delete a specific Chore with its id
    router.delete("/id/:id",chores.deleteChore);

    //Delete all Chores in the chores collection
    router.delete("/",chores.deleteAllChores);

    app.use('/api/chores', router);
};