const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.session;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("2");

        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log("3", decoded);

      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    console.log("4");

    res
      .status(401)
      .json({ message: "User is not authorized or token is missing" });
  }
});

module.exports = validateToken;
