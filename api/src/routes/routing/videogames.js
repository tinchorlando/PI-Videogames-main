const { Router } = require('express');
const { getAll , postVid , getSome} = require('./utils/utils.js');
const app = Router();
app.get('/',async(req,res,next)=>{
    try{    
        const {name} = req.query    
        if (name) res.status(200).json(await getSome(name))
        else res.status(200).send(await getAll());        
    } catch(error){
        res.status(404).json({
            "Error":"Juego no encontrado",
        })
    }
})
app.post('/',async(req,res,next)=>{
    try{
        const {name,description,released,rating,genre,platforms,image} = req.body;
        //primero validar la existencia de los necesarios
        res.status(201).json(await postVid(name,description,released,rating,genre,platforms,image))
    } catch (error){
        next(error)
    }
})

module.exports= app