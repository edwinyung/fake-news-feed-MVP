var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: String, //news_api
    body: String, //news_api
    postLink: String, //news_api
    source: String, //open_sources
    type: String, //open_sources
    type2: String, //open_sources
    type3: String, //open_sources
    Notes: String, //open_sources
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vote"
      }
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    timestamps: true
  }
);

PostSchema.virtual("score").get(function() {
  return this.votes.reduce((sum, vote) => {
    return (sum += vote.value);
  }, 0);
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
