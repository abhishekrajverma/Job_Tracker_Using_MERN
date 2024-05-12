import Express from "express";
import bodyParserMiddleware from "./middleware/bodyParserMiddleware.js";
import cookieParserMiddleware from "./middleware/cookieParserMiddleware.js";
import db from "./config/mongoose.js";
import routes from "./routes/index.js";
import path from "path";

const port = process.env.PORT || 8000;

const __dirname = path.resolve(); // get the current directory path of the file where this line is written (server.js) and store it in __dirname variable for later use in the code below (for serving static files) 
// Initialize express app
const app = Express();

// Use middleware
bodyParserMiddleware(app);
cookieParserMiddleware(app);

// Database setup

// Use express router
app.use("/", routes);

// Serve static files
app.use(Express.static(path.join(__dirname, "/Frontend/dist")));

// Serve index.html file for all routes except the ones defined above (API routes) 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
});

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
