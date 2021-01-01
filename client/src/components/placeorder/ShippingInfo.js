import React, {useState} from 'react';
import {Redirect, Prompt} from 'react-router-dom';
import {useCartState} from '../../stores/cart/cartStateContext';
import {useCartActions} from '../../stores/cart/cartActionContext';
import {Container, FormContainer, Form} from '../../design/components';
import { useForm } from 'react-hook-form';
import Navsteps from '../../layout/NavSteps';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';




const ShippingInfo = () => {
    const {cartList} = useCartState();
    const {dispatchCart, savePayInfo} = useCartActions();
    const [toPayment, setToPayment] = useState(false);
	const {register, handleSubmit, errors, formState: {dirtyFields}} = useForm({
        mode: "onChange"
    });
    const [isTyping, setIsTyping] = useState(false);    

    function onSubmit(values) {
        savePayInfo('shippingAddress', values)
        setToPayment(true);
        setIsTyping(false);
    }

    if(Object.keys(dirtyFields).length > 0 && !isTyping)
        setIsTyping(true);

    if(cartList.length < 1)
    return <Redirect to = '/' />

   if(toPayment)
    return <Redirect to = '/payment' />

	return (
		 <Container>      
         <Prompt when = {isTyping} message = {`Are you sure you want to leave this page?`} />      
        <FormContainer>
        	<Navsteps step1 />  
          <Form.Title modifiers = {['big', 'light']}>Shipping</Form.Title>
          <Form onSubmit = {handleSubmit(onSubmit)}>
          	<FormError errors = {errors} />
                <Form.Label>Address</Form.Label>
                <Form.Input name = 'address' type = 'text' ref = {register({
      				required: 'Please provide your address'	               
      			})} />                
                <Form.Label>City</Form.Label>
                <Form.Input name = 'city' type = 'text' ref = {register({
      				required: 'Please provide your city'
      			})}  />
                <Form.Label>PostalCode</Form.Label>
                <Form.Input name = 'postalCode' type = 'text' ref = {register({
      				required: 'Please provide your postalCode'
      			})} />    
                <Form.Label>Country</Form.Label>
                <Form.Input name = 'country' type = 'text' ref = {register({
      				required: 'Please provide your country'
      			})}  />
            <Form.Button>Continue</Form.Button>
          </Form>
        </FormContainer>
        </Container>     
		)
}

export default ShippingInfo;