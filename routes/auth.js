import { Router } from 'express';
import passport from 'passport';
import debug from 'debug';

const log = debug('index:auth');

export default () => {
  const authRouter = Router();
  authRouter.route('/signup').post((req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        next(err);
      }
      req.login(user, (err) => {
        if (next(err));
      });
      const { email, _id, username, createdAt } = user;
      return res.status(201).json({ email, _id, username, createdAt });
    })(req, res, next);
  });

  authRouter.route('/signin').post((req, res, next) => {
    passport.authenticate('signin', (err, user, info) => {
      if (err) {
        next(err);
      }
      req.login(user, (err) => {
        if (err) {
          next(err);
        }
        const { email, _id, username, createdAt } = user;
        return res.status(200).json({ email, _id, username, createdAt });
      });
    })(req, res, next);
  });

  authRouter.route('/signout').get((req, res, next) => {
    req.logout((err) => {
      if (err) {
        next(err);
      }
      res.status(200).json(null);
    });
  });
  authRouter.route('/profile').get((req, res, next) => {
    if (req.isAuthenticated()) {
      const { email, _id, username, createdAt } = req.user;
      return res.status(200).json({ email, _id, username, createdAt });
    } else {
      res.status(403).json(null);
    }
  });
  authRouter
    .route('/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

  authRouter.route('/google/secrets').get((req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        next(err);
      }
      req.login(user, (err) => {
        if (err) {
          next(err);
        }
        const { email, _id, createdAt, username } = user;

        return res.status(302).redirect('/pages/secrets');
      });
    })(req, res, next);
  });

  return authRouter;
};
