const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');

const App = express();

App.use(bodyParser.json());

App.use('/api/places',placesRoutes);
App.use('/api/users',usersRoutes);

// App.use((req,res,next) => {
//     const error = new HttpError("could not find the route", 404);
//     throw error;
// });

App.use((error, req, res, next) => {

    if(res.headerSent)
    {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || 'An unknown error occurred!!!'})
});

mongoose.connect('mongodb+srv://Tanvi:gWbHyIrypIkzD1mg@cluster0.ss5de.mongodb.net/places?retryWrites=true&w=majority',{useNewUrlParser:true})
        .then(() => {
    App.listen(5000);
                    })
        .catch(error => {
    console.log(error);
});


//gWbHyIrypIkzD1mg