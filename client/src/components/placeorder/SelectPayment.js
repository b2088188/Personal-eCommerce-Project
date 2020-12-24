import './selectpayment.scss';
import React, {useContext} from 'react';
import CartContext from '../../stores/cart/cartContext';
import {useForm} from 'react-hook-form';
import Navsteps from '../../layout/NavSteps';
import FormRadio from '../../utils/form/FormRadio';

const SelectPayment = ({
	history
}) => {
	const {savePayInfo} = useContext(CartContext);
	const {register, handleSubmit, errors} = useForm();
	

   function onSubmit({payment}) {
   	savePayInfo('paymentMethod', payment);
   	history.push('/placeorder')
   }

	return (
	<div className = 'payment-view'>
	<div className = 'payment-box'>
		<Navsteps step1 step2 />
		<h1 className = 'form__title'>Payment Method</h1>
		<form onSubmit = {handleSubmit(onSubmit)}>
		    <h2 className = 'form__subtitle'>Select Method</h2>
		    <FormRadio name = 'payment' type = 'radio' value = 'Paypal' register = {register} checked  />		    
		    <FormRadio name = 'payment' type = 'radio' value = 'Credit' register = {register} />		    
		    <button className = "btn--default form__submit">
      				Continue
      		</button>
		</form>
	</div>		
	</div>
		)
}

export default SelectPayment;