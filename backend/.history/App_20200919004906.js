const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const App = express();

App.use(bodyParser.json());

App.use('/api/places',placesRoutes);

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



App.listen(5000);