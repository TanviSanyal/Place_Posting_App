const uuid = require('uuid');
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

// let DUMMY_PLACES = [{
//     id: 'p1',
//     title: 'Empire State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//     address:'20 W 34th St, New York, NY 10001',
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584
//     },
//     creator: 'u1'
// }];

const getPlaceById = async (req, res, next) => {
    
    const placeId = req.params.pid;
    let place;

    try{

     place = await Place.findById(placeId);

    }
    catch(err)
    {
      const error = new HttpError ("something went wrong, could not find a palce",500);
      return next(error);
    }
    
    if(!place){
        const error = new HttpError('could not find the place for the provided place id',404);
        return next(error);
    }
    res.json({place : place.toObject({getters:true})});
};

const getPlacesByUserId = async (req, res, next) => {
    
    const userId = req.params.uid;
    let places;

    try{
      places = await Place.find({creator : userId});
    }
    catch(err)
    {
      const error =new HttpError("Fetching places failed!!!! please try again",500);
      return next(error);
    }

    if(!places || places.length===0){
        return next(new HttpError('could not find the place for the provided user id',404));
    }
    res.json({places : places.map(place => place.toObject({getters:true}))});
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
    console.log("coordinates created");
  } catch (error) {
    console.log("coordinates not created");
    return next(error);
    
  }

  // const title = req.body.title;
  const createdPlace = new Place({
    title,
    description,
    address,
     location : {
       lat: coordinates.x,
       lng : coordinates.y
     },
    image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    creator
  });
  try{
  await createdPlace.save();
  console.log("place created");
  }
  catch(err){
    const error = new HttpError('Creating place failed ! Please try again',500);
    console.log(err);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

  const updatePlace = async (req, res, next) => {

    const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    return next(new HttpError("Invalid input passed.Please check your data",422));
  }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try{
      place = await Place.findById(placeId);
    }
    catch(err)
    {
      const error = new HttpError("Someting went wrong, could not update palce",500);
      return next(error);
    }

    // const updatedPlace = {...DUMMY_PLACES.find(p => p.id===placeId)};
    // const placeIndex = DUMMY_PLACES.findIndex(p => p.id===placeId);
    place.title = title;
    place.description = description;

    try{
      await place.save();
    }
    catch(err)
    {
      const error = new HttpError("something went wrong,  could not update place",500);
      return next(error);
    }

    res.status(200).json({place : place.toObject({getters:true})});

  };

  const deletePlace =async (req, res, next) => {

    const placeId = req.params.pid;
    let place;

    try{
      place = await Place.findById(placeId);
    }
    catch(err)
    {
      const error = new HttpError("something went wrong, could not delete a place");
      return next(error);
    }
    try{
      await place.remove();
    }
    catch(err)
    {
      const error = new HttpError("something went wrong, could not delete a place");
      return next(error);
    }
    res.status(200).json({ message : "deleted place"});
  };


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;