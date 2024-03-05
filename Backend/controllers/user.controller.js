import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

const updateUser = async (req, res) => {
    if(req.user.id !== req.params.id) return res.status(401).json({message: "You can update only your account"});
    try {
        //if the user wants to update the password
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        //update the user account with the new data 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            // $set is a mongoose method to update the user data 
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.photo,
            }
        }, {new: true}); //new: true will return the updated user

        // remove password from user object 
        const { password, ...user } = updatedUser.toObject(); //toObject() converts mongoose document to js object 
        res.status(200).json({message: "Account has been updated" , user});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

// export the controllers

export default { updateUser };

