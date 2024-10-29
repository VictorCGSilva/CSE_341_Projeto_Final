const express = require('express');
const routes = express.Router();
const passport = require("passport");
routes.use("/", require("./swagger.js"));

routes.use('/student', require('./student'));
routes.use('/teacher', require('./teacher'));
routes.use('/class', require('./class'));
routes.use('/grade', require('./grade'));
routes.use("/", require("./swagger"));



routes.get('/',(req,res)=> {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out of School GradeBook API")});

routes.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

routes.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    req.session.user = req.user; 
    res.redirect("/profile");
  }
);

routes.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) { 
      res.send("Please login to continue."); 
      return res.redirect("/");
    }
    res.send(`Hello, ${req.user.displayName}`);
  });
  
routes.get("/logout", (req, res, next) => {
    req.logout((err) => {
    if (err) return next(err);  

    req.session.destroy((err) => {
    if (err) return next(err);  
    res.clearCookie('connect.sid');
    res.send("You have successfully logged out.");
    });
});
});

routes.use((req, res) => {
  if (process.env.NODE_ENV !== 'test') {
      console.log(req.path);
  }
  res.status(404).json({ message: "Route not found" });
});

module.exports = routes;