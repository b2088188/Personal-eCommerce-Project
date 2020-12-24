import React, {useContext} from 'react';
import CartContext from '../../stores/cart/cartContext';
import { useForm } from 'react-hook-form';
import Navsteps from '../../layout/NavSteps';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';

const ShippingInfo = ({
	history
}) => {
	const {savePayInfo} = useContext(CartContext);
	const {register, handleSubmit, errors} = useForm();
   
   function onSubmit(values) {
   	savePayInfo('shippingAddress', values);
   	history.push('/payment');
   }

	return (
    <div className = "form-container">
      	<div className = "form__formbox">
      	<Navsteps step1 />  
	<h1 className = "form__title">Shipping</h1>
            {/*loading && <Spinner />*/}
            <FormError errors = {errors} />
      		<form className = "form__body" onSubmit = {handleSubmit(onSubmit)}>
      			<FormGroup name = 'address' type = 'text' register = {register({
      				required: 'Please provide your address'	               
      			})} />
      			<FormGroup name = 'city' type = 'text' register = {register({
      				required: 'Please provide your city'
      			})} />
      			<FormGroup name = 'postalCode' type = 'text' register = {register({
      				required: 'Please provide your postalCode'
      			})} />
      			<FormGroup name = 'country' type = 'text' register = {register({
      				required: 'Please provide your country'
      			})} />
      			<button className = "btn--default form__submit">
      				Continue
      			</button>
      		</form>
      	</div>
    </div>		
		)
}

export default ShippingInfo;