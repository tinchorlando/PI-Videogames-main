const { dbFindById, apiQuery, findAllGamesDb, searchGamesDb, searchExactNameDb, postGame } = require('../services');

const {API_KEY} = process.env;

const getGameFromDb = id =>{
    let game = dbFindById(id)
    .then(res=>{
        return{
            name: res.name,
            image: res.image,
            genres: res.genres.map(p=>{
                return{
                    id: p.id,
                    name: p.name
                }
            }),
            description: res.description,
            released: res.released,
            rating: res.rating,
            platforms: res.platforms
        }
    })
    .catch(err=> new Error(err))
    return game
}
const getGameFromApi = id =>{
    const URL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    const game = apiQuery(URL)
    .then(res=>{
        return {
            name: res.name,
            image: res.background_image,
            genres: res.genres.map(p=>{
                return {
                    id: p.id,
                    name: p.name,
                    image: p.image
                }
            }),
            description: res.description_raw,
            released: res.released,
            rating: res.rating,
            platforms: res.platforms.map(p=>p.platform.name),            
        }
    })
    .catch(err=> new Error(err));
    return game
}

const postNewGame = async (name,description,released,rating,genre,platforms,image)=>{
    if (!name || !description || !platforms) throw new Error({message: 'Datos insuficientes'})
    if (rating < 0 || rating > 5) throw new Error({
        message: 'Error: rating incorrecto'
    })
    const existingGame = await searchExactNameDb(name)
    if (existingGame) throw new Error('El juego ya fue posteado anteriormente'
    )
    else{
        newGame = await postGame(name,description,released,rating,platforms,image,genre)
        return newGame
    }
}
module.exports={
    getGameFromApi,
    getGameFromDb,
    postNewGame
}
