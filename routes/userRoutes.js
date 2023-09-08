const {Router} = require('express');
const User = require('../database/userModel');
const {hash, compare} = require('bcrypt');

const log = console.log;
const {SALT_ROUND} = process.env

module.exports = function userRouter() {
    const userRoutes = Router();

    userRoutes.route('/register')
    .post(async (req, res) => {
        const {username, password} = req.body;

        try {
            const userExists = await User.findOne({username});

            if (!userExists)  {
                const hashedPassword = await hash(password, +SALT_ROUND);
                const newUser = new User({username, password: hashedPassword});
                await newUser.save();
                res.status(302);
                return res.redirect('/pages/secrets');
            } else {
                res.status(403);
                return res.json({message: 'User Already Exist'});
            }
        } catch (err) {
            res.status(500);
            return res.json({message: `Internal Server Error ${err}`});
        }
    })

    userRoutes.route('/login')
    .post( async (req, res) => {
        let {username, password} = req.body;
      try {
        const foundUser = await User.findOne({username})
        if (!foundUser) {
            res.status(404);
            return res.json({message: 'User Not Found'});
        } else {
            const isCorrectPassword = await compare(password, foundUser.password);
            if (isCorrectPassword) {
                res.status(302);
                return res.redirect('/pages/secrets')
            } else {
                res.status(401);
                return res.json({message: 'Wrong Username Or Password'});
            }
        }
      } catch (err) {
        res.status(500);
        return res.json({message: `Internal Server Error ${err}`});
      }

    })
    userRoutes.route('/:username')
    .get(async (req, res) => {
        const {username} = req.params;
        const user = await User.findOne({username})
        log(user);
        res.json(user)
    })

    return userRoutes;
}