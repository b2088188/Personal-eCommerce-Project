import React, {useEffect, useRef} from 'react';
import {Link as ReactLink, Redirect} from 'react-router-dom';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useAuthActions} from '../../stores/auth/authActionContext';
import styled from 'styled-components';
import {Container, FormContainer, Form} from '../../design/components';
import { useForm } from 'react-hook-form';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import axios from 'axios';

const Login = ({
    location
}) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const {user, statusAuth, errorAuth} = useAuthState();
    const {authHandle} = useAuthActions();

   function onSubmit(values) {
    authHandle(axios.post(`/api/v1/users/login`, values))
    }

    if(user)
        return <Redirect to = {location.state?.from || '/'} />

    return (
        <Container>            
        <FormContainer>
      		<Form.Title modifiers = {['big', 'light']}>Login</Form.Title>
            {statusAuth === 'pending' ? <Spinner /> : null}
            {errorAuth ? <Message alert = {errorAuth} severity = 'error' /> : null}
            <FormError errors = {errors} />
      		<Form onSubmit = {handleSubmit(onSubmit)}>                
                <Form.Label>Email</Form.Label>
                <Form.Input name = 'email' type = 'text' ref = {register({
                    required: 'Please enter your email',
                   pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                   }
                })} />
                <Form.Label>Email</Form.Label>
                <Form.Input name = 'password' type = 'password' ref= {register({
                    required: 'Please enter your password'
                })} />
      			<Form.Button>Login</Form.Button>
      		</Form>
            <Form.Footer>
                <Form.Label modifiers = 'footer'>New Customer?</Form.Label>
                <Form.Link as = {ReactLink} to = '/signup' modifiers = 'exlight'>Register</Form.Link>
            </Form.Footer>      
        </FormContainer>
        </Container>
    )
}

export default Login;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}