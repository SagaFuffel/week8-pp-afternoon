
const User = require ("../models/userModel");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcryptjs");

const generateToken = (_id, username) => {
    return jwt.sign({_id, username}, 
        process.env.SECRET, {
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
            !name 
        ) {
            res.status (400);
            throw new Error ("Please add all fields");
        }

        if (role && ! ["user", "admin"].includes(role)) {
            res.status(400);
            throw new Error ("Invalid role");
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
            const token = generateToken(user._id, user.username);
            res.status (201)
            .json({
                username: user.username,
                role: user.role,
                token});
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
            const token = generateToken(user._id, user.username);
            res.status (200)
            .json ({
                username: user.username, 
                token,
                role: user.role});
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