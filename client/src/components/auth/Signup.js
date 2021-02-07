import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from 'stores/auth/authContext';
import { Row, Col, FormContainer, Form, Button, Title, Span } from 'design/components';
import { Spinner, Message } from 'design/elements';
import { useForm } from 'react-hook-form';

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
const Signup = ({ location }) => {
   const [{ user, isLoading, isError, error }, { signup }] = useAuth();
   const { register, handleSubmit, watch, errors } = useForm();
   const password = useRef({});
   password.current = watch('password', '');

   if (user) return <Redirect to={location.state?.from || '/'} />;
   if (isLoading)
      return (
         <Row>
            <Spinner modifiers='dark' />
         </Row>
      );
   return (
      <Row>
         <Col width='12'>
            <FormContainer width={{ desktop: '50', tabport: '90' }} my='2'>
               <Title modifiers={['big', 'light']}>Sign Up</Title>
               {error ? <Message text={error} severity='error' /> : null}
               <Form onSubmit={handleSubmit(signup)}>
                  <Form.Group direction='column'>
                     <Form.Label>Name</Form.Label>
                     <Form.Input
                        name='name'
                        type='text'
                        ref={register({
                           required: 'Please enter your name'
                        })}
                     />
                     {errors.name ? <Span modifiers='danger'>{errors.name.message}</Span> : null}
                  </Form.Group>
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
                     {errors.email ? <Span modifiers='danger'>{errors.email.message}</Span> : null}
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Password</Form.Label>
                     <Form.Input
                        name='password'
                        type='password'
                        ref={register({
                           required: 'You must specify a password',
                           minLength: [8, 'Password must have at least 8 characters']
                        })}
                     />
                     {errors.password ? (
                        <Span modifiers='danger'>{errors.password.message}</Span>
                     ) : null}
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Password Confirm</Form.Label>
                     <Form.Input
                        name='passwordConfirm'
                        type='password'
                        ref={register({
                           required: 'You must confirm your password',
                           validate: (value) =>
                              value === password.current ||
                              'The passwords do no match, please try again'
                        })}
                     />
                     {errors.passwordConfirm ? (
                        <Span modifiers='danger'>{errors.passwordConfirm.message}</Span>
                     ) : null}
                  </Form.Group>
                  <Button>Sign Up</Button>
               </Form>
            </FormContainer>
         </Col>
      </Row>
   );
};

export default Signup;
