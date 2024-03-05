import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return next(errorHandler(401, 'Unauthorized'));

        // verify the token and extract the user from it 
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // if the token is invalid or expired 
            if (err) return res.status(403).json({ message: 'Forbidden' });
            // if the token is valid, extract the user from it and attach it to the request object
            req.user = user;
            next();
        });
            
    } catch (error) {
        next(error);
    }
};

// export the middleware

export default verifyUser;