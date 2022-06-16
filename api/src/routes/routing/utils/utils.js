const axios = require('axios');
const { Videogame , Genre } = require('../../../db.js') 


const getAllFromApi = async ()=>{    
    let url = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`
    let count = 0;
    let games =[]
    while (count<5){
        const fetch = await axios.get(url);
        url = fetch.data.next;
        fetch.data.results.forEach(p=>{
            games.push({
                id:p.id,
                name:p.name,
                image:p.background_image,
                rating:p.rating,
                genres:p.genres.map(q=>q.name),
            })
        })        
        count++;
    }
    return games
}
const getAllFromDb = async ()=>{
    const dbData = await Videogame.findAll({include:Genre});    
    const data = dbData.map(p=>{
        let videogame ={
            id: p.dataValues.id,
            name: p.dataValues.name,
            image: p.dataValues.image,
            rating: p.dataValues.rating,
            genres: p.dataValues.genres.map(q=>q.name),
        }
        return videogame
    })
    return data
}

const getSome = async (name)=>{
    const fetch = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${process.env.API_KEY}`);
    const games = fetch.data.results.map(game=>{
        return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            genres: game.genres.map(p=>p.name),
        }
    })
    return games.slice(0,15)
}

const getAll = async ()=>{    
    const api = await getAllFromApi();
    const db = await getAllFromDb()
    if (db.length>0){
        return [...api,...db]
    }
    else {
        return api
    }
};

const getOneDb = async (id)=>{
    const db = await Videogame.findOne({
        include:Genre,
        where: {
            id:id,
        }
    })
    let game = db.dataValues
    return {
        name: game.name,
        image: game.image,
        genres: game.genres.map(p=>{
            return{
                id: p.id,
                name: p.name,
            }
        }),
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms
    }
}
const getOneApi = async (id)=>{
    const api = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);
    const game = api.data
    return{
        name: game.name,
        image: game.background_image,
        genres: game.genres.map(p=>{
            return{
                id: p.id,
                name: p.name,
                image: p.image,
            }
        }),
        description: game.description_raw,
        released: game.released,
        rating: game.rating,
        platforms:game.platforms.map(p=>p.platform.name),
    }
};
const getGenres =  ()=>{
    const genres = axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`) 
    .then(res=>res.data.results)
    .then(list=>{        
        let processedList = list.map(p=>{
        return{
            id:p.id,
            name:p.name,
        }
    })
    return processedList
})
    return genres
};
const postVid = async (name,description,released,rating,genre,platforms,image)=>{
    if (!name || !description || !platforms) throw 'Error: Datos insuficientes';
    if (rating<0 || rating>5) throw 'Error: rating incorrecto'
    const existingGame = await Videogame.findAll({
        where:{
            name
        }
    })
    if (existingGame.length) throw 'Game already exists';
    else {
        const newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            image
        })
        if (genre.length) await newGame.addGenres(genre)
        
        return newGame
    }
}
module.exports={
    getAll,
    getSome,
    getOneApi,
    getOneDb,
    getGenres,
    postVid,
}
