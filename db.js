// import sequelize package
const Sequelize = require('sequelize');
// connect to database using sequelize where
//                                db name           user        password        options
const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
  host: 'localhost',
  dialect: 'postgres'
});
// authenticate using the username and password
database.authenticate()
  .then(() => console.log('postgres db is connected'))
  .catch(err => console.log(err));
  
module.exports = database;