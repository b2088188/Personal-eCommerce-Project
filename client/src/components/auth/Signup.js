import React, {useEffect, useContext, useRef} from 'react';
import {Container, FormContainer, Form} from '../../design/components';
import { useForm } from 'react-hook-form';
import AuthContext from '../../stores/auth/authContext';
import FormError from '../../utils/form/FormError';


// {{pathname: '/signup', state: { prevPath: location.pathname }}}
const Signup = ({
	history,
	location
}) => {
	const {isAuth, authHandle} = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    
    useEffect(() => {
      if(isAuth)
        history.push(location.state?.from || '/');
   }, [isAuth, history, location.state])



    return (
        <Container>            
        <FormContainer>
          <Form.Title modifiers = {['big', 'light']}>Sign Up</Form.Title>
          <Form onSubmit = {handleSubmit(authHandle('signup'))}>
                <Form.Label>Name</Form.Label>
                <Form.Input name = 'name' type = 'text' ref= {register({
                    required: 'Please enter your name'
                })} />                
                <Form.Label>Email</Form.Label>
                <Form.Input name = 'email' type = 'text' ref = {register({
                    required: 'Please enter your email',
                   pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                   }
                })} />
                <Form.Label>Password</Form.Label>
                <Form.Input name = 'password' type = 'password' ref = {register({
                  required: 'You must specify a password',
                  minLength: [8, 'Password must have at least 8 characters']
            })} />    
                <Form.Label>Password Confirm</Form.Label>
                <Form.Input name = 'passwordConfirm' type = 'password' ref = {register({
                  required: 'You must confirm your password',
                  validate: value => value === password.current || 'The passwords do no match, please try again'
            })} />
            <Form.Button>Sign Up</Form.Button>
          </Form>
        </FormContainer>
        </Container>        
    )
}

export default Signup;