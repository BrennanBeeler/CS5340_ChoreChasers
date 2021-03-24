/*
* GET
* Retrieves database from Atlas and sets connection
*/
var __client;
async function getDB() {
    if (__client == null) {
        const { MongoClient } = require('mongodb');
        const url = 'mongodb://localhost:/chorechaser';
        // let url = "mongodb+srv://Madhuri:neu@cluster0.tclrt.mongodb.net/masterchef?retryWrites=true&w=majority";
        let client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        try {
            await client.connect(); // connect to server and save connection
            __client = client;
        } catch (err) {
            return null;
        }
    }
    console.log("db fetched");
    return __client.db(); // return database
}


/*
* POST
* Takes JSON of user input from Add New Chore and group ID.
* Chore is added to respective group list of chores.
* */
async function addGroupChore(newChore, groupId) {
    //TODO make sure newChore's id field is auto-incremented
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const groupCollection = db.collection("groups");
        try {
            await groupCollection.updateOne(
                {"id": groupId},
                {
                    $addToSet: {
                        // TODO does each chore need to be checked for uniqueness in some way?
                        chores: newChore
                    }
                }
            );
            console.log('Updated group');
        } catch (err) {
            console.log(err);
        }
    }
}


/*
* POST
* Takes JSON of user input from Add New Chore and user's email ID.
* Chore is added to the user's personal chores.
* */
async function addPersonalChore(newChore, userEmailID) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const userCollection = db.collection("users");
        try {
            await userCollection.updateOne(
                {"emailId": userEmailID},
                {
                    $addToSet: {
                        chores: newChore
                    }
                }
            );
            console.log('Updated user');
        } catch (err) {
            console.log(err);
        }
    }
}


/*
* POST
* Takes edited JSON of user input from Edit Chore, group ID, and selected chore ID.
* Chore is edited onto the selected group chore.
* */
async function editGroupChore(newChore, groupId, choreId) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const groupCollection = db.collection("groups");
        try {
            await groupCollection.updateOne(
                { "id": groupId, "chores.id": choreId },
                { $set: { chores : newChore } }
            );

            console.log('Updated group chore');
        } catch (err) {
            console.log(err);
        }
    }
}

/*
* POST
* Takes edited JSON of user input from Edit Chore, user's email ID and required chore ID.
* Chore is edited onto the user's selected personal chore.
* */
async function editPersonalChore(newChore, userEmailID,choreId) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const userCollection = db.collection("users");
        try {
            await userCollection.updateOne(
                { "emailId": userEmailID, "chores.id": choreId },
                { $set: { chores : newChore } }
            );

            console.log('Updated user chore');
        } catch (err) {
            console.log(err);
        }
    }
}


/*
* DELETE
* Takes group ID and chore ID of group chore to be deleted.
* Chore is deleted from the selected group.
* */
async function deleteGroupChore(groupId, choreId) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const groupCollection = db.collection("groups");
        try {
            await groupCollection.updateOne(
                {"id": groupId},
                { $pull: { chores: { id: choreId} } },
            );

            console.log('Deleted group chore');
        } catch (err) {
            console.log(err);
        }
    }
}

/*
* DELETE
* Takes user's email ID and required chore ID.
* Chore is deleted from the user's personal chores.
* */
async function deletePersonalChore(userEmailID, choreId) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const userCollection = db.collection("users");
        try {
            await userCollection.updateOne(
                {"emailId": userEmailID},
                { $pull: { chores: { id: choreId} } },
            );

            console.log('Deleted personal chore');
        } catch (err) {
            console.log(err);
        }
    }
}


/*
* GET
* Takes user's email ID.
* All personal chores of the user is returned.
* */
// async function getAllPersonalChores(userEmailID) {
//     const db = await getDB();
//     // TODO not sure if it's a bad thing for program to keep running when this function is run
//     if (db != null) {
//         const userCollection = db.collection("users");
//         try {
//             //db.groups.find({},{chores:1,id:1,_id:0})
//             //db.users.find({},{chores:1,emailId:'max123@gmail.com',_id:0})
//             await userCollection
//                 .find({}, {chores:1,emailId:userEmailID,_id:0}).toArray(function(err, result){
//                     if(err) throw err;
//                     console.log(result);
//                     return result;
//                 });
//             // TODO this works on terminal but returns the whole user _id through code?
//             console.log('Retrieved all personal chores');
//             // console.log(result);
//             // return result;
//
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     else {
//         return [];
//     }
// }


console.log('\n --- Testing ---');

//test JSON chore to add to Group chore
const newGroupChore = {
    id:3,
    done:false,
    choreName: 'Walk the dog',
    dueDate: new Date("2021-03-22"),
    repeatChore: "Weekly",
    choreInstructions: "",
    rewards:{points:false,realLifeItem:false},
    points:0,
    realLifeItem:"",
    splitReward:{everyoneGetsReward:false,fcfs:false}
};

//test JSON chore to add to personal chore
const newPersonalChore = {
    id:2,
    done:false,
    choreName: 'Vacuum your room',
    dueDate: new Date("2021-03-22"),
    repeatChore: "Weekly",
    choreInstructions: "",
    rewards:{points:false,realLifeItem:false},
    points:0,
    realLifeItem:"",
    splitReward:{everyoneGetsReward:false,fcfs:false}
};

//test JSON chore to edit a personal chore
const editedUserChore = {
    id:1,
    done:false,
    choreName: 'Clean your room',
    dueDate: new Date("2021-03-22"),
    repeatChore: "Weekly",
    choreInstructions: "",
    rewards:{points:false,realLifeItem:false},
    points:0,
    realLifeItem:"",
    splitReward:{everyoneGetsReward:false,fcfs:false}
};

//test JSON chore to edit a Group chore
const editedGroupChore = {
    id:2,
    done:false,
    choreName: 'Wash the kitchen',
    dueDate: new Date("2021-03-25"),
    repeatChore: "Never",
    choreInstructions: "",
    rewards:{points:false,realLifeItem:false},
    points:0,
    realLifeItem:"",
    splitReward:{everyoneGetsReward:false,fcfs:false}
};

// addGroupChore(newGroupChore,1);
// addPersonalChore(newPersonalChore,'max123@gmail.com');
// editPersonalChore(editedUserChore,'max123@gmail.com',1);
// editGroupChore(editedGroupChore,1,2);
// deleteGroupChore(1,3);
// deletePersonalChore('max123@gmail.com',2);
// getAllPersonalChores('max123@gmail.com');
