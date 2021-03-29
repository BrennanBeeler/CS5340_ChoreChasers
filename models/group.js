const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const groupSchema = new Schema({
                                   name: {type: String, required : true},
                                   progressBar: Boolean,
                                   members:[], // receive ids from frontend
                                   chores: [{
                                       type: Schema.Types.ObjectId,
                                       ref:'Chore'
                                   }
                                   ]
                               });

module.exports = mongoose.model('Group', groupSchema);
