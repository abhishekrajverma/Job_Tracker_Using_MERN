const User = require('../models/user');
const bcrypt = require('bcrypt');


module.exports.abhi = (req, res) => {
    return res.send('<h1>Abhishek</h1>'); //sending response
}

module.exports.create = async (req, res) => {
    try {
        //Check if the email is already in use
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with the hashed password
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
};

module.exports.createSession = (req, res) => {
    return res.status(200).json({ message: 'Sign in successful'});
};

// Login failure route
module.exports.loginFailure = (req, res) => {
    return res.status(401).json({ message: 'Invalid username/password' });
};
