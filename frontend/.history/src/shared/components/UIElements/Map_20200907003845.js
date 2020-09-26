import React,{useState} from 'react';
import './Map.css';
import ReactMapGL from 'react-map-gl';

const Map = props => {

    const [viewPort,setViewPort]=useState({
        latitutde:22.652466399999998,
        longitude:88.4287738,
        zoom:10,
        height:'100vh',
        width:'100vw'
    });
    return <div>
        <ReactMapGL {...viewPort}>
            MARKERS HERE
        </ReactMapGL>
    </div>
};

export default Map;