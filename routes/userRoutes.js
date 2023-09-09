const {Router} = require('express');
const User = require('../database/userModel');
const {hash, compare} = require('bcrypt');
const passport = require('passport');

const log = console.log;
const {SALT_ROUND} = process.env

module.exports = function userRouter() {
    const userRoutes = Router();

    userRoutes.route('/register')
    .post(async (req, res) => {
        const {username, password} = req.body;

        // try {
        //     const userExists = await User.findOne({username});

        //     if (!userExists)  {
        //         const hashedPassword = await hash(password, +SALT_ROUND);
        //         const newUser = new User({username, password: hashedPassword});
        //         await newUser.save();
        //         res.status(302);
        //         return res.redirect('/pages/secrets');
        //     } else {
        //         res.status(403);
        //         return res.json({message: 'User Already Exist'});
        //     }
        // } catch (err) {
        //     res.status(500);
        //     return res.json({message: `Internal Server Error ${err}`});
        // }

    
            User.register({username}, password, function(err, user) {
                log(user);
                if (!err) {
                    passport.authenticate('local')(req, res, () => {
                        res.status(302);
                        res.redirect('/pages/secrets');
                    })
                } else {

                    res.status(302);
                    return res.redirect('/pages/register')
                }
            })

       
    })

    userRoutes.route('/login')
    .post( async (req, res) => {
        let {username, password} = req.body;

     const user = new User({username, password});
     req.login(user, err => {
        if (err) {
            res.status(302);
            return res.redirect('/pages/login')
        } else {
            passport.authenticate('local')(req, res, () => {
                res.status(302);
                res.redirect('/pages/secrets');
            })
        }
     })

    })


    userRoutes.route('/logout')
    .get(async (req, res) => {
      req.logout(err => {
        if (!err) {
            res.redirect('/');
        }
      })
    })

 

    return userRoutes;
}