import React from 'react';
import PlaceList from '../components/PlaceList';
import {useParams} from 'react-router-dom';

const DUMMY_PLACES=[
    {
    id:"p1",
    title : "victoria Memorial",
    description : "This is one of the famous place in kolkata",
    address : "KOLKATA",
    imageUrl : "https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Victoria-Memorial_600-1280x720.jpg",
    location :{
        lat:22.5448082,
        lng:88.3403691
    },
    creator :"u1"
},
{
    id:"p2",
    title : "victoria Memorial",
    description : "qwewpthjgdsgouhfaoihewothi08eyrgldjbvnHZDJPDGDSGFSF",
    address : "KOLKATA",
    imageUrl : "https://assets.telegraphindia.com/telegraph/05648444-7dc7-4c71-9a25-656e98a6a0a0.jpg",
    location :{
        lat:22.5448082,
        lng:88.3403691
    },
    creator :"u2"}
];

const UserPlaces = props => {
    const userId=useParams().userId;
    const loadedPlace=DUMMY_PLACES.filter(place => place.creator===userId);
    return <PlaceList items={loadedPlace}/>
};

export default UserPlaces;