import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Container, ListGroup, Title} from '../../design/components';
import OrderContext from '../../stores/order/orderContext';
import ListGroups from '../../utils/list/ListGroup';
import Navsteps from '../../layout/NavSteps';
import PlaceOrderItem from './PlaceOrderItem';


const PlaceOrder = ({
	history,
	className
}) => {
	//const {cartList, itemsPrice, shippingPrice, totalPrice, shippingAddress, paymentMethod} = useContext(CartContext);
	const {currentOrder, createStatus, createOrder} = useContext(OrderContext);

 //    useEffect(() => {
 //      if(currentOrder)
 //      	history.push(`/order/${currentOrder._id}`)
 //    }, [history, currentOrder])

	// function createOrderHandle(e) {
	// 	createOrder({
	// 		orderItems: cartList,
	// 		shippingAddress,
	// 		paymentMethod,
	// 		itemsPrice,
	// 		shippingPrice,
	// 		totalPrice
	// 	})
	// }

    function renderPlaceOrderItem(list) {
    	return list.map(function generateItem(item) {
    		return <PlaceOrderItem key = {item.product} item = {item} />
    	})
    }

return null;
	// return (
	// 	<Container>			
 //    <div className = {className}>
 //    		<Navsteps step1 step2 step3 />
 //    	<ListGroup xcenter>
 //    		<ListGroup.Item p60>
 //    			<ListGroup>    				
 //    			<ListGroup.Title>Shipping</ListGroup.Title>
 //    			<ListGroup.Paragraph modifiers = 'exlight'>{`Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}</ListGroup.Paragraph>
 //    			</ListGroup>
 //    			<ListGroup>    				
 //    			<ListGroup.Title>Payment Method</ListGroup.Title>
 //    			<ListGroup.Paragraph modifiers = 'exlight'>{`Method: ${paymentMethod}`}</ListGroup.Paragraph>
 //    			</ListGroup>
 //    			 <ListGroup>
	// 				<ListGroup.Title>Order Items</ListGroup.Title>
	// 				{/*renderPlaceOrderItem(cartList)*/}
	// 			</ListGroup>
 //    		</ListGroup.Item>
 //    		<ListGroup.Item p30 bd yself>
 //    		    <ListGroup>    		    	
 //    		    <ListGroup.Title>Order Summary</ListGroup.Title>
 //    		    </ListGroup>
 //    			<ListGroup xcenter bdtop>
 //      				<ListGroup.Item half>
 //      					<ListGroup.Span modifiers = {['medium', 'light']}>Items</ListGroup.Span>
 //      				</ListGroup.Item>
 //      				<ListGroup.Item half>
 //      					<ListGroup.Span modifiers = {['medium', 'light']}>${itemsPrice}</ListGroup.Span>
 //      				</ListGroup.Item>      				
 //      			</ListGroup>
 //      			<ListGroup xcenter bdtop>
 //      				<ListGroup.Item half>
 //      					<ListGroup.Span modifiers = {['medium', 'light']}>Shipping</ListGroup.Span> 
 //      				</ListGroup.Item>
 //      				<ListGroup.Item half>
 //      					<ListGroup.Span modifiers = {['medium', 'light']}>${shippingPrice}</ListGroup.Span> 
 //      				</ListGroup.Item>
 //      			</ListGroup>
 //      			<ListGroup xcenter bdtop>
 //      				<ListGroup.Item half>
 //      					<ListGroup.Span modifiers = {['medium', 'light']}>Total</ListGroup.Span> 
 //      				</ListGroup.Item>
 //      				<ListGroup.Item half>
 //      					<ListGroup.Span modifiers = {['medium', 'light']}>${totalPrice}</ListGroup.Span> 
 //      				</ListGroup.Item>
 //      			</ListGroup>
 //      			<ListGroup bdtop>
 //      				<ListGroup.Button modifiers = 'full' onClick = {createOrderHandle}>
 //      					Place Order
 //      				</ListGroup.Button>
 //      			</ListGroup>
 //    		</ListGroup.Item>
 //    	</ListGroup>
 //    </div>
	// 	</Container>
	// 	)
}

export default styled(PlaceOrder)`
	width: 70%;
	margin: 2rem auto;
`;