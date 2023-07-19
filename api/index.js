const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { loadGenresToDb } = require('./src/utils');

// Syncing all the models at once.
conn.sync().then(() => {
  server.listen(process.env.PORT, () => {
    loadGenresToDb()
    console.log(`%s is listening at port ${process.env.PORT}`)
     // eslint-disable-line no-console
  });
});
