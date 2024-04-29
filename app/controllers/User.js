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
  console.log(`User created ${user}`);
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
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Email or Password is not valid" });
  }
});

// login user
// endpoint /user/current
// access private
exports.currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// Retrieve all users from db

exports.findAll = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Find a single User with an id
exports.findOne = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email }).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a user by the id in the request
exports.update = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});
// Delete a user with the specified id in the request
exports.destroy = asyncHandler(async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});
