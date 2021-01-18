import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useCartState } from '../../../stores/cart/cartStateContext';
import { useOrderState } from '../../../stores/order/orderStateContext';
import { useOrderActions } from '../../../stores/order/orderActionContext';
import styled from 'styled-components';
import { Row, Col, ListGroup, Title, Paragraph, Span, Button } from '../../../design/components';
import ListGroups from '../../../utils/list/ListGroup';
import Navsteps from '../../../layout/NavSteps';
import PlaceOrderItem from './PlaceOrderItem';
import { Spinner } from '../../../design/elements';

const PlaceOrder = ({ history, className }) => {
	const {
		cartList,
		itemsPrice,
		shippingPrice,
		totalPrice,
		shippingAddress,
		paymentMethod
	} = useCartState();
	const { currentOrder, statusOrder } = useOrderState();
	const { createOrder } = useOrderActions();

	function createOrderHandle(e) {
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

	if (statusOrder === 'resolved' && currentOrder)
		return <Redirect to={`/order/${currentOrder._id}`} />;

	return (
		<Col width='12' className={className}>
			<div className='container'>
				<Navsteps step1 step2 step3 />
				<Row>
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
						<ListGroup xcenter bdtop>
							<ListGroup.Item half>
								<Span modifiers={['medium', 'light']}>Items</Span>
							</ListGroup.Item>
							<ListGroup.Item half>
								<Span modifiers={['medium', 'light']}>${itemsPrice}</Span>
							</ListGroup.Item>
						</ListGroup>
						<ListGroup xcenter bdtop>
							<ListGroup.Item half>
								<Span modifiers={['medium', 'light']}>Shipping</Span>
							</ListGroup.Item>
							<ListGroup.Item half>
								<Span modifiers={['medium', 'light']}>${shippingPrice}</Span>
							</ListGroup.Item>
						</ListGroup>
						<ListGroup xcenter bdtop>
							<ListGroup.Item half>
								<Span modifiers={['medium', 'light']}>Total</Span>
							</ListGroup.Item>
							<ListGroup.Item half>
								<Span modifiers={['medium', 'light']}>${totalPrice}</Span>
							</ListGroup.Item>
						</ListGroup>
						<ListGroup bdtop>
							{statusOrder === 'pending' ? (
								<Spinner modifiers='dark' />
							) : (
								<Button modifiers='full' onClick={createOrderHandle}>
									Place Order
								</Button>
							)}
						</ListGroup>
					</Col>
				</Row>
			</div>
		</Col>
	);
};

export default styled(PlaceOrder)`
	.container {
		width: 70%;
		margin: 2rem auto;
	}
`;
