const { Router } = require("express");

const log = console.log;

module.exports = function pageRoutes() {
  const pageRouter = Router();

  pageRouter.route("/").get((req, res) => {
    res.status(200);
    return res.render("home");
  });

  pageRouter.route('/pages/submit')
  .get((req, res) => {
    res.status(200);
    res.render('submit')
  })

  pageRouter.route("/pages/secrets").get((req, res) => {
    if (req.isAuthenticated())  {
      res.status(200);
      return res.render('secrets');
    } else {
      res.status(302);
      res.redirect('/pages/login')
    }
  });

  pageRouter.route("/pages/register").get((req, res) => {
    res.status(200);
    return res.render("register");
  });

  pageRouter.route('/pages/login')
  .get((req, res) => {
    res.status(200);
    return res.render('login');
  })
return pageRouter;
};

