const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getGenres } = require('./src/routes/routing/utils/utils.js');
const { Genre } = require('./src/db.js')


const loadGenresToDb = ()=>{
  Genre.findAll()
  .then(genreFinder=>{
    if (genreFinder.length===0){
      getGenres()
      .then(genres=>{
        return genres.map(p=>{
          return {
            id:p.id,
            name:p.name,
          }
        })
      })
      .then(readyGenres=>{
        Genre.bulkCreate(readyGenres)
        return console.log(`%s is listening at port ${process.env.PORT}`)
      })
    }
  })
}


// Syncing all the models at once.
conn.sync().then(() => {
  server.listen(process.env.PORT, () => {
    loadGenresToDb()
    console.log(`%s is listening at port ${process.env.PORT}`)
     // eslint-disable-line no-console
  });
});
