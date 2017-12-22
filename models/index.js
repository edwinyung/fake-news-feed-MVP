const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

// Enable logging if not testing
process.env.NODE_ENV === "test" || mongoose.set("debug", true);

const models = {};

models.Post = require("./post");
models.Comment = require("./comment");
models.User = require("./user");
models.Vote = require("./vote");

module.exports = models;
