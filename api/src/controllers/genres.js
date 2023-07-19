const { apiQuery } = require("../services");

const {API_KEY} = process.env
const getGenres = ()=>{
    const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`
    const genres = apiQuery(URL)
    .then(res=>res.results)
    .then(list=>{
        let processedList = list.map(p=>{
            return{
                id: p.id,
                name: p.name
            }
        })
        return processedList
    })
    .catch(err=> new Error(err))
    return genres
}
module.exports={
    getGenres,
}