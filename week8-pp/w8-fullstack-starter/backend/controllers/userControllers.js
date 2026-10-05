
const User = require ("../models/userModel");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcryptjs");

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {
        expiresIn: "3d",
    });
;}

const signupUser = async (req, res) => {
    const {
        username,
        password,
        phoneNumber,
        name,
        role, 
    } = req.body;

    try {
        if (!username ||
            !password ||
            !phoneNumber ||
            !name ||
            !role
        ) {
            res.status (400);
            throw new Error ("please filled up all fields");
        }

        const existUser = await User.findOne({username});

        if (existUser) {
            res.status (400);
            throw new Error ("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash (password, salt);

        const user = await User.create ({
            username,
            password: hashedPassword,
            phoneNumber,
            name,
            role,
        });

        if (user) {
            const token = generateToken(user._id);
            res.status (201).json({username, token});
        } else {
            res.status (400);
            throw new Error ("Invalid user info");
        }
    } catch (error) {
        res.status (400).json ({error: error.message});
    }
}

const loginUser = async (req, res ) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne ({username});

        if (user && (await bcrypt.compare (password, user.password))) {
            const token = generateToken(user._id);
            res.status (200). json ({username, token});
        } else {
            res.status (400);
            throw new Error ("Invalid credentials");
        }
    } catch (error) {
        res.status (400).json ({error: error.message});
    }
}

module.exports = {
    signupUser,
    loginUser
};