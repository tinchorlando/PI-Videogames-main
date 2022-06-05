const axios = require('axios');
const { Videogame , Genre } = require('../../../db.js') 


const getAllFromApi = async ()=>{    
    let url = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`
    let count = 0;
    let games =[]
    while (count<5){
        const fetch = await axios.get(url);
        url = await fetch.data.next;
        await fetch.data.results.forEach(p=>{
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
    console.log(dbData)
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
const getAll = async ()=>{    
    const api = await getAllFromApi();
    const db = await getAllFromDb()
    if (db.length>0){
        return [...api,...db]
    }
    else return api
};

const getSome = async (name)=>{

};
const getOne = async (id)=>{

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
    getOne,
    getGenres,
    postVid,
}
