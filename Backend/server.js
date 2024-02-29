import Express from "express";
import bodyParserMiddleware from "./middleware/bodyParserMiddleware.js";
import cookieParserMiddleware from "./middleware/cookieParserMiddleware.js";
import db from "./config/mongoose.js";
import routes from "./routes/index.js";

const port = process.env.PORT
const app = Express();

// Use middleware
bodyParserMiddleware(app);
cookieParserMiddleware(app);

// Database setup


// Use express router
app.use("/", routes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
