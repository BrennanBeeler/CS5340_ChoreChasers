const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.groups = require("./Groups.model.js")(mongoose);
db.users = require("./Users.model.js")(mongoose);
db.chores = require("./Chores.model.js")(mongoose);


module.exports = db;