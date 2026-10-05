const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
//const config = require("../utils/config");
const { findOne } = require("../models/workoutModel");

const generateToken = (_id) => {
    return JWT.sign({ _id }, process.env.SECRET, { expiresIn: "3d", });
};

const signUpUser = async (req, res) => {
    const {
        username,
        password,
        phoneNumber,
        name,
        role,
    } = req.body;


    try {
        if (
            !username || !password || !phoneNumber || !name || !role
        ) {
            res.status(400);
            throw new Error("already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = await User.create({
            username, password: hashed, phoneNumber, name, role,
        });

        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({ username, token });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
        if (await User.findOne({ username })) {
            return res.status(400).json({ error: "User already exists" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//login
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.status(200).json({ username, token })
        } else {
            res.status(400);
            throw new Error("Wrong credentials")
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signUpUser,
    loginUser,
};