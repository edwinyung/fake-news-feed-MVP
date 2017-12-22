const express = require("express");
const router = express.Router();
const helpers = require("./../helpers");
var mongoose = require("mongoose");
var models = require("./../models");
const User = mongoose.model("User");
var Post = mongoose.model("Post");

module.exports = middlewares => {
  // Extract middlewares
  const { loggedInOnly, loggedOutOnly } = middlewares;

  // ----------------------------------------
  // Index
  // ----------------------------------------

  router.get("/", loggedInOnly, (req, res, next) => {
    Post.find({})
      .then(posts => {
        res.render("postsIndex", { posts });
      })
      .catch(e => res.status(500).send(e.stack));
  });

  // ----------------------------------------
  // Show
  // ----------------------------------------
  router.get("/:id", loggedInOnly, (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        res.render("show", { post });
      })
      .catch(e => res.status(500).send(e.stack));
  });

  return router;
};
