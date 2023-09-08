const { Router } = require("express");

const log = console.log;

module.exports = function pageRoutes() {
  const pageRouter = Router();

  pageRouter.route("/").get((req, res) => {
    res.status(200);
    return res.render("home");
  });

  pageRouter.route("/pages/secrets").get((req, res) => {
    res.status(200);
    return res.render("secrets");
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

