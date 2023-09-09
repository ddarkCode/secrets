const passport = require('passport');
const User = require('../database/userModel');
const googleStrategy = require('./strategies/googleStrategy');


const passportConfig = (app) => {
    app.use(passport.initialize());
    app.use(passport.session())

    passport.use(User.createStrategy());
    googleStrategy()

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}

module.exports = passportConfig;