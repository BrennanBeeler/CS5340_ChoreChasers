const db = require("../models");
const User = db.users;
const Chore = db.chores;

// Create and Save a new User
exports.createNewUser =  (req, res) => {

    if (!req.body.emailId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a User
    const user = new User({
                              emailId: req.body.emailId,
                              username: req.body.username,
                              password: req.body.password,
                              chores: req.body.chores
                          });

    // Save User in the database
    user
        .save(user)
        .then(userData => {
            res.send(userData);
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
            res.send(userData);
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
            res.send(userData);
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
    const emailId = req.query.emailiD;
    var condition = emailId ? { emailId: { $regex: new RegExp(emailId), $options: "i" } } : {};

    User
        .findOne(condition)
        .then(userData=> {
            res.send(userData);
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "User could not be retrieved!"
                                 });
        });

};


// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {

    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(userData => {
            if (!userData) {
                res.status(404).send({
                                         message: `Cannot delete User with id=${id}. Maybe User was not found!`
                                     });
            } else {
                res.send({
                             message: "User was deleted successfully!"
                         });
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message: err.message || "Could not delete User with id=" + id
                                 });
        });

};

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


// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {

};