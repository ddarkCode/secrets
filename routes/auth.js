const {Router} = require('express')
const passport = require('passport')


module.exports = () => {
    const authRouter = Router();

    authRouter.route('/')
    .get(passport.authenticate('google', { scope: ['profile'] }))

    authRouter.route('/secrets')
    .get(passport.authenticate('google', {failureRedirect: '/pages/login'}),(req,res) => {
        res.redirect('/pages/secrets')
    })

    return authRouter;
}



// app.get('/auth/google/callback', 
// passport.authenticate('google', { failureRedirect: '/login' }),
// function(req, res) {
//   // Successful authentication, redirect home.
//   res.redirect('/');
// });