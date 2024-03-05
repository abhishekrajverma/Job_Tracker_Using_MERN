import jwt from 'jsonwebtoken';

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: 'Unauthoried' });

        // verify the token and extract the user from it 
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // if the token is invalid or expired 
            if (err) return res.status(403).json({ message: 'Forbidden' });
            // if the token is valid, extract the user from it and attach it to the request object
            req.user = user;
            next();
        });
            
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }
};

// export the middleware

export default verifyUser;