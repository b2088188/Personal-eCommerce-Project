import React, { useState } from 'react';
import { Redirect, Prompt } from 'react-router-dom';
import useCart from '../../../stores/cart/cartContext';
import { Row, Col, FormContainer, Form, Span } from '../../../design/components';
import { Spinner, Message } from '../../../design/elements';
import { useForm } from 'react-hook-form';
import Navsteps from '../../../layout/NavSteps';
import FormGroup from '../../../utils/form/FormGroup';
import FormError from '../../../utils/form/FormError';

const ShippingInfo = () => {
   const [{ cartList }, { dispatchCart, savePayInfo }] = useCart();
   const [toPayment, setToPayment] = useState(false);
   const {
      register,
      handleSubmit,
      errors,
      formState: { dirtyFields }
   } = useForm({
      mode: 'onChange'
   });
   const [isTyping, setIsTyping] = useState(false);

   function onSubmit(values) {
      savePayInfo('shippingAddress', values);
      setToPayment(true);
      setIsTyping(false);
   }

   if (Object.keys(dirtyFields).length > 0 && !isTyping) setIsTyping(true);

   if (cartList.length < 1) return <Redirect to='/' />;

   if (toPayment) return <Redirect to='/payment' />;

   return (
      <Row>
         <Col width='12'>
            <Prompt when={isTyping} message={`Are you sure you want to leave this page?`} />
            <FormContainer width={{ desktop: '50', tabport: '90' }} my='2'>
               <Navsteps step1 />
               <Form.Title modifiers={['big', 'light']}>Shipping</Form.Title>
               <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group direction='column'>
                     <Form.Label>Address</Form.Label>
                     <Form.Input
                        name='address'
                        type='text'
                        ref={register({
                           required: 'Please provide your address'
                        })}
                     />
                     {errors.address ? (
                        <Span modifiers='danger'>{errors.address.message}</Span>
                     ) : null}
                  </Form.Group>
                  <Form.Group direction='column'>
                     <Form.Label>City</Form.Label>
                     <Form.Input
                        name='city'
                        type='text'
                        ref={register({
                           required: 'Please provide your city'
                        })}
                     />
                     {errors.city ? <Span modifiers='danger'>{errors.city.message}</Span> : null}
                  </Form.Group>
                  <Form.Group direction='column'>
                     <Form.Label>PostalCode</Form.Label>
                     <Form.Input
                        name='postalCode'
                        type='text'
                        ref={register({
                           required: 'Please provide your postalCode'
                        })}
                     />
                     {errors.postalCode ? (
                        <Span modifiers='danger'>{errors.postalCode.message}</Span>
                     ) : null}
                  </Form.Group>
                  <Form.Group direction='column'>
                     <Form.Label>Country</Form.Label>
                     <Form.Input
                        name='country'
                        type='text'
                        ref={register({
                           required: 'Please provide your country'
                        })}
                     />
                     {errors.country ? (
                        <Span modifiers='danger'>{errors.country.message}</Span>
                     ) : null}
                  </Form.Group>
                  <Form.Button>Continue</Form.Button>
               </Form>
            </FormContainer>
         </Col>
      </Row>
   );
};

export default ShippingInfo;
