import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import { Col, FormContainer, Form, Link as SLink, Title, Button } from '../../design/components';
import { Message, Spinner } from '../../design/elements';
import { useForm } from 'react-hook-form';
import FormError from '../../utils/form/FormError';
import axios from 'axios';

const Login = ({ location }) => {
   const { register, handleSubmit, errors } = useForm();
   const { user, statusAuth, errorAuth } = useAuthState();
   const { login } = useAuthActions();

   if (user) return <Redirect to={location.state?.from || '/'} />;

   return (
      <Col width='12'>
         <FormContainer width={{ desktop: '50', tabport: '90' }} my='2'>
            <Title modifiers={['big', 'light']}>Login</Title>
            {statusAuth === 'pending' ? <Spinner /> : null}
            {errorAuth ? <Message text={errorAuth} severity='error' /> : null}
            <Form onSubmit={handleSubmit(login)}>
               <Form.Group>
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
               </Form.Group>
               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Input
                     name='password'
                     type='password'
                     ref={register({
                        required: 'Please enter your password'
                     })}
                  />
               </Form.Group>
               <Button>Login</Button>
            </Form>
            <Form.Footer>
               <Form.Label modifiers='footer'>New Customer?</Form.Label>
               <SLink as={Link} to='/signup' modifiers={['medium', 'exlight']}>
                  Register
               </SLink>
            </Form.Footer>
         </FormContainer>
      </Col>
   );
};

export default Login;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
