var mongoose = require("mongoose");
var models = require("./../models");
const env = process.env.NODE_ENV || "development";
const config = require("./../config/mongo")[env];
const mongooseeder = require("mongooseeder");

Object.keys(models).forEach(modelName => {
  global[modelName] = mongoose.model(modelName);
});

const seeds = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log("Creating Users");
  var users = [];
  for (let i = 0; i < 10; i++) {
    var user = new User({
      fname: "Foo",
      lname: "Bar",
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`
    });
    users.push(user);
  }

  // ----------------------------------------
  // Create Posts
  // ----------------------------------------
  console.log("Creating Posts");
  var posts = [];
  for (let i = 0; i < 25; i++) {
    var post = new Post({
      title: `My Post ${i}`,
      body:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum amet pariatur labore."
    });
    posts.push(post);
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [users, posts].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};

const mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  clean: true,
  models: models,
  mongoose: mongoose,
  seeds: seeds
});
