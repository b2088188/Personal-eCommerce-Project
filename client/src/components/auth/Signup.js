import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import { Col, FormContainer, Form } from '../../design/components';
import { useForm } from 'react-hook-form';
import FormError from '../../utils/form/FormError';
import axios from 'axios';

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
const Signup = ({ location }) => {
   const { user } = useAuthState();
   const { signup } = useAuthActions();
   const { register, handleSubmit, watch, errors } = useForm();
   const password = useRef({});
   password.current = watch('password', '');

   if (user) return <Redirect to={location.state?.from || '/'} />;

   return (
      <Col width='12'>
         <FormContainer>
            <Form.Title modifiers={['big', 'light']}>Sign Up</Form.Title>
            <Form onSubmit={handleSubmit(signup)}>
               <Form.Label>Name</Form.Label>
               <Form.Input
                  name='name'
                  type='text'
                  ref={register({
                     required: 'Please enter your name'
                  })}
               />
               <Form.Label>Email</Form.Label>
               <Form.Input
                  name='email'
                  type='text'
                  ref={register({
                     required: 'Please enter your email',
                     pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                     }
                  })}
               />
               <Form.Label>Password</Form.Label>
               <Form.Input
                  name='password'
                  type='password'
                  ref={register({
                     required: 'You must specify a password',
                     minLength: [8, 'Password must have at least 8 characters']
                  })}
               />
               <Form.Label>Password Confirm</Form.Label>
               <Form.Input
                  name='passwordConfirm'
                  type='password'
                  ref={register({
                     required: 'You must confirm your password',
                     validate: (value) =>
                        value === password.current || 'The passwords do no match, please try again'
                  })}
               />
               <Form.Button>Sign Up</Form.Button>
            </Form>
         </FormContainer>
      </Col>
   );
};

export default Signup;
