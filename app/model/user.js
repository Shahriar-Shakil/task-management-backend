var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phone: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

var User = new mongoose.model("User", schema);

module.exports = User;
