const server = require('express').Router();
const { Genre } = require('../../db');



server.get('/', async(req, res, next) => { 

    await Genre.findAll()
    .then((genres) => {
        res.status(201).json(genres)
    })
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});


module.exports = server;