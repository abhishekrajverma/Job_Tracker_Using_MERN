const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");


// Configure Passport to use LocalStrategy
passport.use(new LocalStrategy({
    usernameField: "email"
},
    async (email, password, done) => {
        const user = await User.findOne({ email: email });

        if (!user) {
            return done(null, false, { message: 'Invalid username' });
        }
        try {
            // Compare the provided password with the hashed password in the database
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
});

module.exports = passport;
