const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
//setup express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninja',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true });
mongoose.Promise = global.Promise;

app.use(express.static('public'));
//parse json data to the request body and send it to the route handler
app.use(bodyParser.json());
//use is used to use some middleware in our app
//middleware is the code that runs between request and response
//here any route that is of form /api/sth will use the routes
app.use('/api',routes);

//middleware for error-handling
//fired if there is an error in request handling
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({
        error: err.message
    });
});

//listen for requests
//process.env.port is for port which heroku environment provides
app.listen(process.env.port || 4000,function(){
    console.log('now listening for requests..');
});