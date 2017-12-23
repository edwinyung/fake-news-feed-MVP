var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");

router.post("/:parentId", (req, res) => {
  var comment = new Comment({
    author: req.user.id,
    body: req.body.comment.body,
    parent: req.params.parentId
  });

  comment.save().then(comment => {
    Post.findById(req.params.parentId).then(post => {
      post.comments.push(comment.id);
      post.save().then(post => {
        req.method = "GET";
        res.redirect("back");
      });
    });
  });
});

module.exports = router;
