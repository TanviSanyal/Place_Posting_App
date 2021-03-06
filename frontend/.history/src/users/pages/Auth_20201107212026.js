import React, { useState, useContext } from 'react';
import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context'

const Auth = (props) => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }

    }, false);

    const authSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {

        }
        else {
            try {
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
               const responseData = await response.json();
               console.log(responseData);
            }
            catch (err) {
                console.log(err);
            }
        }


        auth.login();

    };

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }

        setIsLoginMode(prevMode => !prevMode);
    };

    return (
        <Card className="authentication">
            <h2>Login required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (<Input id="name"
                    element="input"
                    type="text"
                    label="NAME"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                />)}
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
                <Button type="submit" disabled={!formState.isValid} >
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>{isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
        </Card>
    );
};

export default Auth;