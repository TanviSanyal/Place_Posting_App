const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');

const App = express();

App.use('/api/places',placesRoutes);



App.listen(5000);