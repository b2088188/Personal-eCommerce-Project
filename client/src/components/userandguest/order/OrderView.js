import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import useOrder from 'stores/order/orderContext';
import { useOrderInfo, useUpdateOrderToPaid } from 'utils/order';
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
	Span
} from 'design/components';
import { setBorder } from 'design/utils';
import { PayPalButton } from 'react-paypal-button-v2';
import { Message, Spinner } from 'design/elements';
import { media } from 'design/utils';
import formatDate from 'utils/formatDate';
import axios from 'axios';

const OrderView = ({ className }) => {
	const { orderId } = useParams();
	const [sdkReady, setSdkReady] = useState(false);
	const { order, isIdle, isLoading, isSuccess, isError, error } = useOrderInfo(orderId);
	const { updateToPaid } = useUpdateOrderToPaid(orderId);
	const { url } = useRouteMatch();

	useEffect(() => {
		if (order && !order.isPaid && !window.paypal) addPaypalScript();
		else setSdkReady(true);
		async function addPaypalScript() {
			const {
				data: { data }
			} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/config/paypal`);
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		}
	}, [order]);

	function onSuccessPayHandler(result) {
		updateToPaid({
			paymentResult: R.pick(['id', 'update_time', 'status'], result)
		});
	}

	function renderOrderItems(list) {
		return list.map(function generateItem(order) {
			return (
				<ListGroup key={order._id} flexy='center'>
					<ListGroup.Item width='20' spacing='3.5'>
						<ImageContainer>
							<Image
								src={`${process.env.REACT_APP_BACKEND_URL}/${order.image}`}
								alt={order.name}
							/>
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

	if (isIdle || isLoading)
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);
	if (isError && error)
		return (
			<Row>
				<Message severity='error' text={error.message} />
			</Row>
		);

	if (isSuccess)
		return (
			<Row className={className}>
				<Col width='12'>
					<CenterWrapper width={{ desktop: '70', tabport: '90' }} my='2'>
						<Title modifiers='large'>ORDER {order._id}</Title>
						<Row direction={{ tabport: 'column' }}>
							<Col width='7'>
								<ListGroup bdbottom>
									<ListGroup.Item>
										<Title>Shipping</Title>
										<Paragraph modifiers='exlight'>
											{`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
										</Paragraph>
									</ListGroup.Item>
									<Message text='Not Delivered' severity='error' />
								</ListGroup>
								<ListGroup bdbottom>
									<ListGroup.Item>
										<Title>Payment Method</Title>
										<Paragraph modifiers='exlight'>
											{`Method: ${order.paymentMethod}`}
										</Paragraph>
									</ListGroup.Item>
									{order.isPaid ? (
										<Message
											text={`Paid on ${formatDate(order.paidAt)}`}
											severity='success'
										/>
									) : (
										<Message text='Not Paid' severity='error' />
									)}
								</ListGroup>
								<ListGroup bdbottom>
									<Title>Order Items</Title>
									{renderOrderItems(order.orderItems)}
								</ListGroup>
							</Col>
							<Col width='4' spacing='2' className='order__summary'>
								<ListGroup>
									<Title>Order Summary</Title>
								</ListGroup>
								<ListGroup flexy='center' bdtop>
									<ListGroup.Item width='50'>Items</ListGroup.Item>
									<ListGroup.Item>
										<Span>${order.itemsPrice}</Span>
									</ListGroup.Item>
								</ListGroup>
								<ListGroup flexy='center' bdtop>
									<ListGroup.Item width='50'>Shipping</ListGroup.Item>
									<ListGroup.Item>
										<Span>${order.shippingPrice}</Span>
									</ListGroup.Item>
								</ListGroup>
								<ListGroup flexy='center' bdtop>
									<ListGroup.Item width='50'>Total</ListGroup.Item>
									<ListGroup.Item>
										<Span>${order.totalPrice}</Span>
									</ListGroup.Item>
								</ListGroup>
								{order && !order.isPaid ? (
									sdkReady ? (
										renderPayButton(order.totalPrice)
									) : (
										<Spinner modifiers='dark' />
									)
								) : null}
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
