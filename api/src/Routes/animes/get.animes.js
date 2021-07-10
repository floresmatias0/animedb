const server = require('express').Router();
const { getAnimeByName,getAnimeById } = require('../../Controllers/animes/get.animes');
const { Anime,Genre } = require('../../db');

server.get('/', async(req, res, next) => { 

    await Anime.findAll()
    .then(result => {
        console.log(result)
        res.status(202).json(result);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.get('/search/:animeName', (req, res, next) => { 
    let { animeName } = req.params

    getAnimeByName(animeName)
    .then(result => {
        console.log(result)
        res.status(202).json(result);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.get('/genres', async(req, res, next) => { 

    await Anime.findAll()
    .then(result => {
        for(let i = 0; i < result.length; i++){
            result[i].genres.map(async(point) => {
                await Genre.findOrCreate({
                    where:{
                        name: point
                    }
                })
            })
        }  
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
    await Genre.findAll()
    .then(genres => res.status(202).json(genres))
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.get('/details/:animeId', (req, res, next) => { 
    let { animeId } = req.params

    getAnimeById(animeId)
    .then(result => {
        console.log(result)
        res.status(202).json(result);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

module.exports = server;