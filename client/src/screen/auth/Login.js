import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useAuth from 'context/auth/authContext';
import {
   Row,
   Col,
   FormContainer,
   Form,
   Link as SLink,
   Title,
   Button,
   Span
} from 'design/components';
import { FullPageSpinner } from 'components/Spinner';
import { Message } from 'components/Message';
import { useForm } from 'react-hook-form';

const Login = ({ location }) => {
   const [{ user, isLoading, error }, { login, setError }] = useAuth();
   const { register, handleSubmit, errors } = useForm();

   useEffect(() => {
      return () => setError(null);
   }, [setError]);

   if (user) return <Redirect to={location.state?.from || '/'} />;
   if (isLoading) return <FullPageSpinner />;
   return (
      <Row>
         <Col width='12'>
            <FormContainer width={{ desktop: '50', tabport: '90' }} my='2'>
               <Title modifiers={['big', 'light']}>Login</Title>
               {error ? <Message text={error} severity='error' /> : null}
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
                     {errors.email ? <Span modifiers='danger'>{errors.email.message}</Span> : null}
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
                     {errors.password ? (
                        <Span modifiers='danger'>{errors.password.message}</Span>
                     ) : null}
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
      </Row>
   );
};

export default Login;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
