/*Let's not delete this file until we're fully done because some of the mongo concepts used here
* could be potentially helpful if we need it in the future.
*/

const ObjectId = require('mongodb').ObjectID;
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
            groupId = new ObjectId(groupId);
            await groupCollection.updateOne(
                {"_id": groupId},
                {
                    $addToSet: {
                        // TODO does each chore need to be checked for uniqueness in some way?
                        chores: newChore
                    }
                }
            );
            console.log('Added group chore');
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
            console.log('Added user personal chore');
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
            groupId = new ObjectId(groupId);
            await groupCollection.updateOne(
                { "_id": groupId, "chores.id": choreId },
                { $set: { 'chores.$' : {newChore } } }
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
                { $set: { 'chores.$' : {newChore } } }
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
            groupId = new ObjectId(groupId);
            await groupCollection.updateOne(
                {"_id": groupId},
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
* Takes group id as string.
* All personal chores of the user is returned.
* */
async function getAllGroupChores(groupId) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const groupCollection = db.collection("groups");
        try {
            groupId = new ObjectId(groupId); //converts string id to mongo object _id
            await groupCollection
                .find({"_id":groupId}).project({chores:1,_id:0})
                .toArray(function(err, result){
                    if(err) throw err;
                    console.log(result);
                    return result;
                });
            // TODO this shows full chores on mongo shell but returns the chore array as [Object]s - check if this is okay for frontend
            console.log('Retrieved all group chores');

        } catch (err) {
            console.log(err);
        }
    }
    else {
        return [];
    }
}

/*
* GET
* Takes user's email ID.
* All personal chores of the user is returned.
* */
async function getAllPersonalChores(userEmailID) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const userCollection = db.collection("users");
        try {
            await userCollection
                .find({"emailId":userEmailID}).project({chores:1,_id:0})
                .toArray(function(err, result){
                    if(err) throw err;
                    console.log(result);
                    return result;
                });
            // TODO this shows full chores on mongo shell but returns the chore array as [Object]s - check if this is okay for frontend
            console.log('Retrieved all personal chores');

        } catch (err) {
            console.log(err);
        }
    }
    else {
        return [];
    }
}


/*
* POST
* Takes JSON of of user's input, adhering to group JSON format.
* Toggle is assumed to be true and chores is assumed to be empty, by default.
* Group is added to chore chasers (adding groupId to users will be done later).
* */
async function addNewGroup(newGroup) { //pass in an array of members, person who created the group
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const groupCollection = db.collection("groups");
        try {
            await groupCollection.insertOne(
                newGroup,
            );
            console.log('Added group');
        } catch (err) {
            console.log(err);
        }
    }
}


/*
* DELETE
* Takes group ID of the group to be deleted.
* Group will be permanently deleted.
* */
async function deleteGroup(groupId) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const groupCollection = db.collection("groups");
        try {
            groupId = new ObjectId(groupId);
            await groupCollection.deleteOne(
                {"_id": groupId}
            );

            console.log('Deleted group');
        } catch (err) {
            console.log(err);
        }
    }
}


/*
* POST
* Takes JSON of of user's input, adhering to user JSON format.
* Group ids and chores are assumed to be empty, by default.
* User is added to chore chasers (adding groupId to users will be done later).
* */
async function addNewUser(newUser) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const userCollection = db.collection("users");
        try {
            await userCollection.insertOne(
                newUser,
            );
            console.log('Added user to ChoreChasers');
        } catch (err) {
            console.log(err);
        }
    }
}


/*
* DELETE
* Takes user's email ID to be deleted.
* User will be removed from ChoreChasers.
* */
async function deleteUser(userEmailID) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const userCollection = db.collection("users");
        try {
            await userCollection.deleteOne(
                {"emailId": userEmailID}
            );

            console.log('Deleted user from ChoreChasers');
        } catch (err) {
            console.log(err);
        }
    }
}



console.log('\n --- Testing ---');

//test JSON chore to add to Group chore
const newGroupChore = {
    id:3,
    done:false,
    choreName: 'Walk the dogs',
    dueDate: new Date("2021-03-22"),
    repeatChore: "Daily",
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

// add new group record
const roomiesGroup = {
    // id: 2,
    name: 'Roomies',
    progressBar: true,
    chores: []
};

// add another new group record
const friendsGroup = {
    // id: 2,
    name: 'Friends',
    progressBar: true,
    chores: []
};

// add new user record
const userVinnie = {
    emailId: 'vinnie00@gmail.com',
    groupIds: [],
    username: 'vinnie00',
    password:'password',
    chores: []
};

// addGroupChore(newGroupChore,"605ccd1c5307f06df7bfef7d");
// addPersonalChore(newPersonalChore,'max123@gmail.com');
// editPersonalChore(editedUserChore,'max123@gmail.com',1);
// editGroupChore(editedGroupChore,"605bed229cd089604954ed1b",2);
// deleteGroupChore("605bed229cd089604954ed1b",3);
// deletePersonalChore('max123@gmail.com',2);
// getAllPersonalChores('max123@gmail.com');
// getAllGroupChores("605ccd1c5307f06df7bfef7d"); //gives result as [Object], must fix
// addNewGroup(roomiesGroup);
// addNewGroup(friendsGroup);
// deleteGroup("605bed229cd089604954ed1b");
// addNewUser(userVinnie);
// deleteUser('vinnie00@gmail.com');

//605bed229cd089604954ed1b