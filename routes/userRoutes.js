const {Router} = require('express');

const User = require('../database/userModel');

const log = console.log;


module.exports = function userRouter() {
    const userRoutes = Router();

    userRoutes.route('/register')
    .post(async (req, res) => {
        const {username, password} = req.body;


        try {
            const userExists = await User.findOne({username});

            if (!userExists)  {
                const newUser = new User({username, password});
                await newUser.save();
                res.status(201);
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

    return userRoutes;
}