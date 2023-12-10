const mongoose = require("mongoose");

const BlogsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is Required"],
    },
    content: {
      type: String,
      require: [true, "content is Required"],
    },
    author: {
      type: String,
      require: [true, "author is Required"],
    },
    likes : {
      type : Number,
      default : 0
    },
    clap : {
      type : Number,
      default : 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("blog", BlogsSchema);
