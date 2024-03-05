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
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
