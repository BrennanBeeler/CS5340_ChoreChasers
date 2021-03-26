// module.exports = mongoose => {
//     const Group = mongoose.model(
//         "group",
//         mongoose.Schema(
//             {
//                 name: String,
//                 progressBar: Boolean,
//                 members: [],
//                 chores: []
//             },
//         )
//     );
//
//     return Group;
// };
const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const groupSchema = new Schema({
                                       name: String,
                                       progressbar: Boolean,
                                       chores: [{
                                           type: Schema.Types.ObjectId,
                                           ref: 'Chore'
                                       }]
                                   },
                                   {timestamps: true});

module.exports = mongoose.model('Group', groupSchema);