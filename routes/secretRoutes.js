import { Router } from 'express';
import debug from 'debug';

import Secret from '../database/secretsModel';

const log = debug('index:secretRoutes');

export default () => {
  const secretsRouter = Router();

  secretsRouter
    .route('/')
    .get(async (req, res, next) => {
      try {
        const foundSecrets = await Secret.find({});
        return res.status(200).json(foundSecrets.reverse());
      } catch (err) {
        next(err);
      }
    })
    .post(async (req, res, next) => {
      try {
        if (req.isAuthenticated()) {
          const { secret } = req.body;
          const { username } = req.user;
          const newSecret = new Secret({
            secret,
            username,
          });

          await newSecret.save();

          return res.status(201).json(newSecret);
        } else {
          throw new Error('You Must Signin Before Posting A Secret');
        }
      } catch (err) {
        next(err);
      }
    });
  return secretsRouter;
};
