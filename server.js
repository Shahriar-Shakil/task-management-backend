const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./app/config/connectDb.js");

const UserRoute = require("./app/routes/user.js");
const TaskRoute = require("./app/routes/task.js");
const errorHandler = require("./app/middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

connectDb();
const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "hello task management app node express" });
});

app.use("/user", UserRoute);
app.use("/task", TaskRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
