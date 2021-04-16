const db = require("../models");
var async = require('async');
const Group = db.groups;
const Chore = db.chores;
const User = db.users;

// Create and Save a new Group
exports.createNewGroup =  (req, res) => {

    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Group
    const group = new Group({
                                      name: req.body.name,
                                      members:req.body.members,
                                      progressBar: req.body.progressBar,
                                      chores: req.body.chores
                                  });

    // Save Group in the database
    group
        .save(group)
        .then(groupData => {
            if (!groupData) {
                res.status(404).send({
                                         message: "Group not created!"
                                     });
            } else {
                res.send(groupData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Group not created!"
                                 });
        });

};


// Add a chore to Group after adding it to Chore collection.
exports.addGroupChore = (req, res) => {
    if (!req.body.choreName) {
        res.status(400).send({ message: "Chore title/name can not be empty!" });
        return;
    }

    // Create a group chore
    const groupChore = new Chore({
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

    groupChore
        .save(groupChore)
        .then(groupChoreData => {
            return Group.findOneAndUpdate({ _id: req.params.id },
                                          {$push: {chores: groupChoreData._id}}, { new: true, useFindAndModify: false});
        })
        .then(groupData=> {
            if (!groupData) {
                res.status(404).send({
                                         message: "Chore not created!"
                                     });
            } else {
                res.send(groupData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Chore not added!"
                                 });
        });

};


// Retrieve a group, along with its chores, with its id
exports.getGroupWithId =  (req, res) => {

    Group
        .findOne({ _id: req.params.id })
        .populate("chores")
        .then(groupData=> {
            if (!groupData) {
                res.status(404).send({
                                         message: "Group could not be retrieved!"
                                     });
            } else {
                res.send(groupData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Group could not be retrieved!"
                                 });
        });

};


// Delete a Group with the specified id in the request
exports.deleteGroup = (req, res) => {

    const id = req.params.id;

    Group.findByIdAndRemove(id ,{useFindAndModify: false})
        .then(groupData => {
            if (!groupData) {
                res.status(404).send({
                                         message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
                                     });
            } else {
                res.send({
                             message: "Group was deleted successfully!"
                         });
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message: err.message || "Could not delete Group with id=" + id
                                 });
        });

};

// Delete all Groups from the database.
exports.deleteAllGroups = (req, res) => {
    Group.deleteMany({})
        .then(groupData => {
            res.send({
                         message: `${groupData.deletedCount} Groups were deleted successfully!`
                     });
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Some error occurred while removing all groups."
                                 });
        });

};


//find all groups that a given user belongs to
exports.getGroupWithUserId = (req, res) => {
    Group.find({ members : req.params.id })
        .exec(function (err, groups) {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                                                    message: "Group not found with given User Id " + req.params.id
                                                });
                }
                return res.status(500).send({
                                                message: "Error retrieving Group with given User Id " + req.params.id
                                            });
            }

            res.send(groups);
        });

};

//Add an exiting user/member to an existing group
//Required id is group id
//TBD - it will need the group Id in advance so this method is subject to change
exports.addGroupMember = (req, res) => {

    Group.findOneAndUpdate({ _id: req.params.id },
                                  {$addToSet: {members: req.body._id}}, { new: true, useFindAndModify: false})
        .then(groupData=> {
            if (!groupData) {
                res.status(404).send({
                                         message: "Member not added!"
                                     });
            } else {
                console.log("Successfully added member!");
                console.log(groupData);
                res.send(groupData);
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message:
                                         err.message || "Member not added!"
                                 });
        });



};
