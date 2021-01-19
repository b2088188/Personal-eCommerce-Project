import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ListGroup, ImageContainer, Image, Link as SLink, Span } from '../../../design/components';

const PlaceOrderItem = ({ item }) => {
	return (
		<ListGroup flexy='center'>
			<ListGroup.Item width='15' spacing='3.5'>
				<ImageContainer>
					<Image src={item.image} alt={item.name} />
				</ImageContainer>
			</ListGroup.Item>
			<ListGroup.Item width='40' spacing='3.5'>
				<SLink as={Link} to={`/product/${item._id}`}>
					<Span modifiers='medium'>{item.name}</Span>
				</SLink>
			</ListGroup.Item>
			<ListGroup.Item width='30'>
				<Span modifiers='medium'>
					{item.quantity} x ${item.price} = ${item.quantity * item.price}
				</Span>
			</ListGroup.Item>
		</ListGroup>
	);
};

export default PlaceOrderItem;
