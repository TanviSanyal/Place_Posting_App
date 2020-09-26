import React from 'react';
import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_EMAIL,VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';

const Auth = (props) => {

    const [formState,inputHandler]=useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }

    },false);

    const authSubmitHandler = event => {
        event.preventDefault();
    };

    return(
        <Card className="authentication">
            <h2>Login required</h2>
            <hr />
            <form>
                <Input id="email" 
                       element="input" 
                       type="email" 
                       label="E-MAIL" 
                       validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                />
                <Input id="password" 
                       element="input" 
                       type="password" 
                       label="PASSWORD" 
                       validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password. Atleast 5 charecters"
                        onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
            </form>
        </Card>
    ) ;
};

export default Auth;