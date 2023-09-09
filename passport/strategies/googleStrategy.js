const passport = require('passport')
const {Strategy} = require('passport-google-oauth20');
const User = require('../../database/userModel');

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;
const log = console.log;


const googleStrategy = () => {
    passport.use(new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/secrets'
    }, (accessToken, refreshToken, profile, done) => {
        log(profile)
        User.findOrCreate({username: profile.displayName, googleId: profile.id}, (err, user) => {
            return done(err, user);
        })
    }))
}

module.exports = googleStrategy;