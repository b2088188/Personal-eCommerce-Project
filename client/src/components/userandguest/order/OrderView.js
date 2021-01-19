import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { Link as Link, useParams } from 'react-router-dom';
import { useOrderState } from '../../../stores/order/orderStateContext';
import { useOrderActions } from '../../../stores/order/orderActionContext';
import styled from 'styled-components';
import {
	Row,
	Col,
	CenterWrapper,
	ListGroup,
	ImageContainer,
	Image,
	Link as SLink,
	Title,
	Paragraph,
	Button,
	Span
} from '../../../design/components';
import { setBorder } from '../../../design/utils';
import { PayPalButton } from 'react-paypal-button-v2';
import { Message, Spinner } from '../../../design/elements';
import { media } from '../../../design/utils';
import formatDate from '../../../utils/formatDate';
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
				<ListGroup key={order._id} flexy='center'>
					<ListGroup.Item width='20' spacing='3.5'>
						<ImageContainer>
							<Image src={`http://127.0.0.1:8000/${order.image}`} alt={order.name} />
						</ImageContainer>
					</ListGroup.Item>
					<ListGroup.Item width='35' spacing='3.5'>
						<SLink as={Link} to={`/products/${order._id}`}>
							{order.name}
						</SLink>
					</ListGroup.Item>
					<ListGroup.Item width='30'>
						{order.quantity} x ${order.price} = ${order.quantity * order.price}
					</ListGroup.Item>
				</ListGroup>
			);
		});
	}

	function renderPayButton(totalPrice) {
		return (
			<ListGroup bdtop>
				<PayPalButton
					amount={totalPrice}
					onSuccess={onSuccessPayHandler}
					className='order__button'
				/>
			</ListGroup>
		);
	}

	if (statusOrder === 'idle' || statusOrder === 'pending')
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);
	if (statusOrder === 'rejected' && errorOrder)
		return (
			<Row>
				<Message severity='error' text={errorOrder} />
			</Row>
		);

	if (statusOrder === 'resolved')
		return (
			<Row className={className}>
				<Col width='12'>
					<CenterWrapper width={{ desktop: '70', tabport: '90' }} my='2'>
						<Title modifiers='large'>ORDER {currentOrder._id}</Title>
						<Row direction={{ tabport: 'column' }}>
							<Col width='7'>
								<ListGroup bdbottom>
									<ListGroup.Item>
										<Title>Shipping</Title>
										<Paragraph modifiers='exlight'>
											{`Address: ${currentOrder.shippingAddress.address}, ${currentOrder.shippingAddress.city}, ${currentOrder.shippingAddress.postalCode}, ${currentOrder.shippingAddress.country}`}
										</Paragraph>
									</ListGroup.Item>
									<Message text='Not Delivered' severity='error' />
								</ListGroup>
								<ListGroup bdbottom>
									<ListGroup.Item>
										<Title>Payment Method</Title>
										<Paragraph modifiers='exlight'>
											{`Method: ${currentOrder.paymentMethod}`}
										</Paragraph>
									</ListGroup.Item>
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
									<Title>Order Items</Title>
									{renderOrderItems(currentOrder.orderItems)}
								</ListGroup>
							</Col>
							<Col width='4' spacing='2' className='order__summary'>
								<ListGroup>
									<Title>Order Summary</Title>
								</ListGroup>
								<ListGroup flexy='center' bdtop>
									<ListGroup.Item width='50'>Items</ListGroup.Item>
									<ListGroup.Item>
										<Span>${currentOrder.itemsPrice}</Span>
									</ListGroup.Item>
								</ListGroup>
								<ListGroup flexy='center' bdtop>
									<ListGroup.Item width='50'>Shipping</ListGroup.Item>
									<ListGroup.Item>
										<Span>${currentOrder.shippingPrice}</Span>
									</ListGroup.Item>
								</ListGroup>
								<ListGroup flexy='center' bdtop>
									<ListGroup.Item width='50'>Total</ListGroup.Item>
									<ListGroup.Item>
										<Span>${currentOrder.totalPrice}</Span>
									</ListGroup.Item>
								</ListGroup>
								{currentOrder && !currentOrder.isPaid
									? renderPayButton(currentOrder.totalPrice)
									: null}
							</Col>
						</Row>
					</CenterWrapper>
				</Col>
			</Row>
		);
};

export default styled(OrderView)`
	.order {
		&__summary {
			${setBorder({})}
			align-self: flex-start;
			${media.tabport(`
				align-self: center;
				width: 50%;
				margin: 2rem auto;
				`)}
			${media.phone(`
				width: 90%;
				`)}
		}
		&__buttton {
			width: 100%;
		}
	}
`;
