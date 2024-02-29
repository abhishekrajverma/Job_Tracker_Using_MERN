const User = require('../models/user.model.js');

module.exports.updateUser = async (req, res) => {    
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body  , {new: true}); //new: true returns the updated user
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated     successfully", user: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

