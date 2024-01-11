import passport from 'passport';
import { Strategy } from 'passport-local';
import { randomUUID } from 'node:crypto';

import debug from 'debug';

import User from '../database/userModel';
const log = debug('index:localStrategy');

export default function localStrategy() {
  passport.use(
    'signup',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const foundUser = await User.findOne({ email });

          if (foundUser) {
            return done(
              { message: 'User With This Email Already Exist.', status: 403 },
              false
            );
          }

          const user = new User({
            email,
            password,
            username: email.slice(0, 2) + randomUUID().slice(0, 7),
          });

          await user.save();

          return done(null, user, { message: 'Successful Registration.' });
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.use(
    'signin',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done({ message: 'User Not Found.', status: 404 }, false);
          }

          if (!user.validatePassword(password)) {
            return done(
              { message: 'Wrong Password Provided.', status: 401 },
              false
            );
          }

          return done(null, user, { message: 'Successfully Logged In.' });
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
}
