import Express from "express";
import bodyParserMiddleware from "./middleware/bodyParserMiddleware.js";
import cookieParserMiddleware from "./middleware/cookieParserMiddleware.js";
import db from "./config/mongoose.js";
import routes from "./routes/index.js";

const port = process.env.PORT;
const app = Express();

// Use middleware
bodyParserMiddleware(app);
cookieParserMiddleware(app);

// Database setup

// Use express router
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // if status code is not defined, set it to 500
    const message = err.message || "Internal Server Error"; // if message is not defined, set it to "Internal Server Error"
    return res.status(statusCode).json({ // return the status code and error message as json
        success: false, // 
        statusCode, // status code of the error
        message, // error message
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
