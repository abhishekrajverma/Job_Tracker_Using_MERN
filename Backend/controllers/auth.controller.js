//const User = require("../models/user.model.js");
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';    //importing bcrypt module
import jwt from 'jsonwebtoken';    //importing jsonwebtoken module

const create = async (req, res) => {
    try {
        //Check if the email is already in use
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }
        // Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // Create a new user with the hashed password
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // Return a success response
        res.status(201).json({ message: "user created successfully", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// sign-in controller
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User not found" });
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Wrong Password" });
        // create a token for the user and send it as a cookie in the response header 
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
        // remove password from user object
        const { password: userPassword, ...userWithoutPassword } = existingUser.toObject(); //toObject() converts mongoose document to js object
        return res.cookie('access_token', token, { httpOnly: true, maxAge: 1024 * 60 * 60 * 24 * 3})
        .status(200).json({ message: "Sign in successful",user: userWithoutPassword});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// google sign-in controller
const googleSignIn = async (req, res) => {  
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user){
            // create a token for the user and send it as a cookie in the response header   
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // remove password from user object
            const { password: userPassword, ...userWithoutPassword } = user.toObject(); //toObject() converts mongoose document to js object
            return res.cookie('access_token', token, { httpOnly: true, maxAge: 1024 * 60 * 60 * 24 * 3})
            .status(200).json({ message: "Sign in successful",user: userWithoutPassword});
        }else{
            const genratedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(genratedPassword, 10);
            const newUser = await User.create({
                name: req.body.name.split(' ').join('').toLowerCase() +
                Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            // remove password from user object
            const { password: userPassword, ...userWithoutPassword } = newUser.toObject(); //toObject() converts mongoose document to js object
            return res.cookie('access_token', token, { httpOnly: true, maxAge: 1024 * 60 * 60 * 24 * 3})
            .status(200).json({ message: "Sign in successful",user: userWithoutPassword});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// exporting the controllers

export default { create, signIn, googleSignIn };