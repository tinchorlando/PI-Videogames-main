const { apiQuery, apiGameCollector } = require("./apiQuerys.js");
const { findAllGamesDb, searchGamesDb, dbFindById, searchExactNameDb , postGame , genresBulkCreator , genresFinder } = require("./sequelize.js");

module.exports={
    apiQuery,
    findAllGamesDb,
    apiGameCollector,
    searchGamesDb,
    dbFindById,
    searchExactNameDb,
    postGame,
    genresBulkCreator,
    genresFinder
    
}