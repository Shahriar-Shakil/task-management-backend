var mongoose = require("mongoose");

var scheme = new mongoose.Schema({
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
});

var user = new mongoose.model("User", Schema);

model.exports = user;
