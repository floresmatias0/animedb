const server = require('express').Router();
const { apiToDb } = require('../../Controllers/animes/post.animes');
const { Anime } = require('../../db')

server.post('/create', async(req, res, next) => { 
    let {offset} = req.body;
    return await apiToDb(offset)
    .then((results) => {
        console.log("se crearon nuevos animes")
        res.status(202).json(results);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});



module.exports = server;