const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../utils/config");

const ALLOWED_ROLES = ["user", "admin"];

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    config.SECRET,
    { expiresIn: "1h" }
  );
};

const userResponse = (user) => {
  return {
    username: user.username,
    name: user.name,
    phoneNumber: user.phoneNumber,
    role: user.role,
    token: generateToken(user),
  };
};

const isFilledString = (value) => {
  return typeof value === "string" && value.trim() !== "";
};

const signupUser = async (req, res) => {
  const { username, password, phoneNumber, name } = req.body;

  const fields = [username, password, phoneNumber, name];
  if (!fields.every(isFilledString)) {
    return res.status(400).json({ error: "Please add all fields" });
  }

  let role = "user";
  if (req.body.role !== undefined) {
    role = req.body.role;
  }
  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: hashedPassword,
      phoneNumber,
      name,
      role,
    });
    res.status(201).json(userResponse(user));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "User already exists" });
    }
    throw error;
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!isFilledString(username) || !isFilledString(password)) {
    return res.status(400).json({ error: "Please add all fields" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  res.status(200).json(userResponse(user));
};

module.exports = {
  signupUser,
  loginUser,
};