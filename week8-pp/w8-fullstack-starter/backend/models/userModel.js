const mongoose = require("mongoose");
const { default: User } = require("../../../../../../Project/Web-Dev-Project/merge-home/backend/models/userModel");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, default: "user" },
    },

    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);