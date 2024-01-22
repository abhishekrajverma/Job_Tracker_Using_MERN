const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

module.exports.create = async (req, res, next) => {
    try {
        //Check if the email is already in use
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create a new user with the hashed password
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // Return a success response
        res.status(201).json({ message: "user created successfully", user : newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error : error.message });
    }
};

module.exports.createSession = (req, res) => {
    return res.status(200).json({ message: "Sign in successful" });
};

// Login failure route
module.exports.loginFailure = (req, res) => {
    return res.status(401).json({ message: "Invalid username/password" });
};
