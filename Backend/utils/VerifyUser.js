import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

// middleware to verify the user and attach the user to the request object 
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token; // get the token from the cookies 
        if (!token) return next(errorHandler(401, 'Unauthorized'));

        // verify the token and extract the user from it 
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // verify the token using the secret key 
            // if the token is invalid or expired 
            if (err) return res.status(403).json({ message: 'Forbidden' });
            // if the token is valid, extract the user from it and attach it to the request object
            req.user = user; // attach the user to the request object 
            next(); // call the next middleware
        });
            
    } catch (error) {
        next(error);
    }
};

// export the middleware

export default verifyUser;