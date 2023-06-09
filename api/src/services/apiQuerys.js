const axios = require("axios")

const apiQuery = url =>{
    data = axios.get(url)
    .then(res => res.data)
    .catch(err=> new Error(err))
    return data
}
const apiGameCollector = gameList =>{
    let games = gameList.map(p=>{
        return{
        id: p.id,
        name: p.name,
        image: p.background_image,
        rating: p.rating,
        genres: p.genres.map((q) => q.name)
        }
    })
    return games
}
module.exports = {
    apiQuery,
    apiGameCollector,
}