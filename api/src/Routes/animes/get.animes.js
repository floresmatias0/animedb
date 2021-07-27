const server = require('express').Router();
const { getAnimeByName,getAnimeById } = require('../../Controllers/animes/get.animes');
const { Anime,Genre } = require('../../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

server.get('/', async(req, res, next) => { 

    await Anime.findAll()
    .then(result => {
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
        if(result.length === 0){
            res.status(202).send("Sorry we cant finder your anime");
        }else{
            res.status(202).json(result);
        }       
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.get('/creategenres', async(req, res, next) => { 

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

        res.status(201).send("se crearon generos")
    }) 
    .catch(error => {
        console.log(error.message)
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

server.get('/popularity', async(req, res, next) => { 

    await Anime.findAll({
        where:{
            popularity: {
                [Op.between]: [1, 50]
            }      
        },
        order:[ ['popularity','ASC'] ]
    })
    .then(result => {
        res.status(202).json(result);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

module.exports = server;