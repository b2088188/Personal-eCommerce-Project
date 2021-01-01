import React from 'react';
import {Link as ReactLink} from 'react-router-dom';
import styled from 'styled-components';
import {ListGroup, Image, Link} from '../../design/components';


const PlaceOrderItem = ({
	item
}) => {

	return (
      <ListGroup ycenter>
 			<ListGroup.Item p15>
 				<Image src = {item.image} alt = {item.name} className = "placeorder-view__img"/>
 			</ListGroup.Item>
 			<ListGroup.Item p40>
 				<Link as = {ReactLink} to = {`/product/${item._id}`}>
 					<ListGroup.Span modifiers = 'medium'>
 						{item.name}
 					</ListGroup.Span>
 				</Link>
 			</ListGroup.Item>
 			<ListGroup.Item p30>
 				<ListGroup.Span modifiers = 'medium'>
 					{item.quantity} x ${item.price} = ${item.quantity * item.price} 			
 				</ListGroup.Span> 			
 			</ListGroup.Item>
 		</ListGroup>
		)
}

export default PlaceOrderItem;