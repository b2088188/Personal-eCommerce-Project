import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { Link as Link, useParams } from 'react-router-dom';
import { useOrderState } from '../../stores/order/orderStateContext';
import { useOrderActions } from '../../stores/order/orderActionContext';
import styled from 'styled-components';
import { Row, Col, ListGroup, Image, Link as SLink, Button } from '../../design/components';
import { setBorder } from '../../design/utils';
import { PayPalButton } from 'react-paypal-button-v2';
import ListItem from '../../utils/list/ListItem';
import { Message, Spinner } from '../../design/elements';
import formatDate from '../../utils/formatDate';
import axios from 'axios';
const OrderView = ({ className }) => {
	const [sdkReady, setSdkReady] = useState(false);
	const { currentOrder, statusOrder, errorOrder } = useOrderState();
	const { getOrder, updateOrderToPaid } = useOrderActions();
	const { orderId } = useParams();

	useEffect(() => {
		if (currentOrder && !currentOrder.isPaid && !window.paypal) addPaypalScript();
		async function addPaypalScript() {
			const {
				data: { data }
			} = await axios.get('/api/v1/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		}
	}, [currentOrder]);

	useEffect(() => {
		//clearOrder();
		getOrder(orderId);
	}, [orderId, getOrder]);

	function onSuccessPayHandler(result) {
		updateOrderToPaid(orderId, {
			paymentResult: R.pick(['id', 'update_time', 'status'], result)
		});
	}

	function renderOrderItems(list) {
		return list.map(function generateItem(order) {
			return (
				<ListGroup key={order._id} x center>
					<ListGroup.Item p20>
						<Image src={order.image} alt={order.name} />
					</ListGroup.Item>
					<ListGroup.Item p35>
						<SLink as={Link} to={`/products/${order._id}`}>
							{order.name}
						</SLink>
					</ListGroup.Item>
					<ListGroup.Item p30>
						{order.quantity} x ${order.price} = ${order.quantity * order.price}
					</ListGroup.Item>
				</ListGroup>
			);
		});
	}

	function renderPayButton(totalPrice) {
		return (
			<ListGroup bdtop>
				<PayPalButton amount={totalPrice} onSuccess={onSuccessPayHandler} />
			</ListGroup>
		);
	}

	if (statusOrder === 'idle' || statusOrder === 'pending') return <Spinner modifiers='dark' />;
	if (statusOrder === 'rejected' && errorOrder)
		return <Message severity='error' text={errorOrder} />;

	if (statusOrder === 'resolved')
		return (
			<Col width='12' className={className}>
				<div className='container'>
					<ListGroup.Title modifiers='large'>ORDER {currentOrder._id}</ListGroup.Title>
					<Row>
						<Col width='7'>
							<ListGroup bdbottom>
								<ListGroup>
									<ListGroup.Title>Shipping</ListGroup.Title>
									<ListGroup.Paragraph modifiers='exlight'>
										{`Address: ${currentOrder.shippingAddress.address}, ${currentOrder.shippingAddress.city}, ${currentOrder.shippingAddress.postalCode}, ${currentOrder.shippingAddress.country}`}
									</ListGroup.Paragraph>
								</ListGroup>
								<Message text='Not Delivered' severity='error' />
							</ListGroup>
							<ListGroup bdbottom>
								<ListGroup
									title='Payment Method'
									info={`Method: ${currentOrder.paymentMethod}`}
								/>
								{currentOrder.isPaid ? (
									<Message
										text={`Paid on ${formatDate(currentOrder.paidAt)}`}
										severity='success'
									/>
								) : (
									<Message text='Not Paid' severity='error' />
								)}
							</ListGroup>
							<ListGroup bdbottom>
								<ListGroup.Title>Order Items</ListGroup.Title>
								{renderOrderItems(currentOrder.orderItems)}
							</ListGroup>
						</Col>
						<Col width='4' spacing='2' className='order__summary'>
							<ListGroup.Item full>
								<ListGroup.Title>Order Summary</ListGroup.Title>
							</ListGroup.Item>
							<ListGroup xcenter bdtop>
								<ListGroup.Item half>Items</ListGroup.Item>
								<ListGroup.Item half>
									<ListGroup.Span>${currentOrder.itemsPrice}</ListGroup.Span>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup xcenter bdtop>
								<ListGroup.Item half>Shipping</ListGroup.Item>
								<ListGroup.Item half>
									<ListGroup.Span>${currentOrder.shippingPrice}</ListGroup.Span>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup xcenter bdtop>
								<ListGroup.Item half>Total</ListGroup.Item>
								<ListGroup.Item half>
									<ListGroup.Span>${currentOrder.totalPrice}</ListGroup.Span>
								</ListGroup.Item>
							</ListGroup>
							{currentOrder && !currentOrder.isPaid
								? renderPayButton(currentOrder.totalPrice)
								: null}
						</Col>
					</Row>
				</div>
			</Col>
		);
};

export default styled(OrderView)`
	.container {
		width: 70%;
		margin: 2rem auto;
	}
	.order {
		&__summary {
			${setBorder({})}
			align-self: flex-start;
		}
	}
`;
