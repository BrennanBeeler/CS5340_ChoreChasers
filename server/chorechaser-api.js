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
* Takes JSON of user input from Add New Chore.
* Chore is added to respective group list of chores.
* */
async function addGroupChore(newChore, groupId) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const groupCollection = db.collection("groups");
        const docs = await groupCollection.find({id: groupId})
            .toArray();
        console.log('Result of find:\n', docs);
        try {
            await groupCollection.updateOne(
                {"id": groupId},
                {
                    $push: {
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
* Takes JSON of user input from Add New Chore.
* Chore is added to the user's personal chores.
* */
async function addPersonalChore(newChore, userEmailID) {
    const db = await getDB();
    // TODO not sure if it's a bad thing for program to keep running when this function is run
    if (db != null) {
        const userCollection = db.collection("users");
        const docs = await userCollection.find({emailId: userEmailID})
            .toArray();
        console.log('Result of find:\n', docs);
        try {
            await userCollection.updateOne(
                {"emailId": userEmailID},
                {
                    $push: {
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

addGroupChore(newGroupChore,1);
addPersonalChore(newPersonalChore,'max123@gmail.com');