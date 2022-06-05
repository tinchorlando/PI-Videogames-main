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
                genre:p.genres.map(q=>{
                    return {
                        id:q.id,
                        name:q.name,
                        image:q.image_background,
                    }
                }),
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
            genre: p.dataValues.genres.map(q=>{
                return{
                    id:q.id,
                    name:q.name
                }
            }),
        }
        return videogame
    })
    return data
}
const getSomeFromApi = async (name)=>{
    let gamesArray = [];
    const fetch = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${process.env.API_KEY}`);
    for(let i=0;i<=14;i++){
        let current = fetch.data.results[i]
        gamesArray.push({
            id: current.id,
            name: current.name,
            image: current.background_image,
            rating:current.rating,
            genre: current.genres,            
        })        
    }
    return gamesArray
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

const getSome = async (name)=>{
    const api = await getSomeFromApi(name);
    return api;
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
    const genres = axios.get(`https://api.rawg.io/api/genres?key=6c956f38e02d447bad5b2ff554b6f93b`) 
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
