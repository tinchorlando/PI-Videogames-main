const { Router } = require('express');
const app = Router();
const { getGenres } = require('../../controllers')
app.get('/',(req,res,next)=>{
        getGenres()
        .then(data=>res.status(200).json(data))
        .catch(error=>next(error))
})

module.exports= app