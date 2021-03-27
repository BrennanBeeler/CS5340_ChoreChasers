const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
                                   emailId: String,
                                   username: String,
                                   password: String,
                                   groups:[], //ref to Group collection
                                   pendingGroups: [],
                                   chores: [{
                                       type: Schema.Types.ObjectId,
                                       ref:'Chore'
                                   }
                                   ]
                               });

module.exports = mongoose.model('User', userSchema);