// module.exports = mongoose => {
//     const Chore = mongoose.model(
//         "chore",
//         mongoose.Schema(
//             {
//                 groupId: mongoose.Schema.Types.ObjectId,
//                 userEmailPersonal: String, //user's email if the chore is also a personal chore
//                 done: Boolean,
//                 choreName: String,
//                 dueDate: Date,
//                 repeatChore: String,
//                 choreInstructions: String,
//                 assignees: Array,
//                 assignor: String,
//                 rewards: {points:Boolean,realLifeItem:Boolean},
//                 points: Number,
//                 realLifeItem: String,
//                 splitReward: {everyoneGetsReward:Boolean,fcfs:Boolean}
//             },
//         )
//     );
//
//     return Chore;
// };

const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const choreSchema = new Schema({
                                   // groupId: mongoose.Schema.Types.ObjectId,
                                   // userEmailPersonal: String, //user's email if the chore is also a personal chore
                                   done: Boolean,
                                   choreName: String,
                                   dueDate: Date,
                                   repeatChore: String,
                                   choreInstructions: String,
                                   assignees: Array,
                                   assignor: String,
                                   rewards: {points:Boolean,realLifeItem:Boolean},
                                   points: Number,
                                   realLifeItem: String,
                                   splitReward: {everyoneGetsReward:Boolean,fcfs:Boolean},
                                   group:{
                                       type: Schema.Types.ObjectId,
                                       ref: 'Group',
                                       required:true
                                   }
                               },
                               {timestamps: true});

module.exports = mongoose.model('Chore', choreSchema);