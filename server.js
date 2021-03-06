const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const fileServerMiddleware = express.static('public');


var corsOptions = {
    origin: "http://localhost:3000",
    credentials:true,
    optionSuccessStatus:200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', fileServerMiddleware);


// app.get("/", (req, res) => {
//     res.json({ message: "Initial set up works." });
// });

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

require("./routes/group.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/chore.routes.js")(app);


// set port, listen for requests
app.listen(8080, function () {
    console.log('App started on port 8080');});