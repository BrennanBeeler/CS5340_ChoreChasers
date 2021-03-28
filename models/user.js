const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
                                   emailId: {type: String, unique : true, required : true},
                                   username: {type: String, unique : true, required : true},
                                   password: {type: String, required : true},
                                   chores: [{
                                       type: Schema.Types.ObjectId,
                                       ref:'Chore'
                                   }
                                   ]
                               });

module.exports = mongoose.model('User', userSchema);