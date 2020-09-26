import React,{useState} from 'react';
import './Map.css';

const Map = props => {

    return (
        <div className={`map ${props.className}`} style={props.style}></div>
    );    
};

export default Map;