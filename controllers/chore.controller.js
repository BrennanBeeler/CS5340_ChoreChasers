const db = require("../models");
var async = require('async');
const Chore = db.chores;
const User = db.users;
const Group = db.groups;


// Update a Chore by the id in the request
//Chore reference will get updated from respective chores lists in Group/User, if they exist there as well
exports.updateChore = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
                                        message: "Chore to update can not be empty!"
                                    });
    }

    const id = req.params.id;

    async.waterfall([
                        function (callback) {
                            // code a: Update Chore
                            Chore.findByIdAndUpdate(
                                { _id: id},
                                req.body,
                                {useFindAndModify:false},
                                function (err, chore) {
                                    if(!chore) {
                                        res.status(404).send({
                                                                 message: `Cannot update Chore with id=${id}. Maybe Chore was not found!`
                                                             });
                                    }
                                    else {
                                        if (err) callback(err);
                                        callback(null, chore);
                                    }
                                }
                            );
                        },

                        function (doc, callback) {
                            // code b: Update associated group chores
                            Group.updateOne(
                                { "chores": id },
                                { "set": { "chores.$": req.body } },
                                function (err, groupChore) {
                                    if (err) callback(err);
                                    callback(null, doc);
                                }
                            );
                        },

                        function (doc, callback) {
                            // code c: Update associated user chores
                            User.updateOne(
                                { "chores": id },
                                { "set": { "chores.$": req.body } },
                                function (err, personalChore) {
                                    if (err) callback(err);
                                    callback(null, doc);
                                }
                            );
                        }
                    ],
                    function (err, result) {
                        if (err) throw err;
                        if (result) {
                            res.send({
                                         message: "Chore was updated/edited successfully!"
                                     });
                        }
                    });

    // Chore.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    //     .then(choreData => {
    //         if (!choreData) {
    //             res.status(404).send({
    //                                      message: `Cannot update Chore with id=${id}. Maybe Chore was not found!`
    //                                  });
    //         } else res.send({ message: "Chore was updated successfully." });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //                                  message: err.message || "Error updating Chore with id=" + id
    //                              });
    //     });

};

//Find a single chore based on its id
exports.getChoreWithId = (req,res) => {
    const id = req.params.id;

    Chore.findById(id)
        .then(choreData => {
            if (!choreData)
                res.status(404).send({ message: "Chore with id " + id + "was not found"});
            else res.send(choreData);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Error retrieving Chore with id=" + id });
        });
};

//Add an exiting user/member as a chore assignee
//Required id is chore id
//TBD - it will need the chore Id in advance so this method is subject to change
exports.addChoreAssignee = (req, res) => {

    Chore.findOneAndUpdate({ _id: req.params.id },
                           {$addToSet: {assignees: req.body._id}}, { new: true, useFindAndModify: false})
        .then(choreData=> {
            if (!choreData) {
                res.status(404).send({
                                         message: "Assignee not added!"
                                     });
            } else {
                console.log("Successfully added assignee!");
                console.log(choreData);
                res.send(choreData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Assignee not added!"
                                 });
        });



};



// Delete a Chore with the specified id in the request
//Chore reference will get deleted from respective chores lists in Group/User, if they exist there as well
exports.deleteChore = (req, res) => {

    const id = req.params.id;
    async.waterfall([
                        function (callback) {
                            // code a: Remove Chore
                            Chore.findByIdAndRemove(
                                { _id: id},
                                {useFindAndModify:false},
                                function (err, chore) {
                                    if(!chore) {
                                        res.status(404).send({
                                                                 message: `Cannot delete Chore with id=${id}. Maybe Chore was not found!`
                                                             });
                                    }
                                    else {
                                        if (err) callback(err);
                                        callback(null, chore);
                                    }
                                }
                            );
                        },

                        function (doc, callback) {
                            // code b: Remove associated group chores
                            Group.updateOne(
                                { "chores": id },
                                { "$pull": { "chores": id } },
                                function (err, groupChore) {
                                    if (err) callback(err);
                                    callback(null, doc);
                                }
                            );
                        },

                        function (doc, callback) {
                            // code c: Remove associated user chores
                            User.updateOne(
                                { "chores": id },
                                { "$pull": { "chores": id } },
                                function (err, personalChore) {
                                    if (err) callback(err);
                                    callback(null, doc);
                                }
                            );
                        }
                    ],
                    function (err, result) {
                                if (err) throw err;
                                if (result) {
                                    res.send({
                                              message: "Chore was deleted successfully!"
                                    });
                                // res.json(result);  // OUTPUT OK
                    }
    });

    //only deletes from chore collection
    // Chore.findByIdAndRemove(id)
    //     .then(choreData => {
    //         if (!choreData) {
    //             res.status(404).send({
    //                                      message: `Cannot delete Chore with id=${id}. Maybe Chore was not found!`
    //                                  });
    //         } else {
    //             res.send({
    //                          message: "Chore was deleted successfully!"
    //                      });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //                                  message: err.message || "Could not delete Chore with id=" + id
    //                              });
    //     });
};

// Delete all Chores from the database.
exports.deleteAllChores = (req, res) => {
    Chore.deleteMany({})
        .then(choreData => {
            res.send({
                         message: `${choreData.deletedCount} Chores were deleted successfully!`
                     });
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Some error occurred while removing all chores."
                                 });
        });

};

// Find all published Chores
exports.findAllChores = (req, res) => {

};