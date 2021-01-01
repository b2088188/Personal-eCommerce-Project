import React, {useEffect, useContext, useRef} from 'react';
import {Link as ReactLink} from 'react-router-dom';
import styled from 'styled-components';
import {Container, FormContainer, Form} from '../../design/components';
import AuthContext from '../../stores/auth/authContext';
import { useForm } from 'react-hook-form';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';

const Login = ({
    location,
    history
}) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const {authHandle, isAuth, loading, error} = useContext(AuthContext);
   useEffect(() => {
      if(isAuth)
        history.push(location.state?.from || '/');
   }, [isAuth, history, location.state])


    return (
        <Container>            
        <FormContainer>
      		<Form.Title modifiers = {['big', 'light']}>Login</Form.Title>
            {loading && <Spinner />}
            {error && <Message alert = {error} severity = 'error' />}
            <FormError errors = {errors} />
      		<Form onSubmit = {handleSubmit(authHandle('login'))}>                
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