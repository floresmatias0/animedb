const server = require('express').Router();
const { createUser } = require('../../Controllers/users/post.user');
// const jwt = require('jsonwebtoken')
const passport = require('../../Middleware/passport.middleware')


server.post('/new', (req, res, next) => { 
    let { name, lastname, password_virtual, password, email } = req.body;
    if(!name || !lastname || !password_virtual || !password || !email){
      res.status(402).send("please complete the form")
    }else{
      createUser(name, lastname, password_virtual, password, email) 
      .then(() => res.status(202).json("user create"))
      .catch(err => res.status(404).send(err.message)) 
    }

});

server.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if(info === "Password Invalid"){
      return res.status(402).send("Password Invalid try again")
    }
    if(info === "Email Invalid"){
      return res.status(402).send("Email Invalid try again")
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(201).json(user);
    });
  })(req, res, next)
});


module.exports = server;