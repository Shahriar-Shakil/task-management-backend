const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./app/config/connectDb.js");

const UserRoute = require("./app/routes/user.js");
const TaskRoute = require("./app/routes/task.js");
const errorHandler = require("./app/middleware/errorHandler");

connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "hello task management app node express" });
});

app.use("/user", UserRoute);
app.use("/task", TaskRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
