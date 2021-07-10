const { Router } = require('express');

//Importamos los routers
const user = require('./user/user');
const createUser = require('./user/post.user');

const getAnimes = require('./animes/get.animes');
const postAnimes = require('./animes/post.animes');

const router = Router();

// Configuramos los routers
router.use('/users', user);
router.use('/users', createUser);


router.use('/animes', getAnimes);
router.use('/animes', postAnimes);


module.exports = router;