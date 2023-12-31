import passport from 'passport';

import User from '../database/userModel';
import localStrategy from './localStrategy';
import googleStrategy from './googleStrategy';

export default async function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    try {
      const foundUser = await User.findOne({ email: user.email });
      return done(null, foundUser);
    } catch (err) {
      done(null, false, { message: err });
    }
  });

  localStrategy();
  googleStrategy();
}
