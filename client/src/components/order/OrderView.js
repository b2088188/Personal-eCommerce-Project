import * as R from 'ramda';
import React, {useState, useEffect} from 'react';
import {Link as ReactLink, useParams} from 'react-router-dom';
import {useOrderState} from '../../stores/order/orderStateContext';
import {useOrderActions} from '../../stores/order/orderActionContext';
import styled from 'styled-components';
import {Container, ListGroup, Image, Link} from '../../design/components';
import {PayPalButton} from 'react-paypal-button-v2';
import ListItem from '../../utils/list/ListItem';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import formatDate from '../../utils/formatDate';
import axios from 'axios';

const OrderView = ({
	className
}) => {
	const [sdkReady, setSdkReady] = useState(false);
	const {currentOrder, loadingOrder, error} = useOrderState();
	const {orderHandle} = useOrderActions();
	const {id} = useParams();
	

	useEffect(() => {
		if(currentOrder && !currentOrder.isPaid && !window.paypal)
			addPaypalScript();
		async function addPaypalScript() {
			const {data: {data}} = await axios.get('/api/v1/config/paypal');
			const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}`;
          script.async = true;
          script.onload = () => {setSdkReady(true)};
          document.body.appendChild(script);
		}
	}, [currentOrder])

	useEffect(() => {
	   //clearOrder();	   
       orderHandle({
       	method: 'get',
       	Url: `/api/v1/orders/${id}`
       })
	}, [id, orderHandle])

	function onSuccessPayHandler(result) {
		orderHandle({
			method: 'patch',
			Url: `/api/v1/orders/${id}`,
			data: {
				paymentResult: R.pick(['id', 'update_time', 'status'], result)
			}
		})
	}

	function renderOrderItems(list) {
		return list.map(function generateItem(order) {			
		  return	(
          <ListGroup key = {order._id} x center>
 			<ListGroup.Item p20>
 				<Image src = {order.image} alt = {order.name} />
 			</ListGroup.Item>
 			<ListGroup.Item p35>
 				<Link as = {ReactLink} to = {`/product/${order._id}`} >
 					{order.name}
 				</Link>
 			</ListGroup.Item>
 			<ListGroup.Item p30>
 			{order.quantity} x ${order.price} = ${order.quantity * order.price} 			
 			</ListGroup.Item>
 		</ListGroup>
				)
		})
	}

	function renderPayButton(totalPrice) {
		return (
         <ListGroup bdtop>
			<PayPalButton amount = {totalPrice} onSuccess = {onSuccessPayHandler} /> 
		</ListGroup>
			);
	}

     if(loadingOrder)
     	return <Spinner />
    if(!currentOrder)
    	return null;

	return (
		<Container>			
     <div className = {className}>
     	<ListGroup.Title modifiers = 'large'>ORDER {currentOrder._id}</ListGroup.Title>
     	<ListGroup xcenter>
     		<ListGroup.Item p60>
     			<ListGroup bdbottom>     				
     			<ListGroup>
     				<ListGroup.Title>Shipping</ListGroup.Title>
     				<ListGroup.Paragraph modifiers = 'exlight'>
     					{`Address: ${currentOrder.shippingAddress.address}, ${currentOrder.shippingAddress.city}, ${currentOrder.shippingAddress.postalCode}, ${currentOrder.shippingAddress.country}`} 
     				</ListGroup.Paragraph>
     			</ListGroup>
     			<Message alert = 'Not Delivered' severity = 'error'/>
     			</ListGroup>
     			<ListGroup bdbottom>     				
     			<ListGroup title = 'Payment Method' info = {`Method: ${currentOrder.paymentMethod}`}/>
     			{currentOrder.isPaid ?
 				<Message alert = {`Paid on ${formatDate(currentOrder.paidAt)}`} severity = 'success'/> :
     			<Message alert = 'Not Paid' severity = 'error'/>}
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
      			{!currentOrder.isPaid && renderPayButton(currentOrder.totalPrice)}      			
     		</ListGroup.Item>
     	</ListGroup>
     </div>
		</Container>
		)
}

export default styled(OrderView)`
	width: 70%;
	margin: 2rem auto;	
`;