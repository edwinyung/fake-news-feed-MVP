var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    body: String,
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vote"
      }
    ],
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

CommentSchema.virtual("score").get(function() {
  return this.votes.reduce((sum, vote) => {
    return (sum += vote.value);
  }, 0);
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
