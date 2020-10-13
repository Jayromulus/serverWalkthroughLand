// configure the program to use environment variables
require('dotenv').config();

// here we are invoking Node's require() function, and specifying the name of the module we want to import. This would not work if we did not install express as a dependancy
const Express = require('express');

// here we are making a new instance of Express, which will unlock the use of HTTP requests, middleware functionality, and some other basic application settings
const app = Express();

// import our database connection from the db.js file
const database = require('./db');
// connect with the locally running postgres database to allow us to both get and send data to our postgres server
database.sync();

app.use(Express.json());

app.use(Express.static(__dirname + '/public'));
console.log(__dirname);

// gives us the webpage when we go to the '/' endpoint:
// http://localhost:8080/
app.get('/', (request, response) => response.render('index'));

// sends us the string 'I love pies!' when we go to the '/pies' endpoint
// http://localhost:8080/pies
// app.get('/pies', function(request, response) { response.send('I love pies!') } );

// import the piecontroller into this file
const pies = require('./controllers/piecontroller');
// const pies = router;
app.use('/pies', pies);

const spanishfood = require('./controllers/spanishfoodcontroller');
app.use('/spanishfood', spanishfood);

const usercontroller = require('./controllers/usercontroller');
app.use('/user', usercontroller)

// this will start our server on the port number we supply, and will console.log a message telling us the server is running
app.listen(process.env.PORT, function(){ console.log(`app is listening on port ${process.env.PORT}`) });


















// ฅ(＾・ω・＾ฅ)
