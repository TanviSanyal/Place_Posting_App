const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyDiqD-LMu73CRzL3z75kGeozuNkOXvEVK8';

async function getCoordsForAddress (address){

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

    const data=response.data;

    if(!data || data.status === 'ZERO_RESULTS'){

        throw new HttpError("could not find location for the specific address. ",422);

    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;

};

module.exports = getCoordsForAddress;