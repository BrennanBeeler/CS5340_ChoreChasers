const db = require("../models");
const Chore = db.chores;


// Update a Chore by the id in the request
exports.updateChore = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
                                        message: "Chore to update can not be empty!"
                                    });
    }

    const id = req.params.id;

    Chore.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(choreData => {
            if (!choreData) {
                res.status(404).send({
                                         message: `Cannot update Chore with id=${id}. Maybe Chore was not found!`
                                     });
            } else res.send({ message: "Chore was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                                     message: err.message || "Error updating Chore with id=" + id
                                 });
        });

};

// Delete a Chore with the specified id in the request
exports.deleteChore = (req, res) => {

    const id = req.params.id;

    Chore.findByIdAndRemove(id)
        .then(choreData => {
            if (!choreData) {
                res.status(404).send({
                                         message: `Cannot delete Chore with id=${id}. Maybe Chore was not found!`
                                     });
            } else {
                res.send({
                             message: "Chore was deleted successfully!"
                         });
            }
        })
        .catch(err => {
            res.status(500).send({
                                     message: err.message || "Could not delete Chore with id=" + id
                                 });
        });

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