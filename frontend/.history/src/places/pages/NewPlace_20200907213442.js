import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className='place-forn'>
      <Input type="text" label="Title"/>
    </form>
  );
};

export default NewPlace;