import React, { useState } from 'react';
import useCart from '../../../stores/cart/cartContext';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, CenterWrapper, Title, Form, Button, Radio } from '../../../design/components';
import { RadioGroup } from '@material-ui/core';
import { setFlex } from '../../../design/utils';
import { useForm, Controller } from 'react-hook-form';
import Navsteps from '../../../layout/NavSteps';
import FormRadio from '../../../utils/form/FormRadio';

const SelectPayment = ({ className }) => {
	const [{ shippingAddress }, { savePayInfo }] = useCart();
	const [toPlaceOrder, setToPlaceOrder] = useState(false);
	const { register, handleSubmit, errors, control } = useForm();

	function onSubmit({ payment }) {
		savePayInfo('paymentMethod', payment);
		setToPlaceOrder(true);
	}

	if (!shippingAddress) return <Redirect to='/' />;

	if (toPlaceOrder) return <Redirect to='/placeorder' />;

	return (
		<Row className={className}>
			<Col width='12'>
				<CenterWrapper width='40' my='2'>
					<Navsteps step1 step2 />
					<Title modifiers={['large', 'light']}>Payment Method</Title>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Title as='h2' modifiers={['medium', 'exlight']}>
							Select Method
						</Title>
						<Form.Group>
							<Controller
								as={RadioGroup}
								name='payment'
								control={control}
								defaultValue='Paypal'
							>
								<Radio.Label value='Paypal' control={<Radio />} label='Paypal' />
								<Radio.Label value='Credit' control={<Radio />} label='Credit' />
							</Controller>
						</Form.Group>
						<Button>Continue</Button>
					</Form>
				</CenterWrapper>
			</Col>
		</Row>
	);
};

export default SelectPayment;
