import cookieParser from 'cookie-parser';

// This middleware is used to parse the cookies attached to the client request object.
const cookieParserMiddleware = (app) => {
    app.use(cookieParser());
};

export default cookieParserMiddleware;