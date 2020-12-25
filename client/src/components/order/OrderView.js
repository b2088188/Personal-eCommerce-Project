import './orderview.scss';
import React, {useState, useEffect, useContext} from 'react';
import {PayPalButton} from 'react-paypal-button-v2';
import OrderContext from '../../stores/order/orderContext';
import ListGroup from '../../utils/list/ListGroup';
import ListItem from '../../utils/list/ListItem';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import formatDate from '../../utils/formatDate';
import axios from 'axios';

const OrderView = ({
	match
}) => {
	const [sdkReady, setSdkReady] = useState(false);
	const {loading, currentOrder, getOrder, updateOrderToPaid, clearOrder} = useContext(OrderContext);

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
	   clearOrder();	   
       getOrder(match.params.id);
	}, [match.params.id, getOrder, clearOrder])

	function onSuccessPayHandler(result) {
		updateOrderToPaid(match.params.id, result);
	}

	function renderOrderItems(list) {
		return list.map(function generateItem(order) {
			return <ListItem key = {order._id} item = {order} />
		})
	}

	function renderPayButton(totalPrice) {
		return (
         <div className="list-item__col--full u-bt-default">
			<PayPalButton amount = {totalPrice} onSuccess = {onSuccessPayHandler} /> 
		</div>
			);
	}

     if(loading)
     	return <Spinner />
    if(!currentOrder)
    	return null;
	return (
     <div className = 'order-view'>
     	<h1 className = 'order-view__title'>ORDER {currentOrder._id}</h1>
     	<div className = 'order-view__container'>
     		<div className = 'order-view__col--60'>
     			<div className = 'order-view__group'>     				
     			<ListGroup title = 'Shipping' info = {`Address: ${currentOrder.shippingAddress.address}, ${currentOrder.shippingAddress.city}, ${currentOrder.shippingAddress.postalCode}, ${currentOrder.shippingAddress.country}`} />
     			<Message alert = 'Not Delivered' severity = 'error'/>
     			</div>
     			<div className = 'order-view__group'>     				
     			<ListGroup title = 'Payment Method' info = {`Method: ${currentOrder.paymentMethod}`}/>
     			{currentOrder.isPaid ?
 				<Message alert = {`Paid on ${formatDate(currentOrder.paidAt)}`} severity = 'success'/> :
     			<Message alert = 'Not Paid' severity = 'error'/>}
     			</div>
     			<div className = 'order-view__group'>     			
     				<h1 className = 'list-group__title  u-padding-default'>Order Items</h1>
     				{renderOrderItems(currentOrder.orderItems)}
     			</div>	
     		</div>
     		<div className = 'order-view__col--30 u-b-default'>
     			<div className = "list-item__col--full">    		    	
    		    <h2 className = 'list-group__title'>Order Summary</h2>
    		    </div>
    			<div className = "list-item u-bt-default">
      				<div className = "list-item__col--45">Items</div>
      				<span className = "list-item__col--45">${currentOrder.itemsPrice}</span>
      			</div>
      			<div className = "list-item u-bt-default">
      				<div className = "list-item__col--45">Shipping</div>
      				<span className = "list-item__col--45">${currentOrder.shippingPrice}</span>
      			</div>
      			<div className = "list-item u-bt-default">
      				<div className = "list-item__col--45">Total</div>
      				<span className = "list-item__col--45">${currentOrder.totalPrice}</span>
      			</div>
      			{!currentOrder.isPaid && renderPayButton(currentOrder.totalPrice)}      			
     		</div>
     	</div>
     </div>
		)
}

export default OrderView;