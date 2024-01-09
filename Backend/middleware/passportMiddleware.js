const passport = require('passport');
const passportLocal = require('../config/passport-local-strategy');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
};