const Express = require("express");
const bodyParserMiddleware = require("./middleware/bodyParserMiddleware.js");
const cookieParserMiddleware = require("./middleware/cookieParserMiddleware.js");
const db = require("./config/mongoose");
const routes = require("./routes");

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
