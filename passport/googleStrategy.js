import dotenv from 'dotenv';
dotenv.config();

import GoogleStrategy from 'passport-google-oauth20';
import debug from 'debug';
import passport from 'passport';
import { randomUUID } from 'node:crypto';

import User from '../database/userModel';
const log = debug('index:googleStrategy');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export default function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL:
          'https://secrets-3r6m.onrender.com/api/auth/google/secrets',
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        User.findOrCreate(
          {
            googleId: profile.id,
            email: profile.emails[0].value,
            username:
              profile.emails[0].value.slice(0, 2) + randomUUID().slice(1, 7),
          },
          function (err, user) {
            return done(err, user);
          }
        );
      }
    )
  );
}
