import React from 'react';
import { Redirect } from 'react-router-dom';
import useCart from 'context/cart/cartContext';
import { useCreateOrder } from 'utils/order';
import styled from 'styled-components';
import {
	CenterWrapper,
	Row,
	Col,
	ListGroup,
	Title,
	Paragraph,
	Span,
	Button
} from 'design/components';
import Navsteps from 'layout/NavSteps';
import PlaceOrderItem from './PlaceOrderItem';
import { Message } from 'components/Message';
import Spinner from 'components/Spinner';

const PlaceOrder = ({ className }) => {
	const [
		{ cartList, itemsPrice, shippingPrice, totalPrice, shippingAddress, paymentMethod }
	] = useCart();
	//const [{ currentOrder, statusOrder, errorOrder }, { createOrder }] = useOrder();
	const { order, createOrder, isLoading, isSuccess, isError, error } = useCreateOrder();
	async function createOrderHandle(e) {
		createOrder({
			orderItems: cartList,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice
		});
	}

	function renderPlaceOrderItem(list) {
		return list.map(function generateItem(item) {
			return <PlaceOrderItem key={item.product} item={item} />;
		});
	}

	if (!shippingAddress || !paymentMethod) return <Redirect to='/' />;
	if (isLoading)
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);
	if (isError && error)
		return (
			<Row>
				<Message text={error.message} severity='error' />
			</Row>
		);

	if (isSuccess) return <Redirect to={`/order/${order._id}`} />;

	return (
		<Row className={className}>
			<Col width='12'>
				<CenterWrapper width={{ desktop: '70', tabport: '90' }} my='2'>
					<Navsteps step1 step2 step3 />
					<Row direction={{ tabport: 'column' }}>
						<Col width='7'>
							<ListGroup>
								<Title modifiers='light'>Shipping</Title>
								<Paragraph modifiers='exlight'>{`Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}</Paragraph>
							</ListGroup>
							<ListGroup>
								<Title modifiers='light'>Payment Method</Title>
								<Paragraph modifiers='exlight'>{`Method: ${paymentMethod}`}</Paragraph>
							</ListGroup>
							<ListGroup>
								<Title modifiers='light'>Order Items</Title>
								{renderPlaceOrderItem(cartList)}
							</ListGroup>
						</Col>
						<Col width='4'>
							<ListGroup>
								<Title modifiers='light'>Order Summary</Title>
							</ListGroup>
							<ListGroup flexy='center' bdtop>
								<ListGroup.Item width='50'>
									<Span modifiers={['medium', 'light']}>Items</Span>
								</ListGroup.Item>
								<ListGroup.Item>
									<Span modifiers={['medium', 'light']}>${itemsPrice}</Span>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup flexy='center' bdtop>
								<ListGroup.Item width='50'>
									<Span modifiers={['medium', 'light']}>Shipping</Span>
								</ListGroup.Item>
								<ListGroup.Item>
									<Span modifiers={['medium', 'light']}>${shippingPrice}</Span>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup flexy='center' bdtop>
								<ListGroup.Item width='50'>
									<Span modifiers={['medium', 'light']}>Total</Span>
								</ListGroup.Item>
								<ListGroup.Item>
									<Span modifiers={['medium', 'light']}>${totalPrice}</Span>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup bdtop>
								{isLoading ? (
									<Spinner modifiers='dark' />
								) : (
									<Button onClick={createOrderHandle} className='placeorder__button'>
										Place Order
									</Button>
								)}
							</ListGroup>
						</Col>
					</Row>
				</CenterWrapper>
			</Col>
		</Row>
	);
};

export default styled(PlaceOrder)`
	.placeorder {
		&__button {
			width: 100%;
		}
	}
`;
