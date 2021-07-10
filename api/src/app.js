const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

const cors = require ('./Middleware/cors.middleware');
const passport = require('./Middleware/passport.middleware')
const routes = require('./Routes/index.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(cookieParser());
server.use(session({ 
    name: 'sid',
    secret:'secret', // Debería estar en un archivo de environment
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 4 // Está en milisegundos --> 4hs
    }
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use(cors);
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  console.log(req.session);
  res.status(status).send(message);
});

module.exports = server;