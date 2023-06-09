const { getGenres } = require("../controllers");
const { genresFinder , genresBulkCreator  } = require("../services");

const loadGenresToDb = ()=>{
    let genresFound = genresFinder()
    .then(res=>{
      if (!genresFound){
        let genres = getGenres()
        .then(res=>genresBulkCreator(genres))
      }
    })
}
module.exports={
    loadGenresToDb,

}