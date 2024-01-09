const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = function (app) {
    app.use(session({
        // ... session configuration
        name: 'codeial',
        secret: 'blahsomething',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: (1000 * 60 * 100)
        },
        store: MongoStore.create(
            {
                mongoUrl: "mongodb://127.0.0.1:27017/jobportal",
                autoRemove: 'disabled'
            },
        )
    }));

};