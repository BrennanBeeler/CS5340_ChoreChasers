const {Schema} = require('mongoose');
const mongoose = require('mongoose');


const choreSchema = new Schema({
                                   done: {type: Boolean, required : true},
                                   choreName: {type: String, required : true},
                                   dueDate: Date,
                                   repeatChore: String,
                                   choreInstructions: String,
                                   assignees: [], // if empty, that means it is a personal chore
                                   assignor: String, //can be personal chore as well
                                   rewards: {pointsCB:Boolean,realLifeItemCB:Boolean},
                                   points: Number,
                                   realLifeItem: String,
                                   splitReward: {everyoneGetsRewardRB:Boolean,fcfsRB:Boolean}
                               });

module.exports = mongoose.model('Chore', choreSchema);