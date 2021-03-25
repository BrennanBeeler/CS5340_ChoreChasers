/*This is an initialization file that is run at least once before launching the website.
* It will create and initialize the chorechaser database and the necessary collections for them to
* be accessed easily from the CRUD chorechaser-api.
* */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:/chorechaser';
// TODO change localhost URL to Atlas cluster URL

/*
* Creates text index for "chorechaser" database's "user" collection
* Makes email ID field unique.
*/
async function createUserIndex(userCollection) {
    await userCollection.createIndexes( { "emailId": 1 }, { unique: true });
}

/**
 * MongoDB driver using async/await interface
 * supported by newer JavaScript versions (ES2017).
 */
async function initializeDB() {
    console.log('\n --- Initializing database and collections ---');
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // connect to server
        await client.connect();
        console.log('Connected to MongoDB');

        // get database and collection
        const db = client.db();
        const groupCollection = db.collection('groups');
        const userCollection = db.collection('users');
        createUserIndex(userCollection);

        // //check if group collection already exists
        groupCollection.countDocuments({})
            .then(async function (checkExists) {
                // console.log(checkExists);
                if(checkExists > 0) {
                    console.log("Deleting existing group collection...");
                    await groupCollection.drop();
                    client.close();
                }
                else {
                    console.log("No existing group collections to delete");
                    client.close();
                }
            });


        //check if user collection already exists
        await userCollection.countDocuments({})
            .then(async function (checkExists) {
                // console.log(checkExists);
                if(checkExists > 0) {
                    console.log("Deleting existing user collection...");
                    await userCollection.drop();
                    client.close();
                }
                else {
                    console.log("No existing user collections to delete");
                    client.close();
                }
            });
    }
    catch(err) {
        console.log(err);
    }
}

initializeDB();

/* This is for testing purposes and to refer to the JSON format
* */

//group record format
const familyGroup = {
    name: 'Family',
    progressBar: true,
    chores: [
        {
            id:1,
            done:true,
            choreName: 'Pick dad up from the airport',
            dueDate: new Date("2021-03-23"),
            repeatChore: "Never",
            choreInstructions: "flight lands at 5pm, be at airport by 4:45pm and DON'T BE LATE",
            // TODO need to confirm assignees' relationship to group
            rewards:{points:true,realLifeItem:false},
            points:20,
            realLifeItem:"",
            splitReward:{everyoneGetsReward:true,fcfs:false}
            //TODO need to decide where we add cooperative/competitive radio buttons, points stepper, textbox
        },

        {
            id:2,
            done:false,
            choreName: 'Wash the dishes',
            dueDate: new Date("2021-03-22"),
            repeatChore: "Weekly",
            choreInstructions: "",
            rewards:{points:false,realLifeItem:false},
            points:0,
            realLifeItem:"",
            splitReward:{everyoneGetsReward:false,fcfs:false}
        }]
};

//user record format
const userMax = {
    emailId: 'max123@gmail.com',
    // TODO figure out how to add group _id and not id field
    groupIds: [],
    pendingGroups:[],
    username: 'max123',
    password:'password',
    chores: [
        {
            id:1,
            done:true,
            choreName: 'Call Anne about the party',
            dueDate: new Date(),
            repeatChore: "Never",
            choreInstructions: "Call before 6PM",
            // TODO need to confirm assignees' relationship to group
            rewards:{points:true,realLifeItem:false},
            points:0,
            realLifeItem:"snack",
            splitReward:{everyoneGetsReward:false,fcfs:false}
            //TODO need to decide where we add cooperative/competitive radio buttons, points stepper, textbox
        }]
};
