const { Router } = require('express');
const {getGames , postNewGame} = require("../../controllers");
const app = Router();
app.get('/',async(req,res,next)=>{
    try{    
        const {name} = req.query    
        if (name) res.status(200).json(await getGames(name))
        else res.status(200).send(await getGames());        
    } catch(error){
        console.log(error)
        res.status(404).json({
            "Error":"Juego no encontrado",
            
        })
    }
})
app.post('/',async(req,res,next)=>{
    try{
        const {name,description,released,rating,genre,platforms,image} = req.body;
        if (!name || !description || !platforms) throw 'Ingrese todos los datos'
        res.status(201).json(await postNewGame(name,description,released,rating,genre,platforms,image))
    } catch (error){
        next(error)
    }
})

module.exports= app