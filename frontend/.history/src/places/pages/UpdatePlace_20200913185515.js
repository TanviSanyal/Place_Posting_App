import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from '../../shared/util/validators';
import './PlaceForm.css';

const DUMMY_PLACES=[{
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
    creator :"u2"}];

const UpdatePlace = (props) =>{

    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find (p => p.id === placeId);

    if(!identifiedPlace){
        return(
            <div className='center'>
                <h2>Could not find place</h2>
            </div>
        );
    }

    return <form className='place-form'>
            <Input id="title" 
                   element="input" 
                   type="text" 
                   label="Title" 
                   validators={[VALIDATOR_REQUIRE()]}
                   errorText="Please enter a valid title"
                   onInput={() => {}}
                   value={identifiedPlace.title}
                   valid={true} />
            
            <Input id="description" 
                   element="text"  
                   label="Description" 
                   validators={[VALIDATOR_MINLENGTH(5)]}
                   errorText="Please enter a valid description ( minimum 5 charecters)."
                   onInput={() => {}}
                   value={identifiedPlace.description}
                   valid={true} />

            <Button type="submit" disabled={true}>UPDATE PLACE</Button>
    </form>;
};

export default UpdatePlace;