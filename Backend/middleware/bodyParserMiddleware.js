import express from 'express';
import bodyParser from 'body-parser';


// Middleware to parse the request body
const bodyParserMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

export default bodyParserMiddleware;
