import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) //if the user id in the token does not match the user id in the request parameter 
        return next(errorHandler(401, 'You can only update your own account!'));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar || req.body.photo , // if avatar is not provided, use photo as avatar
                },
            },
            { new: true }
        )

        // remove password from user object 
        const { password, ...user } = updatedUser.toObject(); //toObject() converts mongoose document to js object 
        res.status(200).json({ message: "Account has been updated", user });
    } catch (error) {
        next(error);
    }
}

// export the controllers

export default { updateUser };

