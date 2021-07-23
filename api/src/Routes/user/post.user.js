const server = require('express').Router();
const { createUser } = require('../../Controllers/users/post.user');
// const jwt = require('jsonwebtoken')
const passport = require('../../Middleware/passport.middleware')


server.post('/new', (req, res, next) => { 
    let { name, lastname, password_virtual, password, email } = req.body;

    createUser(name, lastname, password_virtual, password, email) 
    .then(() => res.status(202).json("user create"))
    .catch(err => res.status(404).send(err.message)) 
});

server.post('/login',
  passport.authenticate('local'),
  (req, res, next) =>  {
      console.log(req.user.dataValues)
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      let user = {
        id: req.user.dataValues.id,
        email: req.user.dataValues.email,
        password: req.user.dataValues.password
      }
    res.status(201).json(user) 
});


module.exports = server;