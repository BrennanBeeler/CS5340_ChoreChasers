const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
                                   emailId:
                                       {   type: String,
                                           unique : true,
                                           required : true,
                                           // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                                           },
                                   username: {type: String,
                                              // unique : true,
                                              required : true},
                                   password:
                                       {   type: String,
                                           required : true,
                                           // minlength: [8, 'Too few characters. Please enter at least 8 characters'],
                                           // maxlength: 16,
                                           // min: [8, 'Too few characters. Please enter at least 8 characters'],
                                           // max: 25
                                       },
                                   points:Number,
                                   backgroundImage:String,
                                   successSound:Boolean,
                                   chores: [{
                                       type: Schema.Types.ObjectId,
                                       ref:'Chore'
                                   },],
                               });

module.exports = mongoose.model('User', userSchema);