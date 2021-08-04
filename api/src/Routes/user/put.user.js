const server = require('express').Router();
const { updateUser } = require('../../Controllers/users/put.users')

server.put('/update/:idUser', function(req, res, next) {
    const idUser = req.params
    const newUser = req.body

    updateUser(idUser,newUser)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(401).send(err.message))

});


module.exports = server;