const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoute = require ('./routing/videogames.js');
// const videogameRoute = require ('./routing/videogame.js');
const genresRoute = require ('./routing/genres.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames',videogamesRoute);
// router.use('/videogame',videogameRoute);
router.use('/genres',genresRoute);

module.exports = router;
