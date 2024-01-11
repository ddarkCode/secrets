import passport from 'passport';

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
      return done(null, user);
    } catch (err) {
      done(err, false);
    }
  });

  localStrategy();
  googleStrategy();
}
