import Employer from "../models/employers.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// create a new employer account
const createEmployer = async (req, res, next) => {
    try {
        //Check if the email is already in use
        const existingEmployer = await Employer.findOne({ email: req.body.email });
        if (existingEmployer) {
            return res.status(409).json({ message: "Email already in use" });
        }
        // Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // Create a new employer with the hashed password
        const newEmployer = await Employer.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // Return a success response
        res.status(201).json({ message: "employer created successfully", employer: newEmployer });
    } catch (error) {
        next(error);
    }
};

// sign-in controller
const signInEmployer = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingEmployer = await Employer.findOne({ email });
        // if employer does not exist, return error message
        if (!existingEmployer) return res.status(404).json({ message: "Employer not found" });
        // compare the password provided with the hashed password in the database 
        const isPasswordCorrect = bcrypt.compareSync(password, existingEmployer.password);
        // if password is incorrect, return error message
        if (!isPasswordCorrect) return res.status(401).json({ message: "Wrong Password" });
        // create a token for the employer and send it as a cookie in the response header
        const token = jwt.sign({ id: existingEmployer._id }, process.env.JWT_SECRET);
        // remove password from employer object
        const { password: employerPassword, ...employerWithoutPassword } = existingEmployer.toObject(); //toObject() converts mongoose document to js object
        return res.cookie('access_token', token, { httpOnly: true, maxAge: 1024 * 60 * 60 * 24 * 3 })
            .status(200).json({ message: "Sign in successful", employer: employerWithoutPassword });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//google sign-in controller
const googleSignInEmployer = async (req, res, next) => {
    try {
        const user = await Employer.findOne({ email: req.body.email });
        if (user) {
            // create a token for the user and send it as a cookie in the response header   
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // remove password from user object
            const { password: userPassword, ...userWithoutPassword } = user.toObject(); //toObject() converts mongoose document to js object
            return res.cookie('access_token', token, { httpOnly: true, maxAge: 1024 * 60 * 60 * 24 * 3 })
                .status(200).json({ message: "Sign in successful", user: userWithoutPassword });
        } else {
            const genratedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(genratedPassword, 10);
            const newUser = await Employer.create({
                name: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.avatar,
            });
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            // remove password from user object
            const { password: userPassword, ...userWithoutPassword } = newUser.toObject(); //toObject() converts mongoose document to js object
            return res.cookie('access_token', token, { httpOnly: true, maxAge: 1024 * 60 * 60 * 24 * 3 })
                .status(200).json({ message: "Sign in successful", user: userWithoutPassword });
        }
    }
    catch (error) {
        next(error);
    }
}


export default { createEmployer, signInEmployer, googleSignInEmployer};