const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// const db = {};
// db.mongoose = mongoose;
// db.url = dbConfig.url;
// db.groups = require("../models/group.js")(mongoose);
// db.users = require("../models/user.js")(mongoose);
// db.chores = require("../models/chore.js")(mongoose);


// module.exports = db;
module.exports = {
    url:dbConfig.url,
    mongoose:mongoose,
    groups:require("../models/group.js"),
    users:require("../models/user.js"),
    chores:require("../models/chore.js")
};