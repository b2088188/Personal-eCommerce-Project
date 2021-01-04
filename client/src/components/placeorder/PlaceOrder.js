import React, {useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useCartState} from '../../stores/cart/cartStateContext';
import {useOrderState} from '../../stores/order/orderStateContext';
import {useOrderActions} from '../../stores/order/orderActionContext';
import styled from 'styled-components';
import {Container, ListGroup, Title} from '../../design/components';
import ListGroups from '../../utils/list/ListGroup';
import Navsteps from '../../layout/NavSteps';
import PlaceOrderItem from './PlaceOrderItem';


const PlaceOrder = ({
	history,
	className
}) => {
	const {cartList, itemsPrice, shippingPrice, totalPrice, shippingAddress, paymentMethod} = useCartState();
	const {currentOrder} = useOrderState();
	const {orderHandle} = useOrderActions();


	function createOrderHandle(e) {
		orderHandle({
			method: 'post',
			Url: '/api/v1/orders',
			data: {
			orderItems: cartList,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice
			}
		})
	}

    function renderPlaceOrderItem(list) {
    	return list.map(function generateItem(item) {
    		return <PlaceOrderItem key = {item.product} item = {item} />
    	})
    }



    if(!shippingAddress || !paymentMethod)
        return <Redirect to = '/' />

    if(currentOrder)
        return <Redirect to = {`/order/${currentOrder._id}`} />


	return (
		<Container>			
    <div className = {className}>
    		<Navsteps step1 step2 step3 />
    	<ListGroup xcenter>
    		<ListGroup.Item p60>
    			<ListGroup>    				
    			<ListGroup.Title>Shipping</ListGroup.Title>
    			<ListGroup.Paragraph modifiers = 'exlight'>{`Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}</ListGroup.Paragraph>
    			</ListGroup>
    			<ListGroup>    				
    			<ListGroup.Title>Payment Method</ListGroup.Title>
    			<ListGroup.Paragraph modifiers = 'exlight'>{`Method: ${paymentMethod}`}</ListGroup.Paragraph>
    			</ListGroup>
    			 <ListGroup>
					<ListGroup.Title>Order Items</ListGroup.Title>
					{renderPlaceOrderItem(cartList)}
				</ListGroup>
    		</ListGroup.Item>
    		<ListGroup.Item p30 bd yself>
    		    <ListGroup>    		    	
    		    <ListGroup.Title>Order Summary</ListGroup.Title>
    		    </ListGroup>
    			<ListGroup xcenter bdtop>
      				<ListGroup.Item half>
      					<ListGroup.Span modifiers = {['medium', 'light']}>Items</ListGroup.Span>
      				</ListGroup.Item>
      				<ListGroup.Item half>
      					<ListGroup.Span modifiers = {['medium', 'light']}>${itemsPrice}</ListGroup.Span>
      				</ListGroup.Item>      				
      			</ListGroup>
      			<ListGroup xcenter bdtop>
      				<ListGroup.Item half>
      					<ListGroup.Span modifiers = {['medium', 'light']}>Shipping</ListGroup.Span> 
      				</ListGroup.Item>
      				<ListGroup.Item half>
      					<ListGroup.Span modifiers = {['medium', 'light']}>${shippingPrice}</ListGroup.Span> 
      				</ListGroup.Item>
      			</ListGroup>
      			<ListGroup xcenter bdtop>
      				<ListGroup.Item half>
      					<ListGroup.Span modifiers = {['medium', 'light']}>Total</ListGroup.Span> 
      				</ListGroup.Item>
      				<ListGroup.Item half>
      					<ListGroup.Span modifiers = {['medium', 'light']}>${totalPrice}</ListGroup.Span> 
      				</ListGroup.Item>
      			</ListGroup>
      			<ListGroup bdtop>
      				<ListGroup.Button modifiers = 'full' onClick = {createOrderHandle}>
      					Place Order
      				</ListGroup.Button>
      			</ListGroup>
    		</ListGroup.Item>
    	</ListGroup>
    </div>
		</Container>
		)
}

export default styled(PlaceOrder)`
	width: 70%;
	margin: 2rem auto;
`;