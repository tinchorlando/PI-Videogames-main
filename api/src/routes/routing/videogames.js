const { Router } = require('express');
const { getAll , postVid } = require('./utils/utils.js');
const app = Router();
app.get('/',async(req,res,next)=>{
    try{        
        res.status(200).send(await getAll());        
        // res.status(200).json(getSome(name))
    } catch(error){
        next(error)
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