module.exports = app => {
    const chores = require("../controllers/chore.controller.js");

    var router = require("express").Router();

    // Create a new Chore
    router.post("/:id",chores.updateChore);

    //Delete a specific Chore with its id
    router.delete("/:id",chores.deleteChore);

    //Delete all Chores in the chores collection
    router.delete("/",chores.deleteAllChores);

    app.use('/api/chores', router);
};