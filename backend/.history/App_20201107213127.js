const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');

const App = express();

App.use(bodyParser.json());

App.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next();
});

App.use('/api/places',placesRoutes);
App.use('/api/users',usersRoutes);

App.use((req,res,next) => {
    const error = new HttpError("could not find the route", 404);
    throw error;
});

App.use((error, req, res, next) => {

    if(res.headerSent)
    {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || 'An unknown error occurred!!!'})
});

mongoose.connect('mongodb://tanvi:tanvisanyal@cluster0-shard-00-00.dfsgg.mongodb.net:27017,cluster0-shard-00-01.dfsgg.mongodb.net:27017,cluster0-shard-00-02.dfsgg.mongodb.net:27017/mern?ssl=true&replicaSet=atlas-1445al-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true , useUnifiedTopology:true , useCreateIndex:true})
        .then(() => {
    App.listen(5000);
    console.log("database connected");
                    })
        .catch(error => {
    console.log(error);
});
