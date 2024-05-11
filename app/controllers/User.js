const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../model/user");

// register user
// endpoint /user/register
// access public

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //check all field are available
  if (!username || !email || !password) {
    res.status(400).send({ message: "All fields are mandatory" });
    return;
  }
  //check valid unique email
  const userAvailable = await UserModel.findOne({ email });
  if (userAvailable) {
    res.status(409).send({ message: "User already registered" });
    return;
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});
// login user
// endpoint /user/login
// access public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "All fields are mandatory" });
  }
  const user = await UserModel.findOne({ email });
  //compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user._id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("session", accessToken, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Email or Password is not valid" });
  }
});
// login user
// endpoint /user/logout
// access private
exports.logout = asyncHandler(async (req, res) => {
  let token = req.cookies?.session;

  if (!token) res.status(204); // noContent

  // await newBlacklist.save();
  res.clearCookie("session");
  res.setHeader("Clear-Site-Data", '"cookies"');
  res.status(200).json({ message: "You are logged out!" });
});

// login user
// endpoint /user/current
// access private
exports.currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
