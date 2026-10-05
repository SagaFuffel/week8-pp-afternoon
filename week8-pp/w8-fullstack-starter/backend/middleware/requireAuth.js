const JWT = require("jsonwebtoken");
//const config = require("../utils/config");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;



    if (!authorization) {
        return res.status(401).json({ error: "authorization token missing" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = JWT.verify(token, process.env.SECRET);
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ error: "req. not authorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "req. not authorized" });
    }
};

module.exports = requireAuth;
