const { Op } = require("sequelize")
const { Videogame, Genre} = require("../db.js")

const findAllGamesDb = ()=>{
    let games = Videogame.findAll({
        include: Genre
    })
    .then(res=>{
        return res.map(p=>{
            return {
                id: p.dataValues.id,
                name: p.dataValues.name,
                image: p.dataValues.image,
                rating: p.dataValues.image,
                genres: p.dataValues.genres.map(q=>q.name)
            }
        })
    })
    return games
}
const searchExactNameDb = async name =>{
    const game = await Videogame.findOne({
        where:{
            name
        }
    })
    return game
}
const searchGamesDb = name =>{
    let games = Videogame.findAll({
        include:Genre,
        where:{
            name:{
                [Op.iLike]:name
            }
            
        }
    })
    .then(res =>{ 
        return res.map(p=>{
            return{
                id: p.dataValues.id,
                name: p.dataValues.name,
                image: p.dataValues.image,
                rating: p.dataValues.rating,
                genres: p.dataValues.genres.map(p=>p.name)
            }
        })
    })
    .catch(err=>new Error(err))
    return games
}
const dbFindById = id =>{
    const game = Videogame.findOne({
        include: Genre,
        where:{
            id
        }
    })
    .then(res=>res.dataValues)
    return game
}
const postGame = async (name,description,released,rating,platforms,image,genre) =>{
    const newGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image
    })
    if (genre.length) await newGame.addGenres
    return newGame
}
const genresFinder = async()=>{
    let genres = await Genre.findAll()
    return genres
}
const genresBulkCreator = async(genres)=>{
    await Genre.bulkCreate(genres)
}

module.exports = {
    findAllGamesDb,
    searchGamesDb,
    dbFindById,
    searchExactNameDb,
    postGame,
    genresFinder,
    genresBulkCreator
       
}