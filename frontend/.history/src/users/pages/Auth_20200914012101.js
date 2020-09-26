import React from 'react';
import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_EMAIL,VALIDATOR_MINLENGTH} from '../../shared/util/validators';

const Auth = (props) => {
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
                       />
            </form>
        </Card>
    ) ;
};

export default Auth;