import React,{useRef} from 'react';
import './ImageUpload.css';
import Button from './Button';

const ImageUpload = props => {

    const filePickerRef = useRef();

    const pickedHandler = event => {
        console.log(event.target);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input 
            id={props.id}
             style={{display : 'none'}} 
             type="file" 
             accept=".jpg, .png, .jpeg"/>
             onChange={pickedHandler}
             <div className={`image-upload ${props.center && 'center'}`}>
                 <div className="image-upload__preview">
                     <img src="" alt="preview"/>
                 </div>
                 <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
             </div>
        </div>
    );
};

export default ImageUpload;