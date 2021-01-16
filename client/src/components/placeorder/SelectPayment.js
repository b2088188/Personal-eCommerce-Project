import React, { useState } from 'react';
import { useCartState } from '../../stores/cart/cartStateContext';
import { useCartActions } from '../../stores/cart/cartActionContext';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Title, Form } from '../../design/components';
import { setFlex } from '../../design/utils';
import { useForm } from 'react-hook-form';
import Navsteps from '../../layout/NavSteps';
import FormRadio from '../../utils/form/FormRadio';

const SelectPayment = ({ className }) => {
	const { savePayInfo } = useCartActions();
	const { shippingAddress } = useCartState();
	const [toPlaceOrder, setToPlaceOrder] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	function onSubmit({ payment }) {
		savePayInfo('paymentMethod', payment);
		setToPlaceOrder(true);
	}

	if (!shippingAddress) return <Redirect to='/' />;

	if (toPlaceOrder) return <Redirect to='/placeorder' />;

	return (
		<Col width='12' className={className}>
			<div className='container'>
				<Navsteps step1 step2 />
				<Title modifiers={['large', 'light']}>Payment Method</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Title as='h2' modifiers={['medium', 'exlight']}>
						Select Method
					</Form.Title>
					<Form.RadioGroup>
						<Form.Input
							name='payment'
							type='radio'
							value='Paypal'
							id='paypal'
							ref={register}
							modifiers='radio'
							defaultChecked
						/>
						<Form.Label htmlFor='paypal'>PayPal</Form.Label>
					</Form.RadioGroup>
					<Form.RadioGroup>
						<Form.Input
							name='payment'
							type='radio'
							value='Credit'
							id='credit'
							ref={register}
							modifiers='radio'
						/>
						<Form.Label htmlFor='credit'>Credit</Form.Label>
					</Form.RadioGroup>
					<Form.Button>Continue</Form.Button>
				</Form>
			</div>
		</Col>
	);
};

export default styled(SelectPayment)`
	.container {
		width: 40%;
		margin: 2rem auto;
	}
`;
