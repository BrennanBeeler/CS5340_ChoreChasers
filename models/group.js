const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const groupSchema = new Schema({
                                   name: String,
                                   progressBar: Boolean,
                                   members:[], //ref to User collection
                                   chores: [{
                                       type: Schema.Types.ObjectId,
                                       ref:'Chore'
                                   }
                                   ]
                               });

module.exports = mongoose.model('Group', groupSchema);


//
// module.exports = mongoose => {
//     const Group = mongoose.model(
//         "group",
//         mongoose.Schema(
//             {
//                 name: String,
//                 progressBar: Boolean,
//                 members:[], //ref to User collection
//                 chores: [{
//                     type: Schema.Types.ObjectId,
//                     ref:'Chore'
//                 }
//                 ] //should ideally ref to Chores collection - let's see
//             },
//         )
//     );
//
//     return Group;
// };