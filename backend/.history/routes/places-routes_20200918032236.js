const { Router } = require('express');
const express = require('express');
const placesController = require('../controllers/places-controller');

const router = express.Router();

const DUMMY_PLACES = [{
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
}];

router.get('/:pid',placesController.getPlaceById );

router.get('/user/:uid', placesController.getPlaceByUserId);

module.exports = router;