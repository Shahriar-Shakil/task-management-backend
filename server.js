const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const UserRoute = require("./app/routes/user.js");
const TaskRoute = require("./app/routes/task.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Databse Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.json({ message: "hello task management app node express" });
});
app.use("/user", UserRoute);
app.use("/task", TaskRoute);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
