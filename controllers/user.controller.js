const db = require("../models");
var async = require('async');
const bcrypt = require("bcrypt");
const User = db.users;
const Chore = db.chores;
const Group = db.groups;

// Create and Save a new User
exports.createNewUser =  (req, res) => {

    if (!req.body.emailId) {
        res.status(400).send({ message: "Email can not be empty!" });
        return;
    }

    // Create a User
    const user = new User({
                              emailId: req.body.emailId,
                              username: req.body.username,
                              password: req.body.password,
                              points:req.body.points,
                              backgroundImage:req.body.backgroundImage,
                              successSound:req.body.successSound,
                              chores: req.body.chores
    });

    // Save User in the database
    user
        .save(user)
        .then(userData => {
            if (!userData) {
                res.status(404).send({
                                         message: "User not created!"
                                     });
            } else {
                res.send(userData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "User not created!"
                                 });
        });

};


// Add a personal chore to user after adding it to Chore collection.
exports.addPersonalChore = (req, res) => {
    if (!req.body.choreName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a personal chore
    const personalChore = new Chore({
                                     done: req.body.done,
                                     choreName: req.body.choreName,
                                     dueDate: req.body.dueDate,
                                     repeatChore: req.body.repeatChore,
                                     choreInstructions: req.body.choreInstructions,
                                     assignees: req.body.assignees, // if empty, that means it is a personal chore
                                     assignor: req.body.assignor, //can be personal chore as well
                                     rewards: req.body.rewards,
                                     points: req.body.points,
                                     realLifeItem: req.body.realLifeItem,
                                     splitReward: req.body.splitReward
                                 });

    personalChore
        .save(personalChore)
        .then(personalChoreData => {
            return User.findOneAndUpdate({ _id: req.params.id },
                                          {$push: {chores: personalChoreData._id}}, { new: true, useFindAndModify: false});
        })
        .then(userData=> {
            if (!userData) {
                res.status(404).send({
                                         message: "Chore not added!"
                                     });
            } else {
                res.send(userData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Chore not added!"
                                 });
        });

};


// Retrieve a user, along with their personal chores, by using _id
exports.getUserWithId =  (req, res) => {

    User
        .findOne({ _id: req.params.id })
        .populate("chores")
        .then(userData=> {
            if (!userData) {
                res.status(404).send({
                                         message: "User could not be retrieved!"
                                     });
            } else {
                res.send(userData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "User could not be retrieved!"
                                 });
        });

};


// Retrieve a user with their emailId
exports.getUserWithEmail =  (req, res) => {

    User
        .findOne({ emailId: req.params.email })
        .then(userData=> {
            if (!userData) {
                res.status(404).send({
                                         message: "User could not be retrieved!"
                                     });
            } else {
                res.send(userData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "User could not be retrieved!"
                                 });
        });


};


// Retrieve a user with their username
exports.getUserWithUsername =  (req, res) => {

    User
        .findOne({ username: req.params.username })
        .then(userData=> {
            if (!userData) {
                res.status(404).send({
                                         message: "User could not be retrieved!"
                                     });
            } else {
                res.send(userData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "User could not be retrieved!"
                                 });
        });

};

// Compare Log In details with existing User
exports.checkLoginUser =  (req, res) => {

    User
        .findOne({ emailId: req.body.emailId, password:req.body.password })
        .then(userData=> {
            if (!userData) {
                res.status(404).send({
                                         message: "User could not be retrieved. Unsuccessful login."
                                     });
            } else {
                res.send(userData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "User could not be retrieved. Unsuccessful login."
                                 });
        });


};

// Delete a User, when they delete their account, with the specified id in the request
//User reference will get deleted from respective members/assignees lists in Group/Chore, if they exist there as well
exports.deleteUserAccount = (req, res) => {

    const id = req.params.id;
    async.waterfall([
                        function (callback) {
                            // code a: Remove User
                            User.findByIdAndRemove(
                                { _id: id},
                                {useFindAndModify:false},
                                function (err, user) {
                                    if(!user) {
                                        res.status(404).send({
                                                                 message: `Cannot delete User with id=${id}. Maybe User was not found!`
                                                             });
                                    }
                                    else {
                                        if (err) callback(err);
                                        callback(null, user);
                                    }
                                }
                            );
                        },

                        function (doc, callback) {
                            // code b: Remove associated group members
                            Group.updateOne(
                                { "members": id },
                                { "$pull": { "members": id } },
                                function (err, groupMember) {
                                    if (err) callback(err);
                                    callback(null, doc);
                                }
                            );
                        },

                        function (doc, callback) {
                            // code c: Remove associated chore assignees
                            Chore.updateOne(
                                { "assignees": id },
                                { "$pull": { "assignees": id } },
                                function (err, choreAssignee) {
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
                                         message: "User account was deleted successfully!"
                                     });
                            // res.json(result);  // OUTPUT OK
                        }
                    });

};

// Remove a User, when they leave a group, with the specified id in the request
//User reference will get deleted from respective members/assignees lists in Group/Chore, if they exist there
//404 not thrown if deleted user is deleted again - tbd
exports.removeUserFromGroup = (req, res) => {

    const id = req.params.id;
    async.waterfall([

                        function (callback) {
                            // code b: Remove associated group members
                            Group.updateOne(
                                { "members": id },
                                { "$pull": { "members": id } },
                                function (err, groupMember) {
                                    if(!groupMember) {
                                        res.status(404).send({
                                                                 message: `Cannot remove Group member with id=${id}. Maybe User was not found!`
                                                             });
                                    }
                                    else {
                                        if (err) callback(err);
                                        callback(null, groupMember);
                                    }
                                }
                            );
                        },

                        function (doc, callback) {
                            // code c: Remove associated chore assignees
                            Chore.updateOne(
                                { "assignees": id },
                                { "$pull": { "assignees": id } },
                                function (err, choreAssignee) {
                                    if(!choreAssignee) {
                                        res.status(404).send({
                                                                 message: `Cannot remove User assignee with id=${id}. Maybe User was not found!`
                                                             });
                                    }
                                    else {
                                        if (err) callback(err);
                                        callback(null, doc);
                                    }
                                }
                            );
                        }
                    ],
                    function (err, result) {
                        if (err) throw err;
                        if (result) {
                            res.send({
                                         message: "User was removed successfully!"
                                     });
                            // res.json(result);  // OUTPUT OK
                        }
                    });

};


// // Delete a User with the specified id in the request, does not handle references in chore, group
// exports.deleteUser = (req, res) => {
//
//     const id = req.params.id;
//
//     User.findByIdAndRemove(id,{useFindAndModify: false})
//         .then(userData => {
//             if (!userData) {
//                 res.status(404).send({
//                                          message: `Cannot delete User with id=${id}. Maybe User was not found!`
//                                      });
//             } else {
//                 res.send({
//                              message: "User was deleted successfully!"
//                          });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                                      message: err.message || "Could not delete User with id=" + id
//                                  });
//         });
//
// };

// Delete all Users from the database.
exports.deleteAllUsers = (req, res) => {
    User.deleteMany({})
        .then(userData => {
            res.send({
                         message: `${userData.deletedCount} Users were deleted successfully!`
                     });
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Some error occurred while removing all users."
                                 });
        });

};
