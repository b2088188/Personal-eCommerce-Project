import React from 'react';
import styled from 'styled-components/macro';
import { Link, useParams } from 'react-router-dom';
import { useOrderInfo, useUpdateOrderToDeliver } from 'utils/order';
import {
	Row,
	Col,
	ListGroup,
	ImageContainer,
	Image,
	Link as SLink,
	Button,
	Title,
	Paragraph,
	Span,
	CenterWrapper
} from 'design/components';
import { setBorder } from 'design/utils';
import { Message } from 'components/Message';
import { Spinner } from 'components/Spinner';
import formatDate from 'utils/formatDate';

const OrderView = ({ className }) => {
	const { orderId } = useParams();
	const { order, isIdle, isLoading, isSuccess } = useOrderInfo(orderId);
	const { updateToDeliver, isLoading: isUpdating } = useUpdateOrderToDeliver(orderId);

	function renderOrderItems(list) {
		return list?.map(function generateItem(order) {
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

	if (isIdle || isLoading)
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);

	if (isSuccess)
		return (
			<Row>
				<Col width='12' className={className}>
					<div className='order__container'>
						<ListGroup.Title modifiers='large'>ORDER {order._id}</ListGroup.Title>
						<Row>
							<Col width='7'>
								<ListGroup bdbottom>
									<ListGroup>
										<Title>Shipping</Title>
										<Paragraph modifiers='exlight'>
											{`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
										</Paragraph>
									</ListGroup>
									{order.isDelivered ? (
										<Message
											text={`Delivered on ${formatDate(order.deliveredAt)}`}
											severity='success'
										/>
									) : (
										<Message text='Not Delivered' severity='error' />
									)}
								</ListGroup>
								<ListGroup bdbottom>
									<ListGroup
										title='Payment Method'
										info={`Method: ${order.paymentMethod}`}
									/>
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
								{order.isDelivered ? null : isUpdating ? (
									<Spinner modifiers='dark' />
								) : (
									<ListGroup flexy='center' bdtop>
										<Button
											onClick={() => updateToDeliver()}
											modifiers={!order.isPaid ? 'disabled' : null}
											disabled={!order.isPaid}
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
