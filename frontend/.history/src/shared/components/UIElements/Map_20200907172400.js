import React,{useRef} from 'react';
import './Map.css';

const Map = props => {
    const mapRef=useRef();
    const map=new window.google.maps.Map(mapRef.current,{
        center:props.center,
        zoom:props.zoom
    });
    return (
        <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
    );    
};

export default Map;