import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js'; // error handling middleware for handling errors in the application 

// update user information in the database
const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) //if the user id in the token does not match the user id in the request parameter 
        return next(errorHandler(401, 'You can only update your own account!')); // return error message if user id does not match
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        // update user information in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name, // update name
                    email: req.body.email, // update email
                    password: req.body.password, // update password
                    avatar: req.body.avatar || req.body.photo , // if avatar is not provided, use photo as avatar
                },
            },
            { new: true }
        )

        // remove password from user object 
        const { password, ...user } = updatedUser.toObject(); //toObject() converts mongoose document to js object 
        res.status(200).json({ message: "Account has been updated", user });
    } catch (error) {
        next(error); // pass error to the error handling middleware
    }
}

// delete user account in the database 
const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) //if the user id in the token does not match the user id in the request parameter 
        return next(errorHandler(401, 'You can only delete your own account!'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token'); // clear the token cookie 
        res.status(200).json({ message: "Account has been deleted " }); // return success message 
    } catch (error) {
        next(error);
    }
}

// export the controllers

export default { updateUser, deleteUser };

