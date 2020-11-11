import React, {useEffect, useState} from 'react';
import PlaceList from '../components/PlaceList';
import {useParams} from 'react-router-dom';
import {useHttpClient} from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


// const DUMMY_PLACES=[
//     {
//     id:"p1",
//     title : "victoria Memorial",
//     description : "This is one of the famous place in kolkata",
//     address : "KOLKATA",
//     imageUrl : "https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Victoria-Memorial_600-1280x720.jpg",
//     location :{
//         lat:22.5448082,
//         lng:88.3403691
//     },
//     creator :"u1"
// },
// {
//     id:"p2",
//     title : "victoria Memorial",
//     description : "qwewpthjgdsgouhfaoihewothi08eyrgldjbvnHZDJPDGDSGFSF",
//     address : "KOLKATA",
//     imageUrl : "https://assets.telegraphindia.com/telegraph/05648444-7dc7-4c71-9a25-656e98a6a0a0.jpg",
//     location :{
//         lat:22.5448082,
//         lng:88.3403691
//     },
//     creator :"u2"}
// ];

const UserPlaces = async props => {

    const [loadedPlaces, setLoadedPlaces] = useState();

    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const userId=useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            }
            catch(err){}
        };
        fetchPlaces();
    },[sendRequest,userId]);

    
    
    // const loadedPlace= await responseData.filter(place => place.creator===userId);
    
    return(
         <>
         <ErrorModal error={error} onClear={clearError}/>
         {
             isLoading && <div className='center'><LoadingSpinner onOverlay/></div>
         }
         {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}/>}
         </>
         );
};

export default UserPlaces;