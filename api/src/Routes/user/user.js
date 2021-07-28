const server = require('express').Router();
const { User,Anime } = require('../../db.js');


server.get('/', (req, res, next) => { 
    User.findAll()
    .then(users => {
        res.send(users);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.get('/:idUser', (req, res, next) => { 
    let {idUser} = req.params

    User.findOne({
        where:{
            id: idUser
        },
        include: [{
            model: Anime, as: 'animes',
            attributes: ["id","name","description","origin","finish","status","image","coverImage", "totalEpisodes", "idYoutube", "genres", "popularity"]
        }]
    })
    .then(users => {
        res.status(201).json(users);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.get('/logout', function(req, res){
    req.logout();
    res.status(201).send('logout success');
});

module.exports = server;