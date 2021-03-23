/*This is an initialization file that is run at least once before launching the website.
* It will create and initialize the chorechaser database and the necessary collections for them to
* be accessed easily from the CRUD chorechaser-api.
* */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:/chorechaser';
// TODO change localhost URL to Atlas cluster URL


/*
* Creates text index for "masterchef" database's "recipe" collection
* Adds weights to specific fields to give priority to them while searching
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

        // add group record
        const familyGroup = {
            id: 1,
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

        // add user record
        const userMax = {
            emailId: 'max123@gmail.com',
            // TODO figure out how to add group _id and not id field
            groupIds: [1],
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

        //check if group collection already exists
        groupCollection.countDocuments({})
            .then(function (checkExists) {
                // console.log(checkExists);
                // TODO this still has some error that doesn't reinsert the group - recheck
                if(checkExists > 0) {
                    console.log("Deleting existing group collection...");
                    groupCollection.drop();
                    console.log("Re-entering test group data into groupsCollection...");
                    groupCollection
                        .insertOne(familyGroup, (err) => {
                            if (err) throw err;
                            console.log(`Inserted group!`);
                            client.close();
                        });
                }
                else {
                    console.log("Newly entering test group data into groupsCollection...");
                    groupCollection
                        .insertOne(familyGroup, (err) => {
                            if (err) throw err;
                            console.log(`Inserted group!`);
                            client.close();
                        });
                }
            });
        // TODO remove dummy data insertion after API methods are written

        //check if user collection already exists
        userCollection.countDocuments({})
            .then(function (checkExists) {
                // console.log(checkExists);
                if(checkExists > 0) {
                    console.log("Deleting existing userCollection...");
                    userCollection.drop();
                    console.log("Re-entering test user data into userCollection...");
                    createUserIndex(userCollection);
                    userCollection
                        .insertOne(userMax, (err) => {
                            if (err) throw err;
                            console.log(`Inserted user!`);
                            client.close();
                        });
                }
                else {
                    console.log("Newly entering test user data into userCollection...");
                    createUserIndex(userCollection);
                    userCollection
                        .insertOne(userMax, (err) => {
                            if (err) throw err;
                            console.log(`Inserted user!`);
                            client.close();
                        });
                }
            });
    }
    catch(err) {
        console.log(err);
    }
}

initializeDB();