import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useOrder from '../../../stores/order/orderContext';
import styled from 'styled-components';
import {
	Row,
	Col,
	ListGroup,
	ImageContainer,
	Image,
	Link as SLink,
	Button,
	Title,
	Span
} from '../../../design/components';
import { setBorder } from '../../../design/utils';
import { Message, Spinner } from '../../../design/elements';
import formatDate from '../../../utils/formatDate';

const OrderView = ({ className }) => {
	const [
		{ currentOrder, statusOrder, errorOrder },
		{ getOrder, updateOrderToDeliver }
	] = useOrder();
	const { orderId } = useParams();

	useEffect(() => {
		//clearOrder();
		getOrder(orderId);
	}, [orderId, getOrder]);

	function renderOrderItems(list) {
		return list?.map(function generateItem(order) {
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
								{currentOrder.isDelivered ? null : (
									<ListGroup flexy='center' bdtop>
										<Button
											onClick={onDeliverClick}
											modifiers={!currentOrder.isPaid ? 'disabled' : null}
											disabled={!currentOrder.isPaid}
											className='order__button'
										>
											Mark as Delivered
										</Button>
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
		&__button {
			margin: auto;
		}
	}
`;
