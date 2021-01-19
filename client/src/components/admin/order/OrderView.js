import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import { Link as Link, useParams } from 'react-router-dom';
import { useOrderState } from '../../../stores/order/orderStateContext';
import { useOrderActions } from '../../../stores/order/orderActionContext';
import styled from 'styled-components';
import { Row, Col, ListGroup, Image, Link as SLink, Button } from '../../../design/components';
import { setBorder } from '../../../design/utils';
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
			<Row>
				<Col width='12' className={className}>
					<div className='order__container'>
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
								{currentOrder.isDelivered ? null : (
									<ListGroup bdtop xcenter>
										<ListGroup.Item full className='order__deliverbtnbox'>
											<Button
												onClick={onDeliverClick}
												modifiers={!currentOrder.isPaid ? 'disabled' : null}
												disabled={!currentOrder.isPaid}
											>
												Mark as Delivered
											</Button>
										</ListGroup.Item>
									</ListGroup>
								)}
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		);
};

export default styled(OrderView)`
	.order {
		&__container {
			width: 70%;
			margin: 2rem auto;
		}
		&__summary {
			${setBorder({})}
			align-self: flex-start;
		}
		&__deliverbtnbox {
			display: flex;
			justify-content: center;
		}
	}
`;
