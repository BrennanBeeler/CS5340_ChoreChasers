/*
* This is a trial for creating a mongo db, collection and inserting values into said collections
* This file can be deleted after mongo integrations are complete.
*  */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:/chorechaser';

/**
 * Test MongoDB driver using async/await interface
 * supported by newer JavaScript versions (ES2017).
 */
async function testMongoDB_async() {
    console.log('\n --- test mongodb async interface ---');
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // connect to server
        await client.connect();
        console.log('Connected to MongoDB');

        // get database and collection
        const db = client.db();
        const collection = db.collection('groups');

        // add employee record
        const group = {
            id: 1,
            name: 'Family',
            progressBar: true,
            chores: [
                {
                    id:1,
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
        const result = await collection.insertOne(group);
        console.log('Result of insert:\n', result.insertedId);

        // find group by result id
        const docs = await collection.find( { _id: result.insertedId} )
            .toArray();
        console.log('Result of find:\n', docs);
    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }
}

testMongoDB_async();