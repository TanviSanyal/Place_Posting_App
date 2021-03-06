import React, { useCallback ,useReducer} from 'react';
import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

const formReducer = (state,action) => {
  switch(action.type){
    case 'INPUT_CHNAGE':
      let formIsValid=true;
      for(const inputId in state.inputs){
        if(inputId===action.inputId){
          formIsValid=formIsValid && action.isValid;
        }
        else{
          formIsValid=formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        input:{
          ...state.inputs,
          [action.inputId]:{value:action.value,isValid:action.isValid}
        },
        isValid:formIsValid
      };

    default:
      return state;
  }
};

const NewPlace = () => {

  const [formState,dispatch] = useReducer(formReducer,{
    inputs: {
      title:{
        value:'',
        isValid:false
      },
      description:{
        value:'',
        isValid:false
      }
    },
    isValid:false
  });

  const inputHandler = useCallback((id, value, isValid) =>  {
    dispatch({
      type:'INPUT_CHNAGE',
      value:value,
      isValid:isValid,
      inputId:id
    });
  }, []);

  const descriptionInputHandler = useCallback((id, value, isValid) =>  {}, []);

  return (
    <form className='place-form'>
      <Input id='title'
        element='input'
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input id='description'
        element='textarea'
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (Atleast 5 charecters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;