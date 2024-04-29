var mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email must be unique"],
    },
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    password: {
      type: String,
      required: [true, "Please add the User Password"],
    },

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], //one to many rltn with task model
  },
  {
    timestamps: true,
  }
);

var User = mongoose.model("User", schema);

module.exports = User;
