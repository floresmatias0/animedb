  
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db');


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    User.findOne({
      where:{
        email: email
      } 
    })
    .then((user) => {
      if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.password === password) {
          return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
  })
  .catch(err => done(err));
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id)
    .then((user)=>{
      done(null, user);
    })
    .catch(err => {
      return done(err)
    });
});

module.exports = passport;