const { Router } = require('express');
const app = Router();
const { getGameFromApi, getGameFromDb } = require('../../controllers');

app.get('/:idVideogame',async(req,res,next)=>{
    try{
        const {idVideogame} = req.params;
        const regexp = ".*[a-zA-Z].*" //expresion regular que matchea si dentro del string hay una letra
        if (!idVideogame.match(regexp)){
            res.status(200).json(await getGameFromApi(idVideogame))
        }
        else res.status(200).json(await getGameFromDb(idVideogame))
    } catch (error){
        next(error)
    }
})
module.exports= app