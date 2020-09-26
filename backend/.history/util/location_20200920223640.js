const axios = require('axios');

const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {

  const response = await axios.get(
    'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates',
    {
      params: {
        f: 'json',
        singleLine: address,
        outFields: 'Match_addr,Addr_type'
      }
    }
  );
 
  const data = response.data;
 
  // Check if no matches were found
  if (!data || data.candidates.length === 0) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }
  
  const coordinates = data.candidates[0].location;
  
  return coordinates;
};
module.exports = getCoordsForAddress;
