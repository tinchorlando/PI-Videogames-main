const { Router } = require('express');
const { getAll , postVid , getSome} = require('./utils/utils.js');
const app = Router();
app.get('/',async(req,res,next)=>{
    try{    
        const {name} = req.query    
        if (name) res.status(200).json(await getSome(name))
        else res.status(200).send(await getAll());        
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
        res.status(201).json(await postVid(name,description,released,rating,genre,platforms,image))
    } catch (error){
        res.status(400).send(error)
    }
})

module.exports= app