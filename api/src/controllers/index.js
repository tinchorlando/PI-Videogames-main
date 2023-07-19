const { getGames } = require("./videogames.js");
const { getGameFromApi , getGameFromDb , postNewGame } = require("./videogame.js")
const { getGenres } = require("./genres.js");
module.exports={
    getGames,
    getGameFromApi,
    getGameFromDb,
    getGenres,
    postNewGame,

}