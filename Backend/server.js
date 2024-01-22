const Express = require("express");
const bodyParserMiddleware = require("./middleware/bodyParserMiddleware.js");
const cookieParserMiddleware = require("./middleware/cookieParserMiddleware.js");
const corsMiddleware = require("./middleware/corsMiddleware");
const sessionMiddleware = require("./middleware/sessionMiddleware.js");
const passportMiddleware = require("./middleware/passportMiddleware.js");
const db = require("./config/mongoose");
const routes = require("./routes");

const port = process.env.PORT || 8000;
const app = Express();

// Use middleware
bodyParserMiddleware(app);
cookieParserMiddleware(app);
corsMiddleware(app);
sessionMiddleware(app);
passportMiddleware(app);


// Database setup

// Use express router
app.use("/", routes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
