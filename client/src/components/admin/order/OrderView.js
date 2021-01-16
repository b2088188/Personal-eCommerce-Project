import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { Link as Link, useParams } from 'react-router-dom';
import { useOrderState } from '../../../stores/order/orderStateContext';
import { useOrderActions } from '../../../stores/order/orderActionContext';
import styled from 'styled-components';
import { Container, ListGroup, Image, Link as SLink, Button } from '../../../design/components';
import ListItem from '../../../utils/list/ListItem';
import { Message, Spinner } from '../../../design/elements';
import formatDate from '../../../utils/formatDate';
import axios from 'axios';
const OrderView = ({ className }) => {
	const { currentOrder, statusOrder, errorOrder } = useOrderState();
	const { getOrder, updateOrderToDeliver } = useOrderActions();
	const { orderId } = useParams();

	useEffect(() => {
		//clearOrder();
		getOrder(orderId);
	}, [orderId, getOrder]);

	function renderOrderItems(list) {
		return list?.map(function generateItem(order) {
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

	function onDeliverClick() {
		updateOrderToDeliver(orderId);
	}

	if (statusOrder === 'idle' || statusOrder === 'pending') return <Spinner modifiers='dark' />;
	if (statusOrder === 'rejected' && errorOrder)
		return <Message severity='error' text={errorOrder} />;

	if (statusOrder === 'resolved')
		return (
			<Container>
				<div className={className}>
					<ListGroup.Title modifiers='large'>ORDER {currentOrder._id}</ListGroup.Title>
					<ListGroup xcenter>
						<ListGroup.Item p60>
							<ListGroup bdbottom>
								<ListGroup>
									<ListGroup.Title>Shipping</ListGroup.Title>
									<ListGroup.Paragraph modifiers='exlight'>
										{`Address: ${currentOrder.shippingAddress.address}, ${currentOrder.shippingAddress.city}, ${currentOrder.shippingAddress.postalCode}, ${currentOrder.shippingAddress.country}`}
									</ListGroup.Paragraph>
								</ListGroup>
								{currentOrder.isDelivered ? (
									<Message
										text={`Delivered on ${formatDate(currentOrder.deliveredAt)}`}
										severity='success'
									/>
								) : (
									<Message text='Not Delivered' severity='error' />
								)}
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
						</ListGroup.Item>
						<ListGroup.Item p30 bd yself>
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
							{currentOrder.isDelivered ? null : (
								<ListGroup bdtop xcenter>
									<ListGroup.Item full>
										<Button onClick={onDeliverClick}>Mark as Delivered</Button>
									</ListGroup.Item>
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</div>
			</Container>
		);
};

export default styled(OrderView)`
	width: 70%;
	margin: 2rem auto;
`;
