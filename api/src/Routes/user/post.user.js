const server = require('express').Router();
const { createUser } = require('../../Controllers/users/post.user')


server.post('/new', (req, res, next) => { 
    let { name, lastname, password_virtual, password, email } = req.body;

    createUser(name, lastname, password_virtual, password, email) 
    .then(() => res.status(202).json("user create"))
    .catch(err => res.status(404).send(err.message)) 
});

module.exports = server;