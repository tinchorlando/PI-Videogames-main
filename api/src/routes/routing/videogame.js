const { Router } = require('express');
const app = Router();
const { getOneApi , getOneDb } = require('./utils/utils.js')

app.get('/:idVideogame',async(req,res,next)=>{
    try{
        const {idVideogame} = req.params;
        const regexp = ".*[a-zA-Z].*" //expresion regular que matchea si dentro del string hay una letra
        if (!idVideogame.match(regexp)){
            res.status(200).json(await getOneApi(idVideogame))
        }
        else res.status(200).json(await getOneDb(idVideogame))
    } catch (error){
        next(error)
    }
})
module.exports= app