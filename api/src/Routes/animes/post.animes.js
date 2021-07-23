const server = require('express').Router();
const { apiToDb,addAnimeToUser } = require('../../Controllers/animes/post.animes');

server.post('/create', async(req, res, next) => { 
    let {offset} = req.body

    await apiToDb(offset)
    .then(() => {
        res.status(202).send("se crearon nuevos animes");
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.post('/favorites', async(req, res, next) => { 
    let { idAnime, idUser } = req.body

    await addAnimeToUser(idAnime, idUser)
    .then((anime) => {
        res.status(202).send(anime);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});



module.exports = server;